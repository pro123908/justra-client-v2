import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "@/components/app/Navbar";
import { useAuth } from "@/lib/auth";
import { milestoneApi, MilestoneStatus, type MilestoneResponse } from "@/lib/api";
import CodeReport from "@/components/milestone/CodeReport";
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
    case MilestoneStatus.WAITING_FOR_DEPOSIT:
      return "pending";
    case MilestoneStatus.ACTIVE:
      return "approved";
    case MilestoneStatus.REJECTED:
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
    case MilestoneStatus.REJECTED:
      return "Rejected";
    case MilestoneStatus.WAITING_FOR_DEPOSIT:
      return "Awaiting deposit";
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

  // deposit flow (consumer only, when status === PENDING_DEPOSIT)
  const [depositStep, setDepositStep] = useState<
    "idle" | "method" | "review" | "signing" | "broadcasting" | "success" | "error"
  >("idle");
  const [depositTxSig, setDepositTxSig] = useState<string>("");
  const [depositError, setDepositError] = useState("");
  const [depositMethod, setDepositMethod] = useState<"crypto" | "fiat" | null>(null);
  const [fiatCard, setFiatCard] = useState({ name: "", number: "", exp: "", cvc: "" });

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
  const isConsumer = user.role === "consumer";
  const needsDeposit = isConsumer && milestone.status === MilestoneStatus.WAITING_FOR_DEPOSIT;
  const isActive = milestone.status === MilestoneStatus.ACTIVE;
  console.log(
    "🚀 ~ MilestoneDetailPage ~ needsDeposit:",
    needsDeposit,
    milestone.status,
    MilestoneStatus.WAITING_FOR_DEPOSIT,
  );

  const handleStartDeposit = () => {
    setDepositError("");
    setDepositTxSig("");
    setDepositMethod(null);
    setDepositStep("method");
  };

  const handleConfirmDeposit = async () => {
    setDepositError("");
    setDepositStep("signing");
    try {
      const w = window as unknown as {
        solana?: {
          signMessage?: (msg: Uint8Array, enc: "utf8") => Promise<{ signature: Uint8Array }>;
        };
        phantom?: {
          solana?: {
            signMessage?: (msg: Uint8Array, enc: "utf8") => Promise<{ signature: Uint8Array }>;
          };
        };
      };
      const phantom = w.phantom?.solana ?? w.solana;
      if (!phantom?.signMessage)
        throw new Error("Phantom wallet not detected. Please reconnect your wallet.");

      const payload = `git-escrow:deposit\nmilestone=${milestone.id}\namount=${milestone.amount}\npda=${milestone.pda ?? "n/a"}\nts=${Date.now()}`;
      const encoded = new TextEncoder().encode(payload);
      const { signature } = await phantom.signMessage(encoded, "utf8");

      setDepositStep("broadcasting");
      await new Promise((r) => setTimeout(r, 1400));

      let hex = "";
      for (const b of signature.slice(0, 32)) hex += b.toString(16).padStart(2, "0");
      setDepositTxSig(hex);

      setMilestone({
        ...milestone,
        status: MilestoneStatus.ACTIVE,
        fundedAt: new Date().toISOString(),
      });
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
      // Simulated processor latency.
      await new Promise((r) => setTimeout(r, 1600));
      const ref =
        "ch_" + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
      setDepositTxSig(ref);
      setMilestone({
        ...milestone,
        status: MilestoneStatus.ACTIVE,
        fundedAt: new Date().toISOString(),
      });
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
        <div className="ms-detail" style={{ marginBottom: 32 }}>
          {/* Consumer deposit flow */}
          {needsDeposit && (
            <div className="deposit-band" style={{ marginTop: 32 }}>
              <div className="deposit-band-head">
                <div>
                  <div className="form-label" style={{ fontSize: 13 }}>
                    ▸ Action required · escrow deposit
                  </div>
                  <h3 className="deposit-title">Fund this milestone to start work</h3>
                  <p className="deposit-sub">
                    The provider has accepted the milestone. Lock <b>◎ {milestone.amount}</b> SOL
                    into the escrow PDA so the developer can begin. Funds release only after you
                    approve the delivery.
                  </p>
                </div>
                <div className="deposit-amount-card">
                  <span className="lbl">Amount due</span>
                  <span className="val">◎ {milestone.amount}</span>
                  <span className="sub">deadline {fmtDateTime(milestone.depositDeadline)}</span>
                </div>
              </div>
              <div className="deposit-meta-row">
                <span className="ms-chip">
                  <span className="k">PDA</span>
                  <span className="v">
                    {milestone.pda ? truncMiddle(milestone.pda, 8, 6) : "— pending"}
                  </span>
                </span>
                <span className="ms-chip">
                  <span className="k">Provider</span>
                  <span className="v">{shortenAddr(milestone.provider.publicKey)}</span>
                </span>
                <span className="ms-chip warn">
                  <span className="k">Status</span>
                  <span className="v">Awaiting deposit</span>
                </span>
              </div>
              <div className="deposit-actions">
                <button className="btn btn-primary" onClick={handleStartDeposit}>
                  Fund milestone — ◎ {milestone.amount} SOL / ${fiatTotal}
                </button>
                <span className="deposit-hint">
                  Choose to pay with crypto (SOL) or fiat (card).
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

        {/* Provider-only: code delivery + report generation when milestone ACTIVE */}
        {isActive && isProvider && (
          <div style={{ marginTop: 32 }}>
            <div className="section-h" style={{ marginBottom: 14 }}>
              <span>▸ DELIVER CODE · GENERATE REPORT</span>
              <span style={{ color: "var(--ink-mute)", fontSize: 11 }}>
                Provider workflow · escrow released on consensus
              </span>
            </div>
            <CodeReport />
          </div>
        )}

        {/* Consumer view of active milestone — informational, no upload */}
        {isActive && isConsumer && (
          <div style={{ marginTop: 32 }}>
            <div className="section-h" style={{ marginBottom: 14 }}>
              <span>▸ AWAITING DELIVERY</span>
              <span style={{ color: "var(--ink-mute)", fontSize: 11 }}>
                Provider will submit a code archive &amp; spec for grading
              </span>
            </div>
            <div
              style={{
                border: "1px dashed var(--line-2)",
                borderRadius: 8,
                padding: "20px 22px",
                background: "var(--panel)",
                color: "var(--ink-dim)",
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              The escrow is funded and the provider has been cleared to begin work. When they submit
              their codebase archive and specification, the verification engine will grade the
              delivery and produce a release-or-reject verdict here.
            </div>
          </div>
        )}
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
                    <div className="pmc-amount">◎ {milestone.amount}</div>
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
                    <b>◎ {milestone.amount} SOL</b>
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
                    <b className="mono">◎ {milestone.amount}</b>
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
                  <div className="form-row">
                    <label className="form-label">▸ Cardholder name</label>
                    <input
                      className="form-input"
                      placeholder="Ada Lovelace"
                      value={fiatCard.name}
                      onChange={(e) => setFiatCard({ ...fiatCard, name: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <label className="form-label">▸ Card number</label>
                    <input
                      className="form-input mono"
                      placeholder="4242 4242 4242 4242"
                      inputMode="numeric"
                      value={fiatCard.number}
                      onChange={(e) =>
                        setFiatCard({ ...fiatCard, number: formatCardNumber(e.target.value) })
                      }
                    />
                  </div>
                  <div className="fiat-row-2">
                    <div className="form-row">
                      <label className="form-label">▸ Expiry (MM/YY)</label>
                      <input
                        className="form-input mono"
                        placeholder="12/27"
                        inputMode="numeric"
                        value={fiatCard.exp}
                        onChange={(e) =>
                          setFiatCard({ ...fiatCard, exp: formatExp(e.target.value) })
                        }
                      />
                    </div>
                    <div className="form-row">
                      <label className="form-label">▸ CVC</label>
                      <input
                        className="form-input mono"
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
                    ? `$${fiatTotal} charged. ◎ ${milestone.amount} SOL has been locked in escrow. The provider can now begin work.`
                    : `◎ ${milestone.amount} SOL locked in escrow. The provider can now begin work on this milestone.`}
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
    </div>
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
            ◎ {amount} SOL is locked in escrow. The provider must ship the codebase &amp; spec
            before the deadline to claim the funds.
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
