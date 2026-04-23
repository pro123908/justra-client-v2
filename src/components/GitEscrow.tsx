import { useEffect, useRef, useState } from "react";
import "./git-escrow.css";
import Navbar from "./app/Navbar";

/* ---------------- helpers ---------------- */
const fmtBytes = (b: number) => {
  if (b < 1024) return b + " B";
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
  return (b / 1024 / 1024).toFixed(2) + " MB";
};
const ext = (n: string) => (n.split(".").pop() || "").toUpperCase().slice(0, 4);
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const rnd = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

type ModelKey = "claude" | "gemini" | "gpt" | "grok" | "deepseek";
const MODELS: { key: ModelKey; name: string }[] = [
  { key: "claude", name: "Claude" },
  { key: "gemini", name: "Gemini" },
  { key: "gpt", name: "GPT" },
  { key: "grok", name: "Grok" },
  { key: "deepseek", name: "Deepseek" },
];

/* ---------------- file row ---------------- */
function FileRow({
  file,
  uploading,
  onRemove,
}: {
  file: File;
  uploading?: boolean;
  onRemove: () => void;
}) {
  const barRef = useRef<HTMLElement | null>(null);
  const [show, setShow] = useState(!!uploading);

  useEffect(() => {
    if (!uploading) return;
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 14 + 6;
      const bar = barRef.current;
      if (!bar) return;
      if (p >= 100) {
        p = 100;
        bar.style.width = "100%";
        clearInterval(iv);
        setTimeout(() => setShow(false), 300);
      } else {
        bar.style.width = p + "%";
      }
    }, 140);
    return () => clearInterval(iv);
  }, [uploading]);

  return (
    <div className={"file-row" + (show ? " uploading" : "")}>
      <div className="ico">{ext(file.name)}</div>
      <div className="nm">{file.name}</div>
      <div className="sz">{fmtBytes(file.size)}</div>
      <button className="rm" aria-label="remove" onClick={onRemove}>
        ×
      </button>
      {show && (
        <div className="mini-bar">
          <i ref={(el) => { barRef.current = el; }} style={{ width: 0 }} />
        </div>
      )}
    </div>
  );
}

