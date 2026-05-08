import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { githubApi } from "@/lib/api";
import { Ico } from "@/components/app/Icons";

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

  return (
    <div className="public-shell">
      <div className="center-shell">
        <div className="auth-card" style={{ textAlign: "center" }}>
          {error ? (
            <>
              <span
                className="auth-step"
                style={{ background: "var(--danger-bg)", color: "var(--danger-ink)" }}
              >
                Error
              </span>
              <h2>Connection failed</h2>
              <p className="sub">{error}</p>
              <button className="btn" onClick={() => navigate("/github")}>
                Try again
              </button>
            </>
          ) : (
            <>
              <span className="auth-step">Connecting…</span>
              <h2>Linking your GitHub account</h2>
              <p className="sub">Just a moment while we finalize the connection.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
