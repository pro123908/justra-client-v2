import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "@/components/app/Navbar";
import { useAuth } from "@/lib/auth";
import { milestoneApi, MilestoneStatus, type MilestoneResponse } from "@/lib/api";
import "@/components/git-escrow.css";

export const Route = createFileRoute("/projects/$projectId_/milestones/$milestoneId")({
  component: MilestoneDetailPage,
  head: () => ({
    meta: [
      { title: "Milestone — Git Escrow" },
      { name: "description", content: "Milestone detail and escrow actions." },
    ],
  }),
});

const shortenAddr = (addr: string) =>
  addr.length <= 10 ? addr : `${addr.slice(0, 4)}…${addr.slice(-4)}`;

const fmtDate = (s?: string | null) => {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d
    .toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })
    .toUpperCase();
};

const fmtDateTime = (s?: string | null) => {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d
    .toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .toUpperCase();
};

const truncMiddle = (s?: string | null, head = 6, tail = 6) => {
  if (!s) return "—";
  if (s.length <= head + tail + 1) return s;
  return `${s.slice(0, head)}…${s.slice(-tail)}`;
};

function statusGroup(s: MilestoneStatus): "pending" | "approved" | "rejected" {
  switch (s) {
    case MilestoneStatus.PENDING_PROVIDER_APPROVAL:
    case MilestoneStatus.PENDING_DEPOSIT:
      return "pending";
    case MilestoneStatus.APPROVED:
    case MilestoneStatus.FUNDED:
    case MilestoneStatus.COMPLETED:
      return "approved";
    case MilestoneStatus.REJECTED:
    case MilestoneStatus.CANCELLED:
      return "rejected";
    default:
      return "pending";
  }
}

function statusLabel(s: MilestoneStatus) {
  switch (s) {
    case MilestoneStatus.PENDING_PROVIDER_APPROVAL:
      return "Pending provider approval";
    case MilestoneStatus.APPROVED:
      return "Approved";
    case MilestoneStatus.REJECTED:
      return "Rejected";
    case MilestoneStatus.PENDING_DEPOSIT:
      return "Awaiting deposit";
    case MilestoneStatus.FUNDED:
      return "Funded · escrow live";
    case MilestoneStatus.COMPLETED:
      return "Completed";
    case MilestoneStatus.CANCELLED:
      return "Cancelled";
    default:
      return String(s);
  }
}

function MilestoneDetailPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { projectId, milestoneId } = Route.useParams();

  const [milestone, setMilestone] = useState<MilestoneResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // reject flow
  const [rejecting, setRejecting] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  // specs modal
  const [specsOpen, setSpecsOpen] = useState(false);
  const [specsContent, setSpecsContent] = useState<string | null>(null);
  const [specsLoading, setSpecsLoading] = useState(false);
  const [specsError, setSpecsError] = useState("");

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
    else if (!user.role) navigate({ to: "/role" });
  }, [user, navigate]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    milestoneApi
      .get(token, milestoneId)
      .then(setMilestone)
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, [token, milestoneId]);

  if (!user || !user.role) return null;

  if (loading) {
    return (
      <div className="git-escrow-root">
        <div className="wrap">
          <Navbar />
          <div className="empty-state" style={{ marginTop: 60 }}>
            <div className="ic">…</div>
            <h3>Loading milestone</h3>
          </div>
        </div>
      </div>
    );
  }

  if (!milestone || fetchError) {
    return (
      <div className="git-escrow-root">
        <div className="wrap">
          <Navbar />
          <div className="empty-state" style={{ marginTop: 60 }}>
            <div className="ic">!</div>
            <h3>Milestone not found</h3>
            <p>This milestone doesn't exist or the link is invalid.</p>
            <Link
              to="/projects/$projectId"
              params={{ projectId }}
              className="btn-action"
              style={{ textDecoration: "none" }}
            >
              ← Back to project
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const group = statusGroup(milestone.status);
  const isProvider = user.role === "provider";
  const isActionable = isProvider && milestone.status === MilestoneStatus.PENDING_PROVIDER_APPROVAL;

  const handleAccept = async () => {
    setActionLoading(true);
    setActionError("");
    try {
      const updated = await milestoneApi.accept(token!, milestoneId);
      setMilestone(updated);
      setRejecting(false);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Failed to accept milestone.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewSpecs = async () => {
    if (!milestone.specCid) return;
    setSpecsOpen(true);
    setSpecsContent(null);
    setSpecsError("");
    setSpecsLoading(true);
    try {
      const { url } = await milestoneApi.getPinataGatewayUrl(token!);
      const res = await fetch(`${url}/${milestone.specCid}`);
      if (!res.ok) throw new Error(`Failed to fetch spec: ${res.status}`);
      const { content } = await res.json();
      setSpecsContent(content);
    } catch (e) {
      setSpecsError(e instanceof Error ? e.message : "Failed to load spec content.");
    } finally {
      setSpecsLoading(false);
    }
  };

  const handleReject = async () => {
    if (rejectNote.trim().length < 4) return;
    setActionLoading(true);
    setActionError("");
    try {
      const updated = await milestoneApi.reject(token!, milestoneId, rejectNote.trim());
      setMilestone(updated);
      setRejecting(false);
      setRejectNote("");
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Failed to reject milestone.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="git-escrow-root">
      <div className="wrap">
        <Navbar />

        <div className="proj-header">
          <div>
            <div className="crumb">
              <Link to="/dashboard">Dashboard</Link>
              <span className="sep">/</span>
              <Link to="/projects/$projectId" params={{ projectId }}>
                {milestone.project?.title ?? projectId}
              </Link>
              <span className="sep">/</span>
              <span style={{ color: "var(--neon)" }}>{milestone.title}</span>
            </div>
            <div className="ph-id">▸ {milestone.id}</div>
            <h1>{milestone.title}</h1>
            <div className="ph-meta">
              <span className={"ms-status " + group}>
                <span className="d" />
                {statusLabel(milestone.status)}
              </span>
              <span>
                role <b style={{ color: "var(--neon)" }}>{user.role.toUpperCase()}</b>
              </span>
            </div>
          </div>
          <Link
            to="/projects/$projectId"
            params={{ projectId }}
            className="btn"
            style={{ textDecoration: "none", alignSelf: "flex-start" }}
          >
            ← Back to project
          </Link>
        </div>

        {/* Hero */}
        <div className="ms-detail" style={{ marginTop: 32 }}>
          <div className="ms-hero">
            <div className="ms-hero-amount">
              <span className="lbl">Escrow value</span>
              <span className="val">◎ {milestone.amount || "0"}</span>
              <span className="sub">SOL · locked on approval</span>
            </div>
            <div className="ms-hero-status">
              <span className={"ms-status " + group + " lg"}>
                <span className="d" /> {statusLabel(milestone.status)}
              </span>
              {milestone.provider && (
                <div className="ms-hero-provider">
                  <span>Provider</span> <b>{shortenAddr(milestone.provider.publicKey)}</b>
                </div>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="ms-detail-grid">
            <div className="ms-cell">
              <div className="form-label">▸ Start</div>
              <div className="ms-detail-val">{fmtDate(milestone.startDate)}</div>
            </div>
            <div className="ms-cell">
              <div className="form-label">▸ End</div>
              <div className="ms-detail-val">{fmtDate(milestone.endDate)}</div>
            </div>
            <div className="ms-cell">
              <div className="form-label">▸ Created</div>
              <div className="ms-detail-val">{fmtDate(milestone.createdAt)}</div>
            </div>
            <div className="ms-cell">
              <div className="form-label">▸ Updated</div>
              <div className="ms-detail-val">{fmtDate(milestone.updatedAt)}</div>
            </div>
          </div>

          {/* Description */}
          <div className="form-row" style={{ marginTop: 18 }}>
            <div className="form-label">▸ Description / acceptance criteria</div>
            <div className="ms-detail-desc">{milestone.description || "—"}</div>
          </div>

          {/* Technical fields */}
          <div className="ms-detail-grid two" style={{ marginTop: 18 }}>
            <div className="ms-cell mono-cell">
              <div className="form-label">▸ Spec CID</div>
              <div className="ms-mono" title={milestone.specCid || ""}>
                {milestone.specCid ? truncMiddle(milestone.specCid, 10, 8) : "— not pinned"}
              </div>
              {milestone.specCid && (
                <button
                  className="btn"
                  style={{ marginTop: 8, fontSize: 12 }}
                  onClick={handleViewSpecs}
                >
                  Milestone Specs
                </button>
              )}
            </div>
            <div className="ms-cell mono-cell">
              <div className="form-label">▸ Escrow PDA</div>
              <div className="ms-mono" title={milestone.pda || ""}>
                {milestone.pda ? truncMiddle(milestone.pda, 10, 8) : "— not derived"}
              </div>
            </div>
            <div className="ms-cell">
              <div className="form-label">▸ Deposit deadline</div>
              <div className="ms-detail-val">{fmtDateTime(milestone.depositDeadline)}</div>
            </div>
            <div className="ms-cell">
              <div className="form-label">▸ Funded at</div>
              <div className="ms-detail-val">{fmtDateTime(milestone.fundedAt)}</div>
            </div>
          </div>

          {/* Rejection reason */}
          {milestone.rejectionReason && (
            <div className="form-row" style={{ marginTop: 18 }}>
              <div className="form-label" style={{ color: "var(--red)" }}>
                ▸ Rejection reason
              </div>
              <div className="ms-detail-desc" style={{ borderColor: "var(--red)" }}>
                {milestone.rejectionReason}
              </div>
            </div>
          )}

          {/* Provider actions */}
          {isActionable && (
            <div style={{ marginTop: 32 }}>
              <div
                style={{
                  borderTop: "1px dashed var(--line)",
                  paddingTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div className="form-label" style={{ fontSize: 13 }}>
                  ▸ Provider action required
                </div>

                {!rejecting ? (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="btn btn-primary"
                      onClick={handleAccept}
                      disabled={actionLoading}
                    >
                      {actionLoading ? "Accepting…" : "Accept milestone"}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setRejecting(true);
                        setActionError("");
                      }}
                      disabled={actionLoading}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <label className="form-label">▸ Rejection reason (required, 4+ chars)</label>
                    <textarea
                      className="form-textarea"
                      placeholder="e.g. Scope is too broad — please split into separate milestones."
                      value={rejectNote}
                      onChange={(e) => setRejectNote(e.target.value)}
                      autoFocus
                    />
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn"
                        onClick={() => {
                          setRejecting(false);
                          setRejectNote("");
                          setActionError("");
                        }}
                        disabled={actionLoading}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={handleReject}
                        disabled={actionLoading || rejectNote.trim().length < 4}
                      >
                        {actionLoading ? "Rejecting…" : "Confirm rejection"}
                      </button>
                    </div>
                  </div>
                )}

                {actionError && <div className="auth-error">{actionError}</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {specsOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSpecsOpen(false)}
        >
          <div
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              padding: 24,
              maxWidth: 700,
              width: "90%",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="form-label" style={{ fontSize: 13 }}>
                ▸ Milestone Specs
              </div>
              <button className="btn" style={{ fontSize: 12 }} onClick={() => setSpecsOpen(false)}>
                Close
              </button>
            </div>
            {specsLoading && <div style={{ color: "var(--muted)" }}>Loading…</div>}
            {specsError && <div className="auth-error">{specsError}</div>}
            {specsContent !== null && !specsLoading && (
              <pre
                style={{
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: 13,
                  color: "var(--fg)",
                  margin: 0,
                }}
              >
                {specsContent}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
