import { useEffect, useRef, useState } from "react";
import Modal from "@/components/app/Modal";
import { Ico } from "@/components/app/Icons";
import { useAuth } from "@/lib/auth";
import { projectDocApi, type ExtractedMilestone, type ChatMessage } from "@/lib/api";

type EditableMilestone = {
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  amount: string | null;
};

function fromExtracted(m: ExtractedMilestone): EditableMilestone {
  return {
    title: m.title,
    description: m.description,
    startDate: m.startDate ?? null,
    endDate: m.endDate ?? null,
    amount: m.amount,
  };
}

type SpecState = "idle" | "uploading" | "approved" | "rejected" | "error";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (
    name: string,
    description: string,
    docId?: string,
    milestones?: EditableMilestone[],
  ) => Promise<void>;
}

export function CreateProjectModal({ open, onClose, onCreate }: CreateProjectModalProps) {
  const { token } = useAuth();

  // Step 1 fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Steps: 1 = project info, 2 = spec upload/analysis, 3 = milestone review
  const [step, setStep] = useState(1);

  // Spec upload / analysis
  const [specState, setSpecState] = useState<SpecState>("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<EditableMilestone[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat (spec rejected)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Create
  const [loading, setLoading] = useState(false);

  const totalSteps = milestones.length > 0 ? 3 : 2;

  useEffect(() => {
    if (open) resetAll();
  }, [open]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const resetAll = () => {
    setName("");
    setDescription("");
    setStep(1);
    resetSpec();
    setLoading(false);
  };

  const resetSpec = () => {
    setSpecState("idle");
    setUploadError(null);
    setDocId(null);
    setMilestones([]);
    setDragging(false);
    setChatMessages([]);
    setChatInput("");
    setChatSending(false);
  };

  const handleFile = async (file: File) => {
    if (!token) return;
    setSpecState("uploading");
    setUploadError(null);
    setDocId(null);
    setMilestones([]);
    try {
      const res = await projectDocApi.upload(token, file);
      setDocId(res.docId);
      if (res.approved) {
        setMilestones(res.milestones.map(fromExtracted));
        setSpecState("approved");
      } else {
        setChatMessages([{ role: "assistant", content: res.initialMessage }]);
        setSpecState("rejected");
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      setSpecState("error");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || chatSending || !token || !docId) return;
    const userMsg: ChatMessage = { role: "user", content: chatInput.trim() };
    const updated = [...chatMessages, userMsg];
    setChatMessages(updated);
    setChatInput("");
    setChatSending(true);
    try {
      const res = await projectDocApi.chat(token, docId, updated);
      setChatMessages([...updated, { role: "assistant", content: res.reply }]);
      if (res.approved) {
        setSpecState("approved");
      }
    } catch {
      setChatMessages([
        ...updated,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setChatSending(false);
    }
  };

  const handleCreate = async () => {
    if (!name.trim() || loading) return;
    setLoading(true);
    try {
      await onCreate(
        name.trim(),
        description.trim(),
        docId ?? undefined,
        milestones.length > 0 ? milestones : undefined,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const renderFooter = () => {
    if (step === 1) {
      return (
        <>
          <span className="auth-step">Step 1 of {totalSteps}</span>
          <div className="row gap-8">
            <button className="btn" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-primary" disabled={!name.trim()} onClick={() => setStep(2)}>
              Continue
            </button>
          </div>
        </>
      );
    }

    if (step === 2) {
      if (specState === "uploading") {
        return (
          <>
            <span className="auth-step">Analyzing spec…</span>
            <div className="row gap-8">
              <button className="btn" disabled>
                Please wait
              </button>
            </div>
          </>
        );
      }

      if (specState === "approved") {
        return (
          <>
            <span className="auth-step">Step 2 of 3</span>
            <div className="row gap-8">
              <button className="btn" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn btn-primary" onClick={() => setStep(3)}>
                Continue <Ico.arrowR />
              </button>
            </div>
          </>
        );
      }

      if (specState === "rejected") {
        return (
          <>
            <span className="auth-step">Step 2 of 2</span>
            <div className="row gap-8">
              <button
                className="btn"
                onClick={() => {
                  resetSpec();
                }}
              >
                Re-upload
              </button>
              <button className="btn btn-primary" onClick={handleCreate} disabled={loading}>
                <Ico.check /> {loading ? "Creating…" : "Create without spec"}
              </button>
            </div>
          </>
        );
      }

      // idle or error
      return (
        <>
          <span className="auth-step">Step 2 of 2</span>
          <div className="row gap-8">
            <button className="btn" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn btn-primary" onClick={handleCreate} disabled={loading}>
              <Ico.check /> {loading ? "Creating…" : "Skip & create"}
            </button>
          </div>
        </>
      );
    }

    // step === 3 (milestones review)
    return (
      <>
        <span className="auth-step">Step 3 of 3</span>
        <div className="row gap-8">
          <button className="btn" onClick={() => setStep(2)}>
            Back
          </button>
          <button className="btn btn-primary" onClick={handleCreate} disabled={loading}>
            <Ico.check /> {loading ? "Creating…" : "Create project"}
          </button>
        </div>
      </>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="New project"
      width={620}
      footer={renderFooter()}
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim()) setStep(2);
              }}
              autoFocus
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

      {step === 2 &&
        (specState === "idle" ||
          specState === "error" ||
          specState === "uploading" ||
          specState === "approved") && (
          <div className="stack gap-16">
            {specState !== "approved" && (
              <div className="alert tip">
                <Ico.sparkle className="icon" />
                <div>
                  <div className="title">Have a spec?</div>
                  <div className="body">
                    Drop in a Markdown or PDF spec and Justra will analyze it and draft milestones.
                  </div>
                </div>
              </div>
            )}

            <div className="field">
              <label className="field-label">
                {specState === "approved" ? "Spec analyzed" : "Upload spec (optional)"}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.pdf,.txt"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = "";
                }}
              />
              <div
                onClick={
                  specState === "uploading" || specState === "approved"
                    ? undefined
                    : () => fileInputRef.current?.click()
                }
                onDragOver={
                  specState === "uploading" || specState === "approved"
                    ? undefined
                    : (e) => {
                        e.preventDefault();
                        setDragging(true);
                      }
                }
                onDragLeave={
                  specState === "uploading" || specState === "approved"
                    ? undefined
                    : () => setDragging(false)
                }
                onDrop={
                  specState === "uploading" || specState === "approved" ? undefined : handleDrop
                }
                style={{
                  border: `2px dashed ${
                    specState === "approved"
                      ? "var(--ok)"
                      : dragging
                        ? "var(--brand)"
                        : "var(--line-2)"
                  }`,
                  borderRadius: "var(--r-2)",
                  padding: "28px 18px",
                  textAlign: "center",
                  background:
                    specState === "approved"
                      ? "var(--bg-2)"
                      : dragging
                        ? "var(--bg-3)"
                        : "var(--bg-2)",
                  color: "var(--ink-3)",
                  cursor:
                    specState === "uploading" || specState === "approved" ? "default" : "pointer",
                  transition: "border-color 0.15s, background 0.15s",
                }}
              >
                {specState === "uploading" && (
                  <>
                    <Ico.upload style={{ margin: "0 auto 8px", color: "var(--ink-4)" }} />
                    <div style={{ fontWeight: 600, color: "var(--ink)" }}>Analyzing spec…</div>
                    <div style={{ fontSize: 12 }}>This may take a moment</div>
                  </>
                )}
                {specState === "approved" && (
                  <>
                    <Ico.check style={{ margin: "0 auto 8px", color: "var(--ok)" }} />
                    <div style={{ fontWeight: 600, color: "var(--ink)" }}>
                      Spec analyzed — {milestones.length} milestone
                      {milestones.length === 1 ? "" : "s"} found
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ok)", marginTop: 4 }}>
                      Click Continue to review them
                    </div>
                  </>
                )}
                {(specState === "idle" || specState === "error") && (
                  <>
                    <Ico.upload style={{ margin: "0 auto 8px", color: "var(--ink-4)" }} />
                    <div style={{ fontWeight: 600, color: "var(--ink)" }}>Drop a spec here</div>
                    <div style={{ fontSize: 12 }}>
                      Markdown, PDF, or Notion export · up to 10 MB
                    </div>
                  </>
                )}
              </div>
              {uploadError && (
                <span className="field-hint" style={{ color: "var(--err)" }}>
                  {uploadError}
                </span>
              )}
            </div>
          </div>
        )}

      {step === 2 && specState === "rejected" && (
        <SpecChat
          messages={chatMessages}
          input={chatInput}
          sending={chatSending}
          chatEndRef={chatEndRef as React.RefObject<HTMLDivElement>}
          onInput={setChatInput}
          onSend={handleSendChat}
        />
      )}

      {step === 3 && <MilestoneEditor milestones={milestones} onChange={setMilestones} />}
    </Modal>
  );
}

function SpecChat({
  messages,
  input,
  sending,
  chatEndRef,
  onInput,
  onSend,
}: {
  messages: ChatMessage[];
  input: string;
  sending: boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
  onInput: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="stack gap-12">
      <div className="alert" style={{ borderColor: "var(--warn)", background: "var(--bg-2)" }}>
        <Ico.sparkle className="icon" style={{ color: "var(--warn)" }} />
        <div>
          <div className="title" style={{ color: "var(--warn)" }}>
            Spec needs work
          </div>
          <div className="body">
            Justra found issues with your spec. Review the feedback below and re-upload when ready.
          </div>
        </div>
      </div>

      <div
        style={{
          border: "1px solid var(--line-2)",
          borderRadius: "var(--r-2)",
          background: "var(--bg-2)",
          maxHeight: 280,
          overflowY: "auto",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              background: m.role === "user" ? "var(--brand)" : "var(--bg-3)",
              color: m.role === "user" ? "#fff" : "var(--ink)",
              borderRadius: "var(--r-2)",
              padding: "8px 12px",
              fontSize: 13,
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
            }}
          >
            {m.content}
          </div>
        ))}
        {sending && (
          <div
            style={{
              alignSelf: "flex-start",
              background: "var(--bg-3)",
              color: "var(--ink-3)",
              borderRadius: "var(--r-2)",
              padding: "8px 12px",
              fontSize: 13,
            }}
          >
            Thinking…
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="row gap-8" style={{ alignItems: "flex-end" }}>
        <textarea
          className="textarea"
          placeholder="Ask a question or describe what to fix…"
          value={input}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          style={{ flex: 1, minHeight: 60, resize: "none" }}
          disabled={sending}
        />
        <button
          className="btn btn-primary"
          onClick={onSend}
          disabled={!input.trim() || sending}
          style={{ flexShrink: 0 }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

function MilestoneEditor({
  milestones,
  onChange,
}: {
  milestones: EditableMilestone[];
  onChange: (ms: EditableMilestone[]) => void;
}) {
  const update = (i: number, patch: Partial<EditableMilestone>) =>
    onChange(milestones.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));

  const remove = (i: number) => onChange(milestones.filter((_, idx) => idx !== i));

  const add = () =>
    onChange([
      ...milestones,
      { title: "", description: "", startDate: null, endDate: null, amount: null },
    ]);

  return (
    <div className="stack gap-12">
      <div className="alert tip">
        <Ico.sparkle className="icon" />
        <div>
          <div className="title">
            {milestones.length} milestone{milestones.length === 1 ? "" : "s"} extracted
          </div>
          <div className="body">Edit or remove milestones before creating the project.</div>
        </div>
      </div>

      <div className="stack gap-8" style={{ maxHeight: 360, overflowY: "auto", paddingRight: 2 }}>
        {milestones.map((m, i) => (
          <div
            key={i}
            className="card"
            style={{
              padding: "12px 14px",
              background: "var(--bg-2)",
              border: "1px solid var(--line-2)",
              borderRadius: "var(--r-2)",
            }}
          >
            <div className="row gap-8" style={{ alignItems: "flex-start", marginBottom: 8 }}>
              <input
                className="input"
                placeholder="Milestone title"
                value={m.title}
                onChange={(e) => update(i, { title: e.target.value })}
                style={{ flex: 1, fontWeight: 600 }}
              />
              <button
                className="iconbtn btn-icon"
                onClick={() => remove(i)}
                title="Remove milestone"
                style={{ flexShrink: 0, color: "var(--ink-4)" }}
              >
                <Ico.x />
              </button>
            </div>

            <textarea
              className="textarea"
              placeholder="Description"
              value={m.description ?? ""}
              onChange={(e) => update(i, { description: e.target.value })}
              style={{ fontSize: 12, minHeight: 52, marginBottom: 8, resize: "vertical" }}
            />

            <div className="row gap-8">
              <div className="field" style={{ flex: 1, margin: 0 }}>
                <label className="field-label" style={{ fontSize: 11 }}>
                  Amount (◎ SOL)
                </label>
                <input
                  className="input"
                  placeholder="e.g. 2.5"
                  value={m.amount ?? ""}
                  onChange={(e) => update(i, { amount: e.target.value || null })}
                  style={{ fontSize: 13 }}
                />
              </div>
              <DateField
                label="Start date"
                value={m.startDate}
                onChange={(d) => update(i, { startDate: d })}
              />
              <DateField
                label="End date"
                value={m.endDate}
                onChange={(d) => update(i, { endDate: d })}
              />
            </div>
          </div>
        ))}

        <button
          className="btn"
          onClick={add}
          style={{ width: "100%", justifyContent: "center", borderStyle: "dashed" }}
        >
          <Ico.plus /> Add milestone
        </button>
      </div>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="field" style={{ flex: 1, margin: 0 }}>
      <label className="field-label" style={{ fontSize: 11 }}>
        {label}
      </label>
      <input
        type="date"
        className="input"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        style={{ fontSize: 13, colorScheme: "dark" }}
      />
    </div>
  );
}
