import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { useAuth } from "@/lib/auth";
import { inviteApi, projectApi, type InviteResponse, type ProjectResponse } from "@/lib/api";

const shortenAddr = (addr: string) =>
  addr.length <= 10 ? addr : `${addr.slice(0, 4)}…${addr.slice(-4)}`;

export default function ProjectInvitesPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { projectId = "" } = useParams();

  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [invites, setInvites] = useState<InviteResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [addr, setAddr] = useState("");
  const [inviteErr, setInviteErr] = useState("");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    if (!user) navigate("/auth");
    else if (!user.role) navigate("/role");
    else if (user.role !== "consumer") navigate(`/projects/${projectId}`);
  }, [user, navigate, projectId]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([projectApi.get(token, projectId), inviteApi.getProjectInvites(token, projectId)])
      .then(([proj, invList]) => {
        setProject(proj);
        setInvites(invList);
      })
      .catch(() => navigate(`/projects/${projectId}`))
      .finally(() => setLoading(false));
  }, [token, projectId, navigate]);

  const handleInvite = async () => {
    const v = addr.trim();
    if (v.length < 32 || v.length > 64) {
      setInviteErr("Enter a valid Solana wallet address.");
      return;
    }
    if (invites.some((i) => i.for.publicKey === v)) {
      setInviteErr("This wallet already has a pending invite.");
      return;
    }
    setInviting(true);
    setInviteErr("");
    try {
      const sent = await inviteApi.send(token!, { projectId, publicKeys: [v] });
      setInvites((prev) => [...prev, ...sent]);
      setAddr("");
    } catch (e) {
      setInviteErr(e instanceof Error ? e.message : "Failed to send invite.");
    } finally {
      setInviting(false);
    }
  };

  const handleCancel = async (inviteId: string) => {
    try {
      await inviteApi.cancel(token!, inviteId);
      setInvites((prev) => prev.filter((i) => i.id !== inviteId));
    } catch {
      // silently ignore
    }
  };

  if (!user || user.role !== "consumer") return null;

  if (loading) {
    return (
      <AppShell>
        <div className="page">
          <div className="muted" style={{ textAlign: "center", padding: "60px 0" }}>
            Loading…
          </div>
        </div>
      </AppShell>
    );
  }

  const pendingInvites = invites.filter((i) => i.status === "PENDING" || i.status === "pending");

  return (
    <AppShell>
      <div className="page">
        <div className="crumb">
          <a onClick={() => navigate(`/projects/${projectId}`)} style={{ cursor: "pointer" }}>
            {project?.title ?? projectId}
          </a>
          <span className="sep">/</span>
          <span className="now">Invites</span>
        </div>
        <PageHead
          title="Manage access"
          subtitle="Invite a developer to this project by their Solana address."
        />

        <div className="card" style={{ maxWidth: 560, marginBottom: 24 }}>
          <div className="card-head">
            <div className="card-title">Send invite</div>
          </div>
          <div className="card-pad">
            <div className="field">
              <label className="field-label">Provider wallet address</label>
              <input
                className="input"
                placeholder="Solana public key…"
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                autoFocus
              />
              {inviteErr && (
                <span className="field-hint" style={{ color: "var(--danger-ink)" }}>
                  {inviteErr}
                </span>
              )}
              <span className="field-hint">
                The developer must connect this wallet to accept your invite.
              </span>
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: 14 }}
              onClick={handleInvite}
              disabled={inviting}
            >
              {inviting ? "Sending…" : "Send invite"}
            </button>
          </div>
        </div>

        {pendingInvites.length > 0 && (
          <div>
            <h2 className="h-display h3" style={{ marginBottom: 14 }}>
              Pending invites
            </h2>
            <div className="invite-list">
              {pendingInvites.map((inv) => (
                <div key={inv.id} className="invite-row">
                  <div className="av av-lg">{inv.for.publicKey.charAt(0).toUpperCase()}</div>
                  <div className="meta">
                    <div className="name">{shortenAddr(inv.for.publicKey)}</div>
                    <div className="sub">{inv.for.publicKey}</div>
                  </div>
                  <button className="btn btn-sm btn-danger" onClick={() => handleCancel(inv.id)}>
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32 }}>
          <button className="btn btn-primary" onClick={() => navigate(`/projects/${projectId}`)}>
            Continue to project
          </button>
        </div>
      </div>
    </AppShell>
  );
}
