# Justra Client v2 Redesign

**Date:** 2026-05-08  
**Scope:** Complete visual redesign of the React client. All existing functionality is preserved; only presentation (JSX, CSS) is replaced.  
**Source:** `client/v2-design-files/` — JSX prototypes + `styles.css` design system

---

## Decision Log

| Decision        | Choice                  | Rationale                                                    |
| --------------- | ----------------------- | ------------------------------------------------------------ |
| CSS approach    | Token-first Tailwind v4 | Idiomatic Tailwind v4; named utilities over arbitrary values |
| Brand name      | Justra                  | Match design files                                           |
| Settings screen | Include                 | Theme/accent/density persisted in localStorage               |

---

## 1. Foundation

### 1.1 Fonts

Add to `index.html` via Google Fonts link tag:

- **Plus Jakarta Sans** (weights 400, 500, 600, 700, 800) — display + body
- **JetBrains Mono** (weight 400) — monospace

### 1.2 Design Tokens (`src/styles.css`)

Replace existing `src/styles.css` content with:

**Tailwind v4 `@theme` block** defining named utilities for:

- Brand scale: `brand-50` through `brand-900` (sage green, oklch hue 155)
- Neutral surfaces: `bg`, `bg-2`, `surface`, `surface-2`, `line`, `line-2`, `line-3`
- Ink scale: `ink`, `ink-2`, `ink-3`, `ink-4`, `ink-5`
- Status: `warn`, `warn-bg`, `warn-ink`, `danger`, `danger-bg`, `danger-ink`, `info`, `info-bg`, `info-ink`, `ok`, `ok-bg`, `ok-ink`
- Shadows: `sh-1` through `sh-4`, `sh-pop`
- Radius: `r-1` (6px) through `r-4` (20px)
- Font families: `display`, `body`, `mono`

**Dark mode:** `[data-theme="dark"]` selector overrides all token values. Applied to `<html>` element by the theme picker.

**Keyframes:**

- `ping` — for `.dot-pulse` animation on status pills
- `fadein` — for modal backdrop entry
- `pop` — for modal container entry

**Global base:** box-sizing reset, font-smoothing, base body styles.

**Small utility classes that can't be expressed cleanly in Tailwind:**

- `.dot-pulse::after` (the animated ring around status dots)
- `.hero-card::before` (gradient pseudo-element)
- `.mono` (font-family shorthand)

---

## 2. Shared Components

All in `src/components/app/`. Existing files (Modal, Navbar) are replaced.

### 2.1 `Icons.tsx`

Centralized SVG icon set. Exports a single `Ico` object with function components for: home, folder, inbox, wallet, settings, search, bell, plus, arrowR, check, x, shield, lock, sparkle, github, user, briefcase, clock, upload, trend.

Each icon is a function component that accepts SVG props (className, style, etc.).

### 2.2 `StatusPill.tsx`

Maps milestone/project status strings to colored pill badges. Handles: `pending_provider`, `awaiting_deposit`, `active`, `in_review`, `completed`, `rejected`, `disputed`, `draft`. Uses the `pill`, `pill-ok`, `pill-warn`, `pill-danger`, `pill-info` Tailwind utilities. Dot has pulse animation for live statuses.

Also exports `STATUS_MAP` for row-level coloring in milestone lists.

### 2.3 `Sidebar.tsx`

Props: `active: string`, `onNav: (id: string) => void`, `role: 'consumer' | 'provider'`, `user: { name, short, initial }`, `badges?: { invites?: number }`

- Consumer nav: Dashboard, Projects, Milestones (links to projects list), Escrow
- Provider nav: My Work, Projects, Invites (with badge), Earnings (static)
- Bottom: Settings link, user card (avatar initial, name, shortened wallet address)
- 240px fixed width, sticky, full viewport height

### 2.4 `Topbar.tsx`

Props: `onCreate?: () => void`

- Search input (visual only — no search functionality implemented)
- ⌘K keyboard shorthand display
- Notification bell with dot (static)
- "New project" button (consumer only, calls onCreate)

### 2.5 `AppShell.tsx`

Wraps authenticated pages. Renders `<Sidebar>` + `<main>` with `<Topbar>` inside.

Reads active route from TanStack Router location to highlight correct sidebar item. Reads role from `useAuth()`.

