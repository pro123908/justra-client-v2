import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Navbar from "@/components/app/Navbar";
import { useAuth } from "@/lib/auth";
import "@/components/git-escrow.css";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign in — Git Escrow" },
      { name: "description", content: "Sign in to your Git Escrow workspace." },
    ],
  }),
});

function AuthPage() {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [user, navigate]);

  const onGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate({ to: "/dashboard" });
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
          <div className="auth-eyebrow">Authenticate · Step 1 of 1</div>
          <h2>Sign in to your<br />escrow workspace.</h2>
          <p className="auth-sub">
            Authenticate to manage projects, milestones, and contracts.
            Sessions are scoped per-workspace and end-to-end signed.
          </p>

          <button className="btn-google" onClick={onGoogle} disabled={loading}>
            <span className="g-mark">G</span>
            <span>{loading ? "Connecting…" : "Continue with Google"}</span>
          </button>

          <div className="auth-divider">Secure OAuth · 2.0</div>

          <p className="auth-fineprint">
            By continuing you agree to the escrow terms.<br />
            <Link to="/" style={{ color: "var(--neon)", textDecoration: "none" }}>
              ← Back to console
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}