/* Dashboard, Projects list, Project detail, Milestone detail, Create project */

/* ---------- Sample data ---------- */
const PROJECTS = [
  {
    id: "PRJ-1842",
    title: "Atlas Settlement Engine",
    desc: "Solana program that nets multilateral B2B invoices into a single daily clearing batch.",
    role: "consumer",
    provider: { name: "Maya Soto", initial: "M", short: "7Hk2…q4Bn" },
    milestones: 6,
    done: 2,
    escrow: 21.4,
    next: "M-03 · Auth & user provisioning",
    status: "active",
  },
  {
    id: "PRJ-1798",
    title: "Helios Indexer",
    desc: "Custom block indexer with webhook delivery and cursor-based replay for missed events.",
    role: "consumer",
    provider: { name: "Diego Park", initial: "D", short: "4Yp9…wZ12" },
    milestones: 4,
    done: 4,
    escrow: 0,
    next: "Project complete",
    status: "completed",
  },
  {
    id: "PRJ-1815",
    title: "Lumen Mobile Wallet",
    desc: "React Native wrapper around the Justra escrow program with biometric session keys.",
    role: "consumer",
    provider: { name: "Ren Tanaka", initial: "R", short: "9Tq3…kL47" },
    milestones: 5,
    done: 0,
    escrow: 14.0,
    next: "M-01 · Awaiting deposit",
    status: "awaiting_deposit",
  },
  {
    id: "PRJ-1821",
    title: "Notary CLI",
    desc: "Headless tool that signs build artefacts and pins the manifest for milestone delivery.",
    role: "consumer",
    provider: null,
    milestones: 3,
    done: 0,
    escrow: 0,
    next: "Awaiting provider",
    status: "pending_provider",
  },
];

const MILESTONES = [
  {
    id: "M-01",
    title: "Repo scaffold & CI",
    desc: "TypeScript monorepo with build, test, and release pipelines wired to GitHub Actions.",
    amount: 2.0,
    due: "May 12",
    status: "completed",
    progress: 100,
  },
  {
    id: "M-02",
    title: "Solana program · core",
    desc: "Anchor program with deposit, lock, and release instructions plus full unit tests.",
    amount: 4.5,
    due: "May 22",
    status: "completed",
    progress: 100,
  },
  {
    id: "M-03",
    title: "Auth & user provisioning",
    desc: "Wallet-scoped sessions, role bootstrapping, and the consumer/provider dashboards.",
    amount: 8.4,
    due: "Jun 03",
    status: "active",
    progress: 65,
  },
  {
    id: "M-04",
    title: "AI grading harness",
    desc: "Five LLM judges, weighted scoring, and a verdict that releases or holds escrow.",
    amount: 3.5,
    due: "Jun 14",
    status: "in_review",
    progress: 100,
  },
  {
    id: "M-05",
    title: "Disputes & arbitration",
    desc: "Cooling-off window, evidence packets, and a 2-of-3 arbitrator multisig path.",
    amount: 2.0,
    due: "Jun 24",
    status: "awaiting_deposit",
    progress: 0,
  },
  {
    id: "M-06",
    title: "Mainnet launch + audits",
    desc: "Trail of Bits + Halborn audit, public docs site, and the marketing landing page.",
    amount: 1.0,
    due: "Jul 02",
    status: "draft",
    progress: 0,
  },
];

