import { useEffect, useRef, useState } from "react";
import {
  analysisApi,
  type AnalysisResult,
  type ReviewResult,
  type StoredAnalysisResult,
} from "@/lib/api";
import "@/components/git-escrow.css";

/* ---------------- helpers ---------------- */
const fmtBytes = (b: number) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(2)} MB`;
};

const fmtDateTime = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date
    .toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .toUpperCase();
};

const fmtCount = (value?: number | null) => (value ?? 0).toLocaleString();

const ext = (name: string) => (name.split(".").pop() || "").toUpperCase().slice(0, 4);

const sortAnalyses = (items: StoredAnalysisResult[]) =>
  [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const materializeFallbackAnalysis = (
  milestoneId: string,
  analysis: AnalysisResult,
): StoredAnalysisResult => {
  const now = new Date().toISOString();
  return {
    ...analysis,
    id: crypto.randomUUID(),
    milestoneId,
    createdAt: now,
    updatedAt: now,
  };
};

const getVerdictLabel = (score: number) => {
  if (score >= 90) return "PASS · HIGH CONFIDENCE";
  if (score >= 75) return "PASS · MAJORITY";
  if (score >= 60) return "CONTESTED";
  return "FAIL";
};

const getScoreTone = (score: number) => {
  if (score >= 85) return "#22c55e";
  if (score >= 65) return "#eab308";
  return "#ef4444";
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
    let progress = 0;
    const iv = setInterval(() => {
      progress += Math.random() * 14 + 6;
      const bar = barRef.current;
      if (!bar) return;
      if (progress >= 100) {
        progress = 100;
        bar.style.width = "100%";
        clearInterval(iv);
        setTimeout(() => setShow(false), 300);
      } else {
        bar.style.width = `${progress}%`;
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
  size = "default",
}: {
  open: boolean;
  onClose?: () => void;
  title?: string;
  tag?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  size?: "default" | "wide";
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
      <div
        className={
          "modal" + (loading ? " loading-modal" : "") + (size === "wide" ? " modal-wide" : "")
        }
      >
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

/* ---------------- analysis UI ---------------- */
function StatusBadge({ status }: { status: ReviewResult["status"] }) {
  const colors: Record<ReviewResult["status"], string> = {
    pass: "#22c55e",
    partial: "#eab308",
    fail: "#ef4444",
  };
  const labels: Record<ReviewResult["status"], string> = {
    pass: "PASS",
    partial: "PARTIAL",
    fail: "FAIL",
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        backgroundColor: `${colors[status]}22`,
        color: colors[status],
        border: `1px solid ${colors[status]}44`,
        fontFamily: "var(--display)",
      }}
    >
      {labels[status]}
    </span>
  );
}

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

function RequirementBreakdown({ requirements }: { requirements: ReviewResult[] }) {
  const [filter, setFilter] = useState<"all" | ReviewResult["status"]>("all");

  const filtered =
    filter === "all"
      ? requirements
      : requirements.filter((requirement) => requirement.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="section-h" style={{ marginBottom: 0 }}>
        <span>▸ REQUIREMENTS BREAKDOWN</span>
        <span style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["all", "pass", "partial", "fail"] as const).map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              style={{
                background: filter === value ? "var(--ink)" : "transparent",
                color: filter === value ? "var(--bg)" : "var(--ink-dim)",
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
              {value}
            </button>
          ))}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="analysis-empty">No requirements match this filter.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((requirement) => (
            <div key={requirement.id} className="analysis-requirement">
              <div className="analysis-requirement-head">
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="analysis-req-id">{requirement.id}</span>
                  <StatusBadge status={requirement.status} />
                  <span className="analysis-req-category">{requirement.category}</span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--display)",
                    fontWeight: 700,
                    fontSize: 13,
                    color: getScoreTone(requirement.confidence),
                    whiteSpace: "nowrap",
                  }}
                >
                  {Math.round(requirement.confidence)}% conf.
                </span>
              </div>

              <p className="analysis-req-text">{requirement.requirement}</p>
              <p className="analysis-req-copy">{requirement.reason}</p>

              {requirement.evidence && (
                <div className="analysis-evidence">
                  <div className="analysis-evidence-label">Evidence</div>
                  <p className="analysis-req-copy" style={{ marginBottom: 0 }}>
                    {requirement.evidence}
                  </p>
                </div>
              )}

              {requirement.relevantFiles.length > 0 && (
                <div className="analysis-file-chips">
                  {requirement.relevantFiles.map((file) => (
                    <code key={file}>{file}</code>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalysisDetails({ analysis }: { analysis: StoredAnalysisResult }) {
  const { summary } = analysis;
  const roundedScore = Math.round(summary.overallScore);
  const verdict = getVerdictLabel(roundedScore);

  return (
    <div className="analysis-details">
      <div className="analysis-modal-head">
        <div>
          <div className="analysis-modal-title">Stored milestone analysis</div>
          <div className="analysis-modal-meta">
            Created {fmtDateTime(analysis.createdAt)} · Updated {fmtDateTime(analysis.updatedAt)}
          </div>
        </div>
        <div
          className="analysis-score-pill"
          style={{
            color: getScoreTone(roundedScore),
            borderColor: `${getScoreTone(roundedScore)}55`,
            background: `${getScoreTone(roundedScore)}14`,
          }}
        >
          {roundedScore}/100 · {verdict}
        </div>
      </div>

      <div className="analysis-summary-grid">
        {[
          { label: "Requirements", value: fmtCount(summary.totalRequirements) },
          { label: "Passed", value: fmtCount(summary.passed), tone: "#22c55e" },
          { label: "Partial", value: fmtCount(summary.partial), tone: "#eab308" },
          { label: "Failed", value: fmtCount(summary.failed), tone: "#ef4444" },
          { label: "Files analyzed", value: fmtCount(summary.codeFilesAnalyzed) },
          { label: "Chunks indexed", value: fmtCount(summary.codeChunksIndexed) },
          { label: "OpenAI tokens", value: fmtCount(summary.totalOpenAITokens ?? 0) },
        ].map((item) => (
          <div key={item.label} className="analysis-metric-card">
            <div className="analysis-metric-label">{item.label}</div>
            <div className="analysis-metric-value" style={{ color: item.tone ?? "var(--ink)" }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <RequirementBreakdown key={analysis.id} requirements={analysis.requirements} />
    </div>
  );
}

/* ---------------- main exported component ---------------- */
export default function CodeReport({
  milestoneId,
  githubRepo,
  token,
  onReleaseFunds,
}: {
  milestoneId: string;
  githubRepo: string | null;
  token: string | null;
  onReleaseFunds: () => Promise<void>;
}) {
  const [sourceMode, setSourceMode] = useState<"zip" | "github">(githubRepo ? "github" : "zip");
  const [codebase, setCodebase] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [stagedCodebase, setStagedCodebase] = useState<File | null>(null);

  const [loadingOpen, setLoadingOpen] = useState(false);
  const [loadTitle, setLoadTitle] = useState("Analyzing codebase");
  const [loadSub, setLoadSub] = useState("This will take approximately 30–120 seconds.");
  const [loadPct, setLoadPct] = useState(0);

  const [analyses, setAnalyses] = useState<StoredAnalysisResult[]>([]);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisFetchError, setAnalysisFetchError] = useState<string | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<StoredAnalysisResult | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [releaseLoading, setReleaseLoading] = useState(false);
  const [releaseError, setReleaseError] = useState<string | null>(null);

  const codebaseOk = sourceMode === "github" ? !!githubRepo : !!codebase;
  const hasAnalyses = analyses.length > 0;

  const attachFile = (file: File) => {
    setCodebase(file);
    setUploadModalOpen(false);
    setStagedCodebase(null);
  };

  const refreshAnalyses = async (showSpinner = true): Promise<StoredAnalysisResult[]> => {
    if (!token) return [];
    if (showSpinner) setAnalysisLoading(true);
    setAnalysisFetchError(null);

    try {
      const results = sortAnalyses(await analysisApi.listForMilestone(token, milestoneId));
      setAnalyses(results);
      return results;
    } catch (err) {
      setAnalysisFetchError(
        err instanceof Error ? err.message : "Failed to load stored milestone analyses.",
      );
      return [];
    } finally {
      if (showSpinner) setAnalysisLoading(false);
    }
  };

  useEffect(() => {
    setSourceMode(githubRepo ? "github" : "zip");
  }, [githubRepo]);

  useEffect(() => {
    if (!token) return;
    void refreshAnalyses();
  }, [token, milestoneId]);

  const runAnalysis = async () => {
    if (!codebaseOk) return;

    setError(null);
    setReleaseError(null);
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
      let response: Response;

      if (sourceMode === "github" && githubRepo) {
        response = await fetch("http://localhost:3000/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ milestoneId, githubRepo }),
        });
      } else {
        const form = new FormData();
        form.append("milestoneId", milestoneId);
        form.append("codebase", codebase!);
        response = await fetch("http://localhost:3000/analyze", {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          body: form,
        });
      }

      if (!response.ok) {
        clearInterval(ticker);
        const body = await response.json().catch(() => ({ error: "Request failed" }));
        throw new Error(body.error || `Server error ${response.status}`);
      }

      const result: AnalysisResult = await response.json();
      clearInterval(ticker);
      setLoadPct(100);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLoadingOpen(false);

      const storedResults = await refreshAnalyses(false);
      if (storedResults.length > 0) {
        setActiveAnalysis(storedResults[0]);
        return;
      }

      const fallback = materializeFallbackAnalysis(milestoneId, result);
      setAnalyses((current) => sortAnalyses([fallback, ...current]));
      setActiveAnalysis(fallback);
      setAnalysisFetchError("Analysis completed, but refreshing stored history failed.");
    } catch (err) {
      clearInterval(ticker);
      setLoadingOpen(false);
      setError(err instanceof Error ? err.message : "Network error — could not reach the server.");
    }
  };

  const latestAnalysis = analyses[0] ?? null;

  return (
    <>
      <div className="deliver-pipeline">
        <div className="pip-step active">
          <div className="pip-num">01</div>
          <div className="pip-label">
            {sourceMode === "github" ? "GitHub Repo" : "Upload Archive"}
          </div>
        </div>
        <div className="pip-connector">
          <div className="pip-connector-fill" style={{ width: codebaseOk ? "100%" : "0%" }} />
        </div>
        <div className={"pip-step" + (codebaseOk ? " active" : "")}>
          <div className="pip-num">02</div>
          <div className="pip-label">AI Analysis</div>
        </div>
        <div className="pip-connector">
          <div className="pip-connector-fill" style={{ width: hasAnalyses ? "100%" : "0%" }} />
        </div>
        <div className={"pip-step" + (hasAnalyses ? " active" : "")}>
          <div className="pip-num">03</div>
          <div className="pip-label">Release Escrow</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => !githubRepo && setSourceMode("zip")}
          style={{
            flex: 1,
            padding: "10px 16px",
            border: `1px solid ${sourceMode === "zip" ? "var(--ink)" : "var(--line)"}`,
            borderRadius: 6,
            background: sourceMode === "zip" ? "var(--ink)" : "var(--panel)",
            color: sourceMode === "zip" ? "var(--bg)" : "var(--ink-dim)",
            fontFamily: "var(--display)",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.06em",
            cursor: githubRepo ? "not-allowed" : "pointer",
            opacity: githubRepo ? 0.4 : 1,
            textTransform: "uppercase",
            transition: "all 0.15s",
          }}
          disabled={!!githubRepo}
          title={
            githubRepo ? "GitHub repo is connected — disconnect it to use zip upload" : undefined
          }
        >
          ⇪ Upload .zip Archive
        </button>
        <button
          onClick={() => setSourceMode("github")}
          style={{
            flex: 1,
            padding: "10px 16px",
            border: `1px solid ${sourceMode === "github" ? "var(--ink)" : "var(--line)"}`,
            borderRadius: 6,
            background: sourceMode === "github" ? "var(--ink)" : "var(--panel)",
            color:
              sourceMode === "github" ? "var(--bg)" : githubRepo ? "var(--ink)" : "var(--ink-dim)",
            fontFamily: "var(--display)",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.06em",
            cursor: githubRepo ? "pointer" : "not-allowed",
            opacity: githubRepo ? 1 : 0.4,
            textTransform: "uppercase",
            transition: "all 0.15s",
          }}
          disabled={!githubRepo}
          title={!githubRepo ? "Connect a GitHub repo in the section above first" : undefined}
        >
          ◈ Use Connected GitHub Repo
        </button>
      </div>

      <div className="deliver-zone">
        <div className="deliver-left">
          {sourceMode === "github" ? (
            <div className="upload-target filled" style={{ cursor: "default" }}>
              <div className="ut-pulse-ring r1" />
              <div className="ut-pulse-ring r2" />
              <div className="ut-pulse-ring r3" />
              <div className="ut-scan" />
              <div className="ut-filled-content">
                <div className="ut-ok-icon">◈</div>
                <div className="ut-filled-name">{githubRepo}</div>
                <div className="ut-filled-meta">GitHub repo · ready for analysis</div>
              </div>
            </div>
          ) : (
            <div
              className={
                "upload-target" + (codebase ? " filled" : "") + (dragOver ? " drag-over" : "")
              }
              onClick={() => !codebase && setUploadModalOpen(true)}
              onDragEnter={(e) => {
                e.preventDefault();
                if (!codebase) setDragOver(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                if (!codebase) setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) attachFile(file);
              }}
            >
              <div className="ut-pulse-ring r1" />
              <div className="ut-pulse-ring r2" />
              <div className="ut-pulse-ring r3" />
              <div className="ut-scan" />
              {codebase ? (
                <div className="ut-filled-content">
                  <div className="ut-ok-icon">✓</div>
                  <div className="ut-filled-name">{codebase.name}</div>
                  <div className="ut-filled-meta">
                    {fmtBytes(codebase.size)} · ready for analysis
                  </div>
                  <button
                    className="ut-replace-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadModalOpen(true);
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
                  const file = e.target.files?.[0];
                  if (file) attachFile(file);
                  e.target.value = "";
                }}
              />
            </div>
          )}

          <div className="ut-meta-row">
            {sourceMode === "github" ? (
              <>
                <span className="ut-meta-chip">
                  <b>Source</b> GitHub
                </span>
                <span className="ut-meta-chip status ok">
                  <span className="ut-dot" />
                  Repo connected
                </span>
              </>
            ) : (
              <>
                <span className="ut-meta-chip">
                  <b>Format</b> .zip
                </span>
                <span className="ut-meta-chip">
                  <b>Max</b> 50 MB
                </span>
                <span className={"ut-meta-chip status" + (codebase ? " ok" : "")}>
                  <span className="ut-dot" />
                  {codebase ? "Archive ready" : "Awaiting upload"}
                </span>
              </>
            )}
          </div>
        </div>

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
              {hasAnalyses
                ? `stored analyses loaded · ${analyses.length} snapshot${analyses.length === 1 ? "" : "s"}`
                : sourceMode === "github"
                  ? "awaiting repository analysis_"
                  : "awaiting archive upload_"}
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
                title: "Stored Report History",
                desc: "Each analysis stays attached to the milestone for later review",
              },
            ].map((feature, i) => (
              <div
                className="ef-item"
                key={feature.title}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span className="ef-icon">{feature.icon}</span>
                <div>
                  <div className="ef-title">{feature.title}</div>
                  <div className="ef-desc">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="feature-strip">
        {[
          { stat: "RAG", label: "Retrieval-augmented grading" },
          { stat: "LLM", label: "Stored milestone analyses" },
          { stat: "AUDIT", label: "Requirement-level evidence" },
          { stat: "< 2m", label: "Typical analysis time" },
        ].map((card, i) => (
          <div className="fs-card" key={card.stat} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="fs-stat">{card.stat}</div>
            <div className="fs-label">{card.label}</div>
          </div>
        ))}
      </div>

      {error && (
        <div className="deliver-error">
          <b>Error:</b> {error}
        </div>
      )}

      {analysisFetchError && (
        <div className="deliver-error" style={{ marginTop: 16 }}>
          <b>History refresh:</b> {analysisFetchError}
        </div>
      )}

      <div className="cta-row">
        <div className="cta-meta">
          <div className={"item " + (codebaseOk ? "ok" : "no")}>
            <span className="chk">{codebaseOk ? "✓" : ""}</span>{" "}
            {sourceMode === "github" ? "GITHUB REPO" : "ARCHIVE"}
          </div>
          <div className="item ok">
            <span className="chk">✓</span> ESCROW LOCKED
          </div>
          <div className={"item " + (hasAnalyses ? "ok" : "no")}>
            <span className="chk">{hasAnalyses ? "✓" : ""}</span> STORED ANALYSIS
          </div>
        </div>
        <button className="btn-generate" disabled={!codebaseOk} onClick={runAnalysis}>
          {hasAnalyses ? "Generate New Report" : "Generate Report"}
          <span className="ar">→</span>
        </button>
        <div className="cta-hint">LLM-powered · semantic analysis · 30–120 seconds</div>
      </div>

      <div className="analysis-history">
        <div className="section-h" style={{ marginBottom: 14 }}>
          <span>▸ STORED ANALYSES</span>
          <span style={{ color: "var(--ink-mute)", fontSize: 11 }}>
            {analysisLoading
              ? "Refreshing stored analyses…"
              : hasAnalyses
                ? `${analyses.length} stored report${analyses.length === 1 ? "" : "s"}`
                : "No report stored yet"}
          </span>
        </div>

        {analysisLoading && !hasAnalyses ? (
          <div className="analysis-empty">Loading stored analyses…</div>
        ) : hasAnalyses ? (
          <div className="analysis-list">
            {analyses.map((analysis, index) => {
              const score = Math.round(analysis.summary.overallScore);
              const isLatest = index === 0;
              return (
                <button
                  key={analysis.id}
                  type="button"
                  className="analysis-card"
                  onClick={() => setActiveAnalysis(analysis)}
                >
                  <div className="analysis-card-head">
                    <div>
                      <div className="analysis-card-title">
                        Analysis snapshot{" "}
                        {isLatest && <span className="analysis-latest">LATEST</span>}
                      </div>
                      <div className="analysis-card-meta">
                        Created {fmtDateTime(analysis.createdAt)}
                      </div>
                    </div>
                    <div
                      className="analysis-score-pill"
                      style={{
                        color: getScoreTone(score),
                        borderColor: `${getScoreTone(score)}55`,
                        background: `${getScoreTone(score)}14`,
                      }}
                    >
                      {score}/100
                    </div>
                  </div>

                  <div className="analysis-card-stats">
                    <span>{getVerdictLabel(score)}</span>
                    <span>{fmtCount(analysis.summary.totalRequirements)} requirements</span>
                    <span>{fmtCount(analysis.summary.codeFilesAnalyzed)} files analyzed</span>
                  </div>

                  <div className="analysis-card-breakdown">
                    <span className="pass">{fmtCount(analysis.summary.passed)} passed</span>
                    <span className="partial">{fmtCount(analysis.summary.partial)} partial</span>
                    <span className="fail">{fmtCount(analysis.summary.failed)} failed</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="analysis-empty">
            No stored analysis exists for this milestone yet. Run the analysis to create the first
            review snapshot.
          </div>
        )}
      </div>

      {latestAnalysis && (
        <div className="analysis-actions">
          <div>
            <div className="analysis-actions-title">Consumer actions</div>
            <div className="analysis-actions-copy">
              Review the latest stored analysis before releasing the escrowed funds.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn" type="button" onClick={() => setActiveAnalysis(latestAnalysis)}>
              Open latest analysis
            </button>
            <button
              className="btn btn-primary"
              onClick={async () => {
                setReleaseLoading(true);
                setReleaseError(null);
                try {
                  await onReleaseFunds();
                } catch (err) {
                  setReleaseError(
                    err instanceof Error ? err.message : "Failed to release milestone funds.",
                  );
                } finally {
                  setReleaseLoading(false);
                }
              }}
              disabled={releaseLoading}
            >
              {releaseLoading ? "Releasing funds…" : "Release funds"}
            </button>
          </div>
        </div>
      )}

      {releaseError && <div className="auth-error">{releaseError}</div>}

      <Modal
        open={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
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
                  setUploadModalOpen(false);
                  setStagedCodebase(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={!stagedCodebase}
                onClick={() => {
                  if (stagedCodebase) attachFile(stagedCodebase);
                }}
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
          onFiles={(files) => setStagedCodebase(files[0])}
        />
        <div className="modal-filelist">
          {stagedCodebase && (
            <FileRow file={stagedCodebase} onRemove={() => setStagedCodebase(null)} />
          )}
        </div>
      </Modal>

      <Modal
        open={!!activeAnalysis}
        onClose={() => setActiveAnalysis(null)}
        tag="ANALYSIS"
        title={activeAnalysis ? fmtDateTime(activeAnalysis.createdAt) : ""}
        size="wide"
        footer={
          activeAnalysis ? (
            <div className="modal-foot">
              <div>Milestone snapshot · {activeAnalysis.id.slice(0, 8)}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={() => setActiveAnalysis(null)}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    setReleaseLoading(true);
                    setReleaseError(null);
                    try {
                      await onReleaseFunds();
                    } catch (err) {
                      setReleaseError(
                        err instanceof Error ? err.message : "Failed to release milestone funds.",
                      );
                    } finally {
                      setReleaseLoading(false);
                    }
                  }}
                  disabled={releaseLoading}
                >
                  {releaseLoading ? "Releasing funds…" : "Release funds"}
                </button>
              </div>
            </div>
          ) : null
        }
      >
        {activeAnalysis && <AnalysisDetails analysis={activeAnalysis} />}
      </Modal>

      <LoadingModal open={loadingOpen} title={loadTitle} sub={loadSub} pct={loadPct} />
    </>
  );
}
