import {
  n as b,
  r as d,
  o as v,
  q as x,
  u as m,
  a as j,
  j as e,
  L as o,
} from "./index-Cmg3No5R.js";
function p(s) {
  const c = b({ warn: s?.router === void 0 }),
    r = s?.router || c,
    n = d.useRef(void 0);
  return v(r.stores.__store, (t) => {
    if (s?.select) {
      if (s.structuralSharing ?? r.options.defaultStructuralSharing) {
        const a = x(n.current, s.select(t));
        return ((n.current = a), a);
      }
      return s.select(t);
    }
    return t;
  });
}
const l = () =>
  e.jsx("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "13",
    height: "13",
    style: { display: "block" },
    children: e.jsx("path", {
      d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
    }),
  });
function N() {
  const { user: s, logout: c, disconnectGithub: r } = m(),
    n = j(),
    [t, a] = d.useState(!1);
  function u() {
    s &&
      navigator.clipboard.writeText(s.address).then(() => {
        (a(!0), setTimeout(() => a(!1), 1500));
      });
  }
  const i = p({ select: (h) => h.location.pathname });
  return e.jsxs("div", {
    className: "topbar",
    children: [
      e.jsxs(o, {
        to: "/",
        className: "brand",
        style: { textDecoration: "none", color: "inherit" },
        children: [
          e.jsxs("div", {
            className: "brand-mark",
            children: [
              "G",
              e.jsx("span", { style: { color: "var(--ink-dim)" }, children: "/" }),
              "E",
            ],
          }),
          e.jsxs("div", {
            children: [
              e.jsx("div", { className: "brand-name", children: "GIT ESCROW" }),
              e.jsx("div", { className: "brand-sub", children: "Verification Console · v0.4.2" }),
            ],
          }),
        ],
      }),
      e.jsxs("div", {
        className: "nav-actions",
        children: [
          e.jsx(o, {
            to: "/",
            className: "nav-link" + (i === "/" ? " active" : ""),
            children: "Console",
          }),
          s &&
            i !== "/role" &&
            e.jsx(o, {
              to: "/dashboard",
              className:
                "nav-link" +
                (i.startsWith("/dashboard") || i.startsWith("/projects") ? " active" : ""),
              children: "Dashboard",
            }),
          s
            ? e.jsxs("div", {
                className: "nav-user",
                children: [
                  e.jsx("div", { className: "nav-avatar", children: s.initial }),
                  e.jsx("span", { children: s.name }),
                  s.githubUsername
                    ? e.jsxs("span", {
                        className: "nav-github-badge",
                        title: `GitHub: @${s.githubUsername}`,
                        children: [
                          e.jsx(l, {}),
                          e.jsx("span", { children: s.githubUsername }),
                          e.jsx("button", {
                            className: "nav-github-disconnect",
                            title: "Disconnect GitHub",
                            onClick: () => r().catch(() => {}),
                            children: "×",
                          }),
                        ],
                      })
                    : s.role &&
                      s.role !== "provider" &&
                      e.jsxs(o, {
                        to: "/github",
                        className: "nav-link nav-github-connect",
                        title: "Connect GitHub (optional)",
                        children: [e.jsx(l, {}), " Connect"],
                      }),
                  e.jsx("button", {
                    className: "nav-link",
                    title: "Copy address",
                    style: { background: "none", border: "none", cursor: "pointer" },
                    onClick: u,
                    children: t ? "Copied!" : "Copy",
                  }),
                  e.jsx("button", {
                    className: "nav-link",
                    style: {
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      paddingLeft: 10,
                      borderLeft: "1px solid var(--line)",
                    },
                    onClick: () => {
                      (c(), n({ to: "/" }));
                    },
                    children: "Logout",
                  }),
                ],
              })
            : e.jsx("button", {
                className: "btn-login",
                onClick: () => n({ to: "/auth" }),
                children: "Login",
              }),
        ],
      }),
    ],
  });
}
export { N };