/* ---------------- modal ---------------- */
function Modal({
  open,
  onClose,
  title,
  tag,
  children,
  footer,
  loading,
}: {
  open: boolean;
  onClose?: () => void;
  title?: string;
  tag?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
}) {
  useEffect(() => {
    if (!open || loading || !onClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, loading, onClose]);

  return (
    <div
      className={"modal-mask" + (open ? " open" : "")}
      onClick={(e) => {
        if (loading || !onClose) return;
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={"modal" + (loading ? " loading-modal" : "")}>
        {!loading && (
          <div className="modal-head">
            <div>
              <span className="tt">{tag}</span> &nbsp; · &nbsp; {title}
            </div>
            <button className="x" onClick={onClose}>
              ×
            </button>
          </div>
        )}
        {loading ? children : <div className="modal-body">{children}</div>}
        {!loading && footer}
      </div>
    </div>
  );
}

/* ---------------- drop area ---------------- */
function DropArea({
  icon,
  title,
  hint,
  multiple,
  accept,
  onFiles,
}: {
  icon: string;
  title: string;
  hint: string;
  multiple?: boolean;
  accept: string;
  onFiles: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);

  return (
    <div
      className={"drop-area" + (hover ? " hover" : "")}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("input")) inputRef.current?.click();
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setHover(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setHover(false);
        const dropped = [...e.dataTransfer.files];
        const filtered = multiple
          ? dropped
          : dropped.filter((x) => x.name.endsWith(".zip"));
        if (filtered.length) onFiles(filtered);
      }}
    >
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>
        or <span className="browse">browse files</span> · {hint}
      </p>
      <input
        type="file"
        ref={inputRef}
        multiple={multiple}
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => {
          const files = [...(e.target.files || [])];
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* ---------------- loading modal ---------------- */
type ModelStatus = "pending" | "running" | "done";
function LoadingModal({
  open,
  title,
  sub,
  pct,
  modelStates,
}: {
  open: boolean;
  title: string;
  sub: string;
  pct: number;
  modelStates: Record<ModelKey, { status: ModelStatus; progress: number }>;
}) {
  const dashTotal = 452.39;
  return (
    <Modal open={open} loading>
      <div className="loader-ring">
        <div className="spin" />
        <div className="spin s2" />
        <svg viewBox="0 0 160 160">
          <circle className="track" cx={80} cy={80} r={72} />
          <circle
            className="fill"
            cx={80}
            cy={80}
            r={72}
            strokeDasharray={dashTotal}
            strokeDashoffset={dashTotal * (1 - pct / 100)}
          />
        </svg>
        <div className="inner">{pct}%</div>
      </div>
      <h3 className="loading-title">{title}</h3>
      <p className="loading-sub">{sub}</p>
      <div className="model-list">
        {MODELS.map((m) => {
          const s = modelStates[m.key];
          const stateLabel =
            s.status === "pending"
              ? "Queued"
              : s.status === "running"
              ? "Scoring"
              : "Complete";
          return (
            <div className={`model-row ${s.status}`} key={m.key} data-m={m.key}>
              <div className="nm">{m.name}</div>
              <div className="bar">
                <i style={{ width: s.progress + "%" }} />
              </div>
              <div className="state">{stateLabel}</div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

/* ---------------- report ---------------- */
type ReportData = {
  score: number;
  grade: string;
  modelScores: [string, number][];
  criteria: { label: string; sub: string; v: number }[];
  testPct: number;
  sigma1: string;
  sigma2: string;
  artifacts: number;
  evaluators: number;
};

function Report({ data }: { data: ReportData }) {
  const circ = 2 * Math.PI * 108;
  const ringRef = useRef<SVGCircleElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));

    setTimeout(() => {
      const ring = ringRef.current;
      if (ring)
        ring.setAttribute(
          "stroke-dashoffset",
          String(circ * (1 - data.score / 100)),
        );
    }, 80);

    const num = numRef.current;
    if (num) {
      const dur = 1600;
      const start = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        num.textContent = String(Math.round(data.score * eased));
        if (k < 1) requestAnimationFrame(step);
        else num.textContent = String(data.score);
      };
      requestAnimationFrame(step);
    }

    setTimeout(() => {
      const r = sectionRef.current;
      if (!r) return;
      const y = r.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo(0, y);
    }, 200);
  }, [data, circ]);

  const ts = new Date().toISOString().slice(0, 19).replace("T", " ");

  return (
    <section
      className={"report" + (show ? " show" : "")}
      ref={sectionRef}
    >
      <div className="report-head">
        <div className="tt">
          <span style={{ fontFamily: "var(--display)", fontWeight: 700 }}>▸</span>{" "}
          VERIFICATION REPORT · GE-48201
        </div>
        <div className="ts">{ts} UTC</div>
        <div className="verdict-stamp">{data.grade}</div>
      </div>

      <div className="report-body">
        <div className="score-pane">
          <div className="score-label">Aggregate Score</div>
          <div className="score-ring">
            <svg viewBox="0 0 240 240">
              <circle className="track" cx={120} cy={120} r={108} />
              <circle
                className="fill"
                cx={120}
                cy={120}
                r={108}
                strokeDasharray={circ}
                strokeDashoffset={circ}
                ref={ringRef}
              />
            </svg>
            <div className="score-center">
              <div className="score-num" ref={numRef}>
                0
              </div>
              <div className="score-den">/ 100</div>
              <div className="score-grade">{data.grade.split(" · ")[0]}</div>
            </div>
          </div>
          <div className="score-confidence">
            Confidence · 94.3% &nbsp;·&nbsp; σ {data.sigma1}
          </div>
        </div>

        <div className="report-main">
          <h2>The submission satisfies the signed milestone.</h2>
          <div className="summary-meta">
            <span>
              <b>{data.score}/100</b> aggregate
            </span>
            <span>{data.evaluators} evaluators</span>
            <span>{data.artifacts} artifacts ingested</span>
            <span>
              Commit <b>a3f1b9c</b>
            </span>
          </div>
          <p className="summary">
            Across five independent evaluators, the service provider's submission
            scored <b>{data.score}/100</b>, clearing the contractual pass
            threshold of 80. All six primary acceptance criteria in{" "}
            <code>spec.json</code> were verified as implemented, with the
            deliverable repository matching the declared scope of milestone M-03.
            The pre-agreed test suite executed with <b>{data.testPct}%</b> of
            cases passing on first run; remaining variance falls within the{" "}
            {rnd(2, 4)}-point disagreement band observed between evaluators,
            which is not material to the verdict. The smart contract is cleared
            to release <b>◎ 120 SOL</b> to the provider on mutual
            acknowledgement.
          </p>

          <div className="section-h">
            <span>▸ PER-CRITERION BREAKDOWN</span>
            <span>Weight · uniform</span>
          </div>
          <div className="criteria">
            {data.criteria.map((c, i) => (
              <div
                key={i}
                className={"criterion" + (c.v < 75 ? " warn" : "")}
              >
                <div className="label">
                  {c.label}
                  <small>{c.sub}</small>
                </div>
                <div className="bar">
                  <i style={{ width: c.v + "%" }} />
                </div>
                <div className="val">
                  {c.v}
                  <span
                    style={{
                      color: "var(--ink-dim)",
                      fontSize: 12,
                      fontWeight: 400,
                    }}
                  >
                    /100
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="section-h">
            <span>▸ MODEL CONSENSUS</span>
            <span>σ {data.sigma2} &nbsp;·&nbsp; outliers: 0</span>
          </div>
          <div className="models-grid">
            {data.modelScores.map(([n, v]) => (
              <div key={n} className="model-card">
                <div className="mn">{n}</div>
                <div className="ms">{v}</div>
                <div className="mb">
                  <i style={{ width: v + "%" }} />
                </div>
                <div className="mv">
                  {v >= 90
                    ? "High confidence pass"
                    : v >= 75
                    ? "Pass"
                    : "Marginal"}
                </div>
              </div>
            ))}
          </div>

          <div className="section-h">
            <span>▸ FINDINGS</span>
            <span>positive · concern</span>
          </div>
          <div className="findings">
            <div className="col pos">
              <h4>+ What the models agreed on</h4>
              <ul>
                <li>
                  All declared API endpoints implemented and documented in
                  OpenAPI spec.
                </li>
                <li>
                  Test fixtures from <code>/tests/m03</code> execute green
                  end-to-end.
                </li>
                <li>
                  Commit history is clean — no force-pushes, no rewritten
                  history after escrow lock.
                </li>
                <li>
                  No hardcoded credentials or secrets detected in scanned files.
                </li>
              </ul>
            </div>
            <div className="col neg">
              <h4>! Minor concerns surfaced</h4>
              <ul>
                <li>
                  README does not yet document the new <code>/v2/webhooks</code>{" "}
                  handler (1 evaluator flagged).
                </li>
                <li>
                  Two integration tests skipped with <code>.skip()</code> — not
                  blocking but should be resolved.
                </li>
                <li>
                  Dependency <code>marked@4.2.1</code> has a low-severity
                  advisory; non-exploitable in this context.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="report-foot">
        <div className="hashes">
          <span>
            <b>SPEC HASH</b> 0x7f3a…d41c
          </span>
          <span>
            <b>DELIVERABLE HASH</b> 0xa3f1…b9c8
          </span>
          <span>
            <b>VERDICT HASH</b> 0x92e0…4c7a
          </span>
        </div>
        <div className="actions">
          <button className="btn">Request Human Arbitration</button>
          <button className="btn">Download Report · PDF</button>
          <button className="btn btn-primary">Accept &amp; Release ◎ 120</button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- main ---------------- */
export default function GitEscrow() {
  const [archive, setArchive] = useState<File | null>(null);
  const [archiveAnimKey, setArchiveAnimKey] = useState(0);
  const [archiveAnimating, setArchiveAnimating] = useState(false);

  const [deliverables, setDeliverables] = useState<File[]>([]);
  const [animatingFromIdx, setAnimatingFromIdx] = useState<number>(-1);

  // modal 1 (zip)
  const [modal1, setModal1] = useState(false);
  const [stagedArchive, setStagedArchive] = useState<File | null>(null);

  // modal 2 (multi)
  const [modal2, setModal2] = useState(false);
  const [stagedDocs, setStagedDocs] = useState<File[]>([]);

  // loading
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [loadTitle, setLoadTitle] = useState(
    "Dispatching to neutral evaluators",
  );
  const [loadSub, setLoadSub] = useState(
    "This will take approximately 45 seconds. Do not refresh.",
  );
  const [loadPct, setLoadPct] = useState(0);
  const [modelStates, setModelStates] = useState<
    Record<ModelKey, { status: ModelStatus; progress: number }>
  >(() =>
    Object.fromEntries(
      MODELS.map((m) => [m.key, { status: "pending", progress: 0 }]),
    ) as Record<ModelKey, { status: ModelStatus; progress: number }>,
  );

  const [report, setReport] = useState<ReportData | null>(null);

  const archiveOk = !!archive;
  const deliverablesOk = deliverables.length > 0;
  const generateEnabled = archiveOk && deliverablesOk;

  /* ----- modal 1 confirm ----- */
  const confirmArchive = () => {
    if (!stagedArchive) return;
    setArchive(stagedArchive);
    setArchiveAnimating(true);
    setArchiveAnimKey((k) => k + 1);
    setModal1(false);
    setStagedArchive(null);
  };

  /* ----- modal 2 confirm ----- */
  const confirmDocs = () => {
    if (!stagedDocs.length) return;
    setAnimatingFromIdx(deliverables.length);
    setDeliverables((d) => [...d, ...stagedDocs]);
    setStagedDocs([]);
    setModal2(false);
  };

  /* ----- generate ----- */
  const runVerification = async () => {
    setLoadingOpen(true);
    // reset
    setModelStates(
      Object.fromEntries(
        MODELS.map((m) => [m.key, { status: "pending", progress: 0 }]),
      ) as Record<ModelKey, { status: ModelStatus; progress: number }>,
    );
    setLoadPct(0);

    const stages = [
      {
        title: "Parsing specification archive",
        sub: "Extracting spec.json · /requirements · /tests",
        duration: 1600,
      },
      {
        title: "Dispatching to neutral evaluators",
        sub: "Five independent models, parallel execution",
        duration: 400,
      },
    ];
    for (const s of stages) {
      setLoadTitle(s.title);
      setLoadSub(s.sub);
      await sleep(s.duration);
    }

    // start each model
    const promises = MODELS.map((m, idx) => runModel(m.key, idx));

    const tick = setInterval(() => {
      setModelStates((curr) => {
        const vals = MODELS.map((m) => curr[m.key].progress);
        const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
        setLoadPct(Math.min(99, Math.round(avg)));
        return curr;
      });
    }, 80);

    await Promise.all(promises);
    clearInterval(tick);

    setLoadTitle("Aggregating consensus");
    setLoadSub("Weighted score across 5 evaluators");
    setLoadPct(100);
    await sleep(900);

    setLoadingOpen(false);
    buildReport();
  };

  const runModel = (key: ModelKey, idx: number) =>
    new Promise<void>((resolve) => {
      const startDelay = idx * 250;
      const total = 3500 + Math.random() * 2500;
      setTimeout(() => {
        setModelStates((s) => ({
          ...s,
          [key]: { status: "running", progress: 0 },
        }));
        const t0 = Date.now();
        const iv = setInterval(() => {
          const p = Math.min(100, ((Date.now() - t0) / total) * 100);
          setModelStates((s) => ({
            ...s,
            [key]: {
              status: p >= 100 ? "done" : "running",
              progress: p,
            },
          }));
          if (p >= 100) {
            clearInterval(iv);
            resolve();
          }
        }, 60);
      }, startDelay);
    });

  const buildReport = () => {
    const scoreBase = 82 + Math.min(8, deliverables.length);
    const score = Math.min(96, scoreBase + Math.round(Math.random() * 4));
    const grade =
      score >= 90
        ? "PASS · CONSENSUS"
        : score >= 75
        ? "PASS · MAJORITY"
        : score >= 60
        ? "CONTESTED"
        : "FAIL";
    const modelScores: [string, number][] = [
      ["Claude", score + rnd(-3, 3)],
      ["Gemini", score + rnd(-4, 2)],
      ["GPT", score + rnd(-2, 4)],
      ["Grok", score + rnd(-5, 3)],
      ["Deepseek", score + rnd(-3, 3)],
    ].map(([n, v]) => [n as string, Math.max(0, Math.min(100, v as number))]);
    const criteria = [
      {
        label: "Functional completeness",
        sub: "All milestone deliverables present in repository",
        v: Math.min(100, score + rnd(0, 4)),
      },
      {
        label: "Test coverage",
        sub: "Unit + integration suites, pre-agreed fixtures pass",
        v: Math.min(100, score + rnd(-8, 2)),
      },
      {
        label: "Acceptance criteria",
        sub: "Each specified user story verifiably implemented",
        v: Math.min(100, score + rnd(-2, 3)),
      },
      {
        label: "Code quality & structure",
        sub: "Readability, modularity, idiomatic patterns",
        v: Math.min(100, score + rnd(-6, 4)),
      },
      {
        label: "Documentation fidelity",
        sub: "README, inline docs, API reference accuracy",
        v: Math.min(100, score + rnd(-12, 2)),
      },
      {
        label: "Security & dependency hygiene",
        sub: "No flagged CVEs, secrets scan clean",
        v: Math.min(100, score + rnd(-4, 4)),
      },
    ];
    setReport({
      score,
      grade,
      modelScores,
      criteria,
      testPct: Math.round(score * 0.94),
      sigma1: `${rnd(2, 5)}.${rnd(0, 9)}`,
      sigma2: `${rnd(2, 5)}.${rnd(0, 9)}`,
      artifacts: deliverables.length + 1,
      evaluators: modelScores.length,
    });
  };

  /* ---------------- render ---------------- */
  return (
    <div className="git-escrow-root">
      <div className="wrap">
        {/* TOP BAR */}
        <Navbar />

        {/* HERO */}
        <div className="hero">
          <div>
            <div className="eyebrow">Milestone Verification · Step 3 of 4</div>
            <h1>
              Submit the spec.<br />
              Submit the code.<br />
              <em>Ship the verdict.</em>
            </h1>
            <p className="lede">
              Upload the <b>pre-agreed specification bundle</b> and the{" "}
              <b>deliverable evidence</b>. Five independent AI models — Claude,
              Gemini, GPT, Grok, Deepseek — score the submission against the
              contract. The aggregate verdict triggers the escrow release.
            </p>
          </div>
          <aside className="hero-aside">
            <h4>&gt; Pipeline</h4>
            <ol>
              <li>
                <b>Ingest</b> spec archive + deliverables
              </li>
              <li>
                <b>Dispatch</b> to 5 neutral models
              </li>
              <li>
                <b>Aggregate</b> scores → verdict
              </li>
              <li>
                <b>Execute</b> smart contract on consent
              </li>
            </ol>
          </aside>
        </div>

        {/* UPLOAD ZONES */}
        <div className="zones">
          <section className={"zone" + (archiveOk ? " filled" : "")} id="zone1">
            <div className="zone-head">
              <div>
                <div className="zone-label">Input · 01</div>
                <div className="zone-title">Specification Archive</div>
                <p className="zone-desc">
                  The signed milestone bundle — requirements, acceptance
                  criteria, test fixtures, contract JSON.
                </p>
              </div>
              <div className="zone-badge">.ZIP</div>
            </div>
            <button
              className="drop-btn"
              onClick={() => setModal1(true)}
            >
              <span className="plus">+</span>
              <span className="txt">
                <div>Upload specification archive</div>
                <div className="hint">One .zip file · max 50 MB</div>
              </span>
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 600,
                  color: "var(--ink-mute)",
                }}
              >
                →
              </span>
            </button>
            <div className="file-manifest">
              {archive && (
                <FileRow
                  key={archiveAnimKey}
                  file={archive}
                  uploading={archiveAnimating}
                  onRemove={() => {
                    setArchive(null);
                    setArchiveAnimating(false);
                  }}
                />
              )}
            </div>
            <div className="zone-accepts">
              <b>Accepts</b> &nbsp;·&nbsp; .zip &nbsp;·&nbsp; must contain{" "}
              <code>spec.json</code>, <code>/requirements</code>,{" "}
              <code>/tests</code>
            </div>
          </section>

          <section
            className={"zone" + (deliverablesOk ? " filled" : "")}
            id="zone2"
          >
            <div className="zone-head">
              <div>
                <div className="zone-label">Input · 02</div>
                <div className="zone-title">Deliverable Evidence</div>
                <p className="zone-desc">
                  Supporting documentation for review — README, design notes,
                  test reports, architecture docs, changelog.
                </p>
              </div>
              <div className="zone-badge">MULTI</div>
            </div>
            <button
              className="drop-btn"
              onClick={() => setModal2(true)}
            >
              <span className="plus">+</span>
              <span className="txt">
                <div>Upload deliverable documents</div>
                <div className="hint">Multiple files · any text format</div>
              </span>
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 600,
                  color: "var(--ink-mute)",
                }}
              >
                →
              </span>
            </button>
            <div className="file-manifest">
              {deliverables.map((f, idx) => (
                <FileRow
                  key={`${idx}-${f.name}-${f.size}`}
                  file={f}
                  uploading={idx >= animatingFromIdx && animatingFromIdx >= 0}
                  onRemove={() => {
                    setDeliverables((d) => d.filter((_, i) => i !== idx));
                    setAnimatingFromIdx(-1);
                  }}
                />
              ))}
              {deliverables.length > 0 && (
                <div className="zone-footer">
                  <span>
                    {deliverables.length} document
                    {deliverables.length > 1 ? "s" : ""} attached
                  </span>
                  <button
                    className="add-more"
                    onClick={() => setModal2(true)}
                  >
                    + Add more
                  </button>
                </div>
              )}
            </div>
            <div className="zone-accepts">
              <b>Accepts</b> &nbsp;·&nbsp; .txt · .md · .pdf · .docx · .rtf ·
              .json · .yaml · .csv
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="cta-row">
          <div className="cta-meta">
            <div className={"item " + (archiveOk ? "ok" : "no")}>
              <span className="chk" /> SPEC ARCHIVE
            </div>
            <div className={"item " + (deliverablesOk ? "ok" : "no")}>
              <span className="chk" /> DELIVERABLES
            </div>
            <div className="item ok">
              <span className="chk" /> ESCROW LOCKED
            </div>
          </div>
          <button
            className="btn-generate"
            disabled={!generateEnabled}
            onClick={runVerification}
          >
            Generate Report<span className="ar">→</span>
          </button>
          <div
            style={{
              color: "var(--ink-mute)",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Multi-model consensus · ~45 seconds
          </div>
        </div>

        {report && <Report data={report} />}
      </div>

      {/* MODAL 1 */}
      <Modal
        open={modal1}
        onClose={() => {
          setModal1(false);
          setStagedArchive(null);
        }}
        tag="INPUT 01"
        title="Specification Archive"
        footer={
          <div className="modal-foot">
            <div>
              {stagedArchive ? "1 archive ready" : "No file selected"}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn"
                onClick={() => {
                  setModal1(false);
                  setStagedArchive(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={!stagedArchive}
                onClick={confirmArchive}
              >
                Attach Archive
              </button>
            </div>
          </div>
        }
      >
        <DropArea
          icon="⇪"
          title="Drop .zip archive here"
          hint="one file · max 50 MB"
          accept=".zip,application/zip,application/x-zip-compressed"
          onFiles={(f) => setStagedArchive(f[0])}
        />
        <div className="modal-filelist">
          {stagedArchive && (
            <FileRow
              file={stagedArchive}
              onRemove={() => setStagedArchive(null)}
            />
          )}
        </div>
      </Modal>

      {/* MODAL 2 */}
      <Modal
        open={modal2}
        onClose={() => {
          setModal2(false);
          setStagedDocs([]);
        }}
        tag="INPUT 02"
        title="Deliverable Evidence"
        footer={
          <div className="modal-foot">
            <div>
              {stagedDocs.length
                ? `${stagedDocs.length} file${stagedDocs.length > 1 ? "s" : ""} ready`
                : "No files selected"}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn"
                onClick={() => {
                  setModal2(false);
                  setStagedDocs([]);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={stagedDocs.length === 0}
                onClick={confirmDocs}
              >
                Attach Files
              </button>
            </div>
          </div>
        }
      >
        <DropArea
          icon="≡"
          title="Drop deliverable documents here"
          hint="accepts .txt .md .pdf .docx .rtf .json .yaml"
          multiple
          accept=".txt,.md,.pdf,.docx,.rtf,.json,.yaml,.yml,.csv,text/*,application/pdf"
          onFiles={(files) => setStagedDocs((s) => [...s, ...files])}
        />
        <div className="modal-filelist">
          {stagedDocs.map((f, idx) => (
            <FileRow
              key={`${idx}-${f.name}`}
              file={f}
              onRemove={() =>
                setStagedDocs((s) => s.filter((_, i) => i !== idx))
              }
            />
          ))}
        </div>
      </Modal>

      {/* LOADING */}
      <LoadingModal
        open={loadingOpen}
        title={loadTitle}
        sub={loadSub}
        pct={loadPct}
        modelStates={modelStates}
      />
    </div>
  );
}