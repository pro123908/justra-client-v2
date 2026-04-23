import { useState, type ReactNode } from "react";
import Modal from "./Modal";

export function SuccessModal({
  open,
  onClose,
  tag,
  title,
  message,
  shareLabel,
  shareUrl,
  footer,
  extra,
}: {
  open: boolean;
  onClose: () => void;
  tag: string;
  title: string;
  message?: ReactNode;
  shareLabel?: string;
  shareUrl?: string;
  footer?: ReactNode;
  extra?: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // fallback: select textarea
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Modal open={open} onClose={onClose} tag={tag} title="Success">
      <div className="success-modal">
        <div className="success-icon">✓</div>
        <h3 className="success-title">{title}</h3>
        {message && <p className="success-sub">{message}</p>}

        {shareUrl && (
          <div className="share-block">
            <span className="share-label">▸ {shareLabel || "Share link"}</span>
            <div className="share-row">
              <div className="share-link" title={shareUrl}>{shareUrl}</div>
              <button
                className={"btn-copy" + (copied ? " copied" : "")}
                onClick={copy}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}

        {extra}

        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {footer ?? (
            <button className="btn btn-primary" onClick={onClose}>
              Continue
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}