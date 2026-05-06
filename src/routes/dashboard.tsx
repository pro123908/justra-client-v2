import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "@/components/app/Navbar";
import Modal from "@/components/app/Modal";
import { SuccessModal } from "@/components/app/SuccessModal";
import { useAuth } from "@/lib/auth";
import { useAppData, type Project } from "@/lib/app-data";
import { githubApi, projectDocApi, type ChatMessage } from "@/lib/api";
import { buildGithubAppInstallUrl } from "@/routes/github";
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
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { createProject, projectsOwnedBy, projectsForProvider, invitesForProvider, acceptInvite } =
    useAppData();

  const [createOpen, setCreateOpen] = useState(false);
  const [createdProject, setCreatedProject] = useState<Project | null>(null);
  const [hasInstallation, setHasInstallation] = useState<boolean | null>(null);
  const [installationId, setInstallationId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
    else if (!user.role) navigate({ to: "/role" });
    else if (user.role === "provider" && !user.githubUsername) navigate({ to: "/github" });
  }, [user, navigate]);

  useEffect(() => {
    if (!token || !user?.githubUsername) return;
    githubApi.checkInstallation(token).then((res) => {
      setHasInstallation(res.hasInstallation);
      setInstallationId((res as { hasInstallation: boolean; installationId?: string }).installationId ?? null);
    }).catch(() => {/* ignore */});
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
              <div className="eyebrow" style={{ marginBottom: 6 }}>Optional · GitHub</div>
              {!user.githubUsername ? (
                <>
                  <h3 style={{ margin: 0, fontSize: 16 }}>Connect GitHub to verify deliverables</h3>
                  <p style={{ margin: "6px 0 0", color: "var(--ink-dim)", fontSize: 13 }}>
                    Link your GitHub account to let providers submit repository links and confirm deliverables against milestone specs.
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
                onClick={() => { window.location.href = buildGithubAppInstallUrl(); }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ marginRight: 6 }}>
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
          setCreatedProject(p);
        }}
        createProject={(input) => createProject(input)}
        token={token!}
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
  token,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (p: Project) => void;
  createProject: (input: { name: string; description: string; docId?: string }) => Promise<Project>;
  token: string;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [docId, setDocId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [approved, setApproved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStep(1);
      setName("");
      setDocId(null);
      setFileName(null);
      setMessages([]);
      setApproved(false);
      setUploading(false);
      setSending(false);
      setInput("");
      setUploadError(null);
    }
  }, [open]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const res = await projectDocApi.upload(token, file);
      setDocId(res.docId);
      setFileName(file.name);
      setMessages([{ role: "assistant", content: res.initialMessage }]);
      setApproved(res.approved);
      setStep(2);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleReplaceDoc = () => {
    setStep(1);
    setDocId(null);
    setFileName(null);
    setMessages([]);
    setApproved(false);
    setInput("");
    setUploadError(null);
  };

  const handleSend = async () => {
    if (!input.trim() || !docId || sending) return;
    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await projectDocApi.chat(token, docId, next);
      setMessages([...next, { role: "assistant", content: res.reply }]);
      setApproved(res.approved);
    } finally {
      setSending(false);
    }
  };

  const handleCreate = async () => {
    if (!approved || !name.trim()) return;
    const p = await createProject({ name: name.trim(), description: "", docId: docId ?? undefined });
    onCreated(p);
  };

  if (step === 1) {
    return (
      <Modal
        open={open}
        onClose={onClose}
        tag="NEW PROJECT"
        title="Define project"
        footer={
          <div className="modal-foot">
            <div>{uploadError ? <span style={{ color: "red" }}>{uploadError}</span> : "Upload a project specification document"}</div>
            <button className="btn" onClick={onClose}>Cancel</button>
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
            <label className="form-label">▸ Project specification document</label>
            <label
              className="form-input"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: uploading ? "not-allowed" : "pointer", minHeight: 80, textAlign: "center", opacity: uploading ? 0.6 : 1 }}
            >
              {uploading ? "Analyzing document…" : "Click to upload · PDF, DOCX, TXT, MD · max 10 MB"}
              <input
                type="file"
                accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
                style={{ display: "none" }}
                disabled={!name.trim() || uploading}
                onChange={handleFileChange}
              />
            </label>
            {!name.trim() && (
              <div style={{ fontSize: 12, color: "var(--ink-dim)", marginTop: 4 }}>
                Enter a project name before uploading
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }

  // Step 2 — chat
  return (
    <Modal
      open={open}
      onClose={onClose}
      tag="NEW PROJECT"
      title="Review with AI"
      footer={
        <div className="modal-foot">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: approved ? "var(--neon)" : "var(--ink-dim)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 13, color: approved ? "var(--neon)" : "var(--ink-dim)" }}>
              {approved ? "Ready to create" : "Pending review"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose}>Cancel</button>
            <button
              className="btn btn-primary"
              disabled={!approved || !name.trim()}
              onClick={handleCreate}
            >
              Create Project
            </button>
          </div>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "var(--ink-dim)" }}>
          <span>📄 {fileName}</span>
          <button
            className="btn"
            style={{ fontSize: 12, padding: "2px 10px" }}
            onClick={handleReplaceDoc}
          >
            Replace document
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxHeight: 320,
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
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="form-input"
            style={{ flex: 1 }}
            placeholder="Reply to the AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
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
      </div>
    </Modal>
  );
}
