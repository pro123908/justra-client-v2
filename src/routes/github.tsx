import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Ico } from "@/components/app/Icons";

export function buildGithubAppInstallUrl(state?: string) {
  const appSlug = "git-escrow";
  const params = new URLSearchParams({ redirect_uri: `${window.location.origin}/github-callback` });
  if (state) params.set("state", state);
  return `https://github.com/apps/${appSlug}/installations/new?${params.toString()}`;
}

export default function GithubConnectPage() {
  const { user, isInitializing } = useAuth();
  const navigate = useNavigate();

  const isProvider = user?.role === "provider";

  useEffect(() => {
    if (isInitializing) return;
    if (!user) navigate("/auth");
    else if (!user.role) navigate("/role");
    else if (user.githubUsername) navigate("/dashboard");
  }, [isInitializing, user, navigate]);

  if (!user || !user.role || user.githubUsername) return null;

  const handleConnect = () => {
    window.location.href = buildGithubAppInstallUrl();
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12">
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>
            Justra
          </div>
        </div>
      </nav>
      <div className="center-shell">
        <div className="auth-card">
          <span className="auth-step">
            <Ico.github /> {isProvider ? "Authenticate · Step 3 of 3" : "Optional · GitHub"}
          </span>
          <h2>Link your GitHub account</h2>
          <p className="sub">
            {isProvider
              ? "Providers must link a GitHub account so consumers can verify code deliverables, review repository history, and confirm on-chain submissions."
              : "Linking GitHub lets consumers view your repository contributions and verify deliverables against project specs."}
          </p>
          <button className="wallet-btn" onClick={handleConnect}>
            <span className="wallet-mark" style={{ background: "#24292e" }}>
              <Ico.github />
            </span>
            <span className="stack" style={{ alignItems: "flex-start" }}>
              <span>Connect with GitHub</span>
              <span className="muted-2" style={{ fontSize: 12, fontWeight: 500 }}>
                Authorize the Justra GitHub App
              </span>
            </span>
            <Ico.arrowR className="arrow" />
          </button>
          {!isProvider && (
            <button className="btn" onClick={handleSkip} style={{ marginTop: 12 }}>
              Skip for now
            </button>
          )}
          <p className="fineprint">
            {isProvider
              ? "GitHub access is required to submit and verify milestone deliverables. You won't be able to access the dashboard without it."
              : "You can connect GitHub later from your dashboard at any time."}
          </p>
        </div>
      </div>
    </div>
  );
}
