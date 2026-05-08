# Justra Client v2 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all JSX and CSS in the React client with the Justra v2 design system, preserving every existing API call, auth hook, and on-chain action.

**Architecture:** Token-first CSS via custom properties in `src/styles.css` (no Tailwind utilities needed — design files use class names like `.btn`, `.card`, `.ms-row`); new shared components (Icons, StatusPill, Sidebar, Topbar, AppShell, Modal, PageHead) replace old Navbar; all routes get JSX replacement while keeping existing logic intact.

**Tech Stack:** React 19, react-router-dom v7 (BrowserRouter), CSS custom properties, Plus Jakarta Sans + JetBrains Mono via Google Fonts.

---

## File Map

**New files:**

- `src/routes/projects.tsx` — Projects list route (NEW)
- `src/routes/settings.tsx` — Settings route (NEW)
- `src/components/app/Icons.tsx` — SVG icon set
- `src/components/app/StatusPill.tsx` — status pill + STATUS_MAP
- `src/components/app/Sidebar.tsx` — 240px nav sidebar
- `src/components/app/Topbar.tsx` — search + actions topbar
- `src/components/app/AppShell.tsx` — authenticated page wrapper
- `src/components/app/PageHead.tsx` — page title + actions row

**Replaced files (logic preserved):**

- `src/styles.css` — full replacement with design tokens
- `src/components/app/Modal.tsx` — restyled, `tag` prop removed
- `src/routes/index.tsx` — landing page JSX
- `src/routes/auth.tsx` — auth screen JSX
- `src/routes/role.tsx` — role select JSX
- `src/routes/dashboard.tsx` — dashboard JSX (consumer + provider)
- `src/routes/projects.$projectId.tsx` — project detail JSX
- `src/routes/projects.$projectId_.milestones.$milestoneId.tsx` — milestone detail JSX
- `src/routes/projects.$projectId_.invites.tsx` — invites JSX
- `src/routes/github.tsx` — github connect JSX
- `src/routes/github-callback.tsx` — github callback JSX
- `src/App.tsx` — add `/projects` and `/settings` routes

**Deleted files:**

- `src/components/app/Navbar.tsx`
- `src/components/app/SuccessModal.tsx`
- `src/components/git-escrow.css`

---

## Task 1: Foundation — Design System CSS + Fonts

**Files:**

- Modify: `src/styles.css`
- Modify: `index.html`

- [ ] **Step 1: Add Google Fonts to index.html**

Open `index.html`. Inside `<head>`, before any other link tags, add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: Replace src/styles.css**

Replace the entire file with the design system CSS (copy from `client/v2-design-files/components/styles.css` exactly — it is 1342 lines of complete, production-ready CSS). No changes needed to the source.

Run: `cp client/v2-design-files/components/styles.css client/src/styles.css`

- [ ] **Step 3: Verify no import errors**

Run: `cd client && bun run lint 2>&1 | head -40`

Expected: no import errors (styles.css has no imports itself).

- [ ] **Step 4: Commit**

```bash
git add client/src/styles.css client/index.html
git commit -m "feat: add Justra v2 design system CSS and Google Fonts"
```

---

## Task 2: Icons Component

**Files:**

- Create: `src/components/app/Icons.tsx`

- [ ] **Step 1: Create Icons.tsx**

```tsx
import type { SVGProps } from "react";

type IcoProps = SVGProps<SVGSVGElement>;

export const Ico = {
  home: (p: IcoProps) => (
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
  folder: (p: IcoProps) => (
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
  inbox: (p: IcoProps) => (
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
  wallet: (p: IcoProps) => (
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
  settings: (p: IcoProps) => (
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
  search: (p: IcoProps) => (
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
  bell: (p: IcoProps) => (
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
  plus: (p: IcoProps) => (
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
  arrowR: (p: IcoProps) => (
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
  check: (p: IcoProps) => (
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
  x: (p: IcoProps) => (
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
  shield: (p: IcoProps) => (
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
  lock: (p: IcoProps) => (
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
  sparkle: (p: IcoProps) => (
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
  github: (p: IcoProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...p}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  user: (p: IcoProps) => (
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
  briefcase: (p: IcoProps) => (
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
  clock: (p: IcoProps) => (
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
  upload: (p: IcoProps) => (
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
  trend: (p: IcoProps) => (
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
```

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/components/app/Icons.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/app/Icons.tsx
git commit -m "feat: add Icons component with full Justra v2 SVG set"
```

---

## Task 3: StatusPill Component

**Files:**

- Create: `src/components/app/StatusPill.tsx`

- [ ] **Step 1: Create StatusPill.tsx**

```tsx
export const STATUS_MAP: Record<
  string,
  { label: string; cls: string; row: string; pulse: boolean }
> = {
  pending_provider: { label: "Pending acceptance", cls: "pill-warn", row: "warn", pulse: true },
  awaiting_deposit: { label: "Awaiting deposit", cls: "pill-warn", row: "warn", pulse: true },
  active: { label: "In progress", cls: "pill-info", row: "info", pulse: true },
  in_review: { label: "In review", cls: "pill-info", row: "info", pulse: false },
  completed: { label: "Completed", cls: "pill-ok", row: "ok", pulse: false },
  rejected: { label: "Rejected", cls: "pill-danger", row: "danger", pulse: false },
  disputed: { label: "Disputed", cls: "pill-danger", row: "danger", pulse: true },
  draft: { label: "Draft", cls: "", row: "idle", pulse: false },
};