/* ---------- Section header ---------- */
function PageHead({ title, subtitle, actions }) {
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

/* ---------- Dashboard ---------- */
function DashboardScreen({ go, role, openCreate }) {
  const stats =
    role === "provider"
      ? [
          { label: "Active milestones", value: "4", delta: "+1 this week" },
          { label: "In review", value: "2", delta: "Avg 1.4d to verdict" },
          { label: "Earned this month", value: "◎ 18.2", delta: "≈ $3,003 USD", good: true },
          { label: "Lifetime earnings", value: "◎ 142", delta: "38 milestones", good: true },
        ]
      : [
          { label: "Active projects", value: "3", delta: "+1 this month" },
          { label: "Locked in escrow", value: "◎ 35.4", delta: "≈ $5,841 USD" },
          { label: "Pending review", value: "2", delta: "Action required", warn: true },
          { label: "Completed this Q", value: "7", delta: "$11,420 released", good: true },
        ];

  return (
    <div className="page">
      <PageHead
        title={role === "provider" ? "My work" : "Welcome back, Ada"}
        subtitle={
          role === "provider"
            ? "Milestones assigned to you, plus invites awaiting acceptance."
            : "A snapshot of every project, milestone, and dollar in escrow."
        }
        actions={
          role === "consumer" ? (
            <React.Fragment>
              <button className="btn">Import spec</button>
              <button className="btn btn-primary" onClick={openCreate}>
                <Ico.plus /> New project
              </button>
            </React.Fragment>
          ) : (
            <button className="btn btn-primary">
              <Ico.upload /> Submit delivery
            </button>
          )
        }
      />

      <div className="stat-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={"stat-delta " + (s.warn ? "down" : "")}>
              {!s.warn && <Ico.trend />}
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      {role === "consumer" && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="card-head">
            <div>
              <div className="card-title">Needs your attention</div>
              <div className="muted-2" style={{ fontSize: 13 }}>
                2 milestones are waiting on you.
              </div>
            </div>
            <button className="btn btn-sm">Mark all reviewed</button>
          </div>
          <div className="ms-list" style={{ border: "none", borderRadius: 0 }}>
            <button className="ms-row info" onClick={() => go("milestone")}>
              <div className="ms-num">03</div>
              <div>
                <div className="ms-title">M-03 · Auth & user provisioning</div>
                <div className="ms-sub">
                  Ready for review · AI verdict 92/100 · Atlas Settlement Engine
                </div>
                <div className="ms-meta">
                  <StatusPill status="in_review" />
                  <span className="pill">
                    <Ico.clock />2 days ago
                  </span>
                </div>
              </div>
              <div>
                <div className="ms-amount">◎ 8.4</div>
                <div className="ms-amount-sub">$1,386 locked</div>
              </div>
              <Ico.arrowR className="ms-arrow" />
            </button>
            <button className="ms-row warn" onClick={() => go("project")}>
              <div className="ms-num">01</div>
              <div>
                <div className="ms-title">M-01 · Repo scaffold & CI</div>
                <div className="ms-sub">
                  Awaiting your deposit before Ren can begin · Lumen Mobile Wallet
                </div>
                <div className="ms-meta">
                  <StatusPill status="awaiting_deposit" />
                </div>
              </div>
              <div>
                <div className="ms-amount">◎ 3.0</div>
                <div className="ms-amount-sub">$495 to deposit</div>
              </div>
              <Ico.arrowR className="ms-arrow" />
            </button>
          </div>
        </div>
      )}

      <div className="row-between" style={{ marginBottom: 14 }}>
        <h2 className="h-display h3" style={{ margin: 0 }}>
          {role === "provider" ? "Active engagements" : "Active projects"}
        </h2>
        <button className="btn btn-ghost btn-sm" onClick={() => go("projects")}>
          View all <Ico.arrowR />
        </button>
      </div>
      <div className="proj-grid">
        {PROJECTS.slice(0, 3).map((p) => (
          <ProjCard key={p.id} p={p} go={go} />
        ))}
      </div>
    </div>
  );
}

function ProjCard({ p, go }) {
  const pct = p.milestones ? Math.round((p.done / p.milestones) * 100) : 0;
  return (
    <button className="proj-card" onClick={() => go("project")}>
      <div className="proj-card-head">
        <div>
          <div className="proj-card-id">{p.id}</div>
          <div className="proj-card-title">{p.title}</div>
        </div>
        <StatusPill status={p.status} />
      </div>
      <div className="proj-card-desc">{p.desc}</div>

      <div className="proj-progress">
        <div className="label">
          <span>
            {p.done} of {p.milestones} milestones
          </span>
          <span>{pct}%</span>
        </div>
        <div className="progress">
          <i style={{ width: pct + "%" }} />
        </div>
      </div>

      <div className="proj-card-foot">
        <div className="row gap-8">
          {p.provider ? (
            <React.Fragment>
              <div className="av av-sm">{p.provider.initial}</div>
              <span>{p.provider.name}</span>
            </React.Fragment>
          ) : (
            <span className="muted-2">No developer assigned</span>
          )}
        </div>
        <div className="row gap-4">
          <span className="muted-2">Escrow</span>
          <b style={{ color: "var(--ink)" }}>◎ {p.escrow.toFixed(1)}</b>
        </div>
      </div>
    </button>
  );
}

/* ---------- Projects list ---------- */
function ProjectsScreen({ go, openCreate }) {
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? PROJECTS : PROJECTS.filter((p) => p.status === tab);
  return (
    <div className="page">
      <PageHead
        title="Projects"
        subtitle="Every engagement, past and present."
        actions={
          <React.Fragment>
            <button className="btn">Filters</button>
            <button className="btn btn-primary" onClick={openCreate}>
              <Ico.plus /> New project
            </button>
          </React.Fragment>
        }
      />

      <div className="tabs">
        {[
          { id: "all", label: "All", n: PROJECTS.length },
          {
            id: "active",
            label: "Active",
            n: PROJECTS.filter((p) => p.status === "active").length,
          },
          {
            id: "awaiting_deposit",
            label: "Action needed",
            n: PROJECTS.filter(
              (p) => p.status === "awaiting_deposit" || p.status === "pending_provider",
            ).length,
          },
          {
            id: "completed",
            label: "Completed",
            n: PROJECTS.filter((p) => p.status === "completed").length,
          },
        ].map((t) => (
          <button
            key={t.id}
            className={"tab " + (tab === t.id ? "active" : "")}
            onClick={() => setTab(t.id)}
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
            {filtered.map((p) => (
              <tr key={p.id} className="clickable" onClick={() => go("project")}>
                <td>
                  <div style={{ fontWeight: 600, color: "var(--ink)" }}>{p.title}</div>
                  <div className="muted-2 mono" style={{ fontSize: 12, marginTop: 2 }}>
                    {p.id}
                  </div>
                </td>
                <td>
                  <StatusPill status={p.status} />
                </td>
                <td>
                  {p.provider ? (
                    <div className="row gap-8">
                      <div className="av av-sm">{p.provider.initial}</div>
                      <span>{p.provider.name}</span>
                    </div>
                  ) : (
                    <span className="muted-2">— Unassigned</span>
                  )}
                </td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 140 }}>
                    <span style={{ fontSize: 12 }}>
                      {p.done}/{p.milestones}
                    </span>
                    <div className="progress" style={{ height: 4 }}>
                      <i style={{ width: (p.done / p.milestones) * 100 + "%" }} />
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: "right", fontWeight: 600, color: "var(--ink)" }}>
                  ◎ {p.escrow.toFixed(1)}
                </td>
                <td>
                  <Ico.arrowR className="muted-2" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Project detail ---------- */
function ProjectScreen({ go, role }) {
  const project = PROJECTS[0];
  const total = MILESTONES.reduce((a, b) => a + b.amount, 0);
  const released = MILESTONES.filter((m) => m.status === "completed").reduce(
    (a, b) => a + b.amount,
    0,
  );
  const locked = MILESTONES.filter((m) => m.status === "active" || m.status === "in_review").reduce(
    (a, b) => a + b.amount,
    0,
  );
  const pct = (MILESTONES.filter((m) => m.status === "completed").length / MILESTONES.length) * 100;

  return (
    <div className="page">
      <div className="crumb">
        <a onClick={() => go("projects")}>Projects</a>
        <span className="sep">/</span>
        <span className="now">{project.title}</span>
      </div>

      <div className="detail-head">
        <div>
          <div className="row gap-12" style={{ marginBottom: 8 }}>
            <span className="muted-2 mono" style={{ fontSize: 13 }}>
              {project.id}
            </span>
            <StatusPill status="active" />
          </div>
          <h1>{project.title}</h1>
          <div className="meta">
            <span>
              <b>Developer · </b>
              {project.provider.name} · <span className="mono">{project.provider.short}</span>
            </span>
            <span>
              <b>Started · </b>Apr 14, 2026
            </span>
            <span>
              <b>Target · </b>Jul 02, 2026
            </span>
          </div>
        </div>
        <div className="row gap-8">
          <button className="btn">
            <Ico.github /> View repo
          </button>
          <button className="btn">Edit scope</button>
          <button className="btn btn-primary">Add milestone</button>
        </div>
      </div>

      <div className="hero-band">
        <div className="hero-band-amount">
          <div className="lbl">Project escrow</div>
          <div className="val">◎ {total.toFixed(1)}</div>
          <div className="sub">
            ≈ ${(total * 165).toLocaleString()} USD across {MILESTONES.length} milestones
          </div>
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
              ◎ {released.toFixed(1)}
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
              ◎ {locked.toFixed(1)}
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
              {Math.round(pct)}%
            </div>
            <div className="progress" style={{ marginTop: 6 }}>
              <i style={{ width: pct + "%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="two-col">
        <div>
          <div className="row-between" style={{ marginBottom: 12 }}>
            <h2 className="h-display h3" style={{ margin: 0 }}>
              Milestones
            </h2>
            <div className="muted-2" style={{ fontSize: 13 }}>
              Click any milestone to view details, deliveries, and escrow events.
            </div>
          </div>
          <div className="ms-list">
            {MILESTONES.map((m, i) => {
              const meta = STATUS_MAP[m.status] || STATUS_MAP.draft;
              return (
                <button key={m.id} className={"ms-row " + meta.row} onClick={() => go("milestone")}>
                  <div className="ms-num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="ms-title">
                      {m.id} · {m.title}
                    </div>
                    <div className="ms-sub">{m.desc}</div>
                    <div className="ms-meta">
                      <StatusPill status={m.status} />
                      <span className="pill">
                        <Ico.clock />
                        Due {m.due}
                      </span>
                      {m.progress > 0 && m.progress < 100 && (
                        <span className="pill">{m.progress}% delivered</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="ms-amount">◎ {m.amount.toFixed(1)}</div>
                    <div className="ms-amount-sub">${(m.amount * 165).toFixed(0)}</div>
                  </div>
                  <Ico.arrowR className="ms-arrow" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="stack gap-16">
          <div className="card card-pad">
            <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 12px" }}>
              Team
            </h3>
            <div className="stack gap-12">
              <div className="row gap-12">
                <div className="av av-lg">A</div>
                <div>
                  <div style={{ fontWeight: 600 }}>Ada Lovelace</div>
                  <div className="muted-2" style={{ fontSize: 12 }}>
                    Client · You
                  </div>
                </div>
              </div>
              <div className="row gap-12">
                <div
                  className="av av-lg"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#b45309)" }}
                >
                  M
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Maya Soto</div>
                  <div className="muted-2 mono" style={{ fontSize: 12 }}>
                    {project.provider.short}
                  </div>
                </div>
              </div>
            </div>
            <div className="divider" />
            <button className="btn btn-sm" style={{ width: "100%", justifyContent: "center" }}>
              Message developer
            </button>
          </div>

          <div className="card card-pad">
            <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 12px" }}>
              Repository
            </h3>
            <div className="row gap-8" style={{ marginBottom: 10 }}>
              <Ico.github />
              <span className="mono" style={{ fontSize: 13 }}>
                justra-labs/atlas-engine
              </span>
            </div>
            <div className="muted-2" style={{ fontSize: 12, marginBottom: 12 }}>
              Auto-synced. Last commit 4 hours ago on <span className="mono">main</span>.
            </div>
            <button className="btn btn-sm" style={{ width: "100%", justifyContent: "center" }}>
              Open on GitHub
            </button>
          </div>

          <div className="alert tip">
            <Ico.shield className="icon" />
            <div>
              <div className="title">Escrow is on-chain</div>
              <div className="body">
                Each milestone holds funds in its own program-derived address. Released SOL settles
                to Maya's wallet within ~2s of approval.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Milestone detail ---------- */
function MilestoneScreen({ go, role }) {
  const m = MILESTONES[2]; // Active milestone
  const [tab, setTab] = useState("overview");
  const [showApprove, setShowApprove] = useState(false);

  return (
    <div className="page">
      <div className="crumb">
        <a onClick={() => go("projects")}>Projects</a>
        <span className="sep">/</span>
        <a onClick={() => go("project")}>Atlas Settlement Engine</a>
        <span className="sep">/</span>
        <span className="now">{m.id}</span>
      </div>

      <div className="detail-head">
        <div>
          <div className="row gap-12" style={{ marginBottom: 8 }}>
            <span className="muted-2 mono" style={{ fontSize: 13 }}>
              {m.id}
            </span>
            <StatusPill status={m.status} />
          </div>
          <h1>{m.title}</h1>
          <div className="meta">
            <span>
              <b>Due · </b>
              {m.due}, 2026
            </span>
            <span>
              <b>Progress · </b>
              {m.progress}% delivered
            </span>
            <span>
              <b>Branch · </b>
              <span className="mono">feat/auth-provisioning</span>
            </span>
          </div>
        </div>
        {role === "consumer" ? (
          <div className="row gap-8">
            <button className="btn btn-danger">Reject delivery</button>
            <button className="btn btn-primary" onClick={() => setShowApprove(true)}>
              <Ico.check /> Approve & release
            </button>
          </div>
        ) : (
          <div className="row gap-8">
            <button className="btn">Save draft</button>
            <button className="btn btn-primary">
              <Ico.upload /> Submit delivery
            </button>
          </div>
        )}
      </div>

      <div className="hero-band">
        <div className="hero-band-amount">
          <div className="lbl">Locked in escrow</div>
          <div className="val">◎ {m.amount.toFixed(1)} SOL</div>
          <div className="sub">
            ≈ ${(m.amount * 165).toLocaleString()} USD · releases on approval
          </div>
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
            {m.progress}%
          </div>
          <div className="progress" style={{ marginTop: 8 }}>
            <i style={{ width: m.progress + "%" }} />
          </div>
        </div>
      </div>

      <div className="alert info" style={{ marginBottom: 24 }}>
        <Ico.sparkle className="icon" />
        <div className="grow">
          <div className="title">AI verdict ready · Score 92 / 100</div>
          <div className="body">
            Five LLM judges scored this delivery against the milestone spec. The release
            recommendation is <b>approve</b>. Open the review tab to see judge-by-judge breakdowns.
          </div>
        </div>
        <button className="btn btn-sm" onClick={() => setTab("review")}>
          View review <Ico.arrowR />
        </button>
      </div>

      <div className="tabs">
        {[
          { id: "overview", label: "Overview" },
          { id: "review", label: "AI review", n: "92" },
          { id: "activity", label: "Activity", n: 8 },
          { id: "escrow", label: "Escrow", n: 4 },
        ].map((t) => (
          <button
            key={t.id}
            className={"tab " + (tab === t.id ? "active" : "")}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.n != null && <span className="count">{t.n}</span>}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="two-col">
          <div className="stack gap-24">
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 10px" }}>
                Scope
              </h3>
              <p className="muted" style={{ marginTop: 0, lineHeight: 1.6 }}>
                Wallet-scoped session bootstrap, role provisioning (consumer / provider
                switchboard), two responsive dashboards, and the invite acceptance flow. The flow
                must work without requiring a server-side session — Phantom signature is the only
                credential.
              </p>
              <h4 className="h-display" style={{ fontSize: 14, margin: "20px 0 10px" }}>
                Acceptance criteria
              </h4>
              <ul className="role-bullets" style={{ gap: 10 }}>
                <li>
                  <Ico.check />
                  Wallet sign-in completes in under 2s on a cold load
                </li>
                <li>
                  <Ico.check />
                  Role switch persists across reload + survives wallet disconnect
                </li>
                <li>
                  <Ico.check />
                  Invite accept emits an on-chain event and updates project state
                </li>
                <li>
                  <Ico.check />
                  All dashboards pass Lighthouse a11y at 95+
                </li>
              </ul>
            </div>

            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 10px" }}>
                Latest delivery
              </h3>
              <div className="row gap-12" style={{ marginBottom: 12 }}>
                <Ico.github />
                <div className="grow">
                  <div className="mono" style={{ fontSize: 13 }}>
                    justra-labs/atlas-engine #418
                  </div>
                  <div className="muted-2" style={{ fontSize: 12 }}>
                    Submitted 2 days ago by Maya Soto
                  </div>
                </div>
                <span className="pill pill-info">
                  <span className="dot" />
                  Awaiting review
                </span>
              </div>
              <div className="kv-grid">
                <div className="kv">
                  <div className="kv-label">Commit</div>
                  <div className="kv-val mono">8f3a · 1124</div>
                </div>
                <div className="kv">
                  <div className="kv-label">Files changed</div>
                  <div className="kv-val">42 (+1,840 / −312)</div>
                </div>
                <div className="kv">
                  <div className="kv-label">CI</div>
                  <div className="kv-val">
                    <span className="pill pill-ok">
                      <Ico.check />
                      All checks passed
                    </span>
                  </div>
                </div>
                <div className="kv">
                  <div className="kv-label">AI score</div>
                  <div className="kv-val">92 / 100 · Recommend approve</div>
                </div>
              </div>
            </div>
          </div>

          <div className="stack gap-16">
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 14px" }}>
                Activity
              </h3>
              <div className="timeline">
                <div className="timeline-row">
                  <div className="timeline-dot ok">
                    <Ico.check />
                  </div>
                  <div className="body">
                    <div className="who">Delivery submitted</div>
                    <div className="what">Maya pushed PR #418 for review</div>
                    <div className="when">May 6, 14:22 UTC</div>
                  </div>
                </div>
                <div className="timeline-row">
                  <div className="timeline-dot ok">
                    <Ico.sparkle />
                  </div>
                  <div className="body">
                    <div className="who">AI grading complete</div>
                    <div className="what">5 judges, weighted score 92 / 100</div>
                    <div className="when">May 6, 14:34 UTC</div>
                  </div>
                </div>
                <div className="timeline-row">
                  <div className="timeline-dot warn">
                    <Ico.lock />
                  </div>
                  <div className="body">
                    <div className="who">Awaiting your approval</div>
                    <div className="what">SOL releases the moment you sign</div>
                    <div className="when">In progress</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 12px" }}>
                Escrow PDA
              </h3>
              <div className="kv-grid">
                <div className="kv">
                  <div className="kv-label">Address</div>
                  <div className="kv-val mono">8a1F…dQ4z</div>
                </div>
                <div className="kv">
                  <div className="kv-label">Network</div>
                  <div className="kv-val">Solana mainnet-beta</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "review" && <AIReviewTab />}

      {tab === "activity" && (
        <div className="card card-pad">
          <div className="timeline">
            {[
              {
                who: "Maya Soto opened PR #418",
                what: "feat: wallet-scoped sessions + role bootstrap",
                when: "May 6, 14:22",
                d: "ok",
              },
              {
                who: "CI passed",
                what: "42 tests · 0 failures · coverage 91%",
                when: "May 6, 14:25",
                d: "ok",
              },
              {
                who: "AI grading complete",
                what: "5 judges, weighted 92/100, recommend approve",
                when: "May 6, 14:34",
                d: "ok",
              },
              {
                who: "Maya marked delivery ready",
                what: "Notes: covered all acceptance criteria",
                when: "May 6, 14:36",
                d: "ok",
              },
              {
                who: "Awaiting your approval",
                what: "Sign with wallet to release ◎ 8.4 SOL",
                when: "Now",
                d: "warn",
              },
            ].map((row, i) => (
              <div key={i} className="timeline-row">
                <div className={"timeline-dot " + row.d}>
                  {row.d === "ok" ? <Ico.check /> : <Ico.clock />}
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
                <td>
                  <span className="pill pill-ok">
                    <Ico.check />
                    Deposit
                  </span>
                </td>
                <td className="mono">5Tk2…9rPk</td>
                <td className="mono muted-2">Ada → PDA</td>
                <td style={{ textAlign: "right" }}>◎ 8.4</td>
                <td className="muted-2">Apr 24</td>
              </tr>
              <tr>
                <td>
                  <span className="pill pill-info">
                    <span className="dot" />
                    Locked
                  </span>
                </td>
                <td className="mono">—</td>
                <td className="mono muted-2">Held by program</td>
                <td style={{ textAlign: "right" }}>◎ 8.4</td>
                <td className="muted-2">Apr 24</td>
              </tr>
              <tr>
                <td>
                  <span className="pill pill-info">
                    <span className="dot" />
                    Delivery received
                  </span>
                </td>
                <td className="mono">—</td>
                <td className="mono muted-2">Provider · Maya</td>
                <td style={{ textAlign: "right" }}>—</td>
                <td className="muted-2">May 6</td>
              </tr>
              <tr>
                <td>
                  <span className="pill pill-warn">
                    <span className="dot dot-pulse" />
                    Awaiting release
                  </span>
                </td>
                <td className="mono">—</td>
                <td className="mono muted-2">Pending consumer signature</td>
                <td style={{ textAlign: "right" }}>◎ 8.4</td>
                <td className="muted-2">Now</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={showApprove}
        onClose={() => setShowApprove(false)}
        title="Approve & release escrow"
        footer={
          <React.Fragment>
            <span className="muted-2" style={{ fontSize: 13 }}>
              You'll be asked to sign with Phantom.
            </span>
            <div className="row gap-8">
              <button className="btn" onClick={() => setShowApprove(false)}>
                Cancel
              </button>
              <button className="btn btn-primary">
                <Ico.check /> Sign & release ◎ 8.4
              </button>
            </div>
          </React.Fragment>
        }
      >
        <p className="muted" style={{ marginTop: 0, lineHeight: 1.6 }}>
          Approving releases <b style={{ color: "var(--ink)" }}>◎ 8.4 SOL</b> from escrow PDA
          <span className="mono"> 8a1F…dQ4z</span> directly to Maya's wallet
          <span className="mono"> 7Hk2…q4Bn</span>. This action is final and recorded on-chain.
        </p>
        <div className="field" style={{ marginTop: 16 }}>
          <label className="field-label">Approval note (optional)</label>
          <textarea
            className="textarea"
            placeholder="Anything you want Maya to know about this release?"
          />
        </div>
      </Modal>
    </div>
  );
}

function AIReviewTab() {
  const judges = [
    {
      name: "Spec coverage",
      score: 96,
      weight: 30,
      note: "All 4 acceptance criteria addressed with passing tests.",
    },
    {
      name: "Code quality",
      score: 91,
      weight: 20,
      note: "Idiomatic React; one component above 200 lines could split.",
    },
    {
      name: "Security review",
      score: 88,
      weight: 20,
      note: "No new vulnerabilities. Input validation tight.",
    },
    {
      name: "Test rigor",
      score: 94,
      weight: 15,
      note: "Coverage at 91%. Two edge cases worth adding (empty wallet, expired session).",
    },
    {
      name: "Docs & changelog",
      score: 90,
      weight: 15,
      note: "README and CHANGELOG updated. API reference unchanged.",
    },
  ];
  const total = judges.reduce((a, j) => a + j.score * j.weight, 0) / 100;
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
                {total.toFixed(0)}
                <span className="muted" style={{ fontSize: 24 }}>
                  {" "}
                  / 100
                </span>
              </div>
              <div
                style={{ marginTop: 8, fontSize: 14, color: "var(--brand-700)", fontWeight: 600 }}
              >
                Recommendation: approve & release
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
                  strokeDasharray={`${total} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Judges</div>
            <span className="muted-2" style={{ fontSize: 12 }}>
              Each judge runs against the milestone spec independently.
            </span>
          </div>
          <div style={{ padding: "4px 0" }}>
            {judges.map((j, i) => (
              <div
                key={j.name}
                style={{
                  padding: "14px 24px",
                  borderBottom: i === judges.length - 1 ? "none" : "1px solid var(--line)",
                }}
              >
                <div className="row-between" style={{ marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--ink)" }}>{j.name}</div>
                    <div className="muted-2" style={{ fontSize: 12 }}>
                      Weight {j.weight}%
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="h-display" style={{ fontSize: 22 }}>
                      {j.score}
                    </div>
                  </div>
                </div>
                <div className="progress">
                  <i style={{ width: j.score + "%" }} />
                </div>
                <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                  {j.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stack gap-16">
        <div className="alert ok">
          <Ico.check className="icon" />
          <div>
            <div className="title">Recommendation: approve</div>
            <div className="body">
              Weighted score crosses the 85-point release threshold. No blocking issues found.
            </div>
          </div>
        </div>
        <div className="card card-pad">
          <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 10px" }}>
            Judges in this run
          </h3>
          <div className="stack gap-8">
            {["Claude Sonnet 4.5", "GPT-5", "Gemini 2.5 Pro", "DeepSeek-V3.2", "Llama 3.3 70B"].map(
              (j) => (
                <div key={j} className="row gap-8" style={{ fontSize: 13 }}>
                  <Ico.sparkle style={{ width: 14, height: 14, color: "var(--brand-600)" }} />
                  <span>{j}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Create project modal ---------- */
function CreateProjectModal({ open, onClose, onCreate }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
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
        <React.Fragment>
          <span className="auth-step">Step {step} of 2</span>
          <div className="row gap-8">
            {step > 1 && (
              <button className="btn" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            {step < 2 ? (
              <button className="btn btn-primary" onClick={() => setStep(2)}>
                Continue
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  onCreate();
                  setStep(1);
                }}
              >
                <Ico.check /> Create project
              </button>
            )}
          </div>
        </React.Fragment>
      }
    >
      {step === 1 && (
        <div className="stack gap-16">
          <div className="field">
            <label className="field-label">Project name</label>
            <input
              className="input"
              placeholder="e.g. Atlas Settlement Engine"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-label">Short description</label>
            <textarea
              className="textarea"
              placeholder="What are you building? One paragraph is plenty."
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
                Drop in a Markdown or PDF spec and Justra will draft milestones for you. You can
                edit them before sending the invite.
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
          <div className="field">
            <label className="field-label">Or skip and add milestones manually</label>
            <span className="field-hint">
              You'll be taken to the project page to add the first milestone.
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}

Object.assign(window, {
  DashboardScreen,
  ProjectsScreen,
  ProjectScreen,
  MilestoneScreen,
  CreateProjectModal,
});
