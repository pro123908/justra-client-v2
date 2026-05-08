import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { Ico } from "@/components/app/Icons";

const PREFS_KEY = "justra_prefs";

interface Prefs {
  theme: "light" | "dark";
  brandHue: number;
  density: "compact" | "cozy" | "comfy";
}

const DEFAULT_PREFS: Prefs = { theme: "light", brandHue: 155, density: "cozy" };

function loadPrefs(): Prefs {
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(PREFS_KEY) ?? "{}") };
  } catch {
    return DEFAULT_PREFS;
  }
}

function applyPrefs(prefs: Prefs) {
  const html = document.documentElement;
  html.setAttribute("data-theme", prefs.theme);
  html.setAttribute("data-density", prefs.density);
}

const THEMES = [
  { value: "light" as const, label: "Light", desc: "Calm warm whites with sage accents." },
  {
    value: "dark" as const,
    label: "Dark",
    desc: "Low-glare ink on charcoal — easy on the eyes after sundown.",
  },
];

const HUES = [
  { value: 155, label: "Sage" },
  { value: 195, label: "Teal" },
  { value: 230, label: "Slate blue" },
  { value: 265, label: "Plum" },
  { value: 25, label: "Terracotta" },
  { value: 45, label: "Amber" },
];

function ThemePreview({ dark }: { dark: boolean }) {
  const bg = dark ? "#1d2128" : "#fbfaf6";
  const surf = dark ? "#2a2f37" : "#ffffff";
  const line = dark ? "#3a4049" : "#ecebe3";
  const ink = dark ? "#e8eaed" : "#26292e";
  const ink2 = dark ? "#9da3ad" : "#7a8089";
  const accent = "oklch(0.55 0.09 155)";
  return (
    <div
      style={{
        borderRadius: 10,
        background: bg,
        border: `1px solid ${line}`,
        padding: 10,
        display: "grid",
        gridTemplateColumns: "40px 1fr",
        gap: 8,
        height: 110,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: surf,
          borderRadius: 6,
          padding: 6,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div style={{ width: 16, height: 16, borderRadius: 4, background: accent }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ height: 6, background: line, borderRadius: 3, width: "100%" }} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ height: 8, width: 40, background: ink, borderRadius: 3 }} />
          <div style={{ height: 8, width: 24, background: ink2, borderRadius: 3, opacity: 0.5 }} />
        </div>
        <div
          style={{
            background: surf,
            border: `1px solid ${line}`,
            borderRadius: 6,
            padding: 6,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div style={{ height: 5, width: "60%", background: ink, borderRadius: 2 }} />
          <div
            style={{ height: 4, width: "90%", background: ink2, opacity: 0.4, borderRadius: 2 }}
          />
          <div
            style={{ height: 4, width: "70%", background: ink2, opacity: 0.4, borderRadius: 2 }}
          />
          <div style={{ marginTop: "auto", display: "flex", gap: 4 }}>
            <div style={{ height: 10, width: 28, background: accent, borderRadius: 3 }} />
            <div style={{ height: 10, width: 22, background: line, borderRadius: 3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  const [activeTab, setActiveTab] = useState("appearance");

  useEffect(() => {
    applyPrefs(prefs);
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const setTweak = <K extends keyof Prefs>(key: K, val: Prefs[K]) => {
    setPrefs((p) => ({ ...p, [key]: val }));
  };

  const shortKey = (key: string) => (key ? `${key.slice(0, 4)}…${key.slice(-4)}` : "");

  return (
    <AppShell>
      <div className="page">
        <PageHead title="Settings" subtitle="Tune your workspace, security, and notifications." />

        <div className="tabs">
          {[
            { id: "appearance", label: "Appearance" },
            { id: "account", label: "Account" },
            { id: "notifications", label: "Notifications" },
            { id: "wallets", label: "Wallets", count: 2 },
            { id: "billing", label: "Billing" },
          ].map((t) => (
            <button
              key={t.id}
              className={`tab${activeTab === t.id ? " active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
              {t.count != null && <span className="count">{t.count}</span>}
            </button>
          ))}
        </div>

        {activeTab === "appearance" && (
          <>
            {/* Theme picker */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-head">
                <div>
                  <div className="card-title">Theme</div>
                  <div className="muted-2" style={{ fontSize: 13 }}>
                    Pick how Justra looks across the console.
                  </div>
                </div>
              </div>
              <div
                className="card-pad"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
              >
                {THEMES.map((opt) => {
                  const sel = prefs.theme === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setTweak("theme", opt.value)}
                      style={{
                        textAlign: "left",
                        border: `1px solid ${sel ? "var(--brand-500)" : "var(--line-2)"}`,
                        background: sel ? "var(--brand-50)" : "var(--surface)",
                        borderRadius: "var(--r-3)",
                        padding: 14,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        font: "inherit",
                        color: "inherit",
                        transition: "all 0.15s",
                        boxShadow: sel ? "0 0 0 3px var(--brand-100)" : "none",
                      }}
                    >
                      <ThemePreview dark={opt.value === "dark"} />
                      <div className="row-between">
                        <div>
                          <div style={{ fontWeight: 700, fontFamily: "var(--display)" }}>
                            {opt.label}
                          </div>
                          <div className="muted-2" style={{ fontSize: 12, marginTop: 2 }}>
                            {opt.desc}
                          </div>
                        </div>
                        <span
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            border: `2px solid ${sel ? "var(--brand-500)" : "var(--line-3)"}`,
                            background: sel ? "var(--brand-500)" : "transparent",
                            display: "grid",
                            placeItems: "center",
                            color: "#fff",
                            flexShrink: 0,
                          }}
                        >
                          {sel && <Ico.check style={{ width: 12, height: 12 }} />}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent color */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-head">
                <div>
                  <div className="card-title">Accent color</div>
                  <div className="muted-2" style={{ fontSize: 13 }}>
                    Used for primary actions, links, and progress bars.
                  </div>
                </div>
              </div>
              <div
                className="card-pad"
                style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}
              >
                {HUES.map((h) => {
                  const sel = prefs.brandHue === h.value;
                  return (
                    <button
                      key={h.value}
                      onClick={() => setTweak("brandHue", h.value)}
                      style={{
                        background: "transparent",
                        border: `1px solid ${sel ? "var(--brand-500)" : "var(--line)"}`,
                        borderRadius: 10,
                        padding: 10,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        font: "inherit",
                        color: "inherit",
                        transition: "all 0.15s",
                        boxShadow: sel ? "0 0 0 3px var(--brand-100)" : "none",
                      }}
                    >
                      <span
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: `oklch(0.55 0.09 ${h.value})`,
                          border: "2px solid var(--surface)",
                          boxShadow: "0 0 0 1px var(--line-2)",
                        }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{h.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Density */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-head">
                <div>
                  <div className="card-title">Density</div>
                  <div className="muted-2" style={{ fontSize: 13 }}>
                    Controls spacing across cards and tables.
                  </div>
                </div>
              </div>
              <div className="card-pad">
                <div
                  style={{
                    display: "inline-flex",
                    background: "var(--bg-2)",
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    padding: 4,
                  }}
                >
                  {(["compact", "cozy", "comfy"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setTweak("density", d)}
                      style={{
                        border: "none",
                        background: prefs.density === d ? "var(--surface)" : "transparent",
                        color: prefs.density === d ? "var(--ink)" : "var(--ink-3)",
                        fontWeight: 600,
                        fontSize: 13,
                        padding: "8px 18px",
                        borderRadius: 7,
                        cursor: "pointer",
                        textTransform: "capitalize",
                        boxShadow: prefs.density === d ? "var(--sh-1)" : "none",
                        transition: "all 0.15s",
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "account" && (
          <div className="card">
            <div className="card-head">
              <div>
                <div className="card-title">Connected wallet</div>
                <div className="muted-2" style={{ fontSize: 13 }}>
                  Sign-in and on-chain actions go through this address.
                </div>
              </div>
              <button className="btn btn-sm">Disconnect</button>
            </div>
            <div className="card-pad">
              <div
                className="invite-row"
                style={{ borderColor: "var(--brand-200)", background: "var(--brand-50)" }}
              >
                <div className="wallet-mark" style={{ width: 36, height: 36 }}>
                  ◎
                </div>
                <div className="meta">
                  <div className="name">Phantom · Mainnet-beta</div>
                  <div className="sub">{shortKey(user?.address ?? "")}</div>
                </div>
                <span className="pill pill-ok">
                  <span className="dot" />
                  Primary
                </span>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "notifications" || activeTab === "wallets" || activeTab === "billing") && (
          <div
            className="card card-pad"
            style={{ textAlign: "center", color: "var(--ink-4)", padding: "48px 0" }}
          >
            <div style={{ fontWeight: 600 }}>Coming soon</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>This section is not yet available.</div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
