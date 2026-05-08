import { Ico } from "./Icons";

interface SidebarProps {
  active: string;
  onNav: (id: string) => void;
  role: "consumer" | "provider";
  user: { name: string; short: string; initial: string };
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
          <div className="sb-user-sub">{user.short}</div>
        </div>
      </div>
    </aside>
  );
}
