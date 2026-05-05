import { useCallback, useEffect, useRef, useState } from "react";
import {
  analysisApi,
  githubApi,
  type AnalysisResult,
  type GithubRepo,
  type MilestoneAnalysisRequirementResponse,
  type ReviewResult,
  type StoredAnalysisResult,
} from "@/lib/api";
import { buildGithubAppInstallUrl } from "@/routes/github";
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

const sortAnalyses = (items: StoredAnalysisResult[]) =>
  [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const materializeFallbackAnalysis = (
  _milestoneId: string,
  analysis: AnalysisResult,
): StoredAnalysisResult => {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    overallScore: analysis.summary.overallScore,
    totalRequirements: analysis.summary.totalRequirements,
    passed: analysis.summary.passed,
    partial: analysis.summary.partial,
    failed: analysis.summary.failed,
    codeFilesAnalyzed: analysis.summary.codeFilesAnalyzed,
    codeChunksIndexed: analysis.summary.codeChunksIndexed,
    totalOpenAITokens: analysis.summary.totalOpenAITokens,
    requirements: analysis.requirements.map((r, i) => ({
      id: crypto.randomUUID(),
      sortOrder: i,
      requirementId: r.id,
      requirement: r.requirement,
      category: r.category,
      status: r.status,
      confidence: r.confidence,
      reason: r.reason,
      evidence: r.evidence,
      relevantFiles: r.relevantFiles,
      createdAt: now,
      updatedAt: now,
    })),
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

function RequirementBreakdown({
  requirements,
}: {
  requirements: MilestoneAnalysisRequirementResponse[];
}) {
  const [filter, setFilter] = useState<"all" | MilestoneAnalysisRequirementResponse["status"]>(
    "all",
  );

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
                  <span className="analysis-req-id">{requirement.requirementId}</span>
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
  const roundedScore = Math.round(analysis.overallScore);
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
          { label: "Requirements", value: fmtCount(analysis.totalRequirements) },
          { label: "Passed", value: fmtCount(analysis.passed), tone: "#22c55e" },
          { label: "Partial", value: fmtCount(analysis.partial), tone: "#eab308" },
          { label: "Failed", value: fmtCount(analysis.failed), tone: "#ef4444" },
          { label: "Files analyzed", value: fmtCount(analysis.codeFilesAnalyzed) },
          { label: "Chunks indexed", value: fmtCount(analysis.codeChunksIndexed) },
          { label: "OpenAI tokens", value: fmtCount(analysis.totalOpenAITokens ?? 0) },
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
  onRepoSubmit,
  onDispute,
  role,
  isDisabled = false,
}: {
  milestoneId: string;
  githubRepo: string | null;
  token: string | null;
  onReleaseFunds: () => Promise<void>;
  onRepoSubmit?: (repoUrl: string) => Promise<void>;
  onDispute?: () => Promise<void>;
  role: "provider" | "consumer";
  isDisabled?: boolean;
}) {
  const isProvider = role === "provider";
  const [sourceMode, setSourceMode] = useState<"zip" | "github">(githubRepo ? "github" : "zip");
  const [codebase, setCodebase] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* GitHub repo picker */
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [reposError, setReposError] = useState<string | null>(null);
  const [repoSearch, setRepoSearch] = useState("");
  const [repoPage, setRepoPage] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [repoSubmitting, setRepoSubmitting] = useState(false);
  const [repoSubmitError, setRepoSubmitError] = useState<string | null>(null);

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
  const [disputeLoading, setDisputeLoading] = useState(false);
  const [disputeError, setDisputeError] = useState<string | null>(null);

  const codebaseOk = isProvider
    ? sourceMode === "github"
      ? !!githubRepo
      : !!codebase
    : !!githubRepo;
  const hasAnalyses = analyses.length > 0;

  const attachFile = (file: File) => setCodebase(file);

  const refreshAnalyses = useCallback(
    async (showSpinner = true): Promise<StoredAnalysisResult[]> => {
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
    },
    [token, milestoneId],
  );

  useEffect(() => {
    setSourceMode(githubRepo ? "github" : "zip");
  }, [githubRepo]);

  useEffect(() => {
    if (!token) return;
    void refreshAnalyses();
  }, [refreshAnalyses, token, milestoneId]);

  useEffect(() => {
    if (!isProvider || sourceMode !== "github" || !token) return;
    setReposLoading(true);
    setReposError(null);
    githubApi
      .listRepos(token)
      .then(setRepos)
      .catch(() => setReposError("Could not load repositories."))
      .finally(() => setReposLoading(false));
  }, [isProvider, sourceMode, token]);

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

  /* Repo pagination */
  const REPOS_PER_PAGE = 6;
  const filteredRepos = repos.filter((r) =>
    r.full_name.toLowerCase().includes(repoSearch.toLowerCase()),
  );
  const totalRepoPages = Math.max(1, Math.ceil(filteredRepos.length / REPOS_PER_PAGE));
  const currentRepoPage = Math.min(repoPage, totalRepoPages);
  const pagedRepos = filteredRepos.slice(
    (currentRepoPage - 1) * REPOS_PER_PAGE,
    currentRepoPage * REPOS_PER_PAGE,
  );

  return (
    <>
      {/* ── Provider submission UI ── */}
      {isProvider && (
        <>
          {/* Minimal tab bar */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--line)",
              marginBottom: 20,
            }}
          >
            {(["zip", "github"] as const).map((mode) => (
              <button
                key={mode}
                disabled={isDisabled}
                onClick={() => setSourceMode(mode)}
                style={{
                  padding: "8px 18px",
                  background: "transparent",
                  border: "none",
                  borderBottom: `2px solid ${sourceMode === mode ? "var(--ink)" : "transparent"}`,
                  color: sourceMode === mode ? "var(--ink)" : "var(--ink-dim)",
                  fontFamily: "var(--display)",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  marginBottom: -1,
                  transition: "color 0.15s, border-color 0.15s",
                }}
              >
                {mode === "zip" ? "Upload .zip" : "GitHub Repo"}
              </button>
            ))}
          </div>

          {/* Zip panel */}
          {sourceMode === "zip" && (
            <div style={{ marginBottom: 20 }}>
              {codebase ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px",
                    border: "1px solid var(--line)",
                    borderRadius: 6,
                    background: "var(--panel)",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontFamily: "var(--mono)",
                        color: "var(--ink)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {codebase.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 2 }}>
                      {fmtBytes(codebase.size)} · ready for analysis
                    </div>
                  </div>
                  <button
                    className="btn"
                    style={{ fontSize: 11, flexShrink: 0 }}
                    onClick={() => setCodebase(null)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    border: `1px dashed ${dragOver ? "var(--ink)" : "var(--line)"}`,
                    borderRadius: 6,
                    padding: "36px 24px",
                    textAlign: "center",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    transition: "border-color 0.15s, background 0.15s",
                    background: dragOver ? "var(--panel)" : "transparent",
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                  onClick={() => { if (!isDisabled) fileInputRef.current?.click(); }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    if (!isDisabled) setDragOver(true);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (!isDisabled) setDragOver(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    if (isDisabled) return;
                    const f = e.dataTransfer.files[0];
                    if (f) attachFile(f);
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10, opacity: 0.5 }}>⇪</div>
                  <div
                    style={{
                      fontFamily: "var(--display)",
                      fontWeight: 600,
                      fontSize: 12,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--ink)",
                      marginBottom: 6,
                    }}
                  >
                    Drop .zip archive here
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-dim)" }}>
                    or{" "}
                    <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                      click to browse
                    </span>{" "}
                    · max 50 MB
                  </div>
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
              )}
            </div>
          )}

          {/* GitHub panel */}
          {sourceMode === "github" && (
            <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--ink-dim)",
                    fontFamily: "var(--display)",
                  }}
                >
                  Repositories accessible via GitHub App
                </span>
                <button
                  className="btn"
                  style={{ fontSize: 11 }}
                  disabled={isDisabled}
                  onClick={() => {
                    const state = JSON.stringify({ milestoneRedirect: window.location.pathname });
                    window.location.href = buildGithubAppInstallUrl(state);
                  }}
                >
                  Grant access ↗
                </button>
              </div>

              {/* Currently linked repo */}
              {githubRepo && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    border: "1px solid var(--neon)",
                    borderRadius: 6,
                    background: "var(--neon-bg)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--neon)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "var(--mono)",
                      fontSize: 13,
                      color: "var(--ink)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {githubRepo}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--neon)",
                      fontFamily: "var(--display)",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    LINKED
                  </span>
                </div>
              )}

              {/* Repo loader / list */}
              {reposLoading ? (
                <div style={{ fontSize: 12, color: "var(--ink-dim)", padding: "8px 0" }}>
                  Loading repositories…
                </div>
              ) : reposError ? (
                <div style={{ fontSize: 12, color: "var(--red)", padding: "6px 0" }}>
                  {reposError}
                </div>
              ) : repos.length === 0 ? (
                <div style={{ fontSize: 12, color: "var(--ink-dim)", padding: "8px 0" }}>
                  No repositories found. Grant the app access to your repos first.
                </div>
              ) : (
                <>
                  {/* Search */}
                  <input
                    className="form-input"
                    placeholder="Search repositories…"
                    value={repoSearch}
                    onChange={(e) => {
                      setRepoSearch(e.target.value);
                      setRepoPage(1);
                    }}
                    style={{ fontSize: 12 }}
                  />

                  {/* Repo rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {pagedRepos.length === 0 ? (
                      <div style={{ fontSize: 12, color: "var(--ink-dim)", padding: "8px 0" }}>
                        No results for "{repoSearch}".
                      </div>
                    ) : (
                      pagedRepos.map((repo) => (
                        <button
                          key={repo.id}
                          disabled={isDisabled}
                          onClick={() =>
                            setSelectedRepo((prev) => (prev?.id === repo.id ? null : repo))
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 14px",
                            border: `1px solid ${selectedRepo?.id === repo.id ? "var(--ink)" : "var(--line)"}`,
                            borderRadius: 6,
                            background:
                              selectedRepo?.id === repo.id ? "var(--panel)" : "transparent",
                            cursor: "pointer",
                            textAlign: "left",
                            width: "100%",
                            transition: "border-color 0.15s, background 0.15s",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: repo.private ? "var(--ink-dim)" : "var(--neon)",
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              flex: 1,
                              fontFamily: "var(--mono)",
                              fontSize: 13,
                              color: "var(--ink)",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {repo.full_name}
                          </span>
                          {repo.private && (
                            <span style={{ fontSize: 10, color: "var(--ink-dim)", flexShrink: 0 }}>
                              private
                            </span>
                          )}
                          {repo.language && (
                            <span style={{ fontSize: 10, color: "var(--ink-dim)", flexShrink: 0 }}>
                              {repo.language}
                            </span>
                          )}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Pagination */}
                  {totalRepoPages > 1 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        className="btn"
                        style={{ fontSize: 11, padding: "3px 10px" }}
                        disabled={currentRepoPage <= 1}
                        onClick={() => setRepoPage((p) => p - 1)}
                      >
                        ← Prev
                      </button>
                      <span
                        style={{
                          fontSize: 11,
                          color: "var(--ink-dim)",
                          fontFamily: "var(--display)",
                        }}
                      >
                        {currentRepoPage} / {totalRepoPages}
                      </span>
                      <button
                        className="btn"
                        style={{ fontSize: 11, padding: "3px 10px" }}
                        disabled={currentRepoPage >= totalRepoPages}
                        onClick={() => setRepoPage((p) => p + 1)}
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Submit selected repo */}
              {selectedRepo && onRepoSubmit && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 10,
                    paddingTop: 10,
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  {repoSubmitError && (
                    <span style={{ fontSize: 11, color: "var(--red)" }}>{repoSubmitError}</span>
                  )}
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: 12 }}
                    disabled={repoSubmitting || isDisabled}
                    onClick={async () => {
                      setRepoSubmitting(true);
                      setRepoSubmitError(null);
                      try {
                        await onRepoSubmit(selectedRepo.html_url);
                        setSelectedRepo(null);
                      } catch (e) {
                        setRepoSubmitError(
                          e instanceof Error ? e.message : "Failed to submit repo.",
                        );
                      } finally {
                        setRepoSubmitting(false);
                      }
                    }}
                  >
                    {repoSubmitting ? "Submitting…" : `Use ${selectedRepo.name} →`}
                  </button>
                </div>
              )}
            </div>
          )}

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
            <div className="cta-hint" style={{ marginTop: 4 }}>
              {codebaseOk
                ? "Code submitted · consumer can now run analysis"
                : "Connect a GitHub repo or upload a ZIP to submit your codebase"}
            </div>
          </div>
        </>
      )}

      {/* ── Consumer UI ── */}
      {!isProvider && (
        <>
          <div className="deliver-zone" style={{ marginBottom: 20 }}>
            <div className="deliver-left">
              {githubRepo ? (
                <div className="upload-target filled" style={{ cursor: "default" }}>
                  <div className="ut-pulse-ring r1" />
                  <div className="ut-pulse-ring r2" />
                  <div className="ut-pulse-ring r3" />
                  <div className="ut-scan" />
                  <div className="ut-filled-content">
                    <div className="ut-ok-icon">◈</div>
                    <div className="ut-filled-name">{githubRepo}</div>
                    <div className="ut-filled-meta">GitHub repo · submitted by provider</div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    border: "1px dashed var(--line)",
                    borderRadius: 8,
                    padding: "32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 14,
                    background: "var(--panel)",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: "2px solid var(--line)",
                      borderTopColor: "var(--ink-dim)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      animation: "spin 2.4s linear infinite",
                      opacity: 0.55,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--display)",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--ink)",
                        marginBottom: 6,
                      }}
                    >
                      {hasAnalyses ? "Code analyzed via ZIP" : "Awaiting provider submission"}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-dim)", maxWidth: 320 }}>
                      {hasAnalyses
                        ? "Provider submitted a ZIP archive — view stored analyses below"
                        : "The provider must connect a GitHub repo or upload a ZIP archive before you can run analysis."}
                    </div>
                  </div>
                  {!hasAnalyses && (
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      {["GitHub repo", "ZIP archive"].map((label) => (
                        <span
                          key={label}
                          style={{
                            fontSize: 11,
                            fontFamily: "var(--display)",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            color: "var(--ink-mute)",
                            border: "1px solid var(--line)",
                            borderRadius: 4,
                            padding: "3px 10px",
                            textTransform: "uppercase",
                          }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="ut-meta-row">
                {githubRepo ? (
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
                  <span className={"ut-meta-chip status" + (hasAnalyses ? " ok" : "")}>
                    <span className="ut-dot" />
                    {hasAnalyses ? "ZIP analyzed" : "No code submitted yet"}
                  </span>
                )}
              </div>
            </div>
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
              <div className={"item " + (githubRepo ? "ok" : "no")}>
                <span className="chk">{githubRepo ? "✓" : ""}</span> CODE SOURCE
              </div>
              <div className="item ok">
                <span className="chk">✓</span> ESCROW LOCKED
              </div>
              <div className={"item " + (hasAnalyses ? "ok" : "no")}>
                <span className="chk">{hasAnalyses ? "✓" : ""}</span> STORED ANALYSIS
              </div>
            </div>
            <button
              className="btn-generate"
              disabled={!githubRepo || isDisabled}
              onClick={runAnalysis}
              title={
                !githubRepo
                  ? hasAnalyses
                    ? "Provider submitted via ZIP — view stored analyses below"
                    : "Waiting for provider to submit code"
                  : undefined
              }
            >
              {hasAnalyses ? "Run New Analysis" : "Run Analysis"}
              <span className="ar">→</span>
            </button>
            <div className="cta-hint">
              {githubRepo
                ? "LLM-powered · semantic analysis · 30–120 seconds"
                : hasAnalyses
                  ? "Provider submitted code via ZIP — re-analysis requires a connected GitHub repo"
                  : "Waiting for provider to submit a GitHub repo or ZIP archive"}
            </div>
          </div>
        </>
      )}

      {/* ── Analysis history ── */}
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
              const score = Math.round(analysis.overallScore);
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
                    <span>{fmtCount(analysis.totalRequirements)} requirements</span>
                    <span>{fmtCount(analysis.codeFilesAnalyzed)} files analyzed</span>
                  </div>

                  <div className="analysis-card-breakdown">
                    <span className="pass">{fmtCount(analysis.passed)} passed</span>
                    <span className="partial">{fmtCount(analysis.partial)} partial</span>
                    <span className="fail">{fmtCount(analysis.failed)} failed</span>
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

      {latestAnalysis && !isProvider && (
        <div className="analysis-actions">
          <div>
            <div className="analysis-actions-title">Consumer actions</div>
            <div className="analysis-actions-copy">
              Review the latest stored analysis before releasing the escrowed funds.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              className="btn"
              type="button"
              onClick={() => setActiveAnalysis(latestAnalysis)}
              disabled={isDisabled}
            >
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
              disabled={releaseLoading || isDisabled}
            >
              {releaseLoading ? "Releasing funds…" : "Release funds"}
            </button>
            {onDispute && (
              <button
                className="btn btn-danger"
                onClick={async () => {
                  setDisputeLoading(true);
                  setDisputeError(null);
                  try {
                    await onDispute();
                  } catch (err) {
                    setDisputeError(
                      err instanceof Error ? err.message : "Failed to dispute milestone.",
                    );
                  } finally {
                    setDisputeLoading(false);
                  }
                }}
                disabled={disputeLoading || isDisabled}
              >
                {disputeLoading ? "Disputing…" : "Dispute"}
              </button>
            )}
          </div>
          {disputeError && (
            <div className="auth-error" style={{ marginTop: 8 }}>
              {disputeError}
            </div>
          )}
        </div>
      )}

      {releaseError && <div className="auth-error">{releaseError}</div>}

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
                {!isProvider && (
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
                    disabled={releaseLoading || isDisabled}
                  >
                    {releaseLoading ? "Releasing funds…" : "Release funds"}
                  </button>
                )}
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
