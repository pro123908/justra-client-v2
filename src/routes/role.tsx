import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import Navbar from "@/components/app/Navbar";
import { useAuth, type UserRole } from "@/lib/auth";
import "@/components/git-escrow.css";

export const Route = createFileRoute("/role")({
  component: RolePage,
  head: () => ({
    meta: [
      { title: "Choose your role — Git Escrow" },
      { name: "description", content: "Select whether you join Git Escrow as a Provider or Consumer." },
    ],
  }),
});

function RolePage() {
  const { user, setRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
  }, [user, navigate]);

  if (!user) return null;

  const choose = (r: UserRole) => {
    setRole(r);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="git-escrow-root">
      <div className="wrap" style={{ paddingBottom: 24 }}>
        <Navbar />
      </div>
      <div className="role-shell">
        <div className="role-head">
          <div className="auth-eyebrow">Authenticate · Step 2 of 2</div>
          <h2>Select your role.</h2>
          <p className="role-sub">
            Wallet connected as <span className="role-wallet">{user.short}</span>.
            Choose how you'll participate in this escrow workspace. You can switch
            workspaces at any time.
          </p>
        </div>

        <div className="role-grid">
          <RoleCard
            tag="ROLE · 01"
            title="Provider"
            sub="Developer / Contributor"
            description="Submit code, deliver milestones, and receive payments held in escrow as each milestone is approved by the consumer."
            bullets={[
              "Push milestone-wise development code",
              "Trigger on-chain release upon approval",
              "Build verifiable delivery history",
            ]}
            cta="Continue as Provider"
            onClick={() => choose("provider")}
          />
          <RoleCard
            tag="ROLE · 02"
            title="Consumer"
            sub="Product Owner / Payer"
            description="Own the project, fund escrow milestones, and approve developer submissions. Funds release only when you sign off."
            bullets={[
              "Define scope and milestone amounts",
              "Lock funds in escrow per milestone",
              "Approve or dispute deliverables",
            ]}
            cta="Continue as Consumer"
            onClick={() => choose("consumer")}
          />
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  tag,
  title,
  sub,
  description,
  bullets,
  cta,
  onClick,
}: {
  tag: string;
  title: string;
  sub: string;
  description: string;
  bullets: string[];
  cta: string;
  onClick: () => void;
}) {
  return (
    <button className="role-card" onClick={onClick} type="button">
      <div className="role-card-tag">{tag}</div>
      <div className="role-card-title">
        <h3>{title}</h3>
        <span>{sub}</span>
      </div>
      <p className="role-card-desc">{description}</p>
      <ul className="role-card-list">
        {bullets.map((b) => (
          <li key={b}>
            <span className="rcl-mark">▸</span>
            {b}
          </li>
        ))}
      </ul>
      <div className="role-card-cta">
        <span>{cta}</span>
        <span className="arrow">→</span>
      </div>
    </button>
  );
}