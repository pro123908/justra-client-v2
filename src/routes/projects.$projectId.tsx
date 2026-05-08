import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/app/Navbar";
import Modal from "@/components/app/Modal";
import { SuccessModal } from "@/components/app/SuccessModal";
import { useAuth } from "@/lib/auth";
import { formatSol } from "@/lib/utils";
import {
  projectApi,
  projectDocApi,
  inviteApi,
  milestoneApi,
  MilestoneStatus,
  ProjectCreationStatus,
  type ProjectResponse,
  type MilestoneResponse,
  type InviteResponse,
  type ApiUser,
  type CreateMilestoneInput,
  type ChatMessage,
  type ExtractedMilestone,
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

  if (canManage && project.status === ProjectCreationStatus.PENDING) {
    return (
      <ProjectSetupView
        project={project}
        token={token!}
        onSetupComplete={() =>
          setProject((prev) =>
            prev ? { ...prev, status: ProjectCreationStatus.CREATION_SUCCESSFUL } : prev,
          )
        }
      />
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
              <span>
                status{" "}
                <b
                  style={{
                    color:
                      project.status === ProjectCreationStatus.CREATION_SUCCESSFUL
                        ? "var(--neon)"
                        : project.status === ProjectCreationStatus.CREATION_FAILED
                          ? "red"
                          : "var(--ink-dim)",
                  }}
                >
                  {project.status === ProjectCreationStatus.CREATION_SUCCESSFUL
                    ? "SETUP COMPLETE"
                    : project.status === ProjectCreationStatus.CREATION_FAILED
                      ? "SETUP FAILED"
                      : "PENDING SETUP"}
                </b>
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
                  <div className="ms-card-header">
                    <h3 className="ms-title">{m.title}</h3>
                    <div className="ms-amount-pill">
                      <span className="ms-amount-value">
                        ◎ {m.amount ? formatSol(m.amount) : "—"}
                      </span>
                      <span className="ms-amount-unit">SOL</span>
                    </div>
                  </div>
                  {m.description && <p className="ms-desc">{m.description}</p>}
                  <div className="ms-card-footer">
                    <span className={"ms-status " + statusGroup(m.status)}>
                      <span className="d" />
                      {statusLabel(m.status)}
                    </span>
                    {(m.startDate || m.endDate) && (
                      <span className="ms-meta-item">
                        {fmtDate(m.startDate)} → {fmtDate(m.endDate)}
                      </span>
                    )}
                    {m.provider && (
                      <span className="ms-meta-item">
                        Provider · {shortenAddr(m.provider.publicKey)}
                      </span>
                    )}
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
          invites={invites}
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
  invites,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (m: MilestoneResponse) => void;
  onSubmit: (input: CreateMilestoneInput) => Promise<MilestoneResponse>;
  providers: ApiUser[];
  invites: InviteResponse[];
}) {
  // Build a combined list: accepted members + pending invite recipients (deduped)
  const invitedProviders = invites
    .filter((i) => i.status === "PENDING" || i.status === "pending")
    .map((i) => i.for)
    .filter((u) => !providers.some((p) => p.id === u.id));
  const allProviders = [...providers, ...invitedProviders];

  const { projectId = "" } = useParams();
  const [providerId, setProviderId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setProviderId(allProviders.length === 1 ? allProviders[0].id : "");
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setAmount("");
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const valid =
    title.trim().length > 0 && description.trim().length > 0 && amount.trim().length > 0;

  const submit = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const m = await onSubmit({
        providerId: providerId || undefined,
        title: title.trim(),
        description: description.trim(),
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        amount: amount.trim(),
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
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
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
          {allProviders.length === 0 ? (
            <div className="access-empty">
              No providers invited yet.{" "}
              <Link to={`/projects/${projectId}/invites`} style={{ color: "var(--neon)" }}>
                Invite one first →
              </Link>
            </div>
          ) : (
            <select
              className="form-input"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
              style={{ colorScheme: "dark" }}
            >
              {allProviders.length > 1 && <option value="">— select provider —</option>}
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {shortenAddr(p.publicKey)} · Active
                </option>
              ))}
              {invitedProviders.map((p) => (
                <option key={p.id} value={p.id}>
                  {shortenAddr(p.publicKey)} · Invited
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

function ProjectSetupView({
  project,
  token,
  onSetupComplete,
}: {
  project: ProjectResponse;
  token: string;
  onSetupComplete: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [approved, setApproved] = useState(false);
  const [extractedMilestones, setExtractedMilestones] = useState<ExtractedMilestone[]>([]);
  const [showReview, setShowReview] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setDocId(null);
      setMessages([]);
      setApproved(false);
      setAnalyzeError(null);
    }
    e.target.value = "";
  };

  const markApproved = async () => {
    setApproved(true);
    try {
      await projectApi.completeSetup(token, project.id);
    } catch {
      // status update is best-effort; user can still proceed
    }
  };

  const handleAnalyze = async () => {
    if (!file || analyzing) return;
    setAnalyzing(true);
    setAnalyzeError(null);
    try {
      const res = await projectDocApi.upload(token, file);
      setDocId(res.docId);
      setMessages([{ role: "assistant", content: res.initialMessage }]);
      setExtractedMilestones(res.milestones ?? []);
      if (res.approved) await markApproved();
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !docId || sending) return;
    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setSending(true);
    setChatError(null);
    try {
      const res = await projectDocApi.chat(token, docId, next);
      const updated = [...next, { role: "assistant" as const, content: res.reply }];
      setMessages(updated);
      if (res.approved) await markApproved();
    } catch (err) {
      setChatError(err instanceof Error ? err.message : "Failed to get response");
      setMessages(messages);
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setDocId(null);
    setMessages([]);
    setApproved(false);
    setExtractedMilestones([]);
    setShowReview(false);
    setInput("");
    setAnalyzeError(null);
    setChatError(null);
  };

  if (showReview) {
    return (
      <MilestoneReviewSection
        project={project}
        token={token}
        extractedMilestones={extractedMilestones}
        onBack={() => setShowReview(false)}
        onComplete={onSetupComplete}
      />
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
                created <b>{fmtDate(project.createdAt)}</b>
              </span>
              <span>
                status <b style={{ color: "var(--ink-dim)" }}>PENDING SETUP</b>
              </span>
            </div>
          </div>
        </div>

        <div
          className="section-bar"
          style={{ marginTop: 28, borderBottom: "1px dashed var(--line)" }}
        >
          <div>
            <h2 style={{ fontSize: 26 }}>Project Setup</h2>
            <div className="sub">
              Attach your project specification document. The AI will verify it contains all
              required information — milestones, requirements, and deliverables — before you can
              invite providers and create milestones.
            </div>
          </div>
        </div>

        {/* ── File selection (before analysis) ── */}
        {!docId && (
          <div style={{ marginTop: 24 }}>
            {!file ? (
              <label
                className="form-input"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  minHeight: 120,
                  textAlign: "center",
                }}
              >
                Click to attach project specification · PDF, DOCX, TXT, MD · max 10 MB
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    border: "1px solid var(--line)",
                    borderRadius: 8,
                  }}
                >
                  <span style={{ fontSize: 13 }}>📄 {file.name}</span>
                  <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--ink-dim)" }}>
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                  <button
                    className="btn"
                    style={{ fontSize: 12, padding: "2px 10px" }}
                    onClick={handleReset}
                  >
                    Remove
                  </button>
                </div>

                {analyzeError && (
                  <div style={{ color: "red", fontSize: 13, marginTop: 8 }}>{analyzeError}</div>
                )}

                <button
                  className="btn-action"
                  style={{ marginTop: 16 }}
                  onClick={handleAnalyze}
                  disabled={analyzing}
                >
                  {analyzing ? "Analyzing…" : "Analyze Docs"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Chat section (after analysis) ── */}
        {docId && (
          <div style={{ marginTop: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 13,
                color: "var(--ink-dim)",
                marginBottom: 16,
              }}
            >
              <span>📄 {file?.name}</span>
              {!approved && (
                <button
                  className="btn"
                  style={{ fontSize: 12, padding: "2px 10px", marginLeft: "auto" }}
                  onClick={handleReset}
                >
                  Upload different document
                </button>
              )}
            </div>

            {approved && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: "var(--surface-2, #111)",
                  border: "1px solid var(--neon)",
                  borderRadius: 8,
                  marginBottom: 16,
                  gap: 16,
                }}
              >
                <span style={{ color: "var(--neon)", fontSize: 13 }}>
                  ✓ Documentation approved — you're ready to set up milestones
                </span>
                <button className="btn btn-primary" onClick={() => setShowReview(true)}>
                  Create Milestones →
                </button>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxHeight: 420,
                overflowY: "auto",
                padding: "8px 0",
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                    background: m.role === "user" ? "var(--neon)" : "var(--surface-2, #1a1a1a)",
                    color: m.role === "user" ? "#000" : "var(--ink)",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 13,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </div>
              ))}
              {sending && (
                <div style={{ alignSelf: "flex-start", fontSize: 13, color: "var(--ink-dim)" }}>
                  Thinking…
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {chatError && (
              <div style={{ color: "red", fontSize: 12, marginTop: 4 }}>{chatError}</div>
            )}

            {!approved && (
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <input
                  className="form-input"
                  style={{ flex: 1 }}
                  placeholder="Ask the AI or clarify your specification…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={sending}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSend}
                  disabled={!input.trim() || sending}
                >
                  Send
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type EditableMilestone = {
  title: string;
  description: string;
  amount: string;
  startDate: string;
  endDate: string;
};

function MilestoneReviewSection({
  project,
  token,
  extractedMilestones,
  onBack,
  onComplete,
}: {
  project: ProjectResponse;
  token: string;
  extractedMilestones: ExtractedMilestone[];
  onBack: () => void;
  onComplete: () => void;
}) {
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [invites, setInvites] = useState<InviteResponse[]>([]);
  const [milestones, setMilestones] = useState<EditableMilestone[]>(() =>
    extractedMilestones.map((m) => ({
      title: m.title,
      description: m.description,
      amount: m.amount ?? "",
      startDate: "",
      endDate: m.deadline ?? "",
    })),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    inviteApi
      .getProjectInvites(token, project.id)
      .then(setInvites)
      .catch(() => {});
  }, [token, project.id]);

  const acceptedProviders = project.members ?? [];
  const invitedProviders = invites
    .filter((i) => i.status === "PENDING" || i.status === "pending")
    .map((i) => i.for)
    .filter((u) => !acceptedProviders.some((p) => p.id === u.id));
  const allProviders = [...acceptedProviders, ...invitedProviders];

  const updateMilestone = (idx: number, patch: Partial<EditableMilestone>) => {
    setMilestones((prev) => prev.map((m, i) => (i === idx ? { ...m, ...patch } : m)));
  };

  const allFilled = milestones.every(
    (m) => m.title.trim() && m.description.trim() && m.amount?.trim(),
  );

  const handleCreateAll = async () => {
    if (!allFilled || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      for (const m of milestones) {
        await milestoneApi.create(token, project.id, {
          providerId: selectedProviderId || undefined,
          title: m.title.trim(),
          description: m.description.trim(),
          amount: m.amount.trim(),
          startDate: m.startDate || undefined,
          endDate: m.endDate || undefined,
        });
      }
      onComplete();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create milestones");
    } finally {
      setSubmitting(false);
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
              <span>Projects</span>
              <span className="sep">/</span>
              <span style={{ color: "var(--neon)" }}>{project.id}</span>
            </div>
            <div className="ph-id">▸ {project.id}</div>
            <h1>{project.title}</h1>
            <div className="ph-meta">
              <span>
                status <b style={{ color: "var(--ink-dim)" }}>PENDING SETUP</b>
              </span>
            </div>
          </div>
        </div>

        <div
          className="section-bar"
          style={{ marginTop: 28, borderBottom: "1px dashed var(--line)" }}
        >
          <div>
            <h2 style={{ fontSize: 26 }}>Review Milestones</h2>
            <div className="sub">
              {milestones.length} milestone{milestones.length !== 1 ? "s" : ""} extracted from your
              document. Fill in any missing fields, assign a provider, then create them all.
            </div>
          </div>
          <button className="btn" onClick={onBack} disabled={submitting}>
            ← Back
          </button>
        </div>

        {/* Provider assignment */}
        <div style={{ marginTop: 24 }}>
          <div className="form-row">
            <label className="form-label">▸ Assign provider (applies to all milestones)</label>
            {allProviders.length === 0 ? (
              <div className="access-empty">
                No providers invited yet.{" "}
                <Link to={`/projects/${project.id}/invites`} style={{ color: "var(--neon)" }}>
                  Invite one first →
                </Link>
              </div>
            ) : (
              <select
                className="form-input"
                value={selectedProviderId}
                onChange={(e) => setSelectedProviderId(e.target.value)}
                style={{ colorScheme: "dark" }}
              >
                <option value="">— select provider —</option>
                {acceptedProviders.map((p) => (
                  <option key={p.id} value={p.id}>
                    {shortenAddr(p.publicKey)} · Active
                  </option>
                ))}
                {invitedProviders.map((p) => (
                  <option key={p.id} value={p.id}>
                    {shortenAddr(p.publicKey)} · Invited
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Milestone cards */}
        <div className="review-ms-list">
          {milestones.map((m, idx) => (
            <div key={idx} className="review-ms-card">
              <div className="review-ms-num">{String(idx + 1).padStart(2, "0")}</div>
              <div className="review-ms-fields">
                <div className="review-ms-card-header">
                  <span className="review-ms-card-label">
                    Milestone {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="form-row">
                  <label className="form-label">▸ Title</label>
                  <input
                    className="form-input"
                    value={m.title}
                    onChange={(e) => updateMilestone(idx, { title: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <label className="form-label">▸ Description</label>
                  <textarea
                    className="form-textarea"
                    value={m.description}
                    onChange={(e) => updateMilestone(idx, { description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="form-row two">
                  <div className="form-row" style={{ gap: 8 }}>
                    <label className="form-label">▸ Start date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={m.startDate}
                      onChange={(e) => updateMilestone(idx, { startDate: e.target.value })}
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                  <div className="form-row" style={{ gap: 8 }}>
                    <label className="form-label">▸ End / deadline</label>
                    <input
                      type="date"
                      className="form-input"
                      value={m.endDate}
                      onChange={(e) => updateMilestone(idx, { endDate: e.target.value })}
                      min={m.startDate || undefined}
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <label className="form-label">
                    ▸ Amount (SOL)
                    {!m.amount && (
                      <span style={{ color: "var(--amber)", marginLeft: 6 }}>· required</span>
                    )}
                  </label>
                  <input
                    className="form-input"
                    placeholder="e.g. 1.5"
                    inputMode="decimal"
                    value={m.amount}
                    onChange={(e) => updateMilestone(idx, { amount: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && <div style={{ color: "red", fontSize: 13, marginTop: 16 }}>{error}</div>}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 32,
            marginBottom: 48,
          }}
        >
          <button className="btn" onClick={onBack} disabled={submitting}>
            ← Back
          </button>
          <button
            className="btn btn-primary"
            disabled={!allFilled || submitting}
            onClick={handleCreateAll}
          >
            {submitting
              ? `Creating milestones…`
              : `Create ${milestones.length} Milestone${milestones.length !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}
