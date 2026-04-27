import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import Navbar from "@/components/app/Navbar";
import "@/components/git-escrow.css";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Git Escrow — Verification Console" },
      {
        name: "description",
        content:
          "Git Escrow Verification Console — submit specification archive and deliverables for multi-model AI consensus scoring.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="git-escrow-root">
      <div className="wrap">
        <Navbar />
        <div className="hero">
          <div>
            <div className="eyebrow">Verification Console · v0.1</div>
            <h1>
              Trustless milestones.
              <br />
              On-chain escrow.
              <br />
              <em>AI-graded delivery.</em>
            </h1>
            <p className="lede">
              Git Escrow brokers software work between consumers and providers. Funds are locked in
              a Solana escrow PDA per milestone, and code is graded against the spec by an
              LLM-powered analysis engine the moment a provider ships. Open the dashboard to manage
              your projects, milestones, invites, and deliveries.
            </p>
            <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
              <Link to="/dashboard" className="btn btn-primary" style={{ textDecoration: "none" }}>
                Open dashboard →
              </Link>
              <Link to="/auth" className="btn" style={{ textDecoration: "none" }}>
                Connect wallet
              </Link>
            </div>
          </div>
          <aside className="hero-aside">
            <h4>&gt; Pipeline</h4>
            <ol>
              <li>
                <b>Create</b> project &amp; invite providers
              </li>
              <li>
                <b>Define</b> milestones, lock SOL in escrow
              </li>
              <li>
                <b>Deliver</b> code against the spec
              </li>
              <li>
                <b>Verify</b> &amp; release funds via consensus
              </li>
            </ol>
          </aside>
        </div>
      </div>
    </div>
  );
}
