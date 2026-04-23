import { useEffect, type ReactNode } from "react";

export default function Modal({
  open,
  onClose,
  title,
  tag,
  children,
  footer,
  width,
}: {
  open: boolean;
  onClose?: () => void;
  title?: string;
  tag?: string;
  children?: ReactNode;
  footer?: ReactNode;
  width?: number;
}) {
  useEffect(() => {
    if (!open || !onClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={"modal-mask" + (open ? " open" : "")}
      onClick={(e) => {
        if (!onClose) return;
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" style={width ? { width: `min(${width}px, calc(100% - 48px))` } : undefined}>
        {(tag || title) && (
          <div className="modal-head">
            <div>
              {tag && <span className="tt">{tag}</span>}
              {tag && title && <> &nbsp; · &nbsp; </>}
              {title}
            </div>
            {onClose && (
              <button className="x" onClick={onClose}>
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer}
      </div>
    </div>
  );
}