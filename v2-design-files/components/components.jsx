/* Shared components: icons, sidebar, topbar, modal */
const { useState, useEffect, useRef } = React;

/* ---------- Icons (single-stroke, 18px) ---------- */
const Ico = {
  home: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...p}
    >
      <path d="M3 12 12 4l9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  folder: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...p}
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  inbox: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...p}
    >
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  wallet: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...p}
    >
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16v5" />
      <path d="M3 7v10a2 2 0 0 0 2 2h16v-5" />
      <circle cx="17" cy="14" r="1.5" />
    </svg>
  ),
  settings: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...p}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  search: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      {...p}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  bell: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...p}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  plus: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      {...p}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  arrowR: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      {...p}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  check: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      {...p}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  x: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      {...p}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  shield: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      {...p}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  lock: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      {...p}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  sparkle: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      {...p}
    >
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" />
    </svg>
  ),
  github: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...p}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  user: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...p}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
  briefcase: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      {...p}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  clock: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      {...p}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  upload: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      {...p}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M17 8 12 3 7 8M12 3v12" />
    </svg>
  ),
  trend: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      {...p}
    >
      <path d="m22 7-9.5 9.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  ),
};

/* ---------- Sidebar ---------- */
function Sidebar({ active, onNav, user, role, badges = {} }) {
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
            className={"sb-link " + (active === it.id ? "active" : "")}
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
        <div className="sb-avatar">{user?.initial || "A"}</div>
        <div className="sb-user-meta">
          <div className="sb-user-name">{user?.name || "Ada Lovelace"}</div>
          <div className="sb-user-sub">{user?.short || "7Hk2…q4Bn"}</div>
        </div>
      </div>
    </aside>
  );
}

/* ---------- Topbar ---------- */
function Topbar({ onCreate }) {
  return (
    <div className="topbar">
      <div className="topbar-search">
        <Ico.search />
        <input placeholder="Search projects, milestones, providers…" />
        <span className="kbd">⌘K</span>
      </div>
      <div className="topbar-actions">
        <button className="iconbtn" title="Notifications">
          <Ico.bell />
          <span className="dot"></span>
        </button>
        {onCreate && (
          <button className="btn btn-primary" onClick={onCreate}>
            <Ico.plus /> New project
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */
function Modal({ open, onClose, title, children, footer, width }) {
  if (!open) return null;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div
        className="modal"
        style={width ? { width } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="iconbtn btn-icon" onClick={onClose}>
            <Ico.x />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Status helpers ---------- */
const STATUS_MAP = {
  pending_provider: { label: "Pending acceptance", cls: "pill-warn", row: "warn", pulse: true },
  awaiting_deposit: { label: "Awaiting deposit", cls: "pill-warn", row: "warn", pulse: true },
  active: { label: "In progress", cls: "pill-info", row: "info", pulse: true },
  in_review: { label: "In review", cls: "pill-info", row: "info", pulse: false },
  completed: { label: "Completed", cls: "pill-ok", row: "ok", pulse: false },
  rejected: { label: "Rejected", cls: "pill-danger", row: "danger", pulse: false },
  disputed: { label: "Disputed", cls: "pill-danger", row: "danger", pulse: true },
  draft: { label: "Draft", cls: "", row: "idle", pulse: false },
};
function StatusPill({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.draft;
  return (
    <span className={"pill " + s.cls}>
      <span className={"dot" + (s.pulse ? " dot-pulse" : "")} />
      {s.label}
    </span>
  );
}

Object.assign(window, { Ico, Sidebar, Topbar, Modal, StatusPill, STATUS_MAP });
