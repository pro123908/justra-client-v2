import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/app/Navbar";
import Modal from "@/components/app/Modal";
import { SuccessModal } from "@/components/app/SuccessModal";
import { useAuth } from "@/lib/auth";
import { formatSol } from "@/lib/utils";
import {
  projectApi,
  inviteApi,
  milestoneApi,
  MilestoneStatus,
  type ProjectResponse,
  type MilestoneResponse,
  type InviteResponse,
  type ApiUser,
  type CreateMilestoneInput,
} from "@/lib/api";
import "@/components/git-escrow.css";

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
    case MilestoneStatus.IN_PROGRESS:
      return "In progress";
    case MilestoneStatus.COMPLETED:
      return "Completed";
    default:
      return String(s);
  }
}

export default function ProjectDetailPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { projectId = "" } = useParams();

  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [milestones, setMilestones] = useState<MilestoneResponse[]>([]);
  const [invites, setInvites] = useState<InviteResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [createdMs, setCreatedMs] = useState<MilestoneResponse | null>(null);

  useEffect(() => {
    if (!user) navigate("/auth");
    else if (!user.role) navigate("/role");
  }, [user, navigate]);

  useEffect(() => {
    if (!token || !user?.role) return;
    setLoading(true);

    const milestoneFetch =
      user.role === "consumer"
        ? milestoneApi.listForProject(token, projectId)
        : milestoneApi
            .listForProvider(token)
            .then((ms) => ms.filter((m) => m.project?.id === projectId));

    const inviteFetch =
      user.role === "consumer"
        ? inviteApi.getProjectInvites(token, projectId)
        : Promise.resolve<InviteResponse[]>([]);

    Promise.all([projectApi.get(token, projectId), milestoneFetch, inviteFetch])
      .then(([proj, msList, invList]) => {
        setProject(proj);
        setMilestones(msList);
        setInvites(invList.filter((i) => i.status === "PENDING" || i.status === "pending"));
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, [token, user?.role, projectId]);

  if (!user || !user.role) return null;

  if (loading) {
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
            <p>This project doesn't exist or the link is invalid.</p>
            <Link to="/dashboard" className="btn-action" style={{ textDecoration: "none" }}>
              ← Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = project.owner?.id === user.id || project.owner?.publicKey === user.address;
  const isMember = project.members?.some((m) => m.id === user.id || m.publicKey === user.address);
  const canManage = user.role === "consumer" && isOwner;
  const providers = project.members ?? [];

  if (!isOwner && !isMember) {
    return (
      <div className="git-escrow-root">
        <div className="wrap">
          <Navbar />
          <div className="empty-state" style={{ marginTop: 60 }}>
            <div className="ic">!</div>
            <h3>Access denied</h3>
            <p>You don't have access to this project.</p>
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
            <h1>{project.title}</h1>
            <div className="ph-meta">
              <span>
                <b>{milestones.length}</b> milestones
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
                {providers.length} provider{providers.length === 1 ? "" : "s"} · {invites.length}{" "}
                pending
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

        {milestones.length === 0 ? (
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
            {milestones.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                className={"milestone milestone-row ms-row-" + statusGroup(m.status)}
                onClick={() => navigate(`/projects/${projectId}/milestones/${m.id}`)}
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
                        <span className="v">
                          {m.pda.length > 10 ? `${m.pda.slice(0, 4)}…${m.pda.slice(-4)}` : m.pda}
                        </span>
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
                  <b>◎ {m.amount ? formatSol(m.amount) : "—"}</b>
                  <span>SOL</span>
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
            setMilestones((curr) => [...curr, m]);
            setAddOpen(false);
            setCreatedMs(m);
          }}
          providers={providers}
          onSubmit={(input) => milestoneApi.create(token!, projectId, input)}
        />
      )}

      {canManage && (
        <ManageAccessModal
          open={accessOpen}
          onClose={() => setAccessOpen(false)}
          providers={providers}
          invites={invites}
          onInvite={async (address) => {
            const [sent] = await inviteApi.send(token!, { projectId, publicKeys: [address] });
            setInvites((curr) => [...curr, sent]);
          }}
          onCancelInvite={async (inviteId) => {
            await inviteApi.cancel(token!, inviteId);
            setInvites((curr) => curr.filter((i) => i.id !== inviteId));
          }}
          onRemove={async (userId) => {
            await projectApi.removeMember(token!, projectId, userId);
            setProject((prev) =>
              prev
                ? { ...prev, members: (prev.members ?? []).filter((m) => m.id !== userId) }
                : prev,
            );
          }}
        />
      )}

      <SuccessModal
        open={!!createdMs}
        onClose={() => setCreatedMs(null)}
        tag="MILESTONE"
        title="Milestone Created."
        message="Milestone is currently pending. Once the developer approves it, it will start."
      />
    </div>
  );
}

function AddMilestoneModal({
  open,
  onClose,
  onCreated,
  onSubmit,
  providers,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (m: MilestoneResponse) => void;
  onSubmit: (input: CreateMilestoneInput) => Promise<MilestoneResponse>;
  providers: ApiUser[];
}) {
  const [providerId, setProviderId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setProviderId(providers.length === 1 ? providers[0].id : "");
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setAmount("");
      setFiles([]);
      setError("");
    }
  }, [open, providers]);

  const valid =
    providerId.length > 0 &&
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    amount.trim().length > 0;

  const submit = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const m = await onSubmit({
        providerId,
        title: title.trim(),
        description: description.trim(),
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        amount: amount.trim(),
        files,
      });
      onCreated(m);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create milestone.");
    } finally {
      setSubmitting(false);
    }
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
            <button className="btn" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button className="btn btn-primary" disabled={!valid || submitting} onClick={submit}>
              {submitting ? "Creating…" : "Create Milestone"}
            </button>
          </div>
        </div>
      }
    >
      <div className="form-grid">
        <div className="form-row">
          <label className="form-label">▸ Assign to provider</label>
          {providers.length === 0 ? (
            <div className="access-empty">No providers on this project yet. Invite one first.</div>
          ) : (
            <select
              className="form-input"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
              style={{ colorScheme: "dark" }}
            >
              {providers.length > 1 && <option value="">— select provider —</option>}
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {shortenAddr(p.publicKey)}
                </option>
              ))}
            </select>
          )}
        </div>

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
            placeholder="e.g. 1.5"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">▸ Attach files</label>
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

        {error && <div className="auth-error">{error}</div>}
      </div>
    </Modal>
  );
}

function ManageAccessModal({
  open,
  onClose,
  providers,
  invites,
  onInvite,
  onCancelInvite,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  providers: ApiUser[];
  invites: InviteResponse[];
  onInvite: (address: string) => Promise<void>;
  onCancelInvite: (inviteId: string) => Promise<void>;
  onRemove: (userId: string) => Promise<void>;
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
    if (providers.some((p) => p.publicKey === v)) {
      setErr("This wallet is already a provider on this project.");
      return;
    }
    if (invites.some((i) => i.for.publicKey === v)) {
      setErr("This wallet already has a pending invite.");
      return;
    }
    setInviting(true);
    try {
      await onInvite(v);
      setAddr("");
      setErr("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to send invite.");
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
            {providers.length} active · {invites.length} pending
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
          {providers.length === 0 ? (
            <div className="access-empty">No providers yet. Invite a developer above.</div>
          ) : (
            <div className="access-list">
              {providers.map((p) => (
                <div key={p.id} className="access-row">
                  <div className="ar-avatar">{p.publicKey.charAt(0).toUpperCase()}</div>
                  <div className="ar-body">
                    <div className="ar-name">{shortenAddr(p.publicKey)}</div>
                    <div className="ar-meta">{p.publicKey}</div>
                  </div>
                  <span className="ms-status approved">
                    <span className="d" /> Active
                  </span>
                  <button className="btn btn-danger small" onClick={() => onRemove(p.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-row">
          <label className="form-label">▸ Pending invites</label>
          {invites.length === 0 ? (
            <div className="access-empty">No pending invites.</div>
          ) : (
            <div className="access-list">
              {invites.map((iv) => (
                <div key={iv.id} className="access-row">
                  <div className="ar-avatar dim">{iv.for.publicKey.charAt(0).toUpperCase()}</div>
                  <div className="ar-body">
                    <div className="ar-name">{shortenAddr(iv.for.publicKey)}</div>
                    <div className="ar-meta">Invited {fmtDate(iv.createdAt)}</div>
                  </div>
                  <span className="ms-status pending">
                    <span className="d" /> Pending
                  </span>
                  <button className="btn small" onClick={() => onCancelInvite(iv.id)}>
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
