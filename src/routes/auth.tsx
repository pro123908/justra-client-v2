import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Navbar from "@/components/app/Navbar";
import { useAuth } from "@/lib/auth";
import "@/components/git-escrow.css";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Connect wallet — Git Escrow" },
      { name: "description", content: "Connect your Phantom Solana wallet to access your Git Escrow workspace." },
    ],
  }),
});

function AuthPage() {
  const { user, connectPhantom } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate({ to: user.role ? "/dashboard" : "/role" });
    }
  }, [user, navigate]);

  const onConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      await connectPhantom();
      navigate({ to: "/role" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="git-escrow-root">
      <div className="wrap" style={{ paddingBottom: 24 }}>
        <Navbar />
      </div>
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-eyebrow">Authenticate · Step 1 of 2</div>
          <h2>Connect your<br />Solana wallet.</h2>
          <p className="auth-sub">
            Connect your Phantom wallet to manage projects, milestones, and on-chain
            escrow contracts. Sessions are scoped per-wallet and signed locally —
            we never see your private keys.
          </p>

          <button className="btn-google" onClick={onConnect} disabled={loading}>
            <span className="g-mark phantom-mark">◎</span>
            <span>{loading ? "Connecting…" : "Connect Phantom Wallet"}</span>
          </button>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="auth-divider">Solana · Mainnet-Beta</div>

          <p className="auth-fineprint">
            By connecting you agree to the escrow terms. Don't have Phantom?{" "}
            <a
              href="https://phantom.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--neon)", textDecoration: "none" }}
            >
              Install →
            </a>
            <br />
            <Link to="/" style={{ color: "var(--neon)", textDecoration: "none" }}>
              ← Back to console
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}