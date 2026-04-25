import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/app/Navbar";
import Modal from "@/components/app/Modal";
import { SuccessModal } from "@/components/app/SuccessModal";
import { useAuth } from "@/lib/auth";
import { ProjectInvite, useAppData, type Milestone, type Project } from "@/lib/app-data";
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

const fmtDate = (s: string) => {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d
    .toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })
    .toUpperCase();
};

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
                className="milestone milestone-row"
                onClick={() => setViewMs(m)}
              >
                <div className="ms-num">{String(idx + 1).padStart(2, "0")}</div>
                <div className="ms-body">
                  <h3 className="ms-title">{m.title}</h3>
                  {m.description && <p className="ms-desc">{m.description}</p>}
                  <div style={{ marginTop: 8 }}>
                    <span className={"ms-status " + m.status}>
                      <span className="d" />
                      {statusLabel(m.status)}
                    </span>
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
        onClose={() => setViewMs(null)}
        onApprove={() => {
          if (viewMs) setMilestoneStatus(project.id, viewMs.id, "approved");
          setViewMs(null);
        }}
        onReject={(note) => {
          if (viewMs) setMilestoneStatus(project.id, viewMs.id, "rejected", note);
          setViewMs(null);
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

function statusLabel(s: Milestone["status"]) {
  if (s === "approved") return "Approved";
  if (s === "rejected") return "Rejected";
  return "Pending approval";
}

function MilestoneDetailModal({
  milestone,
  canApprove,
  onClose,
  onApprove,
  onReject,
}: {
  milestone: Milestone | null;
  canApprove: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: (note: string) => void;
}) {
  const [rejecting, setRejecting] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!milestone) {
      setRejecting(false);
      setNote("");
    }
  }, [milestone]);

  if (!milestone) return null;

  const actionable = canApprove && milestone.status === "pending";

  return (
    <Modal
      open={!!milestone}
      onClose={onClose}
      tag="MILESTONE"
      title={milestone.title}
      width={620}
      footer={
        actionable ? (
          <div className="modal-foot">
            <div>
              <span className={"ms-status " + milestone.status}>
                <span className="d" /> {statusLabel(milestone.status)}
              </span>
            </div>
            {!rejecting ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-danger" onClick={() => setRejecting(true)}>
                  Reject
                </button>
                <button className="btn btn-primary" onClick={onApprove}>
                  Approve milestone
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={() => setRejecting(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={() => onReject(note.trim())}>
                  Confirm rejection
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="modal-foot">
            <div>
              <span className={"ms-status " + milestone.status}>
                <span className="d" /> {statusLabel(milestone.status)}
              </span>
            </div>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        )
      }
    >
      <div className="ms-detail">
        <div className="ms-detail-grid">
          <div>
            <div className="form-label">▸ Start</div>
            <div className="ms-detail-val">{fmtDate(milestone.startDate)}</div>
          </div>
          <div>
            <div className="form-label">▸ End</div>
            <div className="ms-detail-val">{fmtDate(milestone.endDate)}</div>
          </div>
          <div>
            <div className="form-label">▸ Amount</div>
            <div className="ms-detail-val" style={{ color: "var(--neon)" }}>
              ◎ {milestone.amount || "—"} SOL
            </div>
          </div>
          <div>
            <div className="form-label">▸ Files</div>
            <div className="ms-detail-val">{milestone.fileCount}</div>
          </div>
        </div>

        <div className="form-row" style={{ marginTop: 18 }}>
          <div className="form-label">▸ Description</div>
          <div className="ms-detail-desc">{milestone.description || "—"}</div>
        </div>

        {milestone.rejectionNote && (
          <div className="form-row" style={{ marginTop: 18 }}>
            <div className="form-label" style={{ color: "var(--red)" }}>
              ▸ Rejection note
            </div>
            <div className="ms-detail-desc" style={{ borderColor: "var(--red)" }}>
              {milestone.rejectionNote}
            </div>
          </div>
        )}

        {rejecting && (
          <div className="form-row" style={{ marginTop: 18 }}>
            <div className="form-label">▸ Rejection reason (optional)</div>
            <textarea
              className="form-textarea"
              placeholder="What needs to change before approval?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        )}
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
