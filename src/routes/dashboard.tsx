import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/app/Navbar";
import Modal from "@/components/app/Modal";
import { useAuth } from "@/lib/auth";
import { useAppData, type Project } from "@/lib/app-data";
import { githubApi } from "@/lib/api";
import { buildGithubAppInstallUrl } from "@/routes/github";
import "@/components/git-escrow.css";

export default function DashboardPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { createProject, projectsOwnedBy, projectsForProvider, invitesForProvider, acceptInvite } =
    useAppData();

  const [createOpen, setCreateOpen] = useState(false);
  const [hasInstallation, setHasInstallation] = useState<boolean | null>(null);
  const [installationId, setInstallationId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) navigate("/auth");
    else if (!user.role) navigate("/role");
    else if (user.role === "provider" && !user.githubUsername) navigate("/github");
  }, [user, navigate]);

  useEffect(() => {
    if (!token || !user?.githubUsername) return;
    githubApi
      .checkInstallation(token)
      .then((res) => {
        setHasInstallation(res.hasInstallation);
        setInstallationId(
          (res as { hasInstallation: boolean; installationId?: string }).installationId ?? null,
        );
      })
      .catch(() => {
        /* ignore */
      });
  }, [token, user?.githubUsername]);

  if (!user || !user.role) return null;
  if (user.role === "provider" && !user.githubUsername) return null;

  if (user.role === "provider") {
    return (
      <ProviderDashboard
        projects={projectsForProvider(user.address)}
        invites={invitesForProvider(user.address)}
        onAccept={(inviteId) => acceptInvite(inviteId)}
      />
    );
  }

  // Consumer
  const projects = projectsOwnedBy(user.id);

  return (
    <div className="git-escrow-root">
      <div className="wrap">
        <Navbar />

        <div className="section-bar">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              Workspace · {user.short}
              {user.role && (
                <span style={{ color: "var(--neon)", marginLeft: 10 }}>
                  · {user.role.toUpperCase()}
                </span>
              )}
            </div>
            <h2>Projects</h2>
            <div className="sub">
              {projects.length} {projects.length === 1 ? "project" : "projects"} under escrow
              management.
            </div>
          </div>
          <button className="btn-action" onClick={() => setCreateOpen(true)}>
            <span className="plus">+</span> Create Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="ic">+</div>
            <h3>No projects yet</h3>
            <p>Spin up your first project to begin defining milestones and inviting developers.</p>
            <button className="btn-action" onClick={() => setCreateOpen(true)}>
              <span className="plus">+</span> Create your first project
            </button>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}

        {(!user.githubUsername || (user.githubUsername && hasInstallation === false)) && (
          <div className="github-connect-banner">
            <div className="github-connect-banner-text">
              <div className="eyebrow" style={{ marginBottom: 6 }}>
                Optional · GitHub
              </div>
              {!user.githubUsername ? (
                <>
                  <h3 style={{ margin: 0, fontSize: 16 }}>Connect GitHub to verify deliverables</h3>
                  <p style={{ margin: "6px 0 0", color: "var(--ink-dim)", fontSize: 13 }}>
                    Link your GitHub account to let providers submit repository links and confirm
                    deliverables against milestone specs.
                  </p>
                </>
              ) : (
                <>
                  <h3 style={{ margin: 0, fontSize: 16 }}>Install the GitHub App</h3>
                  <p style={{ margin: "6px 0 0", color: "var(--ink-dim)", fontSize: 13 }}>
                    Grant repository access so providers can submit and verify code deliverables.
                  </p>
                </>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.location.href = buildGithubAppInstallUrl();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="14"
                  height="14"
                  style={{ marginRight: 6 }}
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {!user.githubUsername ? "Connect GitHub" : "Install GitHub App"}
              </button>
              {user.githubUsername && hasInstallation === false && installationId && (
                <a
                  href={`https://github.com/settings/installations/${installationId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Manage repos →
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(p) => {
          setCreateOpen(false);
          navigate(`/projects/${p.id}`);
        }}
        createProject={(input) => createProject(input)}
      />
    </div>
  );
}

function ProviderDashboard({
  projects,
  invites,
  onAccept,
}: {
  projects: Project[];
  invites: Array<{
    project: Project;
    invite: { id: string; address: string; short: string; invitedAt: string };
  }>;
  onAccept: (inviteId: string) => void;
}) {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="git-escrow-root">
      <div className="wrap">
        <Navbar />

        <div className="section-bar">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              Workspace · {user.short}
              <span style={{ color: "var(--neon)", marginLeft: 10 }}>· PROVIDER</span>
            </div>
            <h2>Current projects</h2>
            <div className="sub">
              {projects.length} active project{projects.length === 1 ? "" : "s"} delivering under
              escrow.
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="ic">≡</div>
            <h3>No active projects</h3>
            <p>Once a consumer adds you and you accept their invite, projects will appear here.</p>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}

        <div className="section-bar" style={{ marginTop: 56 }}>
          <div>
            <h2>Project invites</h2>
            <div className="sub">
              {invites.length} pending invitation{invites.length === 1 ? "" : "s"} from consumers.
            </div>
          </div>
        </div>

        {invites.length === 0 ? (
          <div className="empty-state">
            <div className="ic">!</div>
            <h3>No pending invites</h3>
            <p>You'll be notified here when a consumer invites you to a project.</p>
          </div>
        ) : (
          <div className="invite-grid">
            {invites.map(({ project, invite }) => (
              <div key={invite.id} className="invite-card">
                <div>
                  <div className="pc-id">{project.name}</div>
                  <div className="pc-title">{project.id}</div>
                  <div className="invite-meta">
                    Owner <b>{project.ownerId}</b>
                  </div>
                </div>
                <div className="invite-actions">
                  <button className="btn btn-primary" onClick={() => onAccept(invite.id)}>
                    Accept invite
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="proj-grid">
      {projects.map((p) => (
        <Link key={p.id} to={`/projects/${p.id}`} className="proj-card">
          <div className="pc-head">
            <div>
              <div className="pc-id">{p.id}</div>
              <div className="pc-title">{p.name}</div>
            </div>
          </div>
          <div className="pc-meta">
            <span>Open project</span>
            <span className="arrow">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CreateProjectModal({
  open,
  onClose,
  onCreated,
  createProject,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (p: Project) => void;
  createProject: (input: { name: string; description: string }) => Promise<Project>;
}) {
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName("");
      setCreating(false);
      setCreateError(null);
    }
  }, [open]);

  const handleCreate = async () => {
    if (!name.trim() || creating) return;
    setCreating(true);
    setCreateError(null);
    try {
      const p = await createProject({ name: name.trim(), description: "" });
      onCreated(p);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      tag="NEW PROJECT"
      title="Create project"
      footer={
        <div className="modal-foot">
          <div>
            {createError ? (
              <span style={{ color: "red" }}>{createError}</span>
            ) : (
              "Enter a name to get started"
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              disabled={!name.trim() || creating}
              onClick={handleCreate}
            >
              {creating ? "Creating…" : "Create Project"}
            </button>
          </div>
        </div>
      }
    >
      <div className="form-grid">
        <div className="form-row">
          <label className="form-label">▸ Project name</label>
          <input
            className="form-input"
            placeholder="e.g. Atlas Settlement Engine"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
            }}
            autoFocus
          />
        </div>
      </div>
    </Modal>
  );
}
