import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Ico } from "@/components/app/Icons";

export default function AuthPage() {
  const { connectPhantom } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePhantom = async () => {
    setLoading(true);
    try {
      const authedUser = await connectPhantom();
      navigate(authedUser.role ? "/dashboard" : "/role");
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>
            Justra
          </div>
        </div>
        <div className="actions">
          <span className="muted-2" style={{ fontSize: 13 }}>
            Don't have an account?
          </span>
          <button className="btn btn-ghost">Create one</button>
        </div>
      </nav>
      <div className="center-shell">
        <div className="auth-card">
          <span className="auth-step">Step 1 of 2 · Connect</span>
          <h2>Connect your Solana wallet</h2>
          <p className="sub">
            Justra uses your wallet to sign milestone agreements and release escrow. Sessions are
            scoped per-wallet — your private keys never leave Phantom.
          </p>
          <button className="wallet-btn" onClick={handlePhantom} disabled={loading}>
            <span className="wallet-mark">◎</span>
            <span className="stack" style={{ alignItems: "flex-start" }}>
              <span>{loading ? "Connecting…" : "Continue with Phantom"}</span>
              <span className="muted-2" style={{ fontSize: 12, fontWeight: 500 }}>
                Mainnet-beta
              </span>
            </span>
            <Ico.arrowR className="arrow" />
          </button>
          <div className="divider" />
          <button className="wallet-btn" disabled>
            <span
              className="wallet-mark"
              style={{ background: "linear-gradient(135deg,#f7931a,#e76f00)" }}
            >
              S
            </span>
            <span className="stack" style={{ alignItems: "flex-start" }}>
              <span>Continue with Solflare</span>
              <span className="muted-2" style={{ fontSize: 12, fontWeight: 500 }}>
                Browser extension
              </span>
            </span>
            <Ico.arrowR className="arrow" />
          </button>
          <p className="fineprint">
            By connecting you agree to Justra's <a>Terms</a> and <a>Privacy Policy</a>. New to
            wallets? <a>Install Phantom →</a>
          </p>
        </div>
      </div>
    </div>
  );
}
