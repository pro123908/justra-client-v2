/* App shell: route + tweaks panel wiring */
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [t, setTweak] = useTweaks(
    /*EDITMODE-BEGIN*/ {
      brandHue: 155,
      density: "cozy",
      role: "consumer",
      theme: "light",
    } /*EDITMODE-END*/,
  );

  // Apply theme + brand hue live
  useEffectApp(() => {
    const r = document.documentElement;
    const h = t.brandHue;
    r.dataset.theme = t.theme;
    r.dataset.density = t.density;
    r.style.setProperty("--brand-50", `oklch(0.97  0.02 ${h})`);
    r.style.setProperty("--brand-100", `oklch(0.93  0.04 ${h})`);
    r.style.setProperty("--brand-200", `oklch(0.86  0.07 ${h})`);
    r.style.setProperty("--brand-300", `oklch(0.76  0.10 ${h})`);
    r.style.setProperty("--brand-500", `oklch(0.55  0.09 ${h})`);
    r.style.setProperty("--brand-600", `oklch(0.48  0.09 ${h})`);
    r.style.setProperty("--brand-700", `oklch(0.40  0.08 ${h})`);
    r.style.setProperty("--brand-900", `oklch(0.25  0.05 ${h})`);
    if (t.theme === "dark") {
      r.style.setProperty("--brand-50", `oklch(0.30  0.05 ${h})`);
      r.style.setProperty("--brand-100", `oklch(0.36  0.06 ${h})`);
      r.style.setProperty("--brand-700", `oklch(0.82  0.10 ${h})`);
    }
  }, [t.brandHue, t.density, t.theme]);

  const [route, setRoute] = useStateApp("landing");
  const [createOpen, setCreateOpen] = useStateApp(false);
  const role = t.role;
  const setRole = (r) => setTweak("role", r);

  const isPublic = route === "landing" || route === "auth" || route === "role";
  const userBadges = role === "provider" ? { invites: 2 } : {};

  // Screen labels for inspect-mode
  const screenLabel = {
    landing: "01 Landing",
    auth: "02 Auth · Connect wallet",
    role: "03 Role select",
    dashboard: "04 Dashboard",
    projects: "05 Projects",
    project: "06 Project detail",
    milestone: "07 Milestone detail",
  }[route];

  return (
    <React.Fragment>
      <div data-screen-label={screenLabel}>
        {isPublic ? (
          <React.Fragment>
            {route === "landing" && <LandingScreen go={setRoute} />}
            {route === "auth" && <AuthScreen go={setRoute} />}
            {route === "role" && <RoleScreen go={setRoute} setRole={setRole} />}
          </React.Fragment>
        ) : (
          <div className="app">
            <Sidebar
              active={route}
              onNav={setRoute}
              role={role}
              user={
                role === "provider"
                  ? { name: "Maya Soto", initial: "M", short: "7Hk2…q4Bn" }
                  : { name: "Ada Lovelace", initial: "A", short: "4Yp9…wZ12" }
              }
              badges={userBadges}
            />
            <div className="main">
              <Topbar onCreate={role === "consumer" ? () => setCreateOpen(true) : null} />
              {route === "dashboard" && (
                <DashboardScreen go={setRoute} role={role} openCreate={() => setCreateOpen(true)} />
              )}
              {route === "projects" && (
                <ProjectsScreen go={setRoute} openCreate={() => setCreateOpen(true)} />
              )}
              {route === "project" && <ProjectScreen go={setRoute} role={role} />}
              {route === "milestone" && <MilestoneScreen go={setRoute} role={role} />}
              {route === "settings" && <SettingsScreen t={t} setTweak={setTweak} role={role} />}
              {!["dashboard", "projects", "project", "milestone", "settings"].includes(route) && (
                <div className="page">
                  <PageHead
                    title={route.charAt(0).toUpperCase() + route.slice(1)}
                    subtitle="This page hasn't been redesigned yet — coming next."
                  />
                  <div className="card card-pad" style={{ textAlign: "center", padding: 64 }}>
                    <div className="muted">Placeholder for {route}.</div>
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: 16 }}
                      onClick={() => setRoute("dashboard")}
                    >
                      Back to dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <CreateProjectModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onCreate={() => {
            setCreateOpen(false);
            setRoute("project");
          }}
        />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Appearance">
          <TweakRadio
            label="Theme"
            value={t.theme}
            options={["light", "dark"]}
            onChange={(v) => setTweak("theme", v)}
          />
        </TweakSection>
        <TweakSection label="Brand color">
          <TweakSelect
            label="Primary"
            value={t.brandHue}
            options={[
              { value: 155, label: "Sage (default)" },
              { value: 195, label: "Teal" },
              { value: 230, label: "Slate blue" },
              { value: 265, label: "Plum" },
              { value: 25, label: "Terracotta" },
              { value: 45, label: "Amber" },
            ]}
            onChange={(v) => setTweak("brandHue", v)}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={t.density}
            options={["compact", "cozy", "comfy"]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>
        <TweakSection label="Role">
          <TweakRadio
            label="View as"
            value={t.role}
            options={["consumer", "provider"]}
            onChange={(v) => setTweak("role", v)}
          />
        </TweakSection>
        <TweakSection label="Jump to screen">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["landing", "Landing"],
              ["auth", "Sign-in · Wallet"],
              ["role", "Role selection"],
              ["dashboard", "Dashboard"],
              ["projects", "Projects list"],
              ["project", "Project detail"],
              ["milestone", "Milestone detail"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={"twk-btn" + (route === id ? "" : " secondary")}
                style={{ justifyContent: "flex-start" }}
                onClick={() => setRoute(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
