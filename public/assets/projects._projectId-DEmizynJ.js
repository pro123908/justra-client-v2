import {
  u as U,
  a as z,
  R as B,
  r as l,
  m as R,
  i as L,
  p as _,
  j as e,
  L as F,
  M as m,
} from "./index-Cmg3No5R.js";
import { N as T } from "./Navbar-CDX-VLnU.js";
import { S as W, M as $ } from "./SuccessModal-CxSQrlYz.js";
import { f as J } from "./utils-DUfAGjcA.js";
const K = (a) => (a.length <= 10 ? a : `${a.slice(0, 4)}…${a.slice(-4)}`),
  D = (a) => {
    if (!a) return "—";
    const i = new Date(a);
    return isNaN(i.getTime())
      ? a
      : i
          .toLocaleDateString(void 0, { month: "short", day: "2-digit", year: "numeric" })
          .toUpperCase();
  };
function G(a) {
  switch (a) {
    case m.PENDING_PROVIDER_APPROVAL:
    case m.WAITING_FOR_DEPOSIT:
      return "pending";
    case m.ACTIVE:
    case m.IN_PROGRESS:
    case m.COMPLETED:
      return "approved";
    case m.REJECTED:
      return "rejected";
    default:
      return "pending";
  }
}
function Y(a) {
  switch (a) {
    case m.PENDING_PROVIDER_APPROVAL:
      return "Pending provider approval";
    case m.ACTIVE:
      return "Active · awaiting delivery";
    case m.REJECTED:
      return "Rejected";
    case m.WAITING_FOR_DEPOSIT:
      return "Awaiting deposit";
    case m.IN_PROGRESS:
      return "In progress";
    case m.COMPLETED:
      return "Completed";
    default:
      return String(a);
  }
}
function se() {
  const { user: a, token: i } = U(),
    h = z(),
    { projectId: c } = B.useParams(),
    [r, b] = l.useState(null),
    [y, x] = l.useState([]),
    [v, j] = l.useState([]),
    [p, N] = l.useState(!0),
    [S, E] = l.useState(!1),
    [n, d] = l.useState(!1),
    [P, f] = l.useState(!1),
    [A, w] = l.useState(null);
  if (
    (l.useEffect(() => {
      a ? a.role || h({ to: "/role" }) : h({ to: "/auth" });
    }, [a, h]),
    l.useEffect(() => {
      if (!i || !a?.role) return;
      N(!0);
      const s =
          a.role === "consumer"
            ? R.listForProject(i, c)
            : R.listForProvider(i).then((t) => t.filter((g) => g.project?.id === c)),
        o = a.role === "consumer" ? L.getProjectInvites(i, c) : Promise.resolve([]);
      Promise.all([_.get(i, c), s, o])
        .then(([t, g, k]) => {
          (b(t), x(g), j(k.filter((O) => O.status === "PENDING" || O.status === "pending")));
        })
        .catch(() => E(!0))
        .finally(() => N(!1));
    }, [i, a?.role, c]),
    !a || !a.role)
  )
    return null;
  if (p)
    return e.jsx("div", {
      className: "git-escrow-root",
      children: e.jsxs("div", {
        className: "wrap",
        children: [
          e.jsx(T, {}),
          e.jsxs("div", {
            className: "empty-state",
            style: { marginTop: 60 },
            children: [
              e.jsx("div", { className: "ic", children: "…" }),
              e.jsx("h3", { children: "Loading project" }),
            ],
          }),
        ],
      }),
    });
  if (!r || S)
    return e.jsx("div", {
      className: "git-escrow-root",
      children: e.jsxs("div", {
        className: "wrap",
        children: [
          e.jsx(T, {}),
          e.jsxs("div", {
            className: "empty-state",
            style: { marginTop: 60 },
            children: [
              e.jsx("div", { className: "ic", children: "!" }),
              e.jsx("h3", { children: "Project not found" }),
              e.jsx("p", { children: "This project doesn't exist or the link is invalid." }),
              e.jsx(F, {
                to: "/dashboard",
                className: "btn-action",
                style: { textDecoration: "none" },
                children: "← Back to dashboard",
              }),
            ],
          }),
        ],
      }),
    });
  const I = r.owner?.id === a.id || r.owner?.publicKey === a.address,
    M = r.members?.some((s) => s.id === a.id || s.publicKey === a.address),
    u = a.role === "consumer" && I,
    C = r.members ?? [];
  return !I && !M
    ? e.jsx("div", {
        className: "git-escrow-root",
        children: e.jsxs("div", {
          className: "wrap",
          children: [
            e.jsx(T, {}),
            e.jsxs("div", {
              className: "empty-state",
              style: { marginTop: 60 },
              children: [
                e.jsx("div", { className: "ic", children: "!" }),
                e.jsx("h3", { children: "Access denied" }),
                e.jsx("p", { children: "You don't have access to this project." }),
                e.jsx(F, {
                  to: "/dashboard",
                  className: "btn-action",
                  style: { textDecoration: "none" },
                  children: "← Back to dashboard",
                }),
              ],
            }),
          ],
        }),
      })
    : e.jsxs("div", {
        className: "git-escrow-root",
        children: [
          e.jsxs("div", {
            className: "wrap",
            children: [
              e.jsx(T, {}),
              e.jsxs("div", {
                className: "proj-header",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsxs("div", {
                        className: "crumb",
                        children: [
                          e.jsx(F, { to: "/dashboard", children: "Dashboard" }),
                          e.jsx("span", { className: "sep", children: "/" }),
                          e.jsx("span", { children: "Projects" }),
                          e.jsx("span", { className: "sep", children: "/" }),
                          e.jsx("span", { style: { color: "var(--neon)" }, children: r.id }),
                        ],
                      }),
                      e.jsxs("div", { className: "ph-id", children: ["▸ ", r.id] }),
                      e.jsx("h1", { children: r.title }),
                      e.jsxs("div", {
                        className: "ph-meta",
                        children: [
                          e.jsxs("span", {
                            children: [e.jsx("b", { children: y.length }), " milestones"],
                          }),
                          e.jsxs("span", {
                            children: ["created ", e.jsx("b", { children: D(r.createdAt) })],
                          }),
                          e.jsxs("span", {
                            children: [
                              "role ",
                              e.jsx("b", {
                                style: { color: "var(--neon)" },
                                children: a.role.toUpperCase(),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  u &&
                    e.jsxs("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        alignItems: "flex-end",
                      },
                      children: [
                        e.jsxs("button", {
                          className: "btn-action",
                          onClick: () => f(!0),
                          children: [
                            e.jsx("span", { className: "plus", children: "⚙" }),
                            " Manage Access",
                          ],
                        }),
                        e.jsxs("div", {
                          style: {
                            color: "var(--ink-mute)",
                            fontSize: 11,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                          },
                          children: [
                            C.length,
                            " provider",
                            C.length === 1 ? "" : "s",
                            " · ",
                            v.length,
                            " ",
                            "pending",
                          ],
                        }),
                      ],
                    }),
                ],
              }),
              e.jsxs("div", {
                className: "section-bar",
                style: { marginTop: 28, borderBottom: "1px dashed var(--line)" },
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("h2", { style: { fontSize: 26 }, children: "Milestones" }),
                      e.jsx("div", {
                        className: "sub",
                        children: u
                          ? "Define payable checkpoints. Each milestone awaits developer approval before activation."
                          : "Review and act on checkpoints assigned by the consumer.",
                      }),
                    ],
                  }),
                  u &&
                    e.jsxs("button", {
                      className: "btn-action",
                      onClick: () => d(!0),
                      children: [
                        e.jsx("span", { className: "plus", children: "+" }),
                        " Add Milestone",
                      ],
                    }),
                ],
              }),
              y.length === 0
                ? e.jsxs("div", {
                    className: "empty-state",
                    children: [
                      e.jsx("div", { className: "ic", children: "≡" }),
                      e.jsx("h3", { children: "No milestones yet" }),
                      e.jsx("p", {
                        children: u
                          ? "Add the first milestone to break this project into verifiable, payable units of work."
                          : "The consumer hasn't defined any milestones yet. Check back soon.",
                      }),
                      u &&
                        e.jsxs("button", {
                          className: "btn-action",
                          onClick: () => d(!0),
                          children: [
                            e.jsx("span", { className: "plus", children: "+" }),
                            " Add first milestone",
                          ],
                        }),
                    ],
                  })
                : e.jsx("div", {
                    className: "milestones",
                    children: y.map((s, o) =>
                      e.jsxs(
                        "button",
                        {
                          type: "button",
                          className: "milestone milestone-row ms-row-" + G(s.status),
                          onClick: () =>
                            h({
                              to: "/projects/$projectId/milestones/$milestoneId",
                              params: { projectId: c, milestoneId: s.id },
                            }),
                          children: [
                            e.jsx("div", {
                              className: "ms-num",
                              children: String(o + 1).padStart(2, "0"),
                            }),
                            e.jsxs("div", {
                              className: "ms-body",
                              children: [
                                e.jsx("h3", { className: "ms-title", children: s.title }),
                                s.description &&
                                  e.jsx("p", { className: "ms-desc", children: s.description }),
                                e.jsxs("div", {
                                  className: "ms-row-tags",
                                  children: [
                                    e.jsxs("span", {
                                      className: "ms-status " + G(s.status),
                                      children: [e.jsx("span", { className: "d" }), Y(s.status)],
                                    }),
                                    s.pda &&
                                      e.jsxs("span", {
                                        className: "ms-chip",
                                        title: s.pda,
                                        children: [
                                          e.jsx("span", { className: "k", children: "PDA" }),
                                          e.jsx("span", {
                                            className: "v",
                                            children:
                                              s.pda.length > 10
                                                ? `${s.pda.slice(0, 4)}…${s.pda.slice(-4)}`
                                                : s.pda,
                                          }),
                                        ],
                                      }),
                                    s.fundedAt &&
                                      e.jsxs("span", {
                                        className: "ms-chip ok",
                                        children: [
                                          e.jsx("span", { className: "k", children: "Funded" }),
                                          e.jsx("span", {
                                            className: "v",
                                            children: D(s.fundedAt),
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "ms-dates",
                              children: [
                                e.jsx("b", { children: D(s.startDate) }),
                                e.jsxs("span", { children: ["→ ", D(s.endDate)] }),
                              ],
                            }),
                            e.jsxs("div", {
                              className: "ms-amount",
                              children: [
                                e.jsxs("b", { children: ["◎ ", s.amount ? J(s.amount) : "—"] }),
                                e.jsx("span", { children: "SOL" }),
                              ],
                            }),
                          ],
                        },
                        s.id,
                      ),
                    ),
                  }),
            ],
          }),
          u &&
            e.jsx(q, {
              open: n,
              onClose: () => d(!1),
              onCreated: (s) => {
                (x((o) => [...o, s]), d(!1), w(s));
              },
              providers: C,
              onSubmit: (s) => R.create(i, c, s),
            }),
          u &&
            e.jsx(H, {
              open: P,
              onClose: () => f(!1),
              providers: C,
              invites: v,
              onInvite: async (s) => {
                const [o] = await L.send(i, { projectId: c, publicKeys: [s] });
                j((t) => [...t, o]);
              },
              onCancelInvite: async (s) => {
                (await L.cancel(i, s), j((o) => o.filter((t) => t.id !== s)));
              },
              onRemove: async (s) => {
                (await _.removeMember(i, c, s),
                  b((o) => o && { ...o, members: (o.members ?? []).filter((t) => t.id !== s) }));
              },
            }),
          e.jsx(W, {
            open: !!A,
            onClose: () => w(null),
            tag: "MILESTONE",
            title: "Milestone Created.",
            message:
              "Milestone is currently pending. Once the developer approves it, it will start.",
          }),
        ],
      });
}
function q({ open: a, onClose: i, onCreated: h, onSubmit: c, providers: r }) {
  const [b, y] = l.useState(""),
    [x, v] = l.useState(""),
    [j, p] = l.useState(""),
    [N, S] = l.useState(""),
    [E, n] = l.useState(""),
    [d, P] = l.useState(""),
    [f, A] = l.useState([]),
    [w, I] = l.useState(!1),
    [M, u] = l.useState(""),
    C = l.useRef(null);
  l.useEffect(() => {
    a && (y(r.length === 1 ? r[0].id : ""), v(""), p(""), S(""), n(""), P(""), A([]), u(""));
  }, [a, r]);
  const s = b.length > 0 && x.trim().length > 0 && j.trim().length > 0 && d.trim().length > 0,
    o = async () => {
      if (!(!s || w)) {
        (I(!0), u(""));
        try {
          const t = await c({
            providerId: b,
            title: x.trim(),
            description: j.trim(),
            startDate: N || void 0,
            endDate: E || void 0,
            amount: d.trim(),
            files: f,
          });
          h(t);
        } catch (t) {
          u(t instanceof Error ? t.message : "Failed to create milestone.");
        } finally {
          I(!1);
        }
      }
    };
  return e.jsx($, {
    open: a,
    onClose: i,
    tag: "NEW MILESTONE",
    title: "Define checkpoint",
    footer: e.jsxs("div", {
      className: "modal-foot",
      children: [
        e.jsx("div", {
          children: f.length
            ? `${f.length} file${f.length > 1 ? "s" : ""} attached`
            : "No files attached",
        }),
        e.jsxs("div", {
          style: { display: "flex", gap: 8 },
          children: [
            e.jsx("button", { className: "btn", onClick: i, disabled: w, children: "Cancel" }),
            e.jsx("button", {
              className: "btn btn-primary",
              disabled: !s || w,
              onClick: o,
              children: w ? "Creating…" : "Create Milestone",
            }),
          ],
        }),
      ],
    }),
    children: e.jsxs("div", {
      className: "form-grid",
      children: [
        e.jsxs("div", {
          className: "form-row",
          children: [
            e.jsx("label", { className: "form-label", children: "▸ Assign to provider" }),
            r.length === 0
              ? e.jsx("div", {
                  className: "access-empty",
                  children: "No providers on this project yet. Invite one first.",
                })
              : e.jsxs("select", {
                  className: "form-input",
                  value: b,
                  onChange: (t) => y(t.target.value),
                  style: { colorScheme: "dark" },
                  children: [
                    r.length > 1 && e.jsx("option", { value: "", children: "— select provider —" }),
                    r.map((t) => e.jsx("option", { value: t.id, children: K(t.publicKey) }, t.id)),
                  ],
                }),
          ],
        }),
        e.jsxs("div", {
          className: "form-row",
          children: [
            e.jsx("label", { className: "form-label", children: "▸ Title" }),
            e.jsx("input", {
              className: "form-input",
              placeholder: "e.g. M-01 · Auth & user provisioning",
              value: x,
              onChange: (t) => v(t.target.value),
              autoFocus: !0,
            }),
          ],
        }),
        e.jsxs("div", {
          className: "form-row",
          children: [
            e.jsx("label", { className: "form-label", children: "▸ Description" }),
            e.jsx("textarea", {
              className: "form-textarea",
              placeholder: "Acceptance criteria, scope, deliverables…",
              value: j,
              onChange: (t) => p(t.target.value),
            }),
          ],
        }),
        e.jsxs("div", {
          className: "form-row two",
          children: [
            e.jsxs("div", {
              className: "form-row",
              style: { gap: 8 },
              children: [
                e.jsx("label", { className: "form-label", children: "▸ Start date" }),
                e.jsx("input", {
                  type: "date",
                  className: "form-input",
                  value: N,
                  onChange: (t) => S(t.target.value),
                  style: { colorScheme: "dark" },
                }),
              ],
            }),
            e.jsxs("div", {
              className: "form-row",
              style: { gap: 8 },
              children: [
                e.jsx("label", { className: "form-label", children: "▸ End date" }),
                e.jsx("input", {
                  type: "date",
                  className: "form-input",
                  value: E,
                  onChange: (t) => n(t.target.value),
                  min: N || void 0,
                  style: { colorScheme: "dark" },
                }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "form-row",
          children: [
            e.jsx("label", { className: "form-label", children: "▸ Amount (SOL)" }),
            e.jsx("input", {
              className: "form-input",
              placeholder: "e.g. 1.5",
              inputMode: "decimal",
              value: d,
              onChange: (t) => P(t.target.value),
            }),
          ],
        }),
        e.jsxs("div", {
          className: "form-row",
          children: [
            e.jsx("label", { className: "form-label", children: "▸ Attach files" }),
            e.jsxs("button", {
              className: "form-attach",
              onClick: () => C.current?.click(),
              children: [
                e.jsx("span", { className: "plus", children: "+" }),
                e.jsxs("span", {
                  style: { flex: 1 },
                  children: [
                    e.jsx("div", { children: "Attach milestone files" }),
                    e.jsx("span", {
                      className: "hint",
                      children: "Spec sheet, design, references — any format",
                    }),
                  ],
                }),
                e.jsx("span", { style: { color: "var(--ink-mute)" }, children: "→" }),
              ],
            }),
            e.jsx("input", {
              ref: C,
              type: "file",
              multiple: !0,
              style: { display: "none" },
              onChange: (t) => {
                const g = [...(t.target.files || [])];
                (g.length && A((k) => [...k, ...g]), (t.target.value = ""));
              },
            }),
            f.length > 0 &&
              e.jsx("div", {
                className: "modal-filelist",
                style: { marginTop: 8 },
                children: f.map((t, g) =>
                  e.jsxs(
                    "div",
                    {
                      className: "file-row",
                      children: [
                        e.jsx("div", {
                          className: "ico",
                          children: (t.name.split(".").pop() || "").toUpperCase().slice(0, 4),
                        }),
                        e.jsx("div", { className: "nm", children: t.name }),
                        e.jsxs("div", {
                          className: "sz",
                          children: [(t.size / 1024).toFixed(1), " KB"],
                        }),
                        e.jsx("button", {
                          className: "rm",
                          onClick: () => A((k) => k.filter((O, V) => V !== g)),
                          children: "×",
                        }),
                      ],
                    },
                    g,
                  ),
                ),
              }),
          ],
        }),
        M && e.jsx("div", { className: "auth-error", children: M }),
      ],
    }),
  });
}
function H({
  open: a,
  onClose: i,
  providers: h,
  invites: c,
  onInvite: r,
  onCancelInvite: b,
  onRemove: y,
}) {
  const [x, v] = l.useState(""),
    [j, p] = l.useState(""),
    [N, S] = l.useState(!1);
  l.useEffect(() => {
    a && (v(""), p(""), S(!1));
  }, [a]);
  const E = async () => {
    const n = x.trim();
    if (n.length < 32 || n.length > 64) {
      p("Enter a valid Solana wallet address.");
      return;
    }
    if (h.some((d) => d.publicKey === n)) {
      p("This wallet is already a provider on this project.");
      return;
    }
    if (c.some((d) => d.for.publicKey === n)) {
      p("This wallet already has a pending invite.");
      return;
    }
    S(!0);
    try {
      (await r(n), v(""), p(""));
    } catch (d) {
      p(d instanceof Error ? d.message : "Failed to send invite.");
    } finally {
      S(!1);
    }
  };
  return e.jsx($, {
    open: a,
    onClose: i,
    tag: "ACCESS",
    title: "Manage providers",
    width: 620,
    footer: e.jsxs("div", {
      className: "modal-foot",
      children: [
        e.jsxs("div", { children: [h.length, " active · ", c.length, " pending"] }),
        e.jsx("button", { className: "btn", onClick: i, children: "Done" }),
      ],
    }),
    children: e.jsxs("div", {
      className: "form-grid",
      children: [
        e.jsxs("div", {
          className: "form-row",
          children: [
            e.jsx("label", {
              className: "form-label",
              children: "▸ Invite provider by wallet address",
            }),
            e.jsxs("div", {
              style: { display: "flex", gap: 8 },
              children: [
                e.jsx("input", {
                  className: "form-input",
                  placeholder: "Solana wallet address (base58)",
                  value: x,
                  onChange: (n) => v(n.target.value),
                  style: { flex: 1 },
                }),
                e.jsx("button", {
                  className: "btn btn-primary",
                  onClick: E,
                  disabled: N,
                  children: N ? "Inviting…" : "Invite",
                }),
              ],
            }),
            j && e.jsx("div", { className: "auth-error", style: { marginTop: 6 }, children: j }),
          ],
        }),
        e.jsxs("div", {
          className: "form-row",
          children: [
            e.jsx("label", { className: "form-label", children: "▸ Active providers" }),
            h.length === 0
              ? e.jsx("div", {
                  className: "access-empty",
                  children: "No providers yet. Invite a developer above.",
                })
              : e.jsx("div", {
                  className: "access-list",
                  children: h.map((n) =>
                    e.jsxs(
                      "div",
                      {
                        className: "access-row",
                        children: [
                          e.jsx("div", {
                            className: "ar-avatar",
                            children: n.publicKey.charAt(0).toUpperCase(),
                          }),
                          e.jsxs("div", {
                            className: "ar-body",
                            children: [
                              e.jsx("div", { className: "ar-name", children: K(n.publicKey) }),
                              e.jsx("div", { className: "ar-meta", children: n.publicKey }),
                            ],
                          }),
                          e.jsxs("span", {
                            className: "ms-status approved",
                            children: [e.jsx("span", { className: "d" }), " Active"],
                          }),
                          e.jsx("button", {
                            className: "btn btn-danger small",
                            onClick: () => y(n.id),
                            children: "Remove",
                          }),
                        ],
                      },
                      n.id,
                    ),
                  ),
                }),
          ],
        }),
        e.jsxs("div", {
          className: "form-row",
          children: [
            e.jsx("label", { className: "form-label", children: "▸ Pending invites" }),
            c.length === 0
              ? e.jsx("div", { className: "access-empty", children: "No pending invites." })
              : e.jsx("div", {
                  className: "access-list",
                  children: c.map((n) =>
                    e.jsxs(
                      "div",
                      {
                        className: "access-row",
                        children: [
                          e.jsx("div", {
                            className: "ar-avatar dim",
                            children: n.for.publicKey.charAt(0).toUpperCase(),
                          }),
                          e.jsxs("div", {
                            className: "ar-body",
                            children: [
                              e.jsx("div", { className: "ar-name", children: K(n.for.publicKey) }),
                              e.jsxs("div", {
                                className: "ar-meta",
                                children: ["Invited ", D(n.createdAt)],
                              }),
                            ],
                          }),
                          e.jsxs("span", {
                            className: "ms-status pending",
                            children: [e.jsx("span", { className: "d" }), " Pending"],
                          }),
                          e.jsx("button", {
                            className: "btn small",
                            onClick: () => b(n.id),
                            children: "Cancel",
                          }),
                        ],
                      },
                      n.id,
                    ),
                  ),
                }),
          ],
        }),
      ],
    }),
  });
}
export { se as component };
