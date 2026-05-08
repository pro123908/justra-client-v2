import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/app/Navbar";
import { useAuth } from "@/lib/auth";
import { inviteApi, projectApi, type InviteResponse, type ProjectResponse } from "@/lib/api";
import "@/components/git-escrow.css";

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
      <div className="git-escrow-root">
        <div className="wrap">
          <Navbar />
          <div className="empty-state" style={{ marginTop: 60 }}>
            <div className="ic">…</div>
            <h3>Loading</h3>
          </div>
        </div>
      </div>
    );
  }

  const pendingInvites = invites.filter((i) => i.status === "PENDING" || i.status === "pending");

  return (
    <div className="git-escrow-root">
      <div className="wrap">
        <Navbar />

        <div className="proj-header">
          <div>
            <div className="crumb">
              <Link to="/dashboard">Dashboard</Link>
              <span className="sep">/</span>
              <Link to={`/projects/${projectId}`}>{project?.title ?? projectId}</Link>
              <span className="sep">/</span>
              <span style={{ color: "var(--neon)" }}>Invite providers</span>
            </div>
            <div className="ph-id">▸ {projectId}</div>
            <h1>Invite providers</h1>
            <div className="ph-meta">
              <span>
                <b>{pendingInvites.length}</b> pending invite
                {pendingInvites.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <button className="btn-action" onClick={() => navigate(`/projects/${projectId}`)}>
            Continue to project →
          </button>
        </div>

        <div style={{ maxWidth: 600, marginTop: 32 }}>
          {/* Invite input */}
          <div className="form-row" style={{ marginBottom: 32 }}>
            <label className="form-label">▸ Invite provider by wallet address</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                className="form-input"
                placeholder="Solana wallet address (base58)"
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                style={{ flex: 1 }}
                autoFocus
              />
              <button className="btn btn-primary" onClick={handleInvite} disabled={inviting}>
                {inviting ? "Inviting…" : "Invite"}
              </button>
            </div>
            {inviteErr && (
              <div className="auth-error" style={{ marginTop: 6 }}>
                {inviteErr}
              </div>
            )}
            <div style={{ marginTop: 6, fontSize: 11, color: "var(--ink-mute)" }}>
              The provider must have a registered account to receive an invite.
            </div>
          </div>

          {/* Pending invites list */}
          <div>
            <div className="section-h" style={{ marginBottom: 14 }}>
              <span>▸ PENDING INVITES</span>
              <span style={{ color: "var(--ink-mute)", fontSize: 11 }}>
                {pendingInvites.length} sent
              </span>
            </div>

            {pendingInvites.length === 0 ? (
              <div className="access-empty">
                No invites sent yet. Add a provider above to get started.
              </div>
            ) : (
              <div className="access-list">
                {pendingInvites.map((inv) => (
                  <div key={inv.id} className="access-row">
                    <div className="ar-avatar">{inv.for.publicKey.charAt(0).toUpperCase()}</div>
                    <div className="ar-body">
                      <div className="ar-name">{shortenAddr(inv.for.publicKey)}</div>
                      <div className="ar-meta">{inv.for.publicKey}</div>
                    </div>
                    <span className="ms-status pending">
                      <span className="d" /> Pending
                    </span>
                    <button className="btn btn-danger small" onClick={() => handleCancel(inv.id)}>
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Continue CTA */}
          <div
            style={{
              marginTop: 40,
              paddingTop: 24,
              borderTop: "1px dashed var(--line)",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button className="btn btn-primary" onClick={() => navigate(`/projects/${projectId}`)}>
              Continue to project →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
