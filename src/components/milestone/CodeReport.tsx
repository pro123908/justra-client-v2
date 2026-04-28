import { useEffect, useRef, useState } from "react";
import "@/components/git-escrow.css";

/* ---------------- helpers ---------------- */
const fmtBytes = (b: number) => {
  if (b < 1024) return b + " B";
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
  return (b / 1024 / 1024).toFixed(2) + " MB";
};
const ext = (n: string) => (n.split(".").pop() || "").toUpperCase().slice(0, 4);

/* ---------------- API types ---------------- */
type RequirementResult = {
  id: string;
  requirement: string;
  category: string;
  status: "pass" | "partial" | "fail";
  confidence: number;
  reason: string;
  evidence: string;
  relevantFiles: string[];
};

type AnalysisResponse = {
  summary: {
    overallScore: number;
    totalRequirements: number;
    passed: number;
    partial: number;
    failed: number;
    codeFilesAnalyzed: number;
    codeChunksIndexed: number;
  };
  requirements: RequirementResult[];
};

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
          <i
            ref={(el) => {
              barRef.current = el;
            }}
            style={{ width: 0 }}
          />
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
        if (dropped.length) onFiles(dropped);
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
function LoadingModal({
  open,
  title,
  sub,
  pct,
}: {
  open: boolean;
  title: string;
  sub: string;
  pct: number;
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
    </Modal>
  );
}

/* ---------------- analysis report ---------------- */
function StatusBadge({ status }: { status: "pass" | "partial" | "fail" }) {
  const colors: Record<string, string> = {
    pass: "#22c55e",
    partial: "#eab308",
    fail: "#ef4444",
  };
  const labels = { pass: "PASS", partial: "PARTIAL", fail: "FAIL" };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        backgroundColor: colors[status] + "22",
        color: colors[status],
        border: `1px solid ${colors[status]}44`,
        fontFamily: "var(--display)",
      }}
    >
      {labels[status]}
    </span>
  );
}

function AnalysisReport({ data }: { data: AnalysisResponse }) {
  const { summary, requirements } = data;
  const circ = 2 * Math.PI * 108;
  const ringRef = useRef<SVGCircleElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState<"all" | "pass" | "partial" | "fail">("all");

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));

    setTimeout(() => {
      const ring = ringRef.current;
      if (ring)
        ring.setAttribute("stroke-dashoffset", String(circ * (1 - summary.overallScore / 100)));
    }, 80);

    const num = numRef.current;
    if (num) {
      const dur = 1600;
      const start = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        num.textContent = String(Math.round(summary.overallScore * eased));
        if (k < 1) requestAnimationFrame(step);
        else num.textContent = String(summary.overallScore);
      };
      requestAnimationFrame(step);
    }

    setTimeout(() => {
      const r = sectionRef.current;
      if (!r) return;
      const y = r.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo(0, y);
    }, 200);
  }, [data, circ, summary.overallScore]);

  const ts = new Date().toISOString().slice(0, 19).replace("T", " ");
  const grade =
    summary.overallScore >= 90
      ? "PASS · HIGH CONFIDENCE"
      : summary.overallScore >= 75
        ? "PASS · MAJORITY"
        : summary.overallScore >= 60
          ? "CONTESTED"
          : "FAIL";

  const filtered =
    filter === "all" ? requirements : requirements.filter((r) => r.status === filter);

  return (
    <section className={"report" + (show ? " show" : "")} ref={sectionRef}>
      <div className="report-head">
        <div className="tt">
          <span style={{ fontFamily: "var(--display)", fontWeight: 700 }}>▸</span> ANALYSIS REPORT
        </div>
        <div className="ts">{ts} UTC</div>
        <div className="verdict-stamp">{grade}</div>
      </div>

      <div className="report-body">
        <div className="score-pane">
          <div className="score-label">Overall Score</div>
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
              <div className="score-grade">{grade.split(" · ")[0]}</div>
            </div>
          </div>
          <div className="score-confidence">
            {summary.totalRequirements} requirements &nbsp;·&nbsp; {summary.codeFilesAnalyzed} files
          </div>
        </div>

        <div className="report-main">
          <h2>Requirement Analysis Complete</h2>
          <div className="summary-meta">
            <span>
              <b style={{ color: "#22c55e" }}>{summary.passed}</b> passed
            </span>
            <span>
              <b style={{ color: "#eab308" }}>{summary.partial}</b> partial
            </span>
            <span>
              <b style={{ color: "#ef4444" }}>{summary.failed}</b> failed
            </span>
            <span>{summary.codeFilesAnalyzed} files analyzed</span>
            <span>{summary.codeChunksIndexed} chunks indexed</span>
          </div>

          <div className="section-h" style={{ marginTop: 24, marginBottom: 12 }}>
            <span>▸ REQUIREMENTS BREAKDOWN</span>
            <span style={{ display: "flex", gap: 8 }}>
              {(["all", "pass", "partial", "fail"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    background: filter === f ? "var(--ink)" : "transparent",
                    color: filter === f ? "var(--bg)" : "var(--ink-dim)",
                    border: "1px solid var(--line)",
                    borderRadius: 4,
                    padding: "2px 10px",
                    fontSize: 11,
                    fontFamily: "var(--display)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  {f}
                </button>
              ))}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((req) => (
              <div
                key={req.id}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  padding: "14px 16px",
                  background: "var(--panel)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "var(--display)",
                        fontWeight: 700,
                        fontSize: 12,
                        color: "var(--ink-dim)",
                      }}
                    >
                      {req.id}
                    </span>
                    <StatusBadge status={req.status} />
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--ink-mute)",
                        fontFamily: "var(--display)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {req.category}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--display)",
                      fontWeight: 700,
                      fontSize: 13,
                      color:
                        req.confidence >= 80
                          ? "#22c55e"
                          : req.confidence >= 60
                            ? "#eab308"
                            : "#ef4444",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {req.confidence}% conf.
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 13,
                    color: "var(--ink)",
                    marginBottom: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {req.requirement}
                </p>

                <p
                  style={{
                    fontSize: 12,
                    color: "var(--ink-dim)",
                    marginBottom: req.relevantFiles.length ? 8 : 0,
                    lineHeight: 1.4,
                  }}
                >
                  {req.reason}
                </p>

                {req.relevantFiles.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {req.relevantFiles.map((f) => (
                      <code
                        key={f}
                        style={{
                          fontSize: 11,
                          background: "var(--bg)",
                          border: "1px solid var(--line)",
                          borderRadius: 3,
                          padding: "1px 6px",
                          color: "var(--ink-dim)",
                        }}
                      >
                        {f}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="report-foot">
        <div className="hashes">
          <span>
            <b>TOTAL</b> {summary.totalRequirements} requirements
          </span>
          <span>
            <b>FILES</b> {summary.codeFilesAnalyzed} analyzed
          </span>
          <span>
            <b>CHUNKS</b> {summary.codeChunksIndexed} indexed
          </span>
        </div>
        <div className="actions">
          <button className="btn">Download Report · PDF</button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- terminal line ---------------- */
function TerminalLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={"term-line" + (visible ? " show" : "")}>
      <span className="term-prompt">▸</span>
      <span className="term-text">{children}</span>
    </div>
  );
}

/* ---------------- main exported component ---------------- */
export default function CodeReport({ milestoneId }: { milestoneId: string }) {
  const [codebase, setCodebase] = useState<File | null>(null);
  const [codebaseAnimKey, setCodebaseAnimKey] = useState(0);
  const [codebaseAnimating, setCodebaseAnimating] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [modal1, setModal1] = useState(false);
  const [stagedCodebase, setStagedCodebase] = useState<File | null>(null);

  const [loadingOpen, setLoadingOpen] = useState(false);
  const [loadTitle, setLoadTitle] = useState("Analyzing codebase");
  const [loadSub, setLoadSub] = useState("This will take approximately 30–120 seconds.");
  const [loadPct, setLoadPct] = useState(0);

  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const codebaseOk = !!codebase;

  const attachFile = (file: File) => {
    setCodebase(file);
    setCodebaseAnimating(true);
    setCodebaseAnimKey((k) => k + 1);
  };

  const confirmCodebase = () => {
    if (!stagedCodebase) return;
    attachFile(stagedCodebase);
    setModal1(false);
    setStagedCodebase(null);
  };

  const runAnalysis = async () => {
    if (!codebase) return;

    setAnalysis(null);
    setError(null);
    setLoadingOpen(true);
    setLoadPct(0);
    setLoadTitle("Analyzing codebase");
    setLoadSub("Indexing code and evaluating requirements. This may take 30–120 seconds.");

    const startTime = Date.now();
    const targetDuration = 80_000;
    const ticker = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const raw = (elapsed / targetDuration) * 95;
      setLoadPct(Math.min(95, Math.round(raw)));
    }, 500);

    try {
      const form = new FormData();
      form.append("milestoneId", milestoneId);
      form.append("codebase", codebase);

      const res = await fetch("http://localhost:3000/analyze", {
        method: "POST",
        body: form,
      });

      clearInterval(ticker);

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(body.error || `Server error ${res.status}`);
      }

      const data: AnalysisResponse = await res.json();
      setLoadPct(100);
      setTimeout(() => {
        setLoadingOpen(false);
        setAnalysis(data);
      }, 600);
    } catch (err) {
      clearInterval(ticker);
      setLoadingOpen(false);
      setError(err instanceof Error ? err.message : "Network error — could not reach the server.");
    }
  };

  return (
    <>
      {/* ── Pipeline steps ── */}
      <div className="deliver-pipeline">
        <div className="pip-step active">
          <div className="pip-num">01</div>
          <div className="pip-label">Upload Archive</div>
        </div>
        <div className="pip-connector">
          <div className="pip-connector-fill" style={{ width: codebaseOk ? "100%" : "0%" }} />
        </div>
        <div className={"pip-step" + (codebaseOk ? " active" : "")}>
          <div className="pip-num">02</div>
          <div className="pip-label">AI Analysis</div>
        </div>
        <div className="pip-connector">
          <div className="pip-connector-fill" style={{ width: "0%" }} />
        </div>
        <div className="pip-step">
          <div className="pip-num">03</div>
          <div className="pip-label">Release Escrow</div>
        </div>
      </div>

      {/* ── Main delivery zone ── */}
      <div className="deliver-zone">
        {/* Left: upload */}
        <div className="deliver-left">
          <div
            className={
              "upload-target" + (codebaseOk ? " filled" : "") + (dragOver ? " drag-over" : "")
            }
            onClick={() => !codebaseOk && setModal1(true)}
            onDragEnter={(e) => {
              e.preventDefault();
              if (!codebaseOk) setDragOver(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!codebaseOk) setDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f) attachFile(f);
            }}
          >
            <div className="ut-pulse-ring r1" />
            <div className="ut-pulse-ring r2" />
            <div className="ut-pulse-ring r3" />
            <div className="ut-scan" />
            {codebaseOk ? (
              <div className="ut-filled-content">
                <div className="ut-ok-icon">✓</div>
                <div className="ut-filled-name">{codebase!.name}</div>
                <div className="ut-filled-meta">
                  {fmtBytes(codebase!.size)} · ready for analysis
                </div>
                <button
                  className="ut-replace-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModal1(true);
                  }}
                >
                  Replace file
                </button>
              </div>
            ) : (
              <div className="ut-idle-content">
                <div className="ut-icon">⇪</div>
                <div className="ut-title">Drop .zip Archive</div>
                <div className="ut-hint">
                  or <span className="ut-browse">click to browse</span> · max 50 MB
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".zip,application/zip,application/x-zip-compressed"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) attachFile(f);
                e.target.value = "";
              }}
            />
          </div>

          <div className="ut-meta-row">
            <span className="ut-meta-chip">
              <b>Format</b> .zip
            </span>
            <span className="ut-meta-chip">
              <b>Max</b> 50 MB
            </span>
            <span className={"ut-meta-chip status" + (codebaseOk ? " ok" : "")}>
              <span className="ut-dot" />
              {codebaseOk ? "Archive ready" : "Awaiting upload"}
            </span>
          </div>
        </div>

        {/* Right: engine info */}
        <div className="deliver-right">
          <div className="dr-head">
            <span className="dr-label">▸ ANALYSIS ENGINE</span>
            <span className="dr-status">
              <span className="dot" />
              READY
            </span>
          </div>

          <div className="terminal-feed">
            <TerminalLine delay={80}>vector index initialised · 1536-dim</TerminalLine>
            <TerminalLine delay={280}>semantic chunker · active</TerminalLine>
            <TerminalLine delay={480}>requirement parser · loaded</TerminalLine>
            <TerminalLine delay={680}>escrow verifier · on-chain link</TerminalLine>
            <TerminalLine delay={880}>llm grader · claude-sonnet-4-6</TerminalLine>
            <TerminalLine delay={1080}>
              awaiting archive upload_
              <span className="term-cursor" />
            </TerminalLine>
          </div>

          <div className="engine-features">
            {[
              {
                icon: "◈",
                title: "Semantic Code Search",
                desc: "RAG over your entire codebase — no file left unread",
              },
              {
                icon: "⟁",
                title: "Requirement Mapping",
                desc: "Each spec line matched to specific evidence in code",
              },
              {
                icon: "◎",
                title: "Confidence Scoring",
                desc: "Per-requirement confidence with pass / partial / fail",
              },
              {
                icon: "⬡",
                title: "On-chain Verdict",
                desc: "Score cryptographically linked to the escrow PDA",
              },
            ].map((f, i) => (
              <div className="ef-item" key={f.title} style={{ animationDelay: `${i * 120}ms` }}>
                <span className="ef-icon">{f.icon}</span>
                <div>
                  <div className="ef-title">{f.title}</div>
                  <div className="ef-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Feature strip ── */}
      <div className="feature-strip">
        {[
          { stat: "RAG", label: "Retrieval-augmented grading" },
          { stat: "LLM", label: "Claude-powered analysis" },
          { stat: "ZK", label: "Verifiable on-chain result" },
          { stat: "< 2m", label: "Typical analysis time" },
        ].map((c, i) => (
          <div className="fs-card" key={c.stat} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="fs-stat">{c.stat}</div>
            <div className="fs-label">{c.label}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className="deliver-error">
          <b>Error:</b> {error}
        </div>
      )}

      {/* ── CTA ── */}
      <div className="cta-row">
        <div className="cta-meta">
          <div className={"item " + (codebaseOk ? "ok" : "no")}>
            <span className="chk">{codebaseOk ? "✓" : ""}</span> ARCHIVE
          </div>
          <div className="item ok">
            <span className="chk">✓</span> ESCROW LOCKED
          </div>
        </div>
        <button className="btn-generate" disabled={!codebaseOk} onClick={runAnalysis}>
          Generate Report<span className="ar">→</span>
        </button>
        <div className="cta-hint">LLM-powered · semantic analysis · 30–120 seconds</div>
      </div>

      {analysis && <AnalysisReport data={analysis} />}

      <Modal
        open={modal1}
        onClose={() => {
          setModal1(false);
          setStagedCodebase(null);
        }}
        tag="INPUT 01"
        title="Codebase Archive"
        footer={
          <div className="modal-foot">
            <div>{stagedCodebase ? "1 archive ready" : "No file selected"}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn"
                onClick={() => {
                  setModal1(false);
                  setStagedCodebase(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={!stagedCodebase}
                onClick={confirmCodebase}
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
          onFiles={(f) => setStagedCodebase(f[0])}
        />
        <div className="modal-filelist">
          {stagedCodebase && (
            <FileRow
              key={codebaseAnimKey}
              file={stagedCodebase}
              uploading={codebaseAnimating}
              onRemove={() => setStagedCodebase(null)}
            />
          )}
        </div>
      </Modal>

      <LoadingModal open={loadingOpen} title={loadTitle} sub={loadSub} pct={loadPct} />
    </>
  );
}
