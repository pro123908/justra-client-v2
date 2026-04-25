import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/app/Navbar";
import Modal from "@/components/app/Modal";
import { SuccessModal } from "@/components/app/SuccessModal";
import { useAuth } from "@/lib/auth";
import {
  ProjectInvite,
  useAppData,
  type Milestone,
  type MilestoneStatus,
  type Project,
} from "@/lib/app-data";
import "@/components/git-escrow.css";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectDetailPage,
  head: () => ({
    meta: [
      { title: "Project — Git Escrow" },
      { name: "description", content: "Project milestones and escrow detail." },
    ],
  }),
});

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

/** Map any status (including legacy) to a normalized status group. */
function statusGroup(s: MilestoneStatus): "pending" | "approved" | "rejected" | "active" | "settled" {
  switch (s) {
    case "pending":
    case "pending_provider_approval":
    case "awaiting_deposit":
    case "submitted":
      return "pending";
    case "approved":
    case "funded":
    case "released":
      return "approved";
    case "rejected":
    case "rejected_by_provider":
    case "cancelled":
      return "rejected";
    case "in_progress":
      return "active";
    case "disputed":
      return "rejected";
    default:
      return "pending";
  }
}

function statusLabel(s: MilestoneStatus) {
  switch (s) {
    case "pending":
    case "pending_provider_approval":
      return "Pending provider approval";
    case "rejected":
    case "rejected_by_provider":
      return "Rejected by provider";
    case "awaiting_deposit":
      return "Awaiting deposit";
    case "funded":
      return "Funded · escrow live";
    case "in_progress":
      return "In progress";
    case "submitted":
      return "Submitted for review";
    case "approved":
      return "Approved";
    case "disputed":
      return "Disputed";
    case "released":
      return "Released to provider";
    case "cancelled":
      return "Cancelled";
    default:
      return String(s);
  }
}

function ProjectDetailPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { projectId } = Route.useParams();
  const {
    getProject,
    fetchProject,
    addMilestone,
    setMilestoneStatus,
    inviteProvider,
    removeProvider,
    cancelInvite,
  } = useAppData();
  const project = getProject(projectId);
  console.log("🚀 ~ ProjectDetailPage ~ project:", project);
  const [addOpen, setAddOpen] = useState(false);
  const [createdMs, setCreatedMs] = useState<Milestone | null>(null);
  const [viewMs, setViewMs] = useState<Milestone | null>(null);
  const [approveMs, setApproveMs] = useState<Milestone | null>(null);
  const [rejectMs, setRejectMs] = useState<Milestone | null>(null);
  const [accessOpen, setAccessOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
    else if (!user.role) navigate({ to: "/role" });
  }, [user, navigate]);

  useEffect(() => {
    if (!token || !user?.role || project) return;
    setFetching(true);
    fetchProject(projectId)
      .catch(() => setFetchError(true))
      .finally(() => setFetching(false));
  }, [token, user?.role, projectId, fetchProject, project]);

  if (!user || !user.role) return null;

  if (fetching) {
    return (
      <div className="git-escrow-root">
        <div className="wrap">
          <Navbar />
          <div className="empty-state" style={{ marginTop: 60 }}>
            <div className="ic">…</div>
            <h3>Loading project</h3>
          </div>
        </div>
      </div>
    );
  }

  if (!project || fetchError) {
    return (
      <div className="git-escrow-root">
        <div className="wrap">
          <Navbar />
          <div className="empty-state" style={{ marginTop: 60 }}>
            <div className="ic">!</div>
            <h3>Project not found</h3>
            <p>This project doesn't exist in your workspace, or the link is invalid.</p>
            <Link to="/dashboard" className="btn-action" style={{ textDecoration: "none" }}>
              ← Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = project.ownerId === user.id || project.ownerId === user.address;
  const isMember = project.providers.some((p) => p.id === user.id || p.address === user.address);
  const canManage = user.role === "consumer" && isOwner;
  const canApprove = user.role === "provider" && isMember;

  // If neither owner nor provider on this project, block access
  if (!isOwner && !isMember) {
    return (
      <div className="git-escrow-root">
        <div className="wrap">
          <Navbar />
          <div className="empty-state" style={{ marginTop: 60 }}>
            <div className="ic">!</div>
            <h3>Access denied</h3>
            <p>You don't have access to this project. Ask the owner for an invite.</p>
            <Link to="/dashboard" className="btn-action" style={{ textDecoration: "none" }}>
              ← Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="git-escrow-root">
      <div className="wrap">
        <Navbar />

        <div className="proj-header">
          <div>
            <div className="crumb">
              <Link to="/dashboard">Dashboard</Link>
              <span className="sep">/</span>
              <span>Projects</span>
              <span className="sep">/</span>
              <span style={{ color: "var(--neon)" }}>{project.id}</span>
            </div>
            <div className="ph-id">▸ {project.id}</div>
            <h1>{project.name}</h1>
            <div className="ph-meta">
              <span>
                <b>{project.milestones.length}</b> milestones
              </span>
              <span>
                <b>{project.fileCount}</b> files attached
              </span>
              <span>
                created <b>{fmtDate(project.createdAt)}</b>
              </span>
              <span>
                role <b style={{ color: "var(--neon)" }}>{user.role.toUpperCase()}</b>
              </span>
            </div>
          </div>
          {canManage && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}
            >
              <button className="btn-action" onClick={() => setAccessOpen(true)}>
                <span className="plus">⚙</span> Manage Access
              </button>
              <div
                style={{
                  color: "var(--ink-mute)",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {project.providers.length} provider{project.providers.length === 1 ? "" : "s"} ·{" "}
                {project.invites.length} pending
              </div>
            </div>
          )}
        </div>

        <div
          className="section-bar"
          style={{ marginTop: 28, borderBottom: "1px dashed var(--line)" }}
        >
          <div>
            <h2 style={{ fontSize: 26 }}>Milestones</h2>
            <div className="sub">
              {canManage
                ? "Define payable checkpoints. Each milestone awaits developer approval before activation."
                : "Review and act on checkpoints assigned by the consumer."}
            </div>
          </div>
          {canManage && (
            <button className="btn-action" onClick={() => setAddOpen(true)}>
              <span className="plus">+</span> Add Milestone
            </button>
          )}
        </div>

        {project.milestones.length === 0 ? (
          <div className="empty-state">
            <div className="ic">≡</div>
            <h3>No milestones yet</h3>
            <p>
              {canManage
                ? "Add the first milestone to break this project into verifiable, payable units of work."
                : "The consumer hasn't defined any milestones yet. Check back soon."}
            </p>
            {canManage && (
              <button className="btn-action" onClick={() => setAddOpen(true)}>
                <span className="plus">+</span> Add first milestone
              </button>
            )}
          </div>
        ) : (
          <div className="milestones">
            {project.milestones.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                className={"milestone milestone-row ms-row-" + statusGroup(m.status)}
                onClick={() => setViewMs(m)}
              >
                <div className="ms-num">{String(idx + 1).padStart(2, "0")}</div>
                <div className="ms-body">
                  <h3 className="ms-title">{m.title}</h3>
                  {m.description && <p className="ms-desc">{m.description}</p>}
                  <div className="ms-row-tags">
                    <span className={"ms-status " + statusGroup(m.status)}>
                      <span className="d" />
                      {statusLabel(m.status)}
                    </span>
                    {m.pda && (
                      <span className="ms-chip" title={m.pda}>
                        <span className="k">PDA</span>
                        <span className="v">{truncMiddle(m.pda, 4, 4)}</span>
                      </span>
                    )}
                    {m.depositDeadline && statusGroup(m.status) === "pending" && (
                      <span className="ms-chip warn">
                        <span className="k">Deposit by</span>
                        <span className="v">{fmtDate(m.depositDeadline)}</span>
                      </span>
                    )}
                    {m.fundedAt && (
                      <span className="ms-chip ok">
                        <span className="k">Funded</span>
                        <span className="v">{fmtDate(m.fundedAt)}</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="ms-dates">
                  <b>{fmtDate(m.startDate)}</b>
                  <span>→ {fmtDate(m.endDate)}</span>
                </div>
                <div className="ms-amount">
                  <b>◎ {m.amount || "—"}</b>
                  <span>
                    SOL · {m.fileCount} file{m.fileCount === 1 ? "" : "s"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {canManage && (
        <AddMilestoneModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onCreated={(m) => {
            setAddOpen(false);
            setCreatedMs(m);
          }}
          onSubmit={(input) => addMilestone(project.id, input)}
        />
      )}

      <MilestoneDetailModal
        milestone={viewMs}
        canApprove={canApprove}
        index={
          viewMs ? project.milestones.findIndex((x) => x.id === viewMs.id) + 1 : 0
        }
        onClose={() => setViewMs(null)}
        onApprove={() => {
          setApproveMs(viewMs);
          setViewMs(null);
        }}
        onReject={() => {
          setRejectMs(viewMs);
          setViewMs(null);
        }}
      />

      <ApproveMilestoneModal
        milestone={approveMs}
        onClose={() => setApproveMs(null)}
        onConfirm={() => {
          if (approveMs) setMilestoneStatus(project.id, approveMs.id, "approved");
          setApproveMs(null);
        }}
      />

      <RejectMilestoneModal
        milestone={rejectMs}
        onClose={() => setRejectMs(null)}
        onConfirm={(note) => {
          if (rejectMs) setMilestoneStatus(project.id, rejectMs.id, "rejected", note);
          setRejectMs(null);
        }}
      />

      {canManage && (
        <ManageAccessModal
          open={accessOpen}
          onClose={() => setAccessOpen(false)}
          project={project}
          onInvite={(addr) => inviteProvider(project.id, addr)}
          onCancelInvite={(addr) => cancelInvite(project.id, addr)}
          onRemove={(addr) => removeProvider(project.id, addr)}
        />
      )}

      <SuccessModal
        open={!!createdMs}
        onClose={() => setCreatedMs(null)}
        tag="MILESTONE"
        title="Milestone Created."
        message="Milestone is currently pending, once developer approves it it will start."
      />
    </div>
  );
}

function MilestoneDetailModal({
  milestone,
  canApprove,
  index,
  onClose,
  onApprove,
  onReject,
}: {
  milestone: Milestone | null;
  canApprove: boolean;
  index: number;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  if (!milestone) return null;

  const group = statusGroup(milestone.status);
  const actionable = canApprove && group === "pending";
  const rejectionText = milestone.rejectionReason || milestone.rejectionNote;

  return (
    <Modal
      open={!!milestone}
      onClose={onClose}
      tag={`MILESTONE · ${String(index || 0).padStart(2, "0")}`}
      title={milestone.title}
      width={720}
      footer={
        <div className="modal-foot">
          <div>
            <span className={"ms-status " + group}>
              <span className="d" /> {statusLabel(milestone.status)}
            </span>
          </div>
          {actionable ? (
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-danger" onClick={onReject}>
                Reject
              </button>
              <button className="btn btn-primary" onClick={onApprove}>
                Approve milestone
              </button>
            </div>
          ) : (
            <button className="btn" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      }
    >
      <div className="ms-detail">
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
            {milestone.providerShort && (
              <div className="ms-hero-provider">
                <span>Provider</span> <b>{milestone.providerShort}</b>
              </div>
            )}
          </div>
        </div>

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
            <div className="form-label">▸ Files</div>
            <div className="ms-detail-val">{milestone.fileCount}</div>
          </div>
          <div className="ms-cell">
            <div className="form-label">▸ Created</div>
            <div className="ms-detail-val">{fmtDate(milestone.createdAt)}</div>
          </div>
        </div>

        <div className="form-row" style={{ marginTop: 18 }}>
          <div className="form-label">▸ Description / acceptance criteria</div>
          <div className="ms-detail-desc">{milestone.description || "—"}</div>
        </div>

        <div className="ms-detail-grid two" style={{ marginTop: 18 }}>
          <div className="ms-cell mono-cell">
            <div className="form-label">▸ Spec CID</div>
            <div className="ms-mono" title={milestone.specCid || ""}>
              {milestone.specCid ? truncMiddle(milestone.specCid, 10, 8) : "— not pinned"}
            </div>
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

        {rejectionText && (
          <div className="form-row" style={{ marginTop: 18 }}>
            <div className="form-label" style={{ color: "var(--red)" }}>
              ▸ Rejection reason
            </div>
            <div className="ms-detail-desc" style={{ borderColor: "var(--red)" }}>
              {rejectionText}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function ApproveMilestoneModal({
  milestone,
  onClose,
  onConfirm,
}: {
  milestone: Milestone | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!milestone) return null;
  return (
    <Modal
      open={!!milestone}
      onClose={onClose}
      tag="APPROVE MILESTONE"
      title={milestone.title}
      width={520}
      footer={
        <div className="modal-foot">
          <div style={{ color: "var(--ink-mute)", fontSize: 11, letterSpacing: "0.2em" }}>
            ESCROW · ◎ {milestone.amount || "0"} SOL
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onConfirm}>
              Confirm approval
            </button>
          </div>
        </div>
      }
    >
      <div className="confirm-block">
        <div className="confirm-ic ok">✓</div>
        <h3 className="confirm-h">Lock in this milestone</h3>
        <p className="confirm-p">
          Approving signals to the consumer that the scope is accepted. The escrow will move
          to <b style={{ color: "var(--neon)" }}>awaiting deposit</b>, and once funded the
          work clock starts.
        </p>
        <div className="confirm-meta">
          <div>
            <span>Window</span>
            <b>
              {fmtDate(milestone.startDate)} → {fmtDate(milestone.endDate)}
            </b>
          </div>
          <div>
            <span>Amount</span>
            <b style={{ color: "var(--neon)" }}>◎ {milestone.amount || "0"} SOL</b>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function RejectMilestoneModal({
  milestone,
  onClose,
  onConfirm,
}: {
  milestone: Milestone | null;
  onClose: () => void;
  onConfirm: (note: string) => void;
}) {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!milestone) setNote("");
  }, [milestone]);

  if (!milestone) return null;
  const valid = note.trim().length >= 4;

  return (
    <Modal
      open={!!milestone}
      onClose={onClose}
      tag="REJECT MILESTONE"
      title={milestone.title}
      width={560}
      footer={
        <div className="modal-foot">
          <div style={{ color: "var(--ink-mute)", fontSize: 11, letterSpacing: "0.2em" }}>
            CONSUMER WILL BE NOTIFIED
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              disabled={!valid}
              onClick={() => onConfirm(note.trim())}
            >
              Confirm rejection
            </button>
          </div>
        </div>
      }
    >
      <div className="confirm-block">
        <div className="confirm-ic bad">×</div>
        <h3 className="confirm-h">Reject this milestone</h3>
        <p className="confirm-p">
          Rejecting prevents the escrow from being created. Tell the consumer what
          needs to change — scope, acceptance criteria, timeline, or amount — so they
          can revise and resubmit.
        </p>
        <div className="form-row" style={{ marginTop: 14 }}>
          <label className="form-label">▸ Rejection reason (required, 4+ chars)</label>
          <textarea
            className="form-textarea"
            placeholder="e.g. Scope is too broad — please split auth and billing into separate milestones."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            autoFocus
          />
        </div>
      </div>
    </Modal>
  );
}

function ManageAccessModal({
  open,
  onClose,
  project,
  onInvite,
  onCancelInvite,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  project: Project;
  onInvite: (address: string) => Promise<ProjectInvite>;
  onCancelInvite: (address: string) => void;
  onRemove: (address: string) => void;
}) {
  const [addr, setAddr] = useState("");
  const [err, setErr] = useState("");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    if (open) {
      setAddr("");
      setErr("");
      setInviting(false);
    }
  }, [open]);

  const submit = async () => {
    const v = addr.trim();
    if (v.length < 32 || v.length > 64) {
      setErr("Enter a valid Solana wallet address.");
      return;
    }
    if (project.providers.some((p) => p.address === v)) {
      setErr("This wallet is already a provider on this project.");
      return;
    }
    if (project.invites.some((i) => i.address === v)) {
      setErr("This wallet already has a pending invite.");
      return;
    }
    setInviting(true);
    try {
      await onInvite(v);
      setAddr("");
      setErr("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to send invite. Please try again.");
    } finally {
      setInviting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      tag="ACCESS"
      title="Manage providers"
      width={620}
      footer={
        <div className="modal-foot">
          <div>
            {project.providers.length} active · {project.invites.length} pending
          </div>
          <button className="btn" onClick={onClose}>
            Done
          </button>
        </div>
      }
    >
      <div className="form-grid">
        <div className="form-row">
          <label className="form-label">▸ Invite provider by wallet address</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="form-input"
              placeholder="Solana wallet address (base58)"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={submit} disabled={inviting}>
              {inviting ? "Inviting…" : "Invite"}
            </button>
          </div>
          {err && (
            <div className="auth-error" style={{ marginTop: 6 }}>
              {err}
            </div>
          )}
        </div>

        <div className="form-row">
          <label className="form-label">▸ Active providers</label>
          {project.providers.length === 0 ? (
            <div className="access-empty">No providers yet. Invite a developer above.</div>
          ) : (
            <div className="access-list">
              {project.providers.map((p) => (
                <div key={p.address} className="access-row">
                  <div className="ar-avatar">{p.address.charAt(0).toUpperCase()}</div>
                  <div className="ar-body">
                    <div className="ar-name">{p.short}</div>
                    <div className="ar-meta">Joined {fmtDate(p.addedAt)}</div>
                  </div>
                  <span className="ms-status approved">
                    <span className="d" /> Active
                  </span>
                  <button className="btn btn-danger small" onClick={() => onRemove(p.address)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-row">
          <label className="form-label">▸ Pending invites</label>
          {project.invites.length === 0 ? (
            <div className="access-empty">No pending invites.</div>
          ) : (
            <div className="access-list">
              {project.invites.map((iv) => (
                <div key={iv.address} className="access-row">
                  <div className="ar-avatar dim">{iv.address.charAt(0).toUpperCase()}</div>
                  <div className="ar-body">
                    <div className="ar-name">{iv.short}</div>
                    <div className="ar-meta">Invited {fmtDate(iv.invitedAt)}</div>
                  </div>
                  <span className="ms-status pending">
                    <span className="d" /> Pending
                  </span>
                  <button className="btn small" onClick={() => onCancelInvite(iv.address)}>
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

function AddMilestoneModal({
  open,
  onClose,
  onCreated,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (m: Milestone) => void;
  onSubmit: (input: Omit<Milestone, "id" | "status">) => Milestone;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setAmount("");
      setFiles([]);
    }
  }, [open]);

  const valid =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    startDate.length > 0 &&
    endDate.length > 0 &&
    amount.trim().length > 0;

  const submit = () => {
    if (!valid) return;
    const m = onSubmit({
      title: title.trim(),
      description: description.trim(),
      startDate,
      endDate,
      amount: amount.trim(),
      fileCount: files.length,
    });
    onCreated(m);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      tag="NEW MILESTONE"
      title="Define checkpoint"
      footer={
        <div className="modal-foot">
          <div>
            {files.length
              ? `${files.length} file${files.length > 1 ? "s" : ""} attached`
              : "No files attached"}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" disabled={!valid} onClick={submit}>
              Create Milestone
            </button>
          </div>
        </div>
      }
    >
      <div className="form-grid">
        <div className="form-row">
          <label className="form-label">▸ Title</label>
          <input
            className="form-input"
            placeholder="e.g. M-01 · Auth & user provisioning"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-row">
          <label className="form-label">▸ Description</label>
          <textarea
            className="form-textarea"
            placeholder="Acceptance criteria, scope, deliverables…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row two">
          <div className="form-row" style={{ gap: 8 }}>
            <label className="form-label">▸ Start date</label>
            <input
              type="date"
              className="form-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ colorScheme: "dark" }}
            />
          </div>
          <div className="form-row" style={{ gap: 8 }}>
            <label className="form-label">▸ End date</label>
            <input
              type="date"
              className="form-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
              style={{ colorScheme: "dark" }}
            />
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">▸ Amount (SOL)</label>
          <input
            className="form-input"
            placeholder="e.g. 120"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">▸ Select files</label>
          <button className="form-attach" onClick={() => fileInput.current?.click()}>
            <span className="plus">+</span>
            <span style={{ flex: 1 }}>
              <div>Attach milestone files</div>
              <span className="hint">Spec sheet, design, references — any format</span>
            </span>
            <span style={{ color: "var(--ink-mute)" }}>→</span>
          </button>
          <input
            ref={fileInput}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={(e) => {
              const list = [...(e.target.files || [])];
              if (list.length) setFiles((s) => [...s, ...list]);
              e.target.value = "";
            }}
          />

          {files.length > 0 && (
            <div className="modal-filelist" style={{ marginTop: 8 }}>
              {files.map((f, idx) => (
                <div key={idx} className="file-row">
                  <div className="ico">
                    {(f.name.split(".").pop() || "").toUpperCase().slice(0, 4)}
                  </div>
                  <div className="nm">{f.name}</div>
                  <div className="sz">{(f.size / 1024).toFixed(1)} KB</div>
                  <button
                    className="rm"
                    onClick={() => setFiles((s) => s.filter((_, i) => i !== idx))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
