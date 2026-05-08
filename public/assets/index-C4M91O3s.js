import { j as e, L as s } from "./index-Cmg3No5R.js";
import { N as i } from "./Navbar-CDX-VLnU.js";
function a() {
  return e.jsx("div", {
    className: "git-escrow-root",
    children: e.jsxs("div", {
      className: "wrap",
      children: [
        e.jsx(i, {}),
        e.jsxs("div", {
          className: "hero",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx("div", { className: "eyebrow", children: "Verification Console · v0.1" }),
                e.jsxs("h1", {
                  children: [
                    "Trustless milestones.",
                    e.jsx("br", {}),
                    "On-chain escrow.",
                    e.jsx("br", {}),
                    e.jsx("em", { children: "AI-graded delivery." }),
                  ],
                }),
                e.jsx("p", {
                  className: "lede",
                  children:
                    "Git Escrow brokers software work between consumers and providers. Funds are locked in a Solana escrow PDA per milestone, and code is graded against the spec by an LLM-powered analysis engine the moment a provider ships. Open the dashboard to manage your projects, milestones, invites, and deliveries.",
                }),
                e.jsxs("div", {
                  style: { marginTop: 18, display: "flex", gap: 12 },
                  children: [
                    e.jsx(s, {
                      to: "/dashboard",
                      className: "btn btn-primary",
                      style: { textDecoration: "none" },
                      children: "Open dashboard →",
                    }),
                    e.jsx(s, {
                      to: "/auth",
                      className: "btn",
                      style: { textDecoration: "none" },
                      children: "Connect wallet",
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs("aside", {
              className: "hero-aside",
              children: [
                e.jsx("h4", { children: "> Pipeline" }),
                e.jsxs("ol", {
                  children: [
                    e.jsxs("li", {
                      children: [e.jsx("b", { children: "Create" }), " project & invite providers"],
                    }),
                    e.jsxs("li", {
                      children: [
                        e.jsx("b", { children: "Define" }),
                        " milestones, lock SOL in escrow",
                      ],
                    }),
                    e.jsxs("li", {
                      children: [e.jsx("b", { children: "Deliver" }), " code against the spec"],
                    }),
                    e.jsxs("li", {
                      children: [
                        e.jsx("b", { children: "Verify" }),
                        " & release funds via consensus",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
export { a as component };