export function StatusPill({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.draft;
  return (
    <span className={`pill ${s.cls}`}>
      <span className={`dot${s.pulse ? " dot-pulse" : ""}`} />
      {s.label}
    </span>
  );
}
```

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/components/app/StatusPill.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/app/StatusPill.tsx
git commit -m "feat: add StatusPill component with STATUS_MAP"
```

---

## Task 4: Modal Component (Replace)

**Files:**

- Modify: `src/components/app/Modal.tsx`

Read the current file first, then replace entirely. The `tag` prop is removed — update all callers in later tasks.

- [ ] **Step 1: Replace Modal.tsx**

```tsx
import { Ico } from "./Icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
}

export function Modal({ open, onClose, title, children, footer, width }: ModalProps) {
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

export default Modal;
```

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/components/app/Modal.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/app/Modal.tsx
git commit -m "feat: restyle Modal to Justra v2 design, remove tag prop"
```

---

## Task 5: PageHead Component

**Files:**

- Create: `src/components/app/PageHead.tsx`

- [ ] **Step 1: Create PageHead.tsx**

```tsx
interface PageHeadProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHead({ title, subtitle, actions }: PageHeadProps) {
  return (
    <div
      className="row-between"
      style={{ marginBottom: 24, alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}
    >
      <div>
        <h1 className="h-display h1" style={{ marginBottom: 6 }}>
          {title}
        </h1>
        {subtitle && (
          <div className="muted" style={{ fontSize: 14 }}>
            {subtitle}
          </div>
        )}
      </div>
      <div className="row gap-8">{actions}</div>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/components/app/PageHead.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/app/PageHead.tsx
git commit -m "feat: add PageHead component"
```

---

## Task 6: Sidebar Component

**Files:**

- Create: `src/components/app/Sidebar.tsx`

- [ ] **Step 1: Create Sidebar.tsx**

```tsx
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
```

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/components/app/Sidebar.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/app/Sidebar.tsx
git commit -m "feat: add Sidebar component"
```

---

## Task 7: Topbar Component

**Files:**

- Create: `src/components/app/Topbar.tsx`

- [ ] **Step 1: Create Topbar.tsx**

```tsx
import { Ico } from "./Icons";

interface TopbarProps {
  onCreate?: () => void;
}

export function Topbar({ onCreate }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="topbar-search">
        <Ico.search />
        <input placeholder="Search projects, milestones, providers…" readOnly />
        <span className="kbd">⌘K</span>
      </div>
      <div className="topbar-actions">
        <button className="iconbtn" title="Notifications">
          <Ico.bell />
          <span className="dot" />
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
```

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/components/app/Topbar.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/app/Topbar.tsx
git commit -m "feat: add Topbar component"
```

---

## Task 8: AppShell Component

**Files:**

- Create: `src/components/app/AppShell.tsx`

AppShell wraps all authenticated pages. It renders Sidebar + `<main>` with Topbar inside. It uses `useLocation()` from react-router-dom to derive the active sidebar item from the pathname, and `useNavigate()` for sidebar navigation.

- [ ] **Step 1: Create AppShell.tsx**

```tsx
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
  onCreate?: () => void;
}

function deriveActive(pathname: string): string {
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/settings")) return "settings";
  if (pathname.startsWith("/dashboard")) return "dashboard";
  return "dashboard";
}

function shortKey(key: string): string {
  if (!key || key.length < 8) return key;
  return `${key.slice(0, 4)}…${key.slice(-4)}`;
}

export function AppShell({ children, onCreate }: AppShellProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const active = deriveActive(location.pathname);

  const handleNav = (id: string) => {
    if (id === "dashboard") navigate("/dashboard");
    else if (id === "projects" || id === "milestones") navigate("/projects");
    else if (id === "settings") navigate("/settings");
  };

  const pubKey = user?.publicKey ?? "";
  const sidebarUser = {
    name: shortKey(pubKey) || "Wallet",
    short: shortKey(pubKey),
    initial: pubKey ? pubKey[0].toUpperCase() : "A",
  };

  return (
    <div className="app">
      <Sidebar
        active={active}
        onNav={handleNav}
        role={(user?.role as "consumer" | "provider") ?? "consumer"}
        user={sidebarUser}
      />
      <div className="main">
        <Topbar onCreate={onCreate} />
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/components/app/AppShell.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/components/app/AppShell.tsx
git commit -m "feat: add AppShell component with Sidebar + Topbar"
```

---

## Task 9: Landing Page Route

**Files:**

- Modify: `src/routes/index.tsx`

Read the current file first. Preserve any existing imports for router navigation. Replace JSX with the LandingScreen design.

- [ ] **Step 1: Replace index.tsx JSX**

```tsx
import { useNavigate } from "react-router-dom";
import { Ico } from "@/components/app/Icons";
import { StatusPill } from "@/components/app/StatusPill";

export default function IndexPage() {
  const navigate = useNavigate();
  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12">
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>
            Justra
          </div>
        </div>
        <div className="links">
          <a>How it works</a>
          <a>For developers</a>
          <a>For clients</a>
          <a>Pricing</a>
        </div>
        <div className="actions">
          <button className="btn btn-ghost" onClick={() => navigate("/auth")}>
            Sign in
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/auth")}>
            Get started
          </button>
        </div>
      </nav>

      <section className="hero">
        <div>
          <span className="auth-step">
            <Ico.shield /> Trustless milestone escrow
          </span>
          <h1>
            Software work that pays out <em>only when it's right.</em>
          </h1>
          <p className="lede">
            Justra brokers software contracts between clients and developers. Funds lock in on-chain
            escrow per milestone, code is graded against the spec by an AI review engine, and SOL
            releases the moment delivery is approved.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/auth")}>
              Start a project <Ico.arrowR />
            </button>
            <button className="btn btn-lg" onClick={() => navigate("/dashboard")}>
              View live demo
            </button>
          </div>
          <div className="hero-trust">
            <div>
              <b>$4.2M</b> locked across milestones
            </div>
            <div>
              <b>1,840</b> projects shipped
            </div>
            <div>
              <b>97%</b> release rate
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="row-between" style={{ marginBottom: 14 }}>
            <span className="eyebrow">Live milestone</span>
            <StatusPill status="active" />
          </div>
          <div className="h-display h3">Atlas Settlement Engine</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
            M-03 · Auth & user provisioning
          </div>
          <div className="hero-band-amount" style={{ margin: "20px 0 16px" }}>
            <div className="lbl">Locked in escrow</div>
            <div className="val">◎ 8.4 SOL</div>
            <div className="sub">≈ $1,386 USD · releases on approval</div>
          </div>
          <div className="proj-progress">
            <div className="label">
              <span>Milestone progress</span>
              <span>65%</span>
            </div>
            <div className="progress">
              <i style={{ width: "65%" }} />
            </div>
          </div>
          <div className="divider" />
          <div className="row-between" style={{ fontSize: 13 }}>
            <div className="row gap-8">
              <div className="av av-sm">M</div>
              <span>Maya Soto</span>
              <span className="muted-2">Provider</span>
            </div>
            <span className="muted-2 mono">7Hk2…q4Bn</span>
          </div>
        </div>
      </section>

      <section className="feature-band">
        <div style={{ maxWidth: 1180, margin: "0 auto 24px" }}>
          <span className="eyebrow">How it works</span>
          <h2 className="h-display h2" style={{ marginTop: 8 }}>
            Four steps from spec to settlement
          </h2>
        </div>
        <div className="feature-grid">
          <div className="feature">
            <div className="feature-ico">
              <Ico.briefcase />
            </div>
            <h4>1 · Define milestones</h4>
            <p>
              Upload your spec — Justra extracts checkpoints, scope, and acceptance criteria. Edit,
              then invite a developer.
            </p>
          </div>
          <div className="feature">
            <div className="feature-ico">
              <Ico.lock />
            </div>
            <h4>2 · Lock funds in escrow</h4>
            <p>
              Each milestone gets its own on-chain PDA. Pay with SOL or card — funds are frozen
              until you sign off.
            </p>
          </div>
          <div className="feature">
            <div className="feature-ico">
              <Ico.sparkle />
            </div>
            <h4>3 · AI-graded delivery</h4>
            <p>
              Developers ship to GitHub. Five LLM judges score the code against the spec — you see
              the verdict before releasing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/routes/index.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/routes/index.tsx
git commit -m "feat: restyle landing page to Justra v2 design"
```

---

## Task 10: Auth Route

**Files:**

- Modify: `src/routes/auth.tsx`

Read the current file. Keep all existing logic: `useAuth()`, `connectPhantom()`. Replace JSX.

- [ ] **Step 1: Replace auth.tsx JSX**

Read the current file: `src/routes/auth.tsx`. Identify `connectPhantom` usage. The new JSX wraps the existing connect call:

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Ico } from "@/components/app/Icons";

export default function AuthPage() {
  const { connectPhantom } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePhantom = async () => {
    setLoading(true);
    try {
      await connectPhantom();
      navigate("/role");
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>
            Justra
          </div>
        </div>
        <div className="actions">
          <span className="muted-2" style={{ fontSize: 13 }}>
            Don't have an account?
          </span>
          <button className="btn btn-ghost">Create one</button>
        </div>
      </nav>
      <div className="center-shell">
        <div className="auth-card">
          <span className="auth-step">Step 1 of 2 · Connect</span>
          <h2>Connect your Solana wallet</h2>
          <p className="sub">
            Justra uses your wallet to sign milestone agreements and release escrow. Sessions are
            scoped per-wallet — your private keys never leave Phantom.
          </p>
          <button className="wallet-btn" onClick={handlePhantom} disabled={loading}>
            <span className="wallet-mark">◎</span>
            <span className="stack" style={{ alignItems: "flex-start" }}>
              <span>{loading ? "Connecting…" : "Continue with Phantom"}</span>
              <span className="muted-2" style={{ fontSize: 12, fontWeight: 500 }}>
                Mainnet-beta
              </span>
            </span>
            <Ico.arrowR className="arrow" />
          </button>
          <div className="divider" />
          <button className="wallet-btn" disabled>
            <span
              className="wallet-mark"
              style={{ background: "linear-gradient(135deg,#f7931a,#e76f00)" }}
            >
              S
            </span>
            <span className="stack" style={{ alignItems: "flex-start" }}>
              <span>Continue with Solflare</span>
              <span className="muted-2" style={{ fontSize: 12, fontWeight: 500 }}>
                Browser extension
              </span>
            </span>
            <Ico.arrowR className="arrow" />
          </button>
          <p className="fineprint">
            By connecting you agree to Justra's <a>Terms</a> and <a>Privacy Policy</a>. New to
            wallets? <a>Install Phantom →</a>
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Important:** Read the current `src/routes/auth.tsx` first and verify the exact `connectPhantom` API (it may return a promise or use a callback). Adapt the `handlePhantom` function to match the actual API. If `connectPhantom()` navigates internally (e.g., to `/role`), remove the `navigate('/role')` call from this file.

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/routes/auth.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/routes/auth.tsx
git commit -m "feat: restyle auth page to Justra v2 design"
```

---

## Task 11: Role Route

**Files:**

- Modify: `src/routes/role.tsx`

Read current file. Keep `useAuth()` `setRole()` call and navigate logic. The existing role.tsx navigates to `/github` (provider) or `/dashboard` (consumer) after setRole.

- [ ] **Step 1: Replace role.tsx JSX**

```tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Ico } from "@/components/app/Icons";

export default function RolePage() {
  const { setRole, user } = useAuth();
  const navigate = useNavigate();

  const shortKey = (key: string) => (key ? `${key.slice(0, 4)}…${key.slice(-4)}` : "");

  const handleRole = async (role: "consumer" | "provider") => {
    await setRole(role);
    if (role === "provider") {
      navigate("/github");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12">
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>
            Justra
          </div>
        </div>
        <div className="actions">
          {user?.publicKey && (
            <span className="pill">
              <span className="dot" style={{ background: "#22c55e" }} />
              Wallet connected · {shortKey(user.publicKey)}
            </span>
          )}
        </div>
      </nav>
      <div className="center-shell" style={{ alignItems: "flex-start", paddingTop: 64 }}>
        <div style={{ width: "min(880px, 100%)" }}>
          <span className="auth-step">Step 2 of 2 · Choose role</span>
          <h2 className="h-display" style={{ fontSize: 28, marginTop: 14, marginBottom: 8 }}>
            How will you use Justra?
          </h2>
          <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 580 }}>
            You can switch between workspaces any time — but each wallet starts with a primary role
            so we know which tools to surface first.
          </p>

          <div className="role-grid">
            <button className="role-card" onClick={() => handleRole("consumer")}>
              <div className="role-card-ico">
                <Ico.briefcase />
              </div>
              <div>
                <div
                  className="muted-2"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Client · Project owner
                </div>
                <h3>I'm hiring developers</h3>
              </div>
              <p>
                Define scope, fund milestones, and approve deliveries. You hold the spec and the
                budget.
              </p>
              <ul className="role-bullets">
                <li>
                  <Ico.check />
                  Create projects and break them into payable milestones
                </li>
                <li>
                  <Ico.check />
                  Lock funds in escrow per milestone — release on approval
                </li>
                <li>
                  <Ico.check />
                  Inspect AI code reviews before signing off
                </li>
              </ul>
              <div className="role-card-cta">
                <span>Continue as client</span>
                <Ico.arrowR />
              </div>
            </button>

            <button className="role-card" onClick={() => handleRole("provider")}>
              <div className="role-card-ico">
                <Ico.user />
              </div>
              <div>
                <div
                  className="muted-2"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Developer · Provider
                </div>
                <h3>I'm shipping code</h3>
              </div>
              <p>
                Accept milestones, deliver to GitHub, and get paid the moment your work is approved.
              </p>
              <ul className="role-bullets">
                <li>
                  <Ico.check />
                  Submit code per milestone — AI-reviewed automatically
                </li>
                <li>
                  <Ico.check />
                  Trigger on-chain release of locked SOL on approval
                </li>
                <li>
                  <Ico.check />
                  Build a verifiable on-chain delivery history
                </li>
              </ul>
              <div className="role-card-cta">
                <span>Continue as developer</span>
                <Ico.arrowR />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Important:** Read the current `src/routes/role.tsx` first. If `setRole()` handles navigation internally or takes different params, adapt accordingly.

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/routes/role.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/routes/role.tsx
git commit -m "feat: restyle role select page to Justra v2 design"
```

---

## Task 12: Dashboard Route

**Files:**

- Modify: `src/routes/dashboard.tsx`

This is a large file (~600+ lines). Read it in full first. Keep ALL existing API calls: `createProject`, `projectsOwnedBy`, `projectsForProvider`, `acceptInvite`. The `CreateProjectModal` state and the `buildGithubAppInstallUrl` import from `./github` must be preserved.

The existing `Modal` usage inside `CreateProjectModal` uses a `tag` prop — remove that. The existing `Modal` component import changes from the old file to the new one (same path, just the interface changed).

- [ ] **Step 1: Read the current dashboard.tsx**

Run: `cat -n client/src/routes/dashboard.tsx`

Note the exact API call signatures and state shape before making changes.

- [ ] **Step 2: Replace dashboard.tsx JSX (keep logic)**

The general structure to implement:

```tsx
// Keep all existing imports from auth, app-data, api, solana, router
// Add new component imports:
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { StatusPill, STATUS_MAP } from "@/components/app/StatusPill";
import { Ico } from "@/components/app/Icons";
import { Modal } from "@/components/app/Modal";

// ... keep all existing state and API logic unchanged ...

// Consumer dashboard structure:
// <AppShell onCreate={() => setShowCreate(true)}>
//   <div className="page">
//     <PageHead title="Welcome back" subtitle="..." actions={...} />
//     <div className="stat-grid">4 stat cards</div>
//     {/* "Needs your attention" card with ms-list rows for in_review/awaiting_deposit milestones */}
//     <div className="row-between">Active projects heading + "View all" link to /projects</div>
//     <div className="proj-grid">first 3 projects as proj-card buttons</div>
//   </div>
//   <CreateProjectModal open={showCreate} onClose={...} onCreate={...} />
// </AppShell>

// Provider dashboard structure:
// <AppShell>
//   <div className="page">
//     <PageHead title="My work" subtitle="..." actions={...} />
//     <div className="stat-grid">4 static stat cards</div>
//     Active engagements proj-grid
//     Pending invites invite-list with Accept buttons
//   </div>
// </AppShell>

// CreateProjectModal uses the new Modal (no tag prop):
// <Modal open={open} onClose={onClose} title="New project" width={620} footer={...}>
//   step 1: name/desc/repo fields
//   step 2: spec upload (static UI)
// </Modal>
```

Follow the exact HTML/className structure from `client/v2-design-files/components/screens-app.jsx` `DashboardScreen`, `ProjCard`, and `CreateProjectModal`. The proj-card buttons navigate to `/projects/:id` using `useNavigate`.

**For the "Needs your attention" section:** Filter real milestones (from the project data in AppDataContext) for `in_review` or `awaiting_deposit` status and render them as `.ms-row` buttons.

**For stat grid:** Consumer stats are all static except "Active projects" count (from `projectsOwnedBy().length`). Provider stats are all static.

- [ ] **Step 3: Verify lint**

Run: `cd client && bun run lint src/routes/dashboard.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add client/src/routes/dashboard.tsx
git commit -m "feat: restyle dashboard to Justra v2 design"
```

---

## Task 13: Projects List Route (NEW)

**Files:**

- Create: `src/routes/projects.tsx`

- [ ] **Step 1: Create projects.tsx**

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useAppData } from "@/lib/app-data";
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { StatusPill } from "@/components/app/StatusPill";
import { Ico } from "@/components/app/Icons";
import { Modal } from "@/components/app/Modal";

// Re-use the same CreateProjectModal logic from dashboard.tsx
// Import createProject from api.ts
import { projectApi } from "@/lib/api";

export default function ProjectsPage() {
  const { user, token } = useAuth();
  const { projects, refreshProjects } = useAppData();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"all" | "active" | "action" | "completed">("all");
  const [showCreate, setShowCreate] = useState(false);

  const role = user?.role ?? "consumer";

  const filtered =
    tab === "all"
      ? projects
      : tab === "active"
        ? projects.filter((p) => p.status === "active")
        : tab === "action"
          ? projects.filter(
              (p) => p.status === "awaiting_deposit" || p.status === "pending_provider",
            )
          : projects.filter((p) => p.status === "completed");

  return (
    <AppShell onCreate={role === "consumer" ? () => setShowCreate(true) : undefined}>
      <div className="page">
        <PageHead
          title="Projects"
          subtitle="Every engagement, past and present."
          actions={
            role === "consumer" ? (
              <>
                <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                  <Ico.plus /> New project
                </button>
              </>
            ) : undefined
          }
        />

        <div className="tabs">
          {[
            { id: "all", label: "All", n: projects.length },
            {
              id: "active",
              label: "Active",
              n: projects.filter((p) => p.status === "active").length,
            },
            {
              id: "action",
              label: "Action needed",
              n: projects.filter(
                (p) => p.status === "awaiting_deposit" || p.status === "pending_provider",
              ).length,
            },
            {
              id: "completed",
              label: "Completed",
              n: projects.filter((p) => p.status === "completed").length,
            },
          ].map((t) => (
            <button
              key={t.id}
              className={`tab${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id as typeof tab)}
            >
              {t.label}
              <span className="count">{t.n}</span>
            </button>
          ))}
        </div>

        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Developer</th>
                <th>Milestones</th>
                <th style={{ textAlign: "right" }}>Escrow</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const milestoneCount = (p as any).milestones?.length ?? 0;
                const doneMilestones =
                  (p as any).milestones?.filter((m: any) => m.status === "completed").length ?? 0;
                const providerMember = (p as any).members?.find((m: any) => m.role === "provider");
                return (
                  <tr
                    key={p.id}
                    className="clickable"
                    onClick={() => navigate(`/projects/${p.id}`)}
                  >
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--ink)" }}>{p.name}</div>
                      <div className="muted-2 mono" style={{ fontSize: 12, marginTop: 2 }}>
                        #{p.id}
                      </div>
                    </td>
                    <td>
                      <StatusPill status={p.status ?? "draft"} />
                    </td>
                    <td>
                      {providerMember ? (
                        <div className="row gap-8">
                          <div className="av av-sm">
                            {providerMember.publicKey?.[0]?.toUpperCase() ?? "P"}
                          </div>
                          <span className="mono" style={{ fontSize: 12 }}>
                            {providerMember.publicKey?.slice(0, 4)}…
                            {providerMember.publicKey?.slice(-4)}
                          </span>
                        </div>
                      ) : (
                        <span className="muted-2">— Unassigned</span>
                      )}
                    </td>
                    <td>
                      <div
                        style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 140 }}
                      >
                        <span style={{ fontSize: 12 }}>
                          {doneMilestones}/{milestoneCount}
                        </span>
                        <div className="progress" style={{ height: 4 }}>
                          <i
                            style={{
                              width:
                                milestoneCount > 0
                                  ? `${(doneMilestones / milestoneCount) * 100}%`
                                  : "0%",
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 600, color: "var(--ink)" }}>
                      ◎ 0
                    </td>
                    <td>
                      <Ico.arrowR className="muted-2" />
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", color: "var(--ink-4)", padding: "32px 0" }}
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CreateProjectModal — same as in dashboard.tsx; extract to a shared component if desired */}
      <CreateProjectModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={async (name: string, description: string) => {
          if (!token) return;
          await projectApi.create(token, { name, description });
          await refreshProjects();
          setShowCreate(false);
        }}
      />
    </AppShell>
  );
}

function CreateProjectModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
}) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    await onCreate(name, description);
    setLoading(false);
    setStep(1);
    setName("");
    setDescription("");
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setStep(1);
        onClose();
      }}
      title="New project"
      width={620}
      footer={
        <>
          <span className="auth-step">Step {step} of 2</span>
          <div className="row gap-8">
            {step > 1 && (
              <button className="btn" onClick={() => setStep(1)}>
                Back
              </button>
            )}
            {step < 2 ? (
              <button className="btn btn-primary" onClick={() => setStep(2)}>
                Continue
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleCreate} disabled={loading}>
                <Ico.check /> {loading ? "Creating…" : "Create project"}
              </button>
            )}
          </div>
        </>
      }
    >
      {step === 1 && (
        <div className="stack gap-16">
          <div className="field">
            <label className="field-label">Project name</label>
            <input
              className="input"
              placeholder="e.g. Atlas Settlement Engine"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-label">Short description</label>
            <textarea
              className="textarea"
              placeholder="What are you building?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="field-hint">
              This is what developers see when they receive your invite.
            </span>
          </div>
          <div className="field">
            <label className="field-label">Repository</label>
            <div className="input-wrap">
              <Ico.github className="input-ico" />
              <input className="input" placeholder="github.com/your-org/your-repo" />
            </div>
            <span className="field-hint">
              Optional now — you can connect a repo later from the project page.
            </span>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="stack gap-16">
          <div className="alert tip">
            <Ico.sparkle className="icon" />
            <div>
              <div className="title">Have a spec?</div>
              <div className="body">
                Drop in a Markdown or PDF spec and Justra will draft milestones for you.
              </div>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Upload spec (optional)</label>
            <div
              style={{
                border: "2px dashed var(--line-2)",
                borderRadius: "var(--r-2)",
                padding: "28px 18px",
                textAlign: "center",
                background: "var(--bg-2)",
                color: "var(--ink-3)",
              }}
            >
              <Ico.upload style={{ margin: "0 auto 8px", color: "var(--ink-4)" }} />
              <div style={{ fontWeight: 600, color: "var(--ink)" }}>Drop a spec here</div>
              <div style={{ fontSize: 12 }}>Markdown, PDF, or Notion export · up to 10 MB</div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
```

**Important:** Read `src/lib/app-data.tsx` and `src/lib/api.ts` first to confirm the exact property names on the project object (`p.name` vs `p.title`, etc.) and the `projectApi.create` signature. Adapt property accesses accordingly.

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/routes/projects.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/routes/projects.tsx
git commit -m "feat: add Projects list page with Justra v2 design"
```

---

## Task 14: Project Detail Route

**Files:**

- Modify: `src/routes/projects.$projectId.tsx`

This is the largest file (~1300 lines). Read it in full before editing. It contains: `ProjectSetupView`, `MilestoneReviewSection`, `AddMilestoneModal`, `ManageAccessModal`, `AssignProviderModal`. All must be preserved with their existing API calls. Only JSX changes.

- [ ] **Step 1: Read the current project detail file**

Run: `cat -n client/src/routes/projects.\$projectId.tsx`

Note: all milestone state machines, deposit flows, `initializeMilestone`, `milestoneApi` calls.

- [ ] **Step 2: Replace JSX wrapping with AppShell + v2 classes**

The top-level render should become:

```tsx
// Preserve all existing imports and add:
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { StatusPill, STATUS_MAP } from "@/components/app/StatusPill";
import { Ico } from "@/components/app/Icons";
// Keep existing Modal import (now from the restyled Modal.tsx)

// Main component output:
return (
  <AppShell>
    <div className="page">
      {/* Breadcrumb */}
      <div className="crumb">
        <a onClick={() => navigate("/projects")}>Projects</a>
        <span className="sep">/</span>
        <span className="now">{project.name}</span>
      </div>

      {/* detail-head: project ID + status pill, title, meta row, action buttons */}
      <div className="detail-head">
        <div>
          <div className="row gap-12" style={{ marginBottom: 8 }}>
            <span className="muted-2 mono" style={{ fontSize: 13 }}>
              #{project.id}
            </span>
            <StatusPill status={project.status ?? "draft"} />
          </div>
          <h1>{project.name}</h1>
          <div className="meta">
            {providerMember && (
              <span>
                <b>Developer · </b>
                <span className="mono">{shortKey(providerMember.publicKey)}</span>
              </span>
            )}
            <span>
              <b>Created · </b>
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="row gap-8">
          {project.repoUrl && (
            <button className="btn" onClick={() => window.open(project.repoUrl)}>
              <Ico.github /> View repo
            </button>
          )}
          <button className="btn">Edit scope</button>
          <button className="btn btn-primary" onClick={() => setShowAddMilestone(true)}>
            Add milestone
          </button>
        </div>
      </div>

      {/* hero-band: total escrow (static 0), released / locked / progress */}
      <div className="hero-band">
        <div className="hero-band-amount">
          <div className="lbl">Project escrow</div>
          <div className="val">◎ 0</div>
          <div className="sub">across {milestones.length} milestones</div>
        </div>
        <div className="row gap-24" style={{ alignItems: "stretch" }}>
          <div>
            <div
              className="muted-2"
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Released
            </div>
            <div className="h-display" style={{ fontSize: 22, marginTop: 4 }}>
              ◎ 0
            </div>
          </div>
          <div style={{ width: 1, background: "var(--brand-200)" }} />
          <div>
            <div
              className="muted-2"
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Locked
            </div>
            <div className="h-display" style={{ fontSize: 22, marginTop: 4 }}>
              ◎ 0
            </div>
          </div>
          <div style={{ width: 1, background: "var(--brand-200)" }} />
          <div style={{ minWidth: 140 }}>
            <div
              className="muted-2"
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Progress
            </div>
            <div className="h-display" style={{ fontSize: 22, marginTop: 4 }}>
              {pct}%
            </div>
            <div className="progress" style={{ marginTop: 6 }}>
              <i style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* two-col: milestone list + sidebar (team, repo, escrow alert) */}
      <div className="two-col">
        <div>
          <div className="row-between" style={{ marginBottom: 12 }}>
            <h2 className="h-display h3" style={{ margin: 0 }}>
              Milestones
            </h2>
          </div>
          <div className="ms-list">
            {milestones.map((m, i) => {
              const meta = STATUS_MAP[m.status] ?? STATUS_MAP.draft;
              return (
                <button
                  key={m.id}
                  className={`ms-row ${meta.row}`}
                  onClick={() => navigate(`/projects/${project.id}/milestones/${m.id}`)}
                >
                  <div className="ms-num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="ms-title">{m.title}</div>
                    <div className="ms-sub">{m.description}</div>
                    <div className="ms-meta">
                      <StatusPill status={m.status} />
                    </div>
                  </div>
                  <div>
                    <div className="ms-amount">◎ 0</div>
                    <div className="ms-amount-sub">static</div>
                  </div>
                  <Ico.arrowR className="ms-arrow" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="stack gap-16">
          {/* Team card */}
          <div className="card card-pad">
            <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 12px" }}>
              Team
            </h3>
            <div className="stack gap-12">
              <div className="row gap-12">
                <div className="av av-lg">{user?.publicKey?.[0]?.toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>You</div>
                  <div className="muted-2" style={{ fontSize: 12 }}>
                    Client · {shortKey(user?.publicKey ?? "")}
                  </div>
                </div>
              </div>
              {providerMember && (
                <div className="row gap-12">
                  <div className="av av-lg">{providerMember.publicKey?.[0]?.toUpperCase()}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Developer</div>
                    <div className="muted-2 mono" style={{ fontSize: 12 }}>
                      {shortKey(providerMember.publicKey)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Repository card */}
          {project.repoUrl && (
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 12px" }}>
                Repository
              </h3>
              <div className="row gap-8" style={{ marginBottom: 10 }}>
                <Ico.github />
                <span className="mono" style={{ fontSize: 13 }}>
                  {project.repoUrl.replace("https://github.com/", "")}
                </span>
              </div>
              <button
                className="btn btn-sm"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => window.open(project.repoUrl)}
              >
                Open on GitHub
              </button>
            </div>
          )}

          {/* Escrow info alert */}
          <div className="alert tip">
            <Ico.shield className="icon" />
            <div>
              <div className="title">Escrow is on-chain</div>
              <div className="body">
                Each milestone holds funds in its own program-derived address. Released SOL settles
                to the provider's wallet within ~2s of approval.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Keep all existing modals: AddMilestoneModal, ManageAccessModal, AssignProviderModal */}
    {/* These modals now use the restyled Modal component (no tag prop) */}
  </AppShell>
);
```

When removing the `tag` prop from any `<Modal tag="...">` calls in this file, simply delete the `tag={...}` attribute.

- [ ] **Step 3: Verify lint**

Run: `cd client && bun run lint "src/routes/projects.\$projectId.tsx" 2>&1`

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add "client/src/routes/projects.\$projectId.tsx"
git commit -m "feat: restyle project detail page to Justra v2 design"
```

---

## Task 15: Milestone Detail Route

**Files:**

- Modify: `src/routes/projects.$projectId_.milestones.$milestoneId.tsx`

Read the full file (~1245 lines). Keep ALL existing logic: deposit flow, accept/reject, `releaseMilestoneFunds`, `disputeMilestone`, `analysisApi.listForMilestone()`, `CodeReport` embed, `ActiveMilestoneBand`. The `tag` prop must be removed from any `<Modal tag="...">` usage.

- [ ] **Step 1: Read the current milestone detail file**

Run: `cat -n "client/src/routes/projects.\$projectId_.milestones.\$milestoneId.tsx"`

Note: the `analysisApi` call, the `StoredAnalysisResult` type, the approve/reject flows, and the tab state.

- [ ] **Step 2: Replace JSX wrapping with AppShell + v2 classes**

Top-level structure:

```tsx
// Add to imports:
import { AppShell } from "@/components/app/AppShell";
import { StatusPill } from "@/components/app/StatusPill";
import { Ico } from "@/components/app/Icons";
// Keep Modal import (restyled, no tag prop)

// Main render:
return (
  <AppShell>
    <div className="page">
      {/* Breadcrumb */}
      <div className="crumb">
        <a onClick={() => navigate("/projects")}>Projects</a>
        <span className="sep">/</span>
        <a onClick={() => navigate(`/projects/${projectId}`)}>Project</a>
        <span className="sep">/</span>
        <span className="now">{milestone.title}</span>
      </div>

      {/* detail-head */}
      <div className="detail-head">
        <div>
          <div className="row gap-12" style={{ marginBottom: 8 }}>
            <span className="muted-2 mono" style={{ fontSize: 13 }}>
              #{milestone.id}
            </span>
            <StatusPill status={milestone.status} />
          </div>
          <h1>{milestone.title}</h1>
          <div className="meta">
            <span>
              <b>Branch · </b>
              <span className="mono">main</span>
            </span>
            <span>
              <b>Progress · </b>static
            </span>
          </div>
        </div>
        {/* Role-aware action buttons — keep existing onClick handlers */}
        {role === "consumer" ? (
          <div className="row gap-8">
            <button className="btn btn-danger" onClick={handleReject}>
              Reject delivery
            </button>
            <button className="btn btn-primary" onClick={() => setShowApprove(true)}>
              <Ico.check /> Approve & release
            </button>
          </div>
        ) : (
          <div className="row gap-8">
            <button className="btn btn-primary" onClick={handleSubmitDelivery}>
              <Ico.upload /> Submit delivery
            </button>
          </div>
        )}
      </div>

      {/* hero-band: locked escrow (static), delivery progress */}
      <div className="hero-band">
        <div className="hero-band-amount">
          <div className="lbl">Locked in escrow</div>
          <div className="val">◎ 0 SOL</div>
          <div className="sub">releases on approval</div>
        </div>
        <div style={{ minWidth: 220 }}>
          <div
            className="muted-2"
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Delivery progress
          </div>
          <div className="h-display" style={{ fontSize: 24, marginTop: 4 }}>
            —
          </div>
          <div className="progress" style={{ marginTop: 8 }}>
            <i style={{ width: "0%" }} />
          </div>
        </div>
      </div>

      {/* AI verdict alert (when analysis exists) */}
      {analyses.length > 0 && (
        <div className="alert ok" style={{ marginBottom: 24 }}>
          <Ico.sparkle className="icon" />
          <div className="grow">
            <div className="title">AI verdict ready · Score {analyses[0].overallScore} / 100</div>
            <div className="body">Open the AI review tab to see judge-by-judge breakdowns.</div>
          </div>
          <button className="btn btn-sm" onClick={() => setTab("review")}>
            View review <Ico.arrowR />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        {[
          { id: "overview", label: "Overview" },
          {
            id: "review",
            label: "AI review",
            n: analyses.length > 0 ? analyses[0].overallScore : undefined,
          },
          { id: "activity", label: "Activity", n: 8 },
          { id: "escrow", label: "Escrow", n: 4 },
        ].map((t) => (
          <button
            key={t.id}
            className={`tab${tab === t.id ? " active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.n != null && <span className="count">{t.n}</span>}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === "overview" && (
        <div className="two-col">
          <div className="stack gap-24">
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 10px" }}>
                Scope
              </h3>
              <p className="muted" style={{ marginTop: 0, lineHeight: 1.6 }}>
                {milestone.description}
              </p>
              <h4 className="h-display" style={{ fontSize: 14, margin: "20px 0 10px" }}>
                Acceptance criteria
              </h4>
              <p className="muted" style={{ fontSize: 13 }}>
                Acceptance criteria to be defined.
              </p>
            </div>
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 10px" }}>
                Latest delivery
              </h3>
              {milestone.githubPrUrl ? (
                <div className="row gap-12" style={{ marginBottom: 12 }}>
                  <Ico.github />
                  <div className="grow">
                    <div className="mono" style={{ fontSize: 13 }}>
                      {milestone.githubPrUrl}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="muted" style={{ fontSize: 13 }}>
                  No delivery submitted yet.
                </p>
              )}
            </div>
          </div>

          <div className="stack gap-16">
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 14px" }}>
                Activity
              </h3>
              <div className="timeline">
                <div className="timeline-row">
                  <div className="timeline-dot">
                    <Ico.clock />
                  </div>
                  <div className="body">
                    <div className="who">Milestone created</div>
                    <div className="what">{milestone.title}</div>
                    <div className="when">{new Date(milestone.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Review tab */}
      {tab === "review" && <AIReviewTab analyses={analyses} />}

      {/* Activity tab (static) */}
      {tab === "activity" && (
        <div className="card card-pad">
          <div className="timeline">
            {[
              {
                who: "Milestone created",
                what: milestone.title,
                when: new Date(milestone.createdAt).toLocaleString(),
                d: "ok",
              },
            ].map((row, i) => (
              <div key={i} className="timeline-row">
                <div className={`timeline-dot${row.d === "ok" ? " ok" : ""}`}>
                  <Ico.check />
                </div>
                <div className="body">
                  <div className="who">{row.who}</div>
                  <div className="what">{row.what}</div>
                  <div className="when">{row.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Escrow tab (static) */}
      {tab === "escrow" && (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Tx</th>
                <th>From → To</th>
                <th style={{ textAlign: "right" }}>Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "var(--ink-4)" }}>
                  No escrow events yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>

    {/* Approve modal — keep existing releaseFunds() call */}
    <Modal
      open={showApprove}
      onClose={() => setShowApprove(false)}
      title="Approve & release escrow"
      footer={
        <>
          <span className="muted-2" style={{ fontSize: 13 }}>
            You'll be asked to sign with Phantom.
          </span>
          <div className="row gap-8">
            <button className="btn" onClick={() => setShowApprove(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleApprove} disabled={approving}>
              <Ico.check /> {approving ? "Signing…" : "Sign & release"}
            </button>
          </div>
        </>
      }
    >
      <p className="muted" style={{ marginTop: 0, lineHeight: 1.6 }}>
        Approving releases escrow for this milestone. This action is final and recorded on-chain.
      </p>
      <div className="field" style={{ marginTop: 16 }}>
        <label className="field-label">Approval note (optional)</label>
        <textarea className="textarea" placeholder="Anything you want the provider to know?" />
      </div>
    </Modal>
  </AppShell>
);
```

**AIReviewTab inner component** (uses real `analyses` data):

```tsx
function AIReviewTab({ analyses }: { analyses: StoredAnalysisResult[] }) {
  if (analyses.length === 0) {
    return (
      <div
        className="card card-pad"
        style={{ textAlign: "center", color: "var(--ink-4)", padding: "48px 0" }}
      >
        <Ico.sparkle style={{ margin: "0 auto 12px", color: "var(--ink-5)" }} />
        <div style={{ fontWeight: 600 }}>No AI review yet</div>
        <div style={{ fontSize: 13, marginTop: 4 }}>
          Submit a delivery to trigger the grading pipeline.
        </div>
      </div>
    );
  }
  const latest = analyses[0];
  const circumference = 2 * Math.PI * 15.9;
  const dashArray = `${(latest.overallScore / 100) * circumference} ${circumference}`;

  return (
    <div className="two-col">
      <div className="stack gap-16">
        <div
          className="card card-pad"
          style={{ background: "linear-gradient(135deg, var(--brand-50), var(--surface) 60%)" }}
        >
          <div className="row-between">
            <div>
              <span className="eyebrow">Weighted verdict</span>
              <div
                className="h-display"
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginTop: 6,
                }}
              >
                {latest.overallScore}
                <span className="muted" style={{ fontSize: 24 }}>
                  {" "}
                  / 100
                </span>
              </div>
              <div
                style={{ marginTop: 8, fontSize: 14, color: "var(--brand-700)", fontWeight: 600 }}
              >
                Recommendation:{" "}
                {latest.passed > latest.failed ? "approve & release" : "review carefully"}
              </div>
            </div>
            <div style={{ width: 110, height: 110, position: "relative" }}>
              <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%" }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--line)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="var(--brand-500)"
                  strokeWidth="3"
                  strokeDasharray={`${latest.overallScore} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Requirements</div>
          </div>
          <div style={{ padding: "4px 0" }}>
            {latest.requirements.map((req, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 24px",
                  borderBottom:
                    i === latest.requirements.length - 1 ? "none" : "1px solid var(--line)",
                }}
              >
                <div className="row-between" style={{ marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--ink)" }}>{req.requirement}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <StatusPill
                      status={
                        req.status === "passed"
                          ? "completed"
                          : req.status === "partial"
                            ? "in_review"
                            : "rejected"
                      }
                    />
                  </div>
                </div>
                {req.notes && (
                  <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                    {req.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stack gap-16">
        <div className={`alert ${latest.passed > latest.failed ? "ok" : "warn"}`}>
          <Ico.check className="icon" />
          <div>
            <div className="title">
              Recommendation: {latest.passed > latest.failed ? "approve" : "hold"}
            </div>
            <div className="body">
              {latest.passed} passed · {latest.partial} partial · {latest.failed} failed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Adapt `req.requirement`, `req.status`, `req.notes` to match the actual `MilestoneAnalysisRequirementResponse` fields from `src/lib/api.ts`.

- [ ] **Step 3: Verify lint**

Run: `cd client && bun run lint "src/routes/projects.\$projectId_.milestones.\$milestoneId.tsx" 2>&1`

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add "client/src/routes/projects.\$projectId_.milestones.\$milestoneId.tsx"
git commit -m "feat: restyle milestone detail page to Justra v2 design with real AI review data"
```

---

## Task 16: Settings Route (NEW)

**Files:**

- Create: `src/routes/settings.tsx`

- [ ] **Step 1: Create settings.tsx**

```tsx
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { Ico } from "@/components/app/Icons";

const PREFS_KEY = "justra_prefs";

interface Prefs {
  theme: "light" | "dark";
  brandHue: number;
  density: "compact" | "cozy" | "comfy";
}

const DEFAULT_PREFS: Prefs = { theme: "light", brandHue: 155, density: "cozy" };

function loadPrefs(): Prefs {
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(PREFS_KEY) ?? "{}") };
  } catch {
    return DEFAULT_PREFS;
  }
}

function applyPrefs(prefs: Prefs) {
  const html = document.documentElement;
  html.setAttribute("data-theme", prefs.theme);
  html.setAttribute("data-density", prefs.density);
}

const THEMES = [
  { value: "light" as const, label: "Light", desc: "Calm warm whites with sage accents." },
  {
    value: "dark" as const,
    label: "Dark",
    desc: "Low-glare ink on charcoal — easy on the eyes after sundown.",
  },
];

const HUES = [
  { value: 155, label: "Sage" },
  { value: 195, label: "Teal" },
  { value: 230, label: "Slate blue" },
  { value: 265, label: "Plum" },
  { value: 25, label: "Terracotta" },
  { value: 45, label: "Amber" },
];

function ThemePreview({ dark }: { dark: boolean }) {
  const bg = dark ? "#1d2128" : "#fbfaf6";
  const surf = dark ? "#2a2f37" : "#ffffff";
  const line = dark ? "#3a4049" : "#ecebe3";
  const ink = dark ? "#e8eaed" : "#26292e";
  const ink2 = dark ? "#9da3ad" : "#7a8089";
  const accent = "oklch(0.55 0.09 155)";
  return (
    <div
      style={{
        borderRadius: 10,
        background: bg,
        border: `1px solid ${line}`,
        padding: 10,
        display: "grid",
        gridTemplateColumns: "40px 1fr",
        gap: 8,
        height: 110,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: surf,
          borderRadius: 6,
          padding: 6,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div style={{ width: 16, height: 16, borderRadius: 4, background: accent }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ height: 6, background: line, borderRadius: 3, width: "100%" }} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ height: 8, width: 40, background: ink, borderRadius: 3 }} />
          <div style={{ height: 8, width: 24, background: ink2, borderRadius: 3, opacity: 0.5 }} />
        </div>
        <div
          style={{
            background: surf,
            border: `1px solid ${line}`,
            borderRadius: 6,
            padding: 6,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div style={{ height: 5, width: "60%", background: ink, borderRadius: 2 }} />
          <div
            style={{ height: 4, width: "90%", background: ink2, opacity: 0.4, borderRadius: 2 }}
          />
          <div
            style={{ height: 4, width: "70%", background: ink2, opacity: 0.4, borderRadius: 2 }}
          />
          <div style={{ marginTop: "auto", display: "flex", gap: 4 }}>
            <div style={{ height: 10, width: 28, background: accent, borderRadius: 3 }} />
            <div style={{ height: 10, width: 22, background: line, borderRadius: 3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  const [activeTab, setActiveTab] = useState("appearance");

  useEffect(() => {
    applyPrefs(prefs);
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const setTweak = <K extends keyof Prefs>(key: K, val: Prefs[K]) => {
    setPrefs((p) => ({ ...p, [key]: val }));
  };

  const shortKey = (key: string) => (key ? `${key.slice(0, 4)}…${key.slice(-4)}` : "");

  return (
    <AppShell>
      <div className="page">
        <PageHead title="Settings" subtitle="Tune your workspace, security, and notifications." />

        <div className="tabs">
          {[
            { id: "appearance", label: "Appearance" },
            { id: "account", label: "Account" },
            { id: "notifications", label: "Notifications" },
            { id: "wallets", label: "Wallets", count: 2 },
            { id: "billing", label: "Billing" },
          ].map((t) => (
            <button
              key={t.id}
              className={`tab${activeTab === t.id ? " active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
              {t.count != null && <span className="count">{t.count}</span>}
            </button>
          ))}
        </div>

        {activeTab === "appearance" && (
          <>
            {/* Theme picker */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-head">
                <div>
                  <div className="card-title">Theme</div>
                  <div className="muted-2" style={{ fontSize: 13 }}>
                    Pick how Justra looks across the console.
                  </div>
                </div>
              </div>
              <div
                className="card-pad"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
              >
                {THEMES.map((opt) => {
                  const sel = prefs.theme === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setTweak("theme", opt.value)}
                      style={{
                        textAlign: "left",
                        border: `1px solid ${sel ? "var(--brand-500)" : "var(--line-2)"}`,
                        background: sel ? "var(--brand-50)" : "var(--surface)",
                        borderRadius: "var(--r-3)",
                        padding: 14,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        font: "inherit",
                        color: "inherit",
                        transition: "all 0.15s",
                        boxShadow: sel ? "0 0 0 3px var(--brand-100)" : "none",
                      }}
                    >
                      <ThemePreview dark={opt.value === "dark"} />
                      <div className="row-between">
                        <div>
                          <div style={{ fontWeight: 700, fontFamily: "var(--display)" }}>
                            {opt.label}
                          </div>
                          <div className="muted-2" style={{ fontSize: 12, marginTop: 2 }}>
                            {opt.desc}
                          </div>
                        </div>
                        <span
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            border: `2px solid ${sel ? "var(--brand-500)" : "var(--line-3)"}`,
                            background: sel ? "var(--brand-500)" : "transparent",
                            display: "grid",
                            placeItems: "center",
                            color: "#fff",
                            flexShrink: 0,
                          }}
                        >
                          {sel && <Ico.check style={{ width: 12, height: 12 }} />}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent color */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-head">
                <div>
                  <div className="card-title">Accent color</div>
                  <div className="muted-2" style={{ fontSize: 13 }}>
                    Used for primary actions, links, and progress bars.
                  </div>
                </div>
              </div>
              <div
                className="card-pad"
                style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}
              >
                {HUES.map((h) => {
                  const sel = prefs.brandHue === h.value;
                  return (
                    <button
                      key={h.value}
                      onClick={() => setTweak("brandHue", h.value)}
                      style={{
                        background: "transparent",
                        border: `1px solid ${sel ? "var(--brand-500)" : "var(--line)"}`,
                        borderRadius: 10,
                        padding: 10,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        font: "inherit",
                        color: "inherit",
                        transition: "all 0.15s",
                        boxShadow: sel ? "0 0 0 3px var(--brand-100)" : "none",
                      }}
                    >
                      <span
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: `oklch(0.55 0.09 ${h.value})`,
                          border: "2px solid var(--surface)",
                          boxShadow: "0 0 0 1px var(--line-2)",
                        }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{h.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Density */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-head">
                <div>
                  <div className="card-title">Density</div>
                  <div className="muted-2" style={{ fontSize: 13 }}>
                    Controls spacing across cards and tables.
                  </div>
                </div>
              </div>
              <div className="card-pad">
                <div
                  style={{
                    display: "inline-flex",
                    background: "var(--bg-2)",
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    padding: 4,
                  }}
                >
                  {(["compact", "cozy", "comfy"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setTweak("density", d)}
                      style={{
                        border: "none",
                        background: prefs.density === d ? "var(--surface)" : "transparent",
                        color: prefs.density === d ? "var(--ink)" : "var(--ink-3)",
                        fontWeight: 600,
                        fontSize: 13,
                        padding: "8px 18px",
                        borderRadius: 7,
                        cursor: "pointer",
                        textTransform: "capitalize",
                        boxShadow: prefs.density === d ? "var(--sh-1)" : "none",
                        transition: "all 0.15s",
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "account" && (
          <div className="card">
            <div className="card-head">
              <div>
                <div className="card-title">Connected wallet</div>
                <div className="muted-2" style={{ fontSize: 13 }}>
                  Sign-in and on-chain actions go through this address.
                </div>
              </div>
              <button className="btn btn-sm">Disconnect</button>
            </div>
            <div className="card-pad">
              <div
                className="invite-row"
                style={{ borderColor: "var(--brand-200)", background: "var(--brand-50)" }}
              >
                <div className="wallet-mark" style={{ width: 36, height: 36 }}>
                  ◎
                </div>
                <div className="meta">
                  <div className="name">Phantom · Mainnet-beta</div>
                  <div className="sub">{shortKey(user?.publicKey ?? "")}</div>
                </div>
                <span className="pill pill-ok">
                  <span className="dot" />
                  Primary
                </span>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "notifications" || activeTab === "wallets" || activeTab === "billing") && (
          <div
            className="card card-pad"
            style={{ textAlign: "center", color: "var(--ink-4)", padding: "48px 0" }}
          >
            <div style={{ fontWeight: 600 }}>Coming soon</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>This section is not yet available.</div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
```

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint src/routes/settings.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/routes/settings.tsx
git commit -m "feat: add Settings page with theme/accent/density pickers"
```

---

## Task 17: Invites Route

**Files:**

- Modify: `src/routes/projects.$projectId_.invites.tsx`

Read the current file. Keep all `inviteApi` calls. Replace JSX with AppShell + new design classes.

- [ ] **Step 1: Replace invites JSX**

Structure:

```tsx
// Add imports:
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { Ico } from "@/components/app/Icons";
import { Modal } from "@/components/app/Modal";

// Consumer view (invite form):
return (
  <AppShell>
    <div className="page">
      <div className="crumb">
        <a onClick={() => navigate(`/projects/${projectId}`)}>Project</a>
        <span className="sep">/</span>
        <span className="now">Invites</span>
      </div>
      <PageHead
        title="Manage access"
        subtitle="Invite a developer to this project by their Solana address."
      />

      <div className="card" style={{ maxWidth: 560 }}>
        <div className="card-head">
          <div className="card-title">Send invite</div>
        </div>
        <div className="card-pad">
          <div className="field">
            <label className="field-label">Provider wallet address</label>
            <input
              className="input"
              placeholder="Solana public key…"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <span className="field-hint">
              The developer must connect this wallet to accept your invite.
            </span>
          </div>
          <button
            className="btn btn-primary"
            style={{ marginTop: 14 }}
            onClick={handleInvite}
            disabled={loading}
          >
            {loading ? "Sending…" : "Send invite"}
          </button>
        </div>
      </div>

      {invites.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2 className="h-display h3" style={{ marginBottom: 14 }}>
            Pending invites
          </h2>
          <div className="invite-list">
            {invites.map((inv) => (
              <div key={inv.id} className="invite-row">
                <div className="wallet-mark" style={{ width: 36, height: 36 }}>
                  ◎
                </div>
                <div className="meta">
                  <div className="name">Invite sent</div>
                  <div className="sub">{inv.providerPublicKey}</div>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => handleCancel(inv.id)}>
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </AppShell>
);
```

Adapt `inv.providerPublicKey` to the actual property name from the invite type in `src/lib/api.ts`.

- [ ] **Step 2: Verify lint**

Run: `cd client && bun run lint "src/routes/projects.\$projectId_.invites.tsx" 2>&1`

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add "client/src/routes/projects.\$projectId_.invites.tsx"
git commit -m "feat: restyle invites page to Justra v2 design"
```

---

## Task 18: GitHub Routes

**Files:**

- Modify: `src/routes/github.tsx`
- Modify: `src/routes/github-callback.tsx`

**CRITICAL:** `src/routes/github.tsx` exports `buildGithubAppInstallUrl()` which is imported by `src/routes/dashboard.tsx`. This export MUST be preserved.

- [ ] **Step 1: Read both files**

Run: `cat -n client/src/routes/github.tsx && cat -n client/src/routes/github-callback.tsx`

- [ ] **Step 2: Restyle github.tsx**

Keep `buildGithubAppInstallUrl` export and all OAuth logic. Replace JSX with centered auth card pattern:

```tsx
// Keep existing logic and exports, wrap render in:
return (
  <div className="public-shell">
    <nav className="public-nav">
      <div className="row gap-12">
        <div className="sb-brand-mark">J</div>
        <div className="h-display" style={{ fontSize: 18 }}>
          Justra
        </div>
      </div>
    </nav>
    <div className="center-shell">
      <div className="auth-card">
        <span className="auth-step">
          <Ico.github /> Connect GitHub
        </span>
        <h2>Link your GitHub account</h2>
        <p className="sub">
          Justra needs access to your repositories to analyze code deliveries against milestone
          specs.
        </p>
        <button className="wallet-btn" onClick={handleConnect}>
          <span className="wallet-mark" style={{ background: "#24292e" }}>
            <Ico.github />
          </span>
          <span className="stack" style={{ alignItems: "flex-start" }}>
            <span>Connect with GitHub</span>
            <span className="muted-2" style={{ fontSize: 12, fontWeight: 500 }}>
              Authorize the Justra GitHub App
            </span>
          </span>
          <Ico.arrowR className="arrow" />
        </button>
        <p className="fineprint">
          We request read access to repositories you select. You can revoke this any time from
          GitHub settings.
        </p>
      </div>
    </div>
  </div>
);
```

- [ ] **Step 3: Restyle github-callback.tsx**

Keep all `connectGithub()` and `githubApi.saveInstallation()` calls. Replace JSX:

```tsx
return (
  <div className="public-shell">
    <div className="center-shell">
      <div className="auth-card" style={{ textAlign: "center" }}>
        {loading ? (
          <>
            <span className="auth-step">Connecting…</span>
            <h2>Linking your GitHub account</h2>
            <p className="sub">Just a moment while we finalize the connection.</p>
          </>
        ) : error ? (
          <>
            <span
              className="auth-step"
              style={{ background: "var(--danger-bg)", color: "var(--danger-ink)" }}
            >
              Error
            </span>
            <h2>Connection failed</h2>
            <p className="sub">{error}</p>
            <button className="btn" onClick={() => navigate("/github")}>
              Try again
            </button>
          </>
        ) : (
          <>
            <span className="auth-step">
              <Ico.check /> Connected
            </span>
            <h2>GitHub linked successfully</h2>
            <p className="sub">
              Your repositories are now accessible to Justra for delivery analysis.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
              Go to dashboard
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);
```

- [ ] **Step 4: Verify lint**

Run: `cd client && bun run lint src/routes/github.tsx src/routes/github-callback.tsx 2>&1`

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add client/src/routes/github.tsx client/src/routes/github-callback.tsx
git commit -m "feat: restyle GitHub pages to Justra v2 design"
```

---

## Task 19: App.tsx Wiring + Cleanup

**Files:**

- Modify: `src/App.tsx`
- Delete: `src/components/app/Navbar.tsx`
- Delete: `src/components/app/SuccessModal.tsx`
- Delete: `src/components/git-escrow.css`

- [ ] **Step 1: Add /projects and /settings routes to App.tsx**

```tsx
import { Buffer } from "buffer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { AppDataProvider } from "@/lib/app-data";
import IndexPage from "@/routes/index";
import AuthPage from "@/routes/auth";
import RolePage from "@/routes/role";
import DashboardPage from "@/routes/dashboard";
import GithubPage from "@/routes/github";
import GithubCallbackPage from "@/routes/github-callback";
import ProjectsPage from "@/routes/projects";
import ProjectDetailPage from "@/routes/projects.$projectId";
import ProjectInvitesPage from "@/routes/projects.$projectId_.invites";
import MilestoneDetailPage from "@/routes/projects.$projectId_.milestones.$milestoneId";
import SettingsPage from "@/routes/settings";

if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

export default function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/role" element={<RolePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/github" element={<GithubPage />} />
            <Route path="/github-callback" element={<GithubCallbackPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/projects/:projectId/invites" element={<ProjectInvitesPage />} />
            <Route
              path="/projects/:projectId/milestones/:milestoneId"
              element={<MilestoneDetailPage />}
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppDataProvider>
    </AuthProvider>
  );
}
```

- [ ] **Step 2: Verify no file imports Navbar or SuccessModal**

Run: `grep -r "Navbar\|SuccessModal\|git-escrow.css" client/src --include="*.tsx" --include="*.ts" --include="*.css" -l`

Expected: empty (no matches). If any files still import them, fix those imports first.

- [ ] **Step 3: Delete deprecated files**

```bash
rm client/src/components/app/Navbar.tsx
rm client/src/components/app/SuccessModal.tsx
rm client/src/components/git-escrow.css
```

- [ ] **Step 4: Final lint check**

Run: `cd client && bun run lint 2>&1 | tail -20`

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add client/src/App.tsx
git rm client/src/components/app/Navbar.tsx client/src/components/app/SuccessModal.tsx client/src/components/git-escrow.css
git commit -m "feat: wire /projects and /settings routes, remove deprecated components"
```

---

## Self-Review Checklist

- [x] All spec sections covered: Foundation (Task 1), Shared components (Tasks 2-8), Route redesigns (Tasks 9-18), App wiring + cleanup (Task 19)
- [x] `buildGithubAppInstallUrl` export in github.tsx explicitly flagged as critical to preserve
- [x] `tag` prop removal from Modal flagged in Tasks 4, 12, 14
- [x] New routes `/projects` and `/settings` registered in App.tsx (Task 19)
- [x] AI Review tab uses real `analysisApi` data via `StoredAnalysisResult` (Task 15)
- [x] `STATUS_MAP` exported from StatusPill.tsx for use in route files (Task 3)
- [x] Settings prefs persisted in `localStorage` under `justra_prefs` (Task 16)
- [x] Dark mode applies `data-theme` on `<html>` element (Task 16)
- [x] No `SuccessModal` or `Navbar` imports remain after Task 19
- [x] Static data items explicitly called out (escrow amounts, dashboard stats, activity timeline, trust stats)
