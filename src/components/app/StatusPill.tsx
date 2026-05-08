export const STATUS_MAP: Record<
  string,
  { label: string; cls: string; row: string; pulse: boolean }
> = {
  pending_provider: { label: "Pending acceptance", cls: "pill-warn", row: "warn", pulse: true },
  awaiting_deposit: { label: "Awaiting deposit", cls: "pill-warn", row: "warn", pulse: true },
  active: { label: "In progress", cls: "pill-info", row: "info", pulse: true },
  in_review: { label: "In review", cls: "pill-info", row: "info", pulse: false },
  completed: { label: "Completed", cls: "pill-ok", row: "ok", pulse: false },
  rejected: { label: "Rejected", cls: "pill-danger", row: "danger", pulse: false },
  disputed: { label: "Disputed", cls: "pill-danger", row: "danger", pulse: true },
  draft: { label: "Draft", cls: "", row: "idle", pulse: false },
};

export function StatusPill({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.draft;
  return (
    <span className={`pill ${s.cls}`}>
      <span className={`dot${s.pulse ? " dot-pulse" : ""}`} />
      {s.label}
    </span>
  );
}
