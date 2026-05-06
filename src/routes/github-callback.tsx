import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { githubApi } from "@/lib/api";
import "@/components/git-escrow.css";

export default function GithubCallbackPage() {
  const { user, token, isInitializing, connectGithub } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const processed = useRef(false);

  useEffect(() => {
    if (isInitializing) return;
    if (processed.current) return;
    processed.current = true;

    if (!user) {
      navigate("/auth");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const errorParam = params.get("error");
    const installationId = params.get("installation_id");
    const setupAction = params.get("setup_action");

    if (errorParam) {
      setError("GitHub authorization was denied. Please try again.");
      return;
    }

    if (!installationId && !code) {
      setError("No authorization code received from GitHub.");
      return;
    }

    if (!token) {
      navigate("/auth");
      return;
    }

    const stateParam = params.get("state");
    let redirectTo = "/dashboard";
    try {
      if (stateParam) {
        const parsed = JSON.parse(stateParam) as { milestoneRedirect?: string };
        if (parsed.milestoneRedirect) redirectTo = parsed.milestoneRedirect;
      }
    } catch {
      // ignore malformed state
    }

    // GitHub App sends both code + installation_id when user authorization is enabled.
    // Link the account first, then store the installation.
    const linkAccount = code ? connectGithub(code) : Promise.resolve();

    linkAccount
      .then(() => {
        if (installationId && setupAction) {
          return githubApi.saveInstallation(token, installationId);
        }
      })
      .then(() => navigate(redirectTo))
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to connect GitHub.");
      });
  }, [isInitializing, user, token, connectGithub, navigate]);

  if (error) {
    return (
      <div className="git-escrow-root">
        <div className="auth-shell">
          <div className="auth-card">
            <div className="auth-eyebrow">GitHub · App</div>
            <h2>Connection failed.</h2>
            <p className="auth-sub">{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/github")}
              style={{ marginTop: 16 }}
            >
              Try again →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="git-escrow-root">
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-eyebrow">GitHub · App</div>
          <h2>Connecting…</h2>
          <p className="auth-sub">Linking your GitHub account. Please wait.</p>
          <div className="github-connecting-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
