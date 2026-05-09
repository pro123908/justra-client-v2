import { useState } from "react";
import { Ico } from "./Icons";

interface SidebarProps {
  active: string;
  onNav: (id: string) => void;
  role: "consumer" | "provider";
  user: { name: string; short: string; initial: string; address?: string };
  badges?: { invites?: number };
}

export function Sidebar({ active, onNav, role, user, badges = {} }: SidebarProps) {
  const items =
    role === "provider"
      ? [
          { id: "dashboard", label: "My Work", ico: Ico.home },
          { id: "projects", label: "Projects", ico: Ico.folder },
          { id: "invites", label: "Invites", ico: Ico.inbox, badge: badges.invites },
          { id: "earnings", label: "Earnings", ico: Ico.wallet },
        ]
      : [
          { id: "dashboard", label: "Dashboard", ico: Ico.home },
          { id: "projects", label: "Projects", ico: Ico.folder },
          { id: "milestones", label: "Milestones", ico: Ico.briefcase },
          { id: "wallet", label: "Escrow", ico: Ico.wallet },
        ];

  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="sb-brand-mark">J</div>
        <div>
          <div className="sb-brand-name">Justra</div>
          <div className="sb-brand-sub">Escrow workspace</div>
        </div>
      </div>

      <div className="sb-section">
        <div className="sb-section-label">Workspace</div>
        {items.map((it) => (
          <button
            key={it.id}
            className={`sb-link${active === it.id ? " active" : ""}`}
            onClick={() => onNav(it.id)}
          >
            <it.ico className="sb-ico" />
            <span>{it.label}</span>
            {it.badge ? <span className="badge">{it.badge}</span> : null}
          </button>
        ))}
      </div>

      <div className="sb-section">
        <div className="sb-section-label">Account</div>
        <button className="sb-link" onClick={() => onNav("settings")}>
          <Ico.settings className="sb-ico" />
          <span>Settings</span>
        </button>
      </div>

      <div className="sb-user">
        <div className="sb-avatar">{user.initial}</div>
        <div className="sb-user-meta">
          <div className="sb-user-name">{user.name}</div>
          <div className="sb-user-sub" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span>{user.short}</span>
            {user.address && <CopyButton value={user.address} />}
          </div>
        </div>
      </div>
    </aside>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy address"}
      style={{
        background: "none",
        border: "none",
        padding: "0 2px",
        cursor: "pointer",
        color: copied ? "var(--neon, #39ff14)" : "var(--ink-4, #888)",
        display: "flex",
        alignItems: "center",
        lineHeight: 1,
      }}
    >
      {copied ? <Ico.check style={{ width: 11, height: 11 }} /> : <Ico.copy style={{ width: 11, height: 11 }} />}
    </button>
  );
}
