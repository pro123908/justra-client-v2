import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/app/Navbar";
import { useAuth } from "@/lib/auth";
import "@/components/git-escrow.css";

export function buildGithubAppInstallUrl(state?: string) {
  const appSlug = import.meta.env.VITE_GITHUB_APP_SLUG as string;
  const params = new URLSearchParams({ redirect_uri: `${window.location.origin}/github-callback` });
  if (state) params.set("state", state);
  return `https://github.com/apps/${appSlug}/installations/new?${params.toString()}`;
}

export default function GithubConnectPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isProvider = user?.role === "provider";

  useEffect(() => {
    if (!user) navigate("/auth");
    else if (!user.role) navigate("/role");
    else if (user.githubUsername) navigate("/dashboard");
  }, [user, navigate]);

  if (!user || !user.role || user.githubUsername) return null;

  const handleConnect = () => {
    window.location.href = buildGithubAppInstallUrl();
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="git-escrow-root">
      <div className="wrap" style={{ paddingBottom: 24 }}>
        <Navbar />
      </div>
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-eyebrow">
            {isProvider ? "Authenticate · Step 3 of 3" : "Optional · GitHub"}
          </div>
          <h2>
            Connect your
            <br />
            GitHub account.
          </h2>
          <p className="auth-sub">
            {isProvider
              ? "Providers must link a GitHub account so consumers can verify code deliverables, review repository history, and confirm on-chain submissions."
              : "Linking GitHub lets consumers view your repository contributions and verify deliverables against project specs."}
          </p>

          <button className="btn-google github-btn" onClick={handleConnect}>
            <span className="g-mark github-mark">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </span>
            <span>Connect GitHub Account</span>
          </button>

          {!isProvider && (
            <button className="btn-skip" onClick={handleSkip} style={{ marginTop: 12 }}>
              Skip for now →
            </button>
          )}

          <div className="auth-divider">
            {isProvider ? "Required for providers" : "Optional for consumers"}
          </div>

          <p className="auth-fineprint">
            {isProvider
              ? "GitHub access is required to submit and verify milestone deliverables. You won't be able to access the dashboard without it."
              : "You can connect GitHub later from your dashboard at any time."}
          </p>
        </div>
      </div>
    </div>
  );
}
