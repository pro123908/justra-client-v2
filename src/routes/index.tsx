import { useNavigate } from 'react-router-dom';
import { Ico } from '@/components/app/Icons';
import { StatusPill } from '@/components/app/StatusPill';

export default function IndexPage() {
  const navigate = useNavigate();
  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12">
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>Justra</div>
        </div>
        <div className="links">
          <a>How it works</a>
          <a>For developers</a>
          <a>For clients</a>
          <a>Pricing</a>
        </div>
        <div className="actions">
          <button className="btn btn-ghost" onClick={() => navigate('/auth')}>Sign in</button>
          <button className="btn btn-primary" onClick={() => navigate('/auth')}>Get started</button>
        </div>
      </nav>

      <section className="hero">
        <div>
          <span className="auth-step"><Ico.shield /> Trustless milestone escrow</span>
          <h1>Software work that pays out <em>only when it's right.</em></h1>
          <p className="lede">
            Justra brokers software contracts between clients and developers. Funds lock in
            on-chain escrow per milestone, code is graded against the spec by an AI review engine,
            and SOL releases the moment delivery is approved.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/auth')}>
              Start a project <Ico.arrowR />
            </button>
            <button className="btn btn-lg" onClick={() => navigate('/dashboard')}>
              View live demo
            </button>
          </div>
          <div className="hero-trust">
            <div><b>$4.2M</b> locked across milestones</div>
            <div><b>1,840</b> projects shipped</div>
            <div><b>97%</b> release rate</div>
          </div>
        </div>

        <div className="hero-card">
          <div className="row-between" style={{ marginBottom: 14 }}>
            <span className="eyebrow">Live milestone</span>
            <StatusPill status="active" />
          </div>
          <div className="h-display h3">Atlas Settlement Engine</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>M-03 · Auth & user provisioning</div>
          <div className="hero-band-amount" style={{ margin: '20px 0 16px' }}>
            <div className="lbl">Locked in escrow</div>
            <div className="val">◎ 8.4 SOL</div>
            <div className="sub">≈ $1,386 USD · releases on approval</div>
          </div>
          <div className="proj-progress">
            <div className="label"><span>Milestone progress</span><span>65%</span></div>
            <div className="progress"><i style={{ width: '65%' }} /></div>
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
        <div style={{ maxWidth: 1180, margin: '0 auto 24px' }}>
          <span className="eyebrow">How it works</span>
          <h2 className="h-display h2" style={{ marginTop: 8 }}>Four steps from spec to settlement</h2>
        </div>
        <div className="feature-grid">
          <div className="feature">
            <div className="feature-ico"><Ico.briefcase /></div>
            <h4>1 · Define milestones</h4>
            <p>Upload your spec — Justra extracts checkpoints, scope, and acceptance criteria. Edit, then invite a developer.</p>
          </div>
          <div className="feature">
            <div className="feature-ico"><Ico.lock /></div>
            <h4>2 · Lock funds in escrow</h4>
            <p>Each milestone gets its own on-chain PDA. Pay with SOL or card — funds are frozen until you sign off.</p>
          </div>
          <div className="feature">
            <div className="feature-ico"><Ico.sparkle /></div>
            <h4>3 · AI-graded delivery</h4>
            <p>Developers ship to GitHub. Five LLM judges score the code against the spec — you see the verdict before releasing.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
