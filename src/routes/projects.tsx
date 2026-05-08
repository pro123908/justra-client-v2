import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useAppData, type Project } from "@/lib/app-data";
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { Ico } from "@/components/app/Icons";
import Modal from "@/components/app/Modal";

export default function ProjectsPage() {
  const { user } = useAuth();
  const { projectsOwnedBy, projectsForProvider, createProject } = useAppData();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"all" | "recent">("all");
  const [showCreate, setShowCreate] = useState(false);

  const role = user?.role ?? "consumer";
  const projects =
    role === "consumer"
      ? projectsOwnedBy(user?.id ?? "")
      : projectsForProvider(user?.address ?? "");

  return (
    <AppShell onCreate={role === "consumer" ? () => setShowCreate(true) : undefined}>
      <div className="page">
        <PageHead
          title="Projects"
          subtitle="Every engagement, past and present."
          actions={
            role === "consumer" ? (
              <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                <Ico.plus /> New project
              </button>
            ) : undefined
          }
        />

        <div className="tabs">
          {[
            { id: "all", label: "All", n: projects.length },
            { id: "recent", label: "Recent", n: Math.min(projects.length, 5) },
          ].map((t) => (
            <button
              key={t.id}
              className={`tab${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id as typeof tab)}
            >
              {t.label}
              <span className="count">{t.n}</span>
            </button>
          ))}
        </div>

        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Created</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="clickable" onClick={() => navigate(`/projects/${p.id}`)}>
                  <td>
                    <div style={{ fontWeight: 600, color: "var(--ink)" }}>{p.name}</div>
                    <div className="muted-2 mono" style={{ fontSize: 12, marginTop: 2 }}>
                      #{p.id}
                    </div>
                  </td>
                  <td>
                    <span className="muted-2" style={{ fontSize: 13 }}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <span className="muted" style={{ fontSize: 13 }}>
                      {p.description || "—"}
                    </span>
                  </td>
                  <td>
                    <Ico.arrowR className="muted-2" />
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", color: "var(--ink-4)", padding: "32px 0" }}
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {role === "consumer" && (
        <CreateProjectModal
          open={showCreate}
          onClose={() => setShowCreate(false)}
          onCreate={async (name, description) => {
            const p = await createProject({ name, description });
            setShowCreate(false);
            navigate(`/projects/${p.id}`);
          }}
        />
      )}
    </AppShell>
  );
}

function CreateProjectModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => Promise<void>;
}) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || loading) return;
    setLoading(true);
    try {
      await onCreate(name.trim(), description.trim());
      setStep(1);
      setName("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setStep(1);
        setName("");
        setDescription("");
        onClose();
      }}
      title="New project"
      width={620}
      footer={
        <>
          <span className="auth-step">Step {step} of 2</span>
          <div className="row gap-8">
            {step > 1 && (
              <button className="btn" onClick={() => setStep(1)}>
                Back
              </button>
            )}
            {step < 2 ? (
              <button
                className="btn btn-primary"
                disabled={!name.trim()}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleCreate} disabled={loading}>
                <Ico.check /> {loading ? "Creating…" : "Create project"}
              </button>
            )}
          </div>
        </>
      }
    >
      {step === 1 && (
        <div className="stack gap-16">
          <div className="field">
            <label className="field-label">Project name</label>
            <input
              className="input"
              placeholder="e.g. Atlas Settlement Engine"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-label">Short description</label>
            <textarea
              className="textarea"
              placeholder="What are you building?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="field-hint">
              This is what developers see when they receive your invite.
            </span>
          </div>
          <div className="field">
            <label className="field-label">Repository</label>
            <div className="input-wrap">
              <Ico.github className="input-ico" />
              <input className="input" placeholder="github.com/your-org/your-repo" />
            </div>
            <span className="field-hint">
              Optional now — you can connect a repo later from the project page.
            </span>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="stack gap-16">
          <div className="alert tip">
            <Ico.sparkle className="icon" />
            <div>
              <div className="title">Have a spec?</div>
              <div className="body">
                Drop in a Markdown or PDF spec and Justra will draft milestones for you.
              </div>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Upload spec (optional)</label>
            <div
              style={{
                border: "2px dashed var(--line-2)",
                borderRadius: "var(--r-2)",
                padding: "28px 18px",
                textAlign: "center",
                background: "var(--bg-2)",
                color: "var(--ink-3)",
              }}
            >
              <Ico.upload style={{ margin: "0 auto 8px", color: "var(--ink-4)" }} />
              <div style={{ fontWeight: 600, color: "var(--ink)" }}>Drop a spec here</div>
              <div style={{ fontSize: 12 }}>Markdown, PDF, or Notion export · up to 10 MB</div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
