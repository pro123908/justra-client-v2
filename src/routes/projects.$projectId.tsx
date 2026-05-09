import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@/components/app/Modal";
import { AppShell } from "@/components/app/AppShell";
import { StatusPill, STATUS_MAP } from "@/components/app/StatusPill";
import { Ico } from "@/components/app/Icons";
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

export default function ProjectDetailPage() {
  const { user, token, isInitializing } = useAuth();
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
    if (isInitializing) return;
    if (!user) navigate("/auth");
    else if (!user.role) navigate("/role");
  }, [isInitializing, user, navigate]);

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
      <AppShell>
        <div className="page">
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--ink-4)" }}>
            Loading project…
          </div>
        </div>
      </AppShell>
    );
  }

  if (!project || fetchError) {
    return (
      <AppShell>
        <div className="page">
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Project not found</div>
            <button className="btn" onClick={() => navigate("/projects")}>
              ← Back to projects
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  const isOwner = project.owner?.id === user.id || project.owner?.publicKey === user.address;
  const isMember = project.members?.some((m) => m.id === user.id || m.publicKey === user.address);
  const canManage = user.role === "consumer" && isOwner;
  const providers = project.members ?? [];

  if (!isOwner && !isMember) {
    return (
      <AppShell>
        <div className="page">
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Project not found</div>
            <button className="btn" onClick={() => navigate("/projects")}>
              ← Back to projects
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  const pct =
    milestones.length > 0
      ? Math.round(
          (milestones.filter((m) => m.status === MilestoneStatus.COMPLETED).length /
            milestones.length) *
            100,
        )
      : 0;

  return (
    <AppShell>
      <div className="page">
        {/* Breadcrumb */}
        <div className="crumb">
          <a onClick={() => navigate("/projects")}>Projects</a>
          <span className="sep">/</span>
          <span className="now">{project.title}</span>
        </div>

        {/* detail-head */}
        <div className="detail-head">
          <div>
            <div className="row gap-12" style={{ marginBottom: 8 }}>
              <span className="muted-2 mono" style={{ fontSize: 13 }}>
                #{project.id}
              </span>
            </div>
            <h1>{project.title}</h1>
            <div className="meta">
              <span>
                <b>Created · </b>
                {fmtDate(project.createdAt)}
              </span>
              <span>
                <b>Role · </b>
                {user.role?.toUpperCase()}
              </span>
              {providers.length > 0 && (
                <span>
                  <b>Providers · </b>
                  {providers.length}
                </span>
              )}
            </div>
          </div>
          <div className="row gap-8">
            {canManage && (
              <>
                <button className="btn" onClick={() => setAccessOpen(true)}>
                  <Ico.user /> Manage access
                </button>
                <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                  <Ico.plus /> Add milestone
                </button>
              </>
            )}
          </div>
        </div>

        {/* hero-band */}
        <div className="hero-band">
          <div className="hero-band-amount">
            <div className="lbl">Project escrow</div>
            <div className="val">◎ 0</div>
            <div className="sub">
              across {milestones.length} milestone{milestones.length !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="row gap-24" style={{ alignItems: "stretch" }}>
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
                Released
              </div>
              <div className="h-display" style={{ fontSize: 22, marginTop: 4 }}>
                ◎ 0
              </div>
            </div>
            <div style={{ width: 1, background: "var(--brand-200)" }} />
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
                Locked
              </div>
              <div className="h-display" style={{ fontSize: 22, marginTop: 4 }}>
                ◎ 0
              </div>
            </div>
            <div style={{ width: 1, background: "var(--brand-200)" }} />
            <div style={{ minWidth: 140 }}>
              <div
                className="muted-2"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Progress
              </div>
              <div className="h-display" style={{ fontSize: 22, marginTop: 4 }}>
                {pct}%
              </div>
              <div className="progress" style={{ marginTop: 6 }}>
                <i style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* two-col: milestone list + sidebar */}
        <div className="two-col">
          <div>
            <div className="row-between" style={{ marginBottom: 12 }}>
              <h2 className="h-display h3" style={{ margin: 0 }}>
                Milestones
              </h2>
            </div>
            {milestones.length === 0 ? (
              <div
                className="card card-pad"
                style={{ textAlign: "center", padding: "48px 24px", color: "var(--ink-4)" }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>No milestones yet</div>
                <div style={{ fontSize: 13, marginBottom: 20 }}>
                  {canManage
                    ? "Add the first milestone to break this project into verifiable, payable units of work."
                    : "The consumer hasn't defined any milestones yet. Check back soon."}
                </div>
                {canManage && (
                  <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                    <Ico.plus /> Add first milestone
                  </button>
                )}
              </div>
            ) : (
              <div className="ms-list">
                {milestones.map((m, i) => {
                  const meta = STATUS_MAP[m.status] ?? STATUS_MAP.draft;
                  return (
                    <button
                      key={m.id}
                      className={`ms-row ${meta.row}`}
                      onClick={() => navigate(`/projects/${projectId}/milestones/${m.id}`)}
                      style={{
                        border: 0,
                        borderBottom: i !== milestones.length - 1 ? "1px solid gray" : undefined,
                      }}
                    >
                      <div className="ms-num">{String(i + 1).padStart(2, "0")}</div>
                      <div>
                        <div className="ms-title">{m.title}</div>
                        {m.description && <div className="ms-sub">{m.description}</div>}
                        <div className="ms-meta">
                          <StatusPill status={m.status} />
                        </div>
                      </div>
                      <div>
                        <div className="ms-amount">◎ {m.amount ? formatSol(m.amount) : "—"}</div>
                        <div className="ms-amount-sub">SOL</div>
                      </div>
                      <Ico.arrowR className="ms-arrow" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="stack gap-16">
            {/* Team card */}
            <div className="card card-pad">
              <h3 className="h-display" style={{ fontSize: 15, margin: "0 0 12px" }}>
                Team
              </h3>
              <div className="stack gap-12">
                <div className="row gap-12">
                  <div className="av av-lg">{user.initial}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>You</div>
                    <div className="muted-2" style={{ fontSize: 12 }}>
                      Client · {user.short}
                    </div>
                  </div>
                </div>
                {providers.map((p) => (
                  <div key={p.id} className="row gap-12">
                    <div className="av av-lg">{p.publicKey?.[0]?.toUpperCase()}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Developer</div>
                      <div className="muted-2 mono" style={{ fontSize: 12 }}>
                        {shortenAddr(p.publicKey)}
                      </div>
                    </div>
                  </div>
                ))}
                {invites.length > 0 && (
                  <div className="muted-2" style={{ fontSize: 12, marginTop: 4 }}>
                    +{invites.length} pending invite{invites.length !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
              {canManage && (
                <button
                  className="btn btn-sm"
                  style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
                  onClick={() => navigate(`/projects/${projectId}/invites`)}
                >
                  Manage invites
                </button>
              )}
            </div>

            {/* Escrow info */}
            <div className="alert tip">
              <Ico.shield className="icon" />
              <div>
                <div className="title">Escrow is on-chain</div>
                <div className="body">
                  Each milestone holds funds in its own program-derived address. Released SOL
                  settles to the provider's wallet within ~2s of approval.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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
      {/* Replace SuccessModal with Modal */}
      <Modal open={!!createdMs} onClose={() => setCreatedMs(null)} title="Milestone created">
        <p className="muted" style={{ marginTop: 0, lineHeight: 1.6 }}>
          Milestone is currently pending. Once the developer approves it, it will start.
        </p>
      </Modal>
    </AppShell>
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
  const navigate = useNavigate();
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
      title="Define checkpoint"
      footer={
        <div className="row gap-8" style={{ marginLeft: "auto" }}>
          <button className="btn" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={!valid || submitting} onClick={submit}>
            {submitting ? "Creating…" : "Create milestone"}
          </button>
        </div>
      }
    >
      <div className="stack gap-16">
        {/* Provider selector */}
        <div className="field">
          <label className="field-label">Assign to provider</label>
          {allProviders.length === 0 ? (
            <div className="muted" style={{ fontSize: 13 }}>
              No providers invited yet.{" "}
              <span
                className="link"
                style={{ cursor: "pointer", color: "var(--brand-600)" }}
                onClick={() => navigate(`/projects/${projectId}/invites`)}
              >
                Invite one first →
              </span>
            </div>
          ) : (
            <select
              className="input"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
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
        <div className="field">
          <label className="field-label">Title</label>
          <input
            className="input"
            placeholder="e.g. M-01 · Auth & user provisioning"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>
        <div className="field">
          <label className="field-label">Description</label>
          <textarea
            className="textarea"
            placeholder="Acceptance criteria, scope, deliverables…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="row gap-16">
          <div className="field" style={{ flex: 1 }}>
            <label className="field-label">Start date</label>
            <input
              type="date"
              className="input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label className="field-label">End date</label>
            <input
              type="date"
              className="input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
            />
          </div>
        </div>
        <div className="field">
          <label className="field-label">Amount (SOL)</label>
          <input
            className="input"
            placeholder="e.g. 1.5"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {error && <div style={{ color: "var(--danger)", fontSize: 13 }}>{error}</div>}
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
      title="Manage providers"
      width={620}
      footer={
        <div className="row-between" style={{ width: "100%" }}>
          <span className="muted-2" style={{ fontSize: 13 }}>
            {providers.length} active · {invites.length} pending
          </span>
          <button className="btn" onClick={onClose}>
            Done
          </button>
        </div>
      }
    >
      <div className="stack gap-16">
        <div className="field">
          <label className="field-label">Invite provider by wallet address</label>
          <div className="row gap-8">
            <input
              className="input"
              style={{ flex: 1 }}
              placeholder="Solana wallet address (base58)"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
            />
            <button className="btn btn-primary" onClick={submit} disabled={inviting}>
              {inviting ? "Inviting…" : "Invite"}
            </button>
          </div>
          {err && <div style={{ color: "var(--danger)", fontSize: 13, marginTop: 6 }}>{err}</div>}
        </div>
        <div className="field">
          <label className="field-label">Active providers</label>
          {providers.length === 0 ? (
            <div className="muted-2" style={{ fontSize: 13 }}>
              No providers yet.
            </div>
          ) : (
            <div className="stack gap-8">
              {providers.map((p) => (
                <div key={p.id} className="invite-row">
                  <div className="av av-sm">{p.publicKey.charAt(0).toUpperCase()}</div>
                  <div className="meta">
                    <div className="name">{shortenAddr(p.publicKey)}</div>
                    <div className="sub mono">{p.publicKey}</div>
                  </div>
                  <span className="pill pill-ok">
                    <span className="dot" />
                    Active
                  </span>
                  <button className="btn btn-sm btn-danger" onClick={() => onRemove(p.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {invites.length > 0 && (
          <div className="field">
            <label className="field-label">Pending invites</label>
            <div className="stack gap-8">
              {invites.map((iv) => (
                <div key={iv.id} className="invite-row">
                  <div className="av av-sm dim">{iv.for.publicKey.charAt(0).toUpperCase()}</div>
                  <div className="meta">
                    <div className="name">{shortenAddr(iv.for.publicKey)}</div>
                    <div className="sub">Invited {fmtDate(iv.createdAt)}</div>
                  </div>
                  <span className="pill pill-warn">
                    <span className="dot dot-pulse" />
                    Pending
                  </span>
                  <button className="btn btn-sm" onClick={() => onCancelInvite(iv.id)}>
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
