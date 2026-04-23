import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
        <Link
          to="/"
          className={"nav-link" + (pathname === "/" ? " active" : "")}
        >
          Console
        </Link>
        {user && (
          <Link
            to="/dashboard"
            className={"nav-link" + (pathname.startsWith("/dashboard") || pathname.startsWith("/projects") ? " active" : "")}
          >
            Dashboard
          </Link>
        )}

        {user ? (
          <div className="nav-user">
            <div className="nav-avatar">{user.initial}</div>
            <span>{user.name}</span>
            <button
              className="nav-link"
              style={{ background: "none", border: "none", cursor: "pointer", paddingLeft: 10, borderLeft: "1px solid var(--line)" }}
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