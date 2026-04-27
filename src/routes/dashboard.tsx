import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/app/Navbar";
import Modal from "@/components/app/Modal";
import { SuccessModal } from "@/components/app/SuccessModal";
import { useAuth } from "@/lib/auth";
import { useAppData, type Project } from "@/lib/app-data";
import "@/components/git-escrow.css";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Dashboard — Git Escrow" },
      { name: "description", content: "Your Git Escrow projects and milestones." },
    ],
  }),
});

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createProject, projectsOwnedBy, projectsForProvider, invitesForProvider, acceptInvite } =
    useAppData();

  const [createOpen, setCreateOpen] = useState(false);
  const [createdProject, setCreatedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
    else if (!user.role) navigate({ to: "/role" });
  }, [user, navigate]);

  if (!user || !user.role) return null;

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
      </div>

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(p) => {
          setCreateOpen(false);
          setCreatedProject(p);
        }}
        createProject={(input) => createProject(input)}
      />

      <SuccessModal
        open={!!createdProject}
        onClose={() => setCreatedProject(null)}
        tag="PROJECT"
        title="Project created successfully"
        message="Your project is now active under escrow management. You can invite developers using the share link below."
        shareLabel="Share project with developers"
        shareUrl={
          createdProject
            ? `${typeof window !== "undefined" ? window.location.origin : ""}/projects/${createdProject.id}`
            : undefined
        }
        footer={
          <>
            <button className="btn" onClick={() => setCreatedProject(null)}>
              Stay on dashboard
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (createdProject) {
                  const id = createdProject.id;
                  setCreatedProject(null);
                  navigate({ to: "/projects/$projectId", params: { projectId: id } });
                }
              }}
            >
              Open project →
            </button>
          </>
        }
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
        <Link
          key={p.id}
          to="/projects/$projectId"
          params={{ projectId: p.id }}
          className="proj-card"
        >
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
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
    }
  }, [open]);

  const valid = name.trim().length > 0;

  const submit = async () => {
    if (!valid) return;
    const p = await createProject({ name: name.trim(), description: description.trim() });
    onCreated(p);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      tag="NEW PROJECT"
      title="Define project"
      footer={
        <div className="modal-foot">
          <div>{description.trim() ? "Description added" : "No description added"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" disabled={!valid} onClick={submit}>
              Create Project
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
            autoFocus
          />
        </div>

        <div className="form-row">
          <label className="form-label">▸ Project description</label>
          <textarea
            className="form-input"
            placeholder="Write a short summary of the project scope, goals, or deliverables"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>
      </div>
    </Modal>
  );
}
