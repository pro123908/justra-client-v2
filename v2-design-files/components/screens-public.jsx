/* Landing, Auth, Role-select */

function LandingScreen({ go }) {
  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12">
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>
            Justra
          </div>
        </div>
        <div className="links">
          <a>How it works</a>
          <a>For developers</a>
          <a>For clients</a>
          <a>Pricing</a>
        </div>
        <div className="actions">
          <button className="btn btn-ghost" onClick={() => go("auth")}>
            Sign in
          </button>
          <button className="btn btn-primary" onClick={() => go("auth")}>
            Get started
          </button>
        </div>
      </nav>

      <section className="hero">
        <div>
          <span className="auth-step">
            <Ico.shield /> Trustless milestone escrow
          </span>
          <h1>
            Software work that pays out <em>only when it's right.</em>
          </h1>
          <p className="lede">
            Justra brokers software contracts between clients and developers. Funds lock in on-chain
            escrow per milestone, code is graded against the spec by an AI review engine, and SOL
            releases the moment delivery is approved.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => go("auth")}>
              Start a project <Ico.arrowR />
            </button>
            <button className="btn btn-lg" onClick={() => go("dashboard")}>
              View live demo
            </button>
          </div>
          <div className="hero-trust">
            <div>
              <b>$4.2M</b>locked across milestones
            </div>
            <div>
              <b>1,840</b>projects shipped
            </div>
            <div>
              <b>97%</b>release rate
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="row-between" style={{ marginBottom: 14 }}>
            <span className="eyebrow">Live milestone</span>
            <StatusPill status="active" />
          </div>
          <div className="h-display h3">Atlas Settlement Engine</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
            M-03 · Auth & user provisioning
          </div>
          <div className="hero-band-amount" style={{ margin: "20px 0 16px" }}>
            <div className="lbl">Locked in escrow</div>
            <div className="val">◎ 8.4 SOL</div>
            <div className="sub">≈ $1,386 USD · releases on approval</div>
          </div>
          <div className="proj-progress">
            <div className="label">
              <span>Milestone progress</span>
              <span>65%</span>
            </div>
            <div className="progress">
              <i style={{ width: "65%" }} />
            </div>
          </div>
          <div className="divider" />
          <div className="row-between" style={{ fontSize: 13 }}>
            <div className="row gap-8">
              <div className="av av-sm">M</div>
              <span>Maya Soto</span>
              <span className="muted-2">Provider</span>
            </div>
            <span className="muted-2 mono">7Hk2…q4Bn</span>
          </div>
        </div>
      </section>

      <section className="feature-band">
        <div style={{ maxWidth: 1180, margin: "0 auto 24px" }}>
          <span className="eyebrow">How it works</span>
          <h2 className="h-display h2" style={{ marginTop: 8 }}>
            Four steps from spec to settlement
          </h2>
        </div>
        <div className="feature-grid">
          <div className="feature">
            <div className="feature-ico">
              <Ico.briefcase />
            </div>
            <h4>1 · Define milestones</h4>
            <p>
              Upload your spec — Justra extracts checkpoints, scope, and acceptance criteria. Edit,
              then invite a developer.
            </p>
          </div>
          <div className="feature">
            <div className="feature-ico">
              <Ico.lock />
            </div>
            <h4>2 · Lock funds in escrow</h4>
            <p>
              Each milestone gets its own on-chain PDA. Pay with SOL or card — funds are frozen
              until you sign off.
            </p>
          </div>
          <div className="feature">
            <div className="feature-ico">
              <Ico.sparkle />
            </div>
            <h4>3 · AI-graded delivery</h4>
            <p>
              Developers ship to GitHub. Five LLM judges score the code against the spec — you see
              the verdict before releasing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function AuthScreen({ go }) {
  const [loading, setLoading] = useState(false);
  const connect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      go("role");
    }, 900);
  };
  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12" onClick={() => go("landing")} style={{ cursor: "pointer" }}>
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>
            Justra
          </div>
        </div>
        <div className="actions">
          <span className="muted-2" style={{ fontSize: 13 }}>
            Don't have an account?
          </span>
          <button className="btn btn-ghost">Create one</button>
        </div>
      </nav>
      <div className="center-shell">
        <div className="auth-card">
          <span className="auth-step">Step 1 of 2 · Connect</span>
          <h2>Connect your Solana wallet</h2>
          <p className="sub">
            Justra uses your wallet to sign milestone agreements and release escrow. Sessions are
            scoped per-wallet — your private keys never leave Phantom.
          </p>
          <button className="wallet-btn" onClick={connect} disabled={loading}>
            <span className="wallet-mark">◎</span>
            <span className="stack" style={{ alignItems: "flex-start" }}>
              <span>{loading ? "Connecting…" : "Continue with Phantom"}</span>
              <span className="muted-2" style={{ fontSize: 12, fontWeight: 500 }}>
                Mainnet-beta
              </span>
            </span>
            <Ico.arrowR className="arrow" />
          </button>
          <div className="divider" />
          <button className="wallet-btn">
            <span
              className="wallet-mark"
              style={{ background: "linear-gradient(135deg,#f7931a,#e76f00)" }}
            >
              S
            </span>
            <span className="stack" style={{ alignItems: "flex-start" }}>
              <span>Continue with Solflare</span>
              <span className="muted-2" style={{ fontSize: 12, fontWeight: 500 }}>
                Browser extension
              </span>
            </span>
            <Ico.arrowR className="arrow" />
          </button>
          <p className="fineprint">
            By connecting you agree to Justra's <a>Terms</a> and <a>Privacy Policy</a>. New to
            wallets? <a>Install Phantom →</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function RoleScreen({ go, setRole }) {
  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12">
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>
            Justra
          </div>
        </div>
        <div className="actions">
          <span className="pill">
            <span className="dot" style={{ background: "#22c55e" }} />
            Wallet connected · 7Hk2…q4Bn
          </span>
        </div>
      </nav>
      <div className="center-shell" style={{ alignItems: "flex-start", paddingTop: 64 }}>
        <div style={{ width: "min(880px, 100%)" }}>
          <span className="auth-step">Step 2 of 2 · Choose role</span>
          <h2 className="h-display" style={{ fontSize: 28, marginTop: 14, marginBottom: 8 }}>
            How will you use Justra?
          </h2>
          <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 580 }}>
            You can switch between workspaces any time — but each wallet starts with a primary role
            so we know which tools to surface first.
          </p>

          <div className="role-grid">
            <button
              className="role-card"
              onClick={() => {
                setRole("consumer");
                go("dashboard");
              }}
            >
              <div className="role-card-ico">
                <Ico.briefcase />
              </div>
              <div>
                <div
                  className="muted-2"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Client · Project owner
                </div>
                <h3>I'm hiring developers</h3>
              </div>
              <p>
                Define scope, fund milestones, and approve deliveries. You hold the spec and the
                budget.
              </p>
              <ul className="role-bullets">
                <li>
                  <Ico.check />
                  Create projects and break them into payable milestones
                </li>
                <li>
                  <Ico.check />
                  Lock funds in escrow per milestone — release on approval
                </li>
                <li>
                  <Ico.check />
                  Inspect AI code reviews before signing off
                </li>
              </ul>
              <div className="role-card-cta">
                <span>Continue as client</span>
                <Ico.arrowR />
              </div>
            </button>

            <button
              className="role-card"
              onClick={() => {
                setRole("provider");
                go("dashboard");
              }}
            >
              <div className="role-card-ico">
                <Ico.user />
              </div>
              <div>
                <div
                  className="muted-2"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Developer · Provider
                </div>
                <h3>I'm shipping code</h3>
              </div>
              <p>
                Accept milestones, deliver to GitHub, and get paid the moment your work is approved.
              </p>
              <ul className="role-bullets">
                <li>
                  <Ico.check />
                  Submit code per milestone — AI-reviewed automatically
                </li>
                <li>
                  <Ico.check />
                  Trigger on-chain release of locked SOL on approval
                </li>
                <li>
                  <Ico.check />
                  Build a verifiable on-chain delivery history
                </li>
              </ul>
              <div className="role-card-cta">
                <span>Continue as developer</span>
                <Ico.arrowR />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LandingScreen, AuthScreen, RoleScreen });
