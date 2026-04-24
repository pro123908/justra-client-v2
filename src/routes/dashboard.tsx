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
  const {
    createProject,
    projectsOwnedBy,
    projectsForProvider,
    invitesForProvider,
    acceptInvite,
  } = useAppData();

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
        onAccept={(projectId) => acceptInvite(projectId, user.address, user.name)}
      />
    );
  }

  // Consumer
  const projects = projectsOwnedBy(user.address);

  return (
    <div className="git-escrow-root">
      <div className="wrap">
        <Navbar />

        <div className="section-bar">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              Workspace · {user.short}
              {user.role && <span style={{ color: "var(--neon)", marginLeft: 10 }}>· {user.role.toUpperCase()}</span>}
            </div>
            <h2>Projects</h2>
            <div className="sub">
              {projects.length} {projects.length === 1 ? "project" : "projects"} under escrow management.
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
        createProject={(input) =>
          createProject({ ...input, ownerAddress: user.address })
        }
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
  invites: Array<{ project: Project; invite: { address: string; short: string; invitedAt: string } }>;
  onAccept: (projectId: string) => void;
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
              {projects.length} active project{projects.length === 1 ? "" : "s"} delivering under escrow.
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
            {invites.map(({ project }) => (
              <div key={project.id} className="invite-card">
                <div>
                  <div className="pc-id">{project.id}</div>
                  <div className="pc-title">{project.name}</div>
                  <div className="invite-meta">
                    Owner <b>{shorten(project.ownerAddress)}</b> · {project.milestones.length} milestone{project.milestones.length === 1 ? "" : "s"} · {project.fileCount} file{project.fileCount === 1 ? "" : "s"}
                  </div>
                </div>
                <div className="invite-actions">
                  <button className="btn btn-primary" onClick={() => onAccept(project.id)}>
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

function shorten(addr: string) {
  return addr.length <= 10 ? addr : `${addr.slice(0, 4)}…${addr.slice(-4)}`;
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
          {p.fileNames.length > 0 && (
            <div className="pc-files">
              {p.fileNames.slice(0, 3).map((n, i) => (
                <span key={i}>{n}</span>
              ))}
              {p.fileNames.length > 3 && <span>+{p.fileNames.length - 3}</span>}
            </div>
          )}
          <div className="pc-meta">
            <span>{p.milestones.length} milestone{p.milestones.length === 1 ? "" : "s"} · {p.fileCount} file{p.fileCount === 1 ? "" : "s"}</span>
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
  createProject: (input: { name: string; fileNames: string[] }) => Project;
}) {
  const [name, setName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setName("");
      setFiles([]);
    }
  }, [open]);

  const valid = name.trim().length > 0;

  const submit = () => {
    if (!valid) return;
    const p = createProject({ name: name.trim(), fileNames: files.map((f) => f.name) });
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
          <div>{files.length ? `${files.length} file${files.length > 1 ? "s" : ""} attached` : "No files attached"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose}>Cancel</button>
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
          <label className="form-label">▸ Attach files</label>
          <button className="form-attach" onClick={() => fileInput.current?.click()}>
            <span className="plus">+</span>
            <span style={{ flex: 1 }}>
              <div>Attach project documents</div>
              <span className="hint">Spec, contract, brief — any format</span>
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
                  <div className="ico">{(f.name.split(".").pop() || "").toUpperCase().slice(0, 4)}</div>
                  <div className="nm">{f.name}</div>
                  <div className="sz">{(f.size / 1024).toFixed(1)} KB</div>
                  <button className="rm" onClick={() => setFiles((s) => s.filter((_, i) => i !== idx))}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}