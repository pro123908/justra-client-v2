import { u, a as m, r as o, j as e, L as p } from "./index-Cmg3No5R.js";
import { N as x } from "./Navbar-CDX-VLnU.js";
function v() {
  const { user: n, isInitializing: s, connectPhantom: h } = u(),
    t = m(),
    [r, l] = o.useState(!1),
    [c, i] = o.useState(null);
  o.useEffect(() => {
    !s && n && t({ to: n.role ? "/dashboard" : "/role" });
  }, [n, s, t]);
  const d = async () => {
    (l(!0), i(null));
    try {
      const a = await h();
      t({ to: a.role ? "/dashboard" : "/role" });
    } catch (a) {
      i(a instanceof Error ? a.message : "Failed to connect wallet");
    } finally {
      l(!1);
    }
  };
  return s
    ? null
    : e.jsxs("div", {
        className: "git-escrow-root",
        children: [
          e.jsx("div", { className: "wrap", style: { paddingBottom: 24 }, children: e.jsx(x, {}) }),
          e.jsx("div", {
            className: "auth-shell",
            children: e.jsxs("div", {
              className: "auth-card",
              children: [
                e.jsx("div", { className: "auth-eyebrow", children: "Authenticate · Step 1 of 2" }),
                e.jsxs("h2", { children: ["Connect your", e.jsx("br", {}), "Solana wallet."] }),
                e.jsx("p", {
                  className: "auth-sub",
                  children:
                    "Connect your Phantom wallet to manage projects, milestones, and on-chain escrow contracts. Sessions are scoped per-wallet and signed locally — we never see your private keys.",
                }),
                e.jsxs("button", {
                  className: "btn-google",
                  onClick: d,
                  disabled: r,
                  children: [
                    e.jsx("span", { className: "g-mark phantom-mark", children: "◎" }),
                    e.jsx("span", { children: r ? "Connecting…" : "Connect Phantom Wallet" }),
                  ],
                }),
                c && e.jsx("div", { className: "auth-error", children: c }),
                e.jsx("div", { className: "auth-divider", children: "Solana · Mainnet-Beta" }),
                e.jsxs("p", {
                  className: "auth-fineprint",
                  children: [
                    "By connecting you agree to the escrow terms. Don't have Phantom?",
                    " ",
                    e.jsx("a", {
                      href: "https://phantom.app/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      style: { color: "var(--neon)", textDecoration: "none" },
                      children: "Install →",
                    }),
                    e.jsx("br", {}),
                    e.jsx(p, {
                      to: "/",
                      style: { color: "var(--neon)", textDecoration: "none" },
                      children: "← Back to console",
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      });
}
export { v as component };
