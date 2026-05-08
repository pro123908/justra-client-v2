import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Ico } from '@/components/app/Icons';

export default function RolePage() {
  const { setRole, user } = useAuth();
  const navigate = useNavigate();

  const shortKey = (key: string) => key ? `${key.slice(0, 4)}…${key.slice(-4)}` : '';

  const handleRole = async (role: 'consumer' | 'provider') => {
    await setRole(role);
    if (role === 'provider') {
      navigate('/github');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="public-shell">
      <nav className="public-nav">
        <div className="row gap-12">
          <div className="sb-brand-mark">J</div>
          <div className="h-display" style={{ fontSize: 18 }}>Justra</div>
        </div>
        <div className="actions">
          {user?.address && (
            <span className="pill">
              <span className="dot" style={{ background: '#22c55e' }} />
              Wallet connected · {shortKey(user.address)}
            </span>
          )}
        </div>
      </nav>
      <div className="center-shell" style={{ alignItems: 'flex-start', paddingTop: 64 }}>
        <div style={{ width: 'min(880px, 100%)' }}>
          <span className="auth-step">Step 2 of 2 · Choose role</span>
          <h2 className="h-display" style={{ fontSize: 28, marginTop: 14, marginBottom: 8 }}>How will you use Justra?</h2>
          <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 580 }}>
            You can switch between workspaces any time — but each wallet starts with a primary role
            so we know which tools to surface first.
          </p>

          <div className="role-grid">
            <button className="role-card" onClick={() => handleRole('consumer')}>
              <div className="role-card-ico"><Ico.briefcase /></div>
              <div>
                <div className="muted-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Client · Project owner</div>
                <h3>I'm hiring developers</h3>
              </div>
              <p>Define scope, fund milestones, and approve deliveries. You hold the spec and the budget.</p>
              <ul className="role-bullets">
                <li><Ico.check />Create projects and break them into payable milestones</li>
                <li><Ico.check />Lock funds in escrow per milestone — release on approval</li>
                <li><Ico.check />Inspect AI code reviews before signing off</li>
              </ul>
              <div className="role-card-cta"><span>Continue as client</span><Ico.arrowR /></div>
            </button>

            <button className="role-card" onClick={() => handleRole('provider')}>
              <div className="role-card-ico"><Ico.user /></div>
              <div>
                <div className="muted-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Developer · Provider</div>
                <h3>I'm shipping code</h3>
              </div>
              <p>Accept milestones, deliver to GitHub, and get paid the moment your work is approved.</p>
              <ul className="role-bullets">
                <li><Ico.check />Submit code per milestone — AI-reviewed automatically</li>
                <li><Ico.check />Trigger on-chain release of locked SOL on approval</li>
                <li><Ico.check />Build a verifiable on-chain delivery history</li>
              </ul>
              <div className="role-card-cta"><span>Continue as developer</span><Ico.arrowR /></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
