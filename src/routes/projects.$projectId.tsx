import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/app/Navbar";
import Modal from "@/components/app/Modal";
import { SuccessModal } from "@/components/app/SuccessModal";
import { useAuth } from "@/lib/auth";
import { useAppData, type Milestone } from "@/lib/app-data";
import "@/components/git-escrow.css";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectDetailPage,
  head: () => ({
    meta: [
      { title: "Project — Git Escrow" },
      { name: "description", content: "Project milestones and escrow detail." },
    ],
  }),
});

const fmtDate = (s: string) => {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();
};

function ProjectDetailPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { projectId } = Route.useParams();
  const { getProject, addMilestone } = useAppData();
  const project = getProject(projectId);

  const [addOpen, setAddOpen] = useState(false);
  const [createdMs, setCreatedMs] = useState<Milestone | null>(null);

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
  }, [user, navigate]);

  if (!user) return null;

  if (!project) {
    return (
      <div className="git-escrow-root">
        <div className="wrap">
          <Navbar />
          <div className="empty-state" style={{ marginTop: 60 }}>
            <div className="ic">!</div>
            <h3>Project not found</h3>
            <p>This project doesn't exist in your workspace, or the link is invalid.</p>
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
            <h1>{project.name}</h1>
            <div className="ph-meta">
              <span><b>{project.milestones.length}</b> milestones</span>
              <span><b>{project.fileCount}</b> files attached</span>
              <span>created <b>{fmtDate(project.createdAt)}</b></span>
            </div>
          </div>
        </div>

        <div className="section-bar" style={{ marginTop: 28, borderBottom: "1px dashed var(--line)" }}>
          <div>
            <h2 style={{ fontSize: 26 }}>Milestones</h2>
            <div className="sub">Define payable checkpoints. Each milestone awaits developer approval before activation.</div>
          </div>
          <button className="btn-action" onClick={() => setAddOpen(true)}>
            <span className="plus">+</span> Add Milestone
          </button>
        </div>

        {project.milestones.length === 0 ? (
          <div className="empty-state">
            <div className="ic">≡</div>
            <h3>No milestones yet</h3>
            <p>Add the first milestone to break this project into verifiable, payable units of work.</p>
            <button className="btn-action" onClick={() => setAddOpen(true)}>
              <span className="plus">+</span> Add first milestone
            </button>
          </div>
        ) : (
          <div className="milestones">
            {project.milestones.map((m, idx) => (
              <div key={m.id} className="milestone">
                <div className="ms-num">{String(idx + 1).padStart(2, "0")}</div>
                <div className="ms-body">
                  <h3 className="ms-title">{m.title}</h3>
                  {m.description && <p className="ms-desc">{m.description}</p>}
                  <div style={{ marginTop: 8 }}>
                    <span className={"ms-status " + m.status}>
                      <span className="d" />
                      {m.status === "pending" ? "Pending approval" : "Approved"}
                    </span>
                  </div>
                </div>
                <div className="ms-dates">
                  <b>{fmtDate(m.startDate)}</b>
                  <span>→ {fmtDate(m.endDate)}</span>
                </div>
                <div className="ms-amount">
                  <b>◎ {m.amount || "—"}</b>
                  <span>SOL · {m.fileCount} file{m.fileCount === 1 ? "" : "s"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddMilestoneModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={(m) => {
          setAddOpen(false);
          setCreatedMs(m);
        }}
        onSubmit={(input) => addMilestone(project.id, input)}
      />

      <SuccessModal
        open={!!createdMs}
        onClose={() => setCreatedMs(null)}
        tag="MILESTONE"
        title="Milestone Created."
        message="Milestone is currently pending, once developer approves it it will start."
      />
    </div>
  );
}

function AddMilestoneModal({
  open,
  onClose,
  onCreated,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (m: Milestone) => void;
  onSubmit: (input: Omit<Milestone, "id" | "status">) => Milestone;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setAmount("");
      setFiles([]);
    }
  }, [open]);

  const valid =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    startDate.length > 0 &&
    endDate.length > 0 &&
    amount.trim().length > 0;

  const submit = () => {
    if (!valid) return;
    const m = onSubmit({
      title: title.trim(),
      description: description.trim(),
      startDate,
      endDate,
      amount: amount.trim(),
      fileCount: files.length,
    });
    onCreated(m);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      tag="NEW MILESTONE"
      title="Define checkpoint"
      footer={
        <div className="modal-foot">
          <div>{files.length ? `${files.length} file${files.length > 1 ? "s" : ""} attached` : "No files attached"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" disabled={!valid} onClick={submit}>
              Create Milestone
            </button>
          </div>
        </div>
      }
    >
      <div className="form-grid">
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
            placeholder="e.g. 120"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">▸ Select files</label>
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