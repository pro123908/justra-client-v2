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

/* ---------------- main exported component ---------------- */
export default function CodeReport() {
  const [codebase, setCodebase] = useState<File | null>(null);
  const [codebaseAnimKey, setCodebaseAnimKey] = useState(0);
  const [codebaseAnimating, setCodebaseAnimating] = useState(false);

  const [requirements, setRequirements] = useState<File | null>(null);
  const [reqAnimKey, setReqAnimKey] = useState(0);
  const [reqAnimating, setReqAnimating] = useState(false);

  const [modal1, setModal1] = useState(false);
  const [stagedCodebase, setStagedCodebase] = useState<File | null>(null);

  const [modal2, setModal2] = useState(false);
  const [stagedReq, setStagedReq] = useState<File | null>(null);

  const [loadingOpen, setLoadingOpen] = useState(false);
  const [loadTitle, setLoadTitle] = useState("Analyzing codebase");
  const [loadSub, setLoadSub] = useState("This will take approximately 30–120 seconds.");
  const [loadPct, setLoadPct] = useState(0);

  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const codebaseOk = !!codebase;
  const requirementsOk = !!requirements;
  const generateEnabled = codebaseOk && requirementsOk;

  const confirmCodebase = () => {
    if (!stagedCodebase) return;
    setCodebase(stagedCodebase);
    setCodebaseAnimating(true);
    setCodebaseAnimKey((k) => k + 1);
    setModal1(false);
    setStagedCodebase(null);
  };

  const confirmReq = () => {
    if (!stagedReq) return;
    setRequirements(stagedReq);
    setReqAnimating(true);
    setReqAnimKey((k) => k + 1);
    setModal2(false);
    setStagedReq(null);
  };

  const runAnalysis = async () => {
    if (!codebase || !requirements) return;

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
      form.append("requirements", requirements);
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
      <div className="zones">
        <section className={"zone" + (codebaseOk ? " filled" : "")} id="zone1">
          <div className="zone-head">
            <div>
              <div className="zone-label">Input · 01</div>
              <div className="zone-title">Codebase Archive</div>
              <p className="zone-desc">
                A .zip of the project source code to be evaluated against the requirements.
              </p>
            </div>
            <div className="zone-badge">.ZIP</div>
          </div>
          <button className="drop-btn" onClick={() => setModal1(true)}>
            <span className="plus">+</span>
            <span className="txt">
              <div>Upload codebase archive</div>
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
            {codebase && (
              <FileRow
                key={codebaseAnimKey}
                file={codebase}
                uploading={codebaseAnimating}
                onRemove={() => {
                  setCodebase(null);
                  setCodebaseAnimating(false);
                }}
              />
            )}
          </div>
          <div className="zone-accepts">
            <b>Accepts</b> &nbsp;·&nbsp; .zip archive of project source code
          </div>
        </section>

        <section className={"zone" + (requirementsOk ? " filled" : "")} id="zone2">
          <div className="zone-head">
            <div>
              <div className="zone-label">Input · 02</div>
              <div className="zone-title">Requirements Document</div>
              <p className="zone-desc">
                The specification or acceptance criteria document that defines what the codebase
                must implement.
              </p>
            </div>
            <div className="zone-badge">DOC</div>
          </div>
          <button className="drop-btn" onClick={() => setModal2(true)}>
            <span className="plus">+</span>
            <span className="txt">
              <div>Upload requirements document</div>
              <div className="hint">One file · .txt · .pdf · .docx</div>
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
            {requirements && (
              <FileRow
                key={reqAnimKey}
                file={requirements}
                uploading={reqAnimating}
                onRemove={() => {
                  setRequirements(null);
                  setReqAnimating(false);
                }}
              />
            )}
          </div>
          <div className="zone-accepts">
            <b>Accepts</b> &nbsp;·&nbsp; .txt &nbsp;·&nbsp; .pdf &nbsp;·&nbsp; .docx
          </div>
        </section>
      </div>

      {error && (
        <div
          style={{
            margin: "16px 0",
            padding: "14px 18px",
            borderRadius: 6,
            background: "#ef444411",
            border: "1px solid #ef444433",
            color: "#ef4444",
            fontSize: 13,
            fontFamily: "var(--display)",
          }}
        >
          <b>Error:</b> {error}
        </div>
      )}

      <div className="cta-row">
        <div className="cta-meta">
          <div className={"item " + (codebaseOk ? "ok" : "no")}>
            <span className="chk" /> CODEBASE
          </div>
          <div className={"item " + (requirementsOk ? "ok" : "no")}>
            <span className="chk" /> REQUIREMENTS
          </div>
          <div className="item ok">
            <span className="chk" /> ESCROW LOCKED
          </div>
        </div>
        <button className="btn-generate" disabled={!generateEnabled} onClick={runAnalysis}>
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
          LLM-powered requirement analysis · 30–120 seconds
        </div>
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
            <FileRow file={stagedCodebase} onRemove={() => setStagedCodebase(null)} />
          )}
        </div>
      </Modal>

      <Modal
        open={modal2}
        onClose={() => {
          setModal2(false);
          setStagedReq(null);
        }}
        tag="INPUT 02"
        title="Requirements Document"
        footer={
          <div className="modal-foot">
            <div>{stagedReq ? "1 document ready" : "No file selected"}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn"
                onClick={() => {
                  setModal2(false);
                  setStagedReq(null);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary" disabled={!stagedReq} onClick={confirmReq}>
                Attach Document
              </button>
            </div>
          </div>
        }
      >
        <DropArea
          icon="≡"
          title="Drop requirements document here"
          hint="accepts .txt · .pdf · .docx"
          accept=".txt,.pdf,.docx,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onFiles={(files) => setStagedReq(files[0])}
        />
        <div className="modal-filelist">
          {stagedReq && <FileRow file={stagedReq} onRemove={() => setStagedReq(null)} />}
        </div>
      </Modal>

      <LoadingModal open={loadingOpen} title={loadTitle} sub={loadSub} pct={loadPct} />
    </>
  );
}