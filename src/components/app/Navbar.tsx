import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" style={{ display: "block" }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Navbar() {
  const { user, logout, disconnectGithub } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    if (!user) return;
    navigator.clipboard.writeText(user.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="topbar">
      <Link to="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="brand-mark">
          G<span style={{ color: "var(--ink-dim)" }}>/</span>E
        </div>
        <div>
          <div className="brand-name">GIT ESCROW</div>
          <div className="brand-sub">Verification Console · v0.4.2</div>
        </div>
      </Link>

      <div className="nav-actions">
        <Link to="/" className={"nav-link" + (pathname === "/" ? " active" : "")}>
          Console
        </Link>
        {user && pathname !== "/role" && (
          <Link
            to="/dashboard"
            className={
              "nav-link" +
              (pathname.startsWith("/dashboard") || pathname.startsWith("/projects")
                ? " active"
                : "")
            }
          >
            Dashboard
          </Link>
        )}

        {user ? (
          <div className="nav-user">
            <div className="nav-avatar">{user.initial}</div>
            <span>{user.name}</span>
            {user.githubUsername ? (
              <span
                className="nav-github-badge"
                title={`GitHub: @${user.githubUsername}`}
              >
                <GithubIcon />
                <span>{user.githubUsername}</span>
                <button
                  className="nav-github-disconnect"
                  title="Disconnect GitHub"
                  onClick={() => disconnectGithub().catch(() => {})}
                >
                  ×
                </button>
              </span>
            ) : (
              user.role && user.role !== "provider" && (
                <Link
                  to="/github"
                  className="nav-link nav-github-connect"
                  title="Connect GitHub (optional)"
                >
                  <GithubIcon /> Connect
                </Link>
              )
            )}
            <button
              className="nav-link"
              title="Copy address"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={copyAddress}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              className="nav-link"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                paddingLeft: 10,
                borderLeft: "1px solid var(--line)",
              }}
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="btn-login" onClick={() => navigate({ to: "/auth" })}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