### 2.6 `Modal.tsx` (replace existing)

Props: `open`, `onClose`, `title`, `children`, `footer`, `width?`

- Backdrop with `backdrop-blur-sm`, animated entry (fadein/pop)
- Click outside to close
- Standard head / body / foot sections

### 2.7 `PageHead.tsx`

Props: `title`, `subtitle?`, `actions?`

Row-between layout: title+subtitle stack on left, actions slot on right.

---

## 3. Route Redesigns

All routes keep existing logic (API calls, auth guards, state management). Only JSX is replaced.

### 3.1 `src/routes/index.tsx` — Landing Page

Matches `LandingScreen` design:

- Public nav: Justra brand + links + Sign in / Get started CTA
- Hero section: two-column grid (text left, hero card right)
  - Hero card shows static "live milestone" demo (Atlas Settlement Engine example)
  - Trust stats row: $4.2M locked, 1,840 projects, 97% release rate (static)
- Feature band: 3-column grid (Define milestones, Lock funds, AI-graded delivery)
- All CTAs navigate to `/auth`

### 3.2 `src/routes/auth.tsx` — Auth Screen

Matches `AuthScreen` design:

- Public nav (minimal, back to landing)
- Centered card with Phantom + Solflare wallet buttons
- Phantom button triggers existing `connectPhantom()` flow
- Solflare button is static (visual only — not wired up)
- Step indicator: "Step 1 of 2 · Connect"

### 3.3 `src/routes/role.tsx` — Role Select

Matches `RoleScreen` design:

- Two role cards side by side (full width)
- Consumer card: "I'm hiring developers" with 3 bullet points
- Provider card: "I'm shipping code" with 3 bullet points
- Click calls existing `setRole()` and navigates to `/dashboard`
- Connected wallet pill shown in nav

### 3.4 `src/routes/dashboard.tsx` — Dashboard

Matches `DashboardScreen` design, role-aware:

**Consumer:**

- Stat grid (4 stats): Active projects, Locked in escrow (static ◎ value), Pending review, Completed this Q (all static numbers except project count)
- "Needs your attention" card: milestones in `in_review` or `awaiting_deposit` status (from real data)
- Active projects grid: first 3 projects from API with "View all" link to `/projects`
- "New project" button opens `CreateProjectModal`

**Provider:**

- Stat grid (4 stats): Active milestones, In review, Earned this month, Lifetime earnings (all static)
- Active engagements grid: projects from API
- Pending invites list with Accept button

`CreateProjectModal` kept from existing code but restyled to match 2-step design (step 1: name + description + repo; step 2: spec upload — static UI, no actual upload).

### 3.5 `src/routes/projects.tsx` — Projects List (NEW)

Matches `ProjectsScreen` design:

- Page header with "Projects" title + "New project" button
- Tab bar: All / Active / Action needed / Completed
- Table view: Project name, Status pill, Developer (from invite/member data), Milestones progress bar, Escrow (static 0), arrow
- Each row navigates to `/projects/:id`
- Uses real data from `projectsOwnedBy()` / `projectsForProvider()`

This route must be registered in the TanStack Router file tree (new file at `src/routes/projects.tsx`).

### 3.6 `src/routes/projects.$projectId.tsx` — Project Detail

Matches `ProjectScreen` design:

- Breadcrumb: Projects / {project name}
- Detail head: project ID + status pill, title, meta (developer, started date, target date)
- Action buttons: View repo (GitHub link), Edit scope (static), Add milestone
- Hero band: total escrow (static 0), released / locked / progress stats
- Two-column: milestone list (from API) + sidebar (team, repository, escrow info alert)
- Milestone rows: status pill, amount, click navigates to milestone detail
- Team sidebar: shows consumer (from auth) + provider (from project member data, if any)
- Repository sidebar: shows GitHub repo link if connected

Replaces existing detail page, keeping all existing state/API logic.

### 3.7 `src/routes/projects.$projectId_.milestones.$milestoneId.tsx` — Milestone Detail

Matches `MilestoneScreen` design:

- Breadcrumb: Projects / {project} / {milestone ID}
- Detail head: milestone ID + status, title, meta (due date, progress, branch — static)
- Role-aware action buttons:
  - Consumer: Reject delivery + Approve & release (triggers on-chain tx via existing logic)
  - Provider: Submit delivery (triggers existing analysis flow)
- Hero band: locked escrow amount (static), delivery progress
- Alert banner when AI verdict available (from existing analysis data)
- Tabs: Overview / AI Review / Activity / Escrow

**Overview tab:** Scope card (milestone description + acceptance criteria — static placeholder text for criteria), Latest delivery card (shows GitHub PR link if available, commit info static)

**AI Review tab:** Matches `AIReviewTab` design — weighted verdict card with donut chart, judge breakdown list. Uses real analysis data (`analysisApi`). Falls back to a "No review yet" placeholder if no analysis exists.

**Activity tab:** Static timeline (hardcoded events matching the design aesthetic).

**Escrow tab:** Static table showing deposit/lock/delivery/pending-release events.

**Approve modal:** Confirmation modal with release amount + optional note field. Triggers `releaseFunds()` on-chain.

### 3.8 `src/routes/projects.$projectId_.invites.tsx` — Invites

Restyled to match the new design system. Consumer view: form to invite provider by Solana address. Provider view: not applicable (providers accept from dashboard). Uses existing `inviteApi` logic.

### 3.9 `src/routes/github.tsx` + `src/routes/github-callback.tsx`

Apply new design styles (centered auth card pattern). Keep all OAuth logic intact.

---

## 4. Settings Screen

### 4.1 `src/routes/settings.tsx` (NEW)

Matches `SettingsScreen` design. State persisted in `localStorage` under key `justra_prefs`.

**Appearance tab (default active):**

- Theme picker: Light / Dark. Clicking applies `data-theme` attribute on `<html>`.
- Accent color: 6 swatches (Sage 155, Teal 195, Slate blue 230, Plum 265, Terracotta 25, Amber 45). Clicking sets `--brand-*` custom property series via inline style on `<html>` (overrides `@theme` defaults).
- Density: Compact / Cozy / Comfy. Applies `data-density` on `<html>`.

**Account tab (static):** Connected wallet display, disconnect button (static — no action).

**Other tabs:** Notifications, Wallets, Billing shown as inactive tabs with coming-soon placeholder content.

This route must be registered in TanStack Router.

---

## 5. Static vs Real Data

| Data                                              | Source                                       |
| ------------------------------------------------- | -------------------------------------------- |
| Project list, names, descriptions                 | Real API                                     |
| Milestone list, status, descriptions              | Real API                                     |
| Invite list, accept/reject                        | Real API                                     |
| Analysis/AI review scores                         | Real API (`analysisApi`)                     |
| GitHub repo link                                  | Real API (project member/invite data)        |
| Escrow SOL amounts                                | Static (0 or placeholder — not in API)       |
| Dashboard stats (earned, locked, etc.)            | Static placeholder numbers                   |
| Activity timeline events                          | Static                                       |
| Team member display names                         | Wallet address shortened (real), name static |
| Trust stats on landing (4.2M, 1840 projects, 97%) | Static                                       |

---

## 6. What Is Not Changing

- All API functions in `src/lib/api.ts`
- Auth flow in `src/lib/auth.tsx`
- Solana/on-chain logic in `src/lib/solana.ts`
- App data context in `src/lib/app-data.tsx`
- All shadcn/ui components in `src/components/ui/` (no longer imported directly, but kept)
- `src/lib/idls/git_escrow.json`

---

## 7. File Additions / Deletions

**New files:**

- `src/routes/projects.tsx`
- `src/routes/settings.tsx`
- `src/components/app/Icons.tsx`
- `src/components/app/StatusPill.tsx`
- `src/components/app/Sidebar.tsx`
- `src/components/app/Topbar.tsx`
- `src/components/app/AppShell.tsx`
- `src/components/app/PageHead.tsx`

**Replaced files (logic preserved):**

- `src/styles.css` — full replacement with design tokens + @theme
- `src/components/app/Modal.tsx` — restyled
- `src/components/app/Navbar.tsx` — replaced by Sidebar + Topbar (file deleted after migration)
- All `src/routes/*.tsx` — JSX replaced, logic kept

**Deleted files:**

- `src/components/git-escrow.css` — removed once all routes are migrated
- `src/components/app/Navbar.tsx` — superseded by Sidebar + Topbar
- `src/components/app/SuccessModal.tsx` — merged into restyled Modal
