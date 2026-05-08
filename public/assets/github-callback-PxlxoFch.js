import { u as f, a as j, r as o, g as N, j as e } from "./index-Cmg3No5R.js";
function y() {
  const { user: l, token: n, isInitializing: u, connectGithub: d } = f(),
    t = j(),
    [h, i] = o.useState(null),
    m = o.useRef(!1);
  return (
    o.useEffect(() => {
      if (u || m.current) return;
      if (((m.current = !0), !l)) {
        t({ to: "/auth" });
        return;
      }
      const s = new URLSearchParams(window.location.search),
        r = s.get("code"),
        x = s.get("error"),
        c = s.get("installation_id"),
        b = s.get("setup_action");
      if (x) {
        i("GitHub authorization was denied. Please try again.");
        return;
      }
      if (!c && !r) {
        i("No authorization code received from GitHub.");
        return;
      }
      if (!n) {
        t({ to: "/auth" });
        return;
      }
      const p = s.get("state");
      let g = "/dashboard";
      try {
        if (p) {
          const a = JSON.parse(p);
          a.milestoneRedirect && (g = a.milestoneRedirect);
        }
      } catch {}
      (r ? d(r) : Promise.resolve())
        .then(() => {
          if (c && b) return N.saveInstallation(n, c);
        })
        .then(() => t({ to: g }))
        .catch((a) => {
          i(a instanceof Error ? a.message : "Failed to connect GitHub.");
        });
    }, [u, l, n, d, t]),
    h
      ? e.jsx("div", {
          className: "git-escrow-root",
          children: e.jsx("div", {
            className: "auth-shell",
            children: e.jsxs("div", {
              className: "auth-card",
              children: [
                e.jsx("div", { className: "auth-eyebrow", children: "GitHub · App" }),
                e.jsx("h2", { children: "Connection failed." }),
                e.jsx("p", { className: "auth-sub", children: h }),
                e.jsx("button", {
                  className: "btn btn-primary",
                  onClick: () => t({ to: "/github" }),
                  style: { marginTop: 16 },
                  children: "Try again →",
                }),
              ],
            }),
          }),
        })
      : e.jsx("div", {
          className: "git-escrow-root",
          children: e.jsx("div", {
            className: "auth-shell",
            children: e.jsxs("div", {
              className: "auth-card",
              children: [
                e.jsx("div", { className: "auth-eyebrow", children: "GitHub · App" }),
                e.jsx("h2", { children: "Connecting…" }),
                e.jsx("p", {
                  className: "auth-sub",
                  children: "Linking your GitHub account. Please wait.",
                }),
                e.jsxs("div", {
                  className: "github-connecting-dots",
                  children: [e.jsx("span", {}), e.jsx("span", {}), e.jsx("span", {})],
                }),
              ],
            }),
          }),
        })
  );
}
export { y as component };
