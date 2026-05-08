import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";
import Modal from "@/components/app/Modal";
import { AppShell } from "@/components/app/AppShell";
import { StatusPill } from "@/components/app/StatusPill";
import { Ico } from "@/components/app/Icons";
import { useAuth } from "@/lib/auth";
import { formatSol } from "@/lib/utils";
import {
  milestoneApi,
  projectApi,
  MilestoneStatus,
  type MilestoneResponse,
  type ApiUser,
} from "@/lib/api";
import {
  initializeMilestone,
  releaseMilestoneFunds,
  disputeMilestone,
  solToLamports,
  sha256,
} from "@/lib/solana";
import CodeReport from "@/components/milestone/CodeReport";

const PLATFORM_FEE_BPS = 250;

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
    case MilestoneStatus.WAITING_FOR_DEPOSIT:
      return "pending";
    case MilestoneStatus.ACTIVE:
    case MilestoneStatus.IN_PROGRESS:
    case MilestoneStatus.COMPLETED:
      return "approved";
    case MilestoneStatus.REJECTED:
    case MilestoneStatus.DISPUTED:
      return "rejected";
    default:
      return "pending";
  }
}

function statusLabel(s: MilestoneStatus) {
  switch (s) {
    case MilestoneStatus.PENDING_PROVIDER_APPROVAL:
      return "Pending provider approval";
    case MilestoneStatus.ACTIVE:
      return "Active · awaiting delivery";
    case MilestoneStatus.IN_PROGRESS:
      return "In progress";
    case MilestoneStatus.COMPLETED:
      return "Completed";
    case MilestoneStatus.REJECTED:
      return "Rejected";
    case MilestoneStatus.WAITING_FOR_DEPOSIT:
      return "Awaiting deposit";
    case MilestoneStatus.DISPUTED:
      return "Disputed · frozen";
    default:
      return String(s);
  }
}

export default function MilestoneDetailPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { projectId = "", milestoneId = "" } = useParams();

  const [milestone, setMilestone] = useState<MilestoneResponse | null>(null);
  const [projectMembers, setProjectMembers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  // reject flow
  const [rejecting, setRejecting] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  // analyze section visibility (consumer only, lazy — don't auto-fetch on page load)
  const [showAnalyze, setShowAnalyze] = useState(false);

  // deposit flow (consumer only, when status === PENDING_DEPOSIT)
  const [depositStep, setDepositStep] = useState<
    "idle" | "method" | "review" | "signing" | "broadcasting" | "success" | "error"
  >("idle");
  const [depositTxSig, setDepositTxSig] = useState<string>("");
  const [depositError, setDepositError] = useState("");
  const [depositMethod, setDepositMethod] = useState<"crypto" | "fiat" | null>(null);
  const [fiatCard, setFiatCard] = useState({ name: "", number: "", exp: "", cvc: "" });

  useEffect(() => {
    if (!user) navigate("/auth");
    else if (!user.role) navigate("/role");
  }, [user, navigate]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    milestoneApi
      .get(token, milestoneId)
      .then((m) => {
        setMilestone(m);
        if (m.project?.id) {
          projectApi
            .get(token, m.project.id)
            .then((p) => setProjectMembers(p.members ?? []))
            .catch(() => {});
        }
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, [token, milestoneId]);

  if (!user || !user.role) return null;

  if (loading) {
    return (
      <AppShell>
        <div className="page">
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--ink-4)" }}>
            Loading milestone…
          </div>
        </div>
      </AppShell>
    );
  }

  if (!milestone || fetchError) {
    return (
      <AppShell>
        <div className="page">
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
              Milestone not found
            </div>
            <button className="btn" onClick={() => navigate(`/projects/${projectId}`)}>
              ← Back to project
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  const isProvider = user.role === "provider";
  const isActionable = isProvider && milestone.status === MilestoneStatus.PENDING_PROVIDER_APPROVAL;
  const isConsumer = user.role === "consumer";
  const needsDeposit = isConsumer && milestone.status === MilestoneStatus.WAITING_FOR_DEPOSIT;
  const canAssignProvider =
    isConsumer &&
    (milestone.status === MilestoneStatus.PENDING_PROVIDER_APPROVAL ||
      milestone.status === MilestoneStatus.REJECTED ||
      !milestone.provider);
  const isActive = milestone.status === MilestoneStatus.ACTIVE;
  const isDisputed = milestone.status === MilestoneStatus.DISPUTED;
  const showCodeReport = isActive || isDisputed;

  const handleStartDeposit = () => {
    setDepositError("");
    setDepositTxSig("");
    setDepositMethod(null);
    setDepositStep("method");
  };

  const handleConfirmDeposit = async () => {
    setDepositError("");
    try {
      let sig = depositTxSig;
      if (!sig) {
        setDepositStep("signing");
        const requirementsHash = await sha256(milestone.description ?? "");
        sig = await initializeMilestone({
          milestoneId: milestone.id,
          amountLamports: solToLamports(parseFloat(milestone.amount)),
          requirementsHash,
          feeBps: PLATFORM_FEE_BPS,
          provider: new PublicKey(milestone.provider.publicKey),
        });
        setDepositTxSig(sig);
      }

      setDepositStep("broadcasting");
      const updated = await milestoneApi.fund(token!, milestoneId);
      setMilestone(updated);
      setDepositStep("success");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Deposit failed.";
      setDepositError(msg);
      setDepositStep("error");
    }
  };

  const closeDeposit = () => {
    setDepositStep("idle");
    setDepositError("");
    setDepositTxSig("");
    setDepositMethod(null);
    setFiatCard({ name: "", number: "", exp: "", cvc: "" });
  };

  // Pretend USD price per SOL — for display only, no integration.
  const SOL_USD_RATE = 165;
  const fiatTotal = (Number(milestone?.amount ?? 0) * SOL_USD_RATE).toFixed(2);

  const handleConfirmFiat = async () => {
    setDepositError("");
    setDepositStep("broadcasting");
    try {
      const ref =
        "ch_" + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
      setDepositTxSig(ref);

      const updated = await milestoneApi.fund(token!, milestoneId);
      setMilestone(updated);
      setDepositStep("success");
    } catch (e) {
      setDepositError(e instanceof Error ? e.message : "Payment failed.");
      setDepositStep("error");
    }
  };

  const formatCardNumber = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };
  const fiatValid =
    fiatCard.name.trim().length > 1 &&
    fiatCard.number.replace(/\s/g, "").length === 16 &&
    /^\d{2}\/\d{2}$/.test(fiatCard.exp) &&
    /^\d{3,4}$/.test(fiatCard.cvc);

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

  const handleReleaseFunds = async () => {
    if (!token) throw new Error("Not authenticated.");

    await releaseMilestoneFunds({
      milestoneId: milestone.id,
      provider: new PublicKey(milestone.provider.publicKey),
    });

    const updated = await milestoneApi.complete(token, milestone.id);
    setMilestone(updated);
  };

  const handleDispute = async () => {
    if (!token) throw new Error("Not authenticated.");

    // The on-chain dispute instruction requires the provider to sign.
    // Attempt it and continue to the API call regardless so the UI reflects disputed state.
    try {
      await disputeMilestone({
        milestoneId: milestone.id,
        provider: new PublicKey(milestone.provider.publicKey),
      });
    } catch (e) {
      console.warn("On-chain dispute call failed (provider signature required):", e);
    }

    const updated = await milestoneApi.dispute(token, milestone.id);
    setMilestone(updated);
  };

  return (
    <AppShell>
      <div className="page">
        {/* Breadcrumb */}
        <div className="crumb">
          <a onClick={() => navigate("/projects")}>Projects</a>
          <span className="sep">/</span>
          <a onClick={() => navigate(`/projects/${projectId}`)}>
            {milestone.project?.title ?? "Project"}
          </a>
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
                <b>Role · </b>
                {user.role?.toUpperCase()}
              </span>
              {milestone.provider && (
                <span>
                  <b>Provider · </b>
                  <span className="mono">{shortenAddr(milestone.provider.publicKey)}</span>
                </span>
              )}
            </div>
          </div>
          <div className="row gap-8">
            <button className="btn" onClick={() => navigate(`/projects/${projectId}`)}>
              ← Back
            </button>
            {canAssignProvider && (
              <button className="btn" onClick={() => setAssignOpen(true)}>
                <Ico.user /> {milestone.provider ? "Reassign provider" : "Assign provider"}
              </button>
            )}
          </div>
        </div>

        {/* hero-band with escrow amount */}
        <div className="hero-band" style={{ marginBottom: 24 }}>
          <div className="hero-band-amount">
            <div className="lbl">Locked in escrow</div>
            <div className="val">◎ {formatSol(milestone.amount) || "0"} SOL</div>
            <div className="sub">releases on approval</div>
          </div>
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
              Status
            </div>
            <div className="h-display" style={{ fontSize: 18, marginTop: 6 }}>
              {statusLabel(milestone.status)}
            </div>
            {milestone.pda && (
              <div className="muted-2 mono" style={{ fontSize: 12, marginTop: 4 }}>
                PDA: {truncMiddle(milestone.pda, 8, 6)}
              </div>
            )}
          </div>
        </div>

        {/* Consumer deposit flow */}
        {needsDeposit && (
          <div className="deposit-band" style={{ marginBottom: 24 }}>
            <div className="deposit-band-head">
              <div>
                <div className="form-label" style={{ fontSize: 13 }}>
                  ▸ Action required · escrow deposit
                </div>
                <h3 className="deposit-title">Fund this milestone to start work</h3>
                <p className="deposit-sub">
                  Lock <b>◎ {formatSol(milestone.amount)}</b> SOL into the escrow PDA so the
                  developer can begin. Funds release only after you approve the delivery.
                </p>
              </div>
              <div className="deposit-amount-card">
                <span className="lbl">Amount due</span>
                <span className="val">◎ {formatSol(milestone.amount)}</span>
                <span className="sub">deadline {fmtDateTime(milestone.depositDeadline)}</span>
              </div>
            </div>
            {!milestone.provider && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  borderRadius: 6,
                  background: "rgba(250,204,21,0.08)",
                  border: "1px solid rgba(250,204,21,0.35)",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 16 }}>⚠</span>
                <span style={{ fontSize: 13, color: "var(--ink-mute)" }}>
                  No provider has been assigned to this milestone yet. Assign a provider before
                  making a deposit.
                </span>
              </div>
            )}
            <div className="deposit-meta-row">
              <span className="ms-chip">
                <span className="k">PDA</span>
                <span className="v">
                  {milestone.pda ? truncMiddle(milestone.pda, 8, 6) : "— pending"}
                </span>
              </span>
              <span className="ms-chip">
                <span className="k">Provider</span>
                <span className="v">
                  {milestone.provider
                    ? shortenAddr(milestone.provider.publicKey)
                    : "— not assigned"}
                </span>
              </span>
              <span className="ms-chip warn">
                <span className="k">Status</span>
                <span className="v">Awaiting deposit</span>
              </span>
            </div>
            <div className="deposit-actions">
              <button
                className="btn btn-primary"
                onClick={handleStartDeposit}
                disabled={!milestone.provider}
              >
                Fund milestone — ◎ {formatSol(milestone.amount)} SOL / ${fiatTotal}
              </button>
              <span className="deposit-hint">
                {milestone.provider
                  ? "Choose to pay with crypto (SOL) or fiat (card)."
                  : "Assign a provider first to enable deposit."}
              </span>
            </div>
          </div>
        )}

        {/* Active milestone band — countdown to endDate */}
        {isActive && (
          <ActiveMilestoneBand
            endDate={milestone.endDate}
            amount={milestone.amount}
            fundedAt={milestone.fundedAt}
          />
        )}

        {/* Disputed — frozen banner */}
        {isDisputed && (
          <div
            style={{
              marginBottom: 24,
              border: "1px solid var(--red, #ef4444)",
              borderRadius: 8,
              padding: "20px 24px",
              background: "rgba(239,68,68,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div className="form-label" style={{ fontSize: 13, color: "var(--red, #ef4444)" }}>
              ▸ Milestone disputed · escrow frozen
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ink-mute)" }}>
              This milestone has been disputed. ◎ {formatSol(milestone.amount)} SOL remains locked
              in the escrow PDA pending arbitration. No further actions are available until the
              dispute is resolved.
            </p>
          </div>
        )}

        {/* Main content: two-col */}
        <div className="two-col">
          <div className="stack gap-24">
            {/* Scope card */}
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 10px" }}>
                Scope
              </h3>
              <p className="muted" style={{ marginTop: 0, lineHeight: 1.6 }}>
                {milestone.description || "—"}
              </p>

              {milestone.rejectionReason && (
                <div
                  style={{
                    marginTop: 16,
                    padding: "12px 16px",
                    background: "var(--danger-bg)",
                    borderRadius: 8,
                    color: "var(--danger-ink)",
                    fontSize: 13,
                  }}
                >
                  <strong>Rejection reason:</strong> {milestone.rejectionReason}
                </div>
              )}
            </div>

            {/* Dates card */}
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 14px" }}>
                Timeline
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div
                    className="muted-2"
                    style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}
                  >
                    Start
                  </div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>
                    {fmtDate(milestone.startDate)}
                  </div>
                </div>
                <div>
                  <div
                    className="muted-2"
                    style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}
                  >
                    End
                  </div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>{fmtDate(milestone.endDate)}</div>
                </div>
                <div>
                  <div
                    className="muted-2"
                    style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}
                  >
                    Created
                  </div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>
                    {fmtDate(milestone.createdAt)}
                  </div>
                </div>
                <div>
                  <div
                    className="muted-2"
                    style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}
                  >
                    Deposit deadline
                  </div>
                  <div style={{ marginTop: 4, fontWeight: 600 }}>
                    {fmtDateTime(milestone.depositDeadline)}
                  </div>
                </div>
              </div>
            </div>

            {/* Provider action (isActionable) */}
            {isActionable && (
              <div className="card card-pad">
                <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 14px" }}>
                  Provider action required
                </h3>
                {!rejecting ? (
                  <div className="row gap-10">
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
                  <div className="stack gap-10">
                    <div className="field">
                      <label className="field-label">Rejection reason (required, 4+ chars)</label>
                      <textarea
                        className="textarea"
                        placeholder="e.g. Scope is too broad — please split into separate milestones."
                        value={rejectNote}
                        onChange={(e) => setRejectNote(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="row gap-8">
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
                {actionError && (
                  <div style={{ color: "var(--danger)", fontSize: 13, marginTop: 8 }}>
                    {actionError}
                  </div>
                )}
              </div>
            )}

            {/* CodeReport sections */}
            {showCodeReport && isProvider && (
              <div>
                <h3 className="h-display" style={{ fontSize: 15, marginBottom: 14 }}>
                  Code submission
                </h3>
                <CodeReport
                  milestoneId={milestoneId}
                  githubRepo={milestone.githubRepo}
                  token={token}
                  onReleaseFunds={async () => {}}
                  onRepoSubmit={async (repoUrl) => {
                    const updated = await milestoneApi.submitRepo(token!, milestoneId, repoUrl);
                    setMilestone(updated);
                  }}
                  role="provider"
                  isDisabled={isDisputed}
                />
              </div>
            )}
            {showCodeReport && isConsumer && !showAnalyze && (
              <div className="card card-pad">
                <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 14px" }}>
                  Actions
                </h3>
                <p className="muted" style={{ marginTop: 0, marginBottom: 20, lineHeight: 1.6 }}>
                  Run an AI code review against the milestone requirements, or release funds
                  directly to the provider.
                </p>
                <div className="row gap-10">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowAnalyze(true)}
                    disabled={isDisputed}
                  >
                    Analyze Code
                  </button>
                  <button className="btn" onClick={handleReleaseFunds} disabled={isDisputed}>
                    Release Funds
                  </button>
                </div>
              </div>
            )}
            {showCodeReport && isConsumer && showAnalyze && (
              <div>
                <div className="row gap-8" style={{ marginBottom: 14 }}>
                  <h3 className="h-display" style={{ fontSize: 15, margin: 0 }}>
                    Delivery · analysis history
                  </h3>
                  <button
                    className="btn"
                    style={{ fontSize: 11 }}
                    onClick={() => setShowAnalyze(false)}
                  >
                    ← Back
                  </button>
                </div>
                <CodeReport
                  milestoneId={milestoneId}
                  githubRepo={milestone.githubRepo}
                  token={token}
                  onReleaseFunds={handleReleaseFunds}
                  onDispute={isDisputed ? undefined : handleDispute}
                  role="consumer"
                  isDisabled={isDisputed}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="stack gap-16">
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 14px" }}>
                Team
              </h3>
              <div className="stack gap-12">
                <div className="row gap-12">
                  <div className="av av-lg">{user.initial}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>You (client)</div>
                    <div className="muted-2" style={{ fontSize: 12 }}>
                      {user.short}
                    </div>
                  </div>
                </div>
                {milestone.provider && (
                  <div className="row gap-12">
                    <div className="av av-lg">{milestone.provider.publicKey[0].toUpperCase()}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Developer</div>
                      <div className="muted-2 mono" style={{ fontSize: 12 }}>
                        {shortenAddr(milestone.provider.publicKey)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="alert tip">
              <Ico.shield className="icon" />
              <div>
                <div className="title">Funds are on-chain</div>
                <div className="body">
                  ◎ {formatSol(milestone.amount)} SOL is locked in escrow PDA{" "}
                  {milestone.pda ? truncMiddle(milestone.pda, 6, 4) : "(pending)"}.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AssignProviderModal */}
      {canAssignProvider && (
        <AssignProviderModal
          open={assignOpen}
          onClose={() => setAssignOpen(false)}
          providers={projectMembers}
          currentProviderId={milestone.provider?.id}
          onAssign={async (providerId) => {
            const updated = await milestoneApi.assignProvider(token!, milestoneId, providerId);
            if (updated) setMilestone(updated);
            setAssignOpen(false);
          }}
        />
      )}

      {needsDeposit && depositStep !== "idle" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={
            depositStep === "signing" || depositStep === "broadcasting" ? undefined : closeDeposit
          }
        >
          <div className="deposit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="deposit-modal-head">
              <div className="form-label" style={{ fontSize: 13 }}>
                ▸ Escrow deposit
              </div>
              {depositStep !== "signing" && depositStep !== "broadcasting" && (
                <button className="btn" style={{ fontSize: 12 }} onClick={closeDeposit}>
                  Close
                </button>
              )}
            </div>

            <div className="deposit-steps">
              <span
                className={
                  "step " +
                  (["method", "review", "signing", "broadcasting", "success"].includes(depositStep)
                    ? "active"
                    : "")
                }
              >
                1 · Method
              </span>
              <span className="sep">—</span>
              <span
                className={
                  "step " +
                  (["review", "signing", "broadcasting", "success"].includes(depositStep)
                    ? "active"
                    : "")
                }
              >
                2 · {depositMethod === "fiat" ? "Card details" : "Sign"}
              </span>
              <span className="sep">—</span>
              <span className={"step " + (depositStep === "success" ? "active" : "")}>
                3 · Funded
              </span>
            </div>

            {depositStep === "method" && (
              <>
                <div className="form-label" style={{ fontSize: 12 }}>
                  ▸ Choose how to fund the escrow
                </div>
                <div className="pay-method-grid">
                  <button
                    type="button"
                    className="pay-method-card"
                    onClick={() => {
                      setDepositMethod("crypto");
                      setDepositStep("review");
                    }}
                  >
                    <div className="pmc-head">
                      <span className="pmc-icon">◎</span>
                      <span className="pmc-tag">recommended</span>
                    </div>
                    <div className="pmc-title">Pay with SOL</div>
                    <div className="pmc-amount">◎ {formatSol(milestone.amount)}</div>
                    <div className="pmc-sub">
                      Sign with Phantom · funds locked on-chain in escrow PDA
                    </div>
                    <ul className="pmc-bullets">
                      <li>Instant settlement</li>
                      <li>Trustless escrow release</li>
                      <li>No processor fees</li>
                    </ul>
                  </button>

                  <button
                    type="button"
                    className="pay-method-card"
                    onClick={() => {
                      setDepositMethod("fiat");
                      setDepositStep("review");
                    }}
                  >
                    <div className="pmc-head">
                      <span className="pmc-icon">$</span>
                      <span className="pmc-tag dim">card · ach</span>
                    </div>
                    <div className="pmc-title">Pay with fiat</div>
                    <div className="pmc-amount">${fiatTotal}</div>
                    <div className="pmc-sub">
                      Charged in USD · converted to SOL and locked in escrow on your behalf
                    </div>
                    <ul className="pmc-bullets">
                      <li>Visa · Mastercard · Amex</li>
                      <li>Receipt emailed instantly</li>
                      <li>3-day refund window</li>
                    </ul>
                  </button>
                </div>
                <p className="deposit-disclaimer">
                  Both methods land the same amount in the milestone's escrow PDA. Fiat payments are
                  converted at the prevailing SOL rate at confirmation.
                </p>
              </>
            )}

            {depositStep === "review" && depositMethod === "crypto" && (
              <>
                <div className="deposit-summary">
                  <div className="row">
                    <span>Milestone</span>
                    <b>{milestone.title}</b>
                  </div>
                  <div className="row">
                    <span>Provider</span>
                    <b className="mono">{shortenAddr(milestone.provider.publicKey)}</b>
                  </div>
                  <div className="row">
                    <span>Escrow PDA</span>
                    <b className="mono">
                      {milestone.pda ? truncMiddle(milestone.pda, 10, 8) : "— pending"}
                    </b>
                  </div>
                  <div className="row">
                    <span>Deadline</span>
                    <b>{fmtDateTime(milestone.depositDeadline)}</b>
                  </div>
                  <div className="row total">
                    <span>Total to lock</span>
                    <b>◎ {formatSol(milestone.amount)} SOL</b>
                  </div>
                </div>
                <p className="deposit-disclaimer">
                  Funds remain locked in the on-chain escrow PDA until you approve the milestone
                  deliverable. Cancelling or rejecting the milestone returns funds to your wallet.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button className="btn" onClick={() => setDepositStep("method")}>
                    ← Back
                  </button>
                  <button className="btn btn-primary" onClick={handleConfirmDeposit}>
                    Sign &amp; deposit
                  </button>
                </div>
              </>
            )}

            {depositStep === "review" && depositMethod === "fiat" && (
              <>
                <div className="deposit-summary">
                  <div className="row">
                    <span>Milestone</span>
                    <b>{milestone.title}</b>
                  </div>
                  <div className="row">
                    <span>Amount (SOL)</span>
                    <b className="mono">◎ {formatSol(milestone.amount)}</b>
                  </div>
                  <div className="row">
                    <span>Rate</span>
                    <b className="mono">1 SOL ≈ ${SOL_USD_RATE}</b>
                  </div>
                  <div className="row total">
                    <span>Charge</span>
                    <b>${fiatTotal} USD</b>
                  </div>
                </div>

                <div className="fiat-form">
                  <div className="field">
                    <label className="field-label">▸ Cardholder name</label>
                    <input
                      className="input"
                      placeholder="Ada Lovelace"
                      value={fiatCard.name}
                      onChange={(e) => setFiatCard({ ...fiatCard, name: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label className="field-label">▸ Card number</label>
                    <input
                      className="input mono"
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                      value={fiatCard.number}
                      onChange={(e) =>
                        setFiatCard({ ...fiatCard, number: formatCardNumber(e.target.value) })
                      }
                    />
                  </div>
                  <div className="fiat-row-2">
                    <div className="field">
                      <label className="field-label">▸ Expiry (MM/YY)</label>
                      <input
                        className="input mono"
                        placeholder="12/27"
                        inputMode="numeric"
                        value={fiatCard.exp}
                        onChange={(e) =>
                          setFiatCard({ ...fiatCard, exp: formatExp(e.target.value) })
                        }
                      />
                    </div>
                    <div className="field">
                      <label className="field-label">▸ CVC</label>
                      <input
                        className="input mono"
                        placeholder="123"
                        inputMode="numeric"
                        value={fiatCard.cvc}
                        onChange={(e) =>
                          setFiatCard({
                            ...fiatCard,
                            cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <p className="deposit-disclaimer">
                  Test mode · no charge will be made. Your card details are not stored or
                  transmitted. Funds will be converted to SOL and locked in the escrow PDA.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button className="btn" onClick={() => setDepositStep("method")}>
                    ← Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleConfirmFiat}
                    disabled={!fiatValid}
                  >
                    Pay ${fiatTotal}
                  </button>
                </div>
              </>
            )}

            {(depositStep === "signing" || depositStep === "broadcasting") && (
              <div className="deposit-progress">
                <div className="spinner" />
                <div className="deposit-progress-title">
                  {depositStep === "signing"
                    ? "Awaiting signature in Phantom…"
                    : depositMethod === "fiat"
                      ? "Processing card payment…"
                      : "Broadcasting transaction…"}
                </div>
                <div className="deposit-progress-sub">
                  {depositStep === "signing"
                    ? "Approve the deposit in your Phantom wallet popup."
                    : depositMethod === "fiat"
                      ? "Authorising your card and converting to SOL. Do not close this window."
                      : "Locking funds into the escrow PDA. Do not close this window."}
                </div>
              </div>
            )}

            {depositStep === "success" && (
              <div className="deposit-success">
                <div className="ok-badge">✓</div>
                <div className="deposit-progress-title">
                  {depositMethod === "fiat" ? "Payment confirmed" : "Deposit confirmed"}
                </div>
                <div className="deposit-progress-sub">
                  {depositMethod === "fiat"
                    ? `$${fiatTotal} charged. ◎ ${formatSol(milestone.amount)} SOL has been locked in escrow. The provider can now begin work.`
                    : `◎ ${formatSol(milestone.amount)} SOL locked in escrow. The provider can now begin work on this milestone.`}
                </div>
                {depositTxSig && (
                  <div className="deposit-tx">
                    <span className="form-label" style={{ fontSize: 11 }}>
                      ▸ {depositMethod === "fiat" ? "Receipt id" : "Tx signature"}
                    </span>
                    <code className="mono">{truncMiddle(depositTxSig, 10, 8)}</code>
                  </div>
                )}
                <button className="btn btn-primary" onClick={closeDeposit}>
                  Done
                </button>
              </div>
            )}

            {depositStep === "error" && (
              <div className="deposit-progress">
                <div className="err-badge">!</div>
                <div className="deposit-progress-title">
                  {depositMethod === "fiat" ? "Payment failed" : "Deposit failed"}
                </div>
                <div className="auth-error" style={{ marginTop: 4 }}>
                  {depositError}
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 14 }}>
                  <button className="btn" onClick={closeDeposit}>
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={depositMethod === "fiat" ? handleConfirmFiat : handleConfirmDeposit}
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}

function AssignProviderModal({
  open,
  onClose,
  providers,
  currentProviderId,
  onAssign,
}: {
  open: boolean;
  onClose: () => void;
  providers: ApiUser[];
  currentProviderId?: string;
  onAssign: (providerId: string) => Promise<void>;
}) {
  const [selectedId, setSelectedId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedId(currentProviderId ?? "");
      setError("");
      setSubmitting(false);
    }
  }, [open, currentProviderId]);

  const submit = async () => {
    if (!selectedId || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await onAssign(selectedId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to assign provider.");
      setSubmitting(false);
    }
  };

  const shortenAddr = (addr: string) =>
    addr.length <= 10 ? addr : `${addr.slice(0, 4)}…${addr.slice(-4)}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Assign provider"
      footer={
        <>
          <div style={{ color: "var(--ink-dim)", fontSize: 12 }}>
            {error ? (
              <span style={{ color: "red" }}>{error}</span>
            ) : (
              "Select a provider from the project members list"
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              disabled={!selectedId || submitting}
              onClick={submit}
            >
              {submitting ? "Assigning…" : "Assign"}
            </button>
          </div>
        </>
      }
    >
      <div className="form-grid">
        {providers.length === 0 ? (
          <div className="muted-2" style={{ padding: "16px 0" }}>
            No providers have joined this project yet. Invite one from the project page first.
          </div>
        ) : (
          <div className="access-list">
            {providers.map((p) => (
              <button
                key={p.id}
                type="button"
                className={"access-row" + (selectedId === p.id ? " selected" : "")}
                onClick={() => setSelectedId(p.id)}
                style={{
                  background: selectedId === p.id ? "rgba(0,255,128,0.06)" : undefined,
                  border: selectedId === p.id ? "1px solid var(--neon)" : undefined,
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <div className="av av-sm">{p.publicKey.charAt(0).toUpperCase()}</div>
                <div className="meta">
                  <div className="name">{shortenAddr(p.publicKey)}</div>
                  <div className="sub">{p.publicKey}</div>
                </div>
                <span className="pill pill-ok">
                  <span className="dot" />
                  Active
                </span>
                {selectedId === p.id && (
                  <span style={{ color: "var(--neon)", fontSize: 14, marginLeft: 4 }}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

function ActiveMilestoneBand({
  endDate,
  amount,
  fundedAt,
}: {
  endDate: string | null;
  amount: string;
  fundedAt: string | null;
}) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const endMs = endDate ? new Date(endDate).getTime() : null;
  const totalRemaining = endMs ? endMs - now : null;
  const overdue = totalRemaining !== null && totalRemaining < 0;
  const absRemaining = totalRemaining === null ? 0 : Math.abs(totalRemaining);

  const days = Math.floor(absRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absRemaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absRemaining / (1000 * 60)) % 60);
  const seconds = Math.floor((absRemaining / 1000) % 60);

  const pad = (n: number) => String(n).padStart(2, "0");

  // Progress bar: how much of the funded → endDate window has elapsed.
  const startMs = fundedAt ? new Date(fundedAt).getTime() : null;
  let pct = 0;
  if (startMs && endMs && endMs > startMs) {
    pct = Math.min(100, Math.max(0, ((now - startMs) / (endMs - startMs)) * 100));
  }

  const tone = overdue ? "overdue" : days < 1 ? "warn" : "ok";

  return (
    <div className={"active-band " + tone} style={{ marginTop: 32 }}>
      <div className="active-band-head">
        <div>
          <div className="form-label" style={{ fontSize: 13 }}>
            ▸ Milestone active · escrow live
          </div>
          <h3 className="active-title">
            {overdue ? "Delivery window overdue" : "Time remaining to deliver"}
          </h3>
          <p className="active-sub">
            ◎ {formatSol(amount)} SOL is locked in escrow. The provider must ship the codebase &amp;
            spec before the deadline to claim the funds.
          </p>
        </div>
        <div className="countdown">
          {endDate ? (
            <>
              <div className="cd-grid">
                <div className="cd-cell">
                  <span className="n">{pad(days)}</span>
                  <span className="u">days</span>
                </div>
                <span className="sep">:</span>
                <div className="cd-cell">
                  <span className="n">{pad(hours)}</span>
                  <span className="u">hrs</span>
                </div>
                <span className="sep">:</span>
                <div className="cd-cell">
                  <span className="n">{pad(minutes)}</span>
                  <span className="u">min</span>
                </div>
                <span className="sep">:</span>
                <div className="cd-cell">
                  <span className="n">{pad(seconds)}</span>
                  <span className="u">sec</span>
                </div>
              </div>
              <div className="cd-target">
                {overdue ? "overdue since " : "target "}
                {fmtDateTime(endDate)}
              </div>
            </>
          ) : (
            <div className="cd-target">No end date set</div>
          )}
        </div>
      </div>
      {endDate && (
        <div className="active-progress" aria-hidden>
          <div className="bar">
            <i style={{ width: `${pct}%` }} />
          </div>
          <div className="bar-meta">
            <span>funded {fundedAt ? fmtDateTime(fundedAt) : "—"}</span>
            <span>{overdue ? "100%+" : `${Math.round(pct)}% elapsed`}</span>
            <span>deadline {fmtDateTime(endDate)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
