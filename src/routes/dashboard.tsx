import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { StatusPill } from "@/components/app/StatusPill";
import { Ico } from "@/components/app/Icons";
import { useAuth } from "@/lib/auth";
import { useAppData, type Project } from "@/lib/app-data";
import { githubApi } from "@/lib/api";
import { CreateProjectModal } from "@/components/app/CreateProjectModal";
import { buildGithubAppInstallUrl } from "@/routes/github";

export default function DashboardPage() {
  const { user, token, isInitializing } = useAuth();
  const navigate = useNavigate();
  const { projectsOwnedBy, projectsForProvider, invitesForProvider, acceptInvite } =
    useAppData();

  const [createOpen, setCreateOpen] = useState(false);
  const [hasInstallation, setHasInstallation] = useState<boolean | null>(null);
  const [installationId, setInstallationId] = useState<string | null>(null);

  useEffect(() => {
    if (isInitializing) return;
    if (!user) navigate("/auth");
    else if (!user.role) navigate("/role");
    else if (user.role === "provider" && !user.githubUsername) navigate("/github");
  }, [isInitializing, user, navigate]);

  useEffect(() => {
    if (!token || !user?.githubUsername) return;
    githubApi
      .checkInstallation(token)
      .then((res) => {
        setHasInstallation(res.hasInstallation);
        setInstallationId(
          (res as { hasInstallation: boolean; installationId?: string }).installationId ?? null,
        );
      })
      .catch(() => {
        /* ignore */
      });
  }, [token, user?.githubUsername]);

  if (!user || !user.role) return null;
  if (user.role === "provider" && !user.githubUsername) return null;

  if (user.role === "provider") {
    return (
      <ProviderDashboard
        projects={projectsForProvider(user.address)}
        invites={invitesForProvider(user.address)}
        onAccept={(inviteId) => acceptInvite(inviteId)}
      />
    );
  }

  // Consumer
  const projects = projectsOwnedBy(user.id);

  return (
    <AppShell onCreate={() => setCreateOpen(true)}>
      <div className="page">
        <PageHead
          title={`Welcome back, ${user.short}`}
          subtitle={`${projects.length} project${projects.length === 1 ? "" : "s"} under escrow management.`}
          actions={
            <button className="btn btn-primary" onClick={() => setCreateOpen(true)}>
              <Ico.plus /> New project
            </button>
          }
        />

        {/* Stat grid — 4 cards */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-ico stat-card-ico--brand">
                <Ico.folder width={17} height={17} />
              </div>
            </div>
            <div className="stat-label">Active projects</div>
            <div className="stat-val">{projects.length}</div>
            <div className="stat-sub">
              <Ico.trend width={12} height={12} /> All time
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-ico stat-card-ico--info">
                <Ico.lock width={17} height={17} />
              </div>
            </div>
            <div className="stat-label">Total locked</div>
            <div className="stat-val">◎ 0</div>
            <div className="stat-sub">Across all milestones</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-ico stat-card-ico--ok">
                <Ico.sparkle width={17} height={17} />
              </div>
            </div>
            <div className="stat-label">Released</div>
            <div className="stat-val">◎ 0</div>
            <div className="stat-sub">To providers</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-ico stat-card-ico--warn">
                <Ico.trend width={17} height={17} />
              </div>
            </div>
            <div className="stat-label">On-time rate</div>
            <div className="stat-val">—</div>
            <div className="stat-sub">No data yet</div>
          </div>
        </div>

        {/* GitHub banner — keep existing githubApi.checkInstallation logic */}
        {(!user.githubUsername || (user.githubUsername && hasInstallation === false)) && (
          <div className="alert tip" style={{ marginBottom: 24 }}>
            <Ico.github className="icon" />
            <div className="grow">
              <div className="title">
                {!user.githubUsername
                  ? "Connect GitHub to verify deliverables"
                  : "Install the GitHub App"}
              </div>
              <div className="body">
                {!user.githubUsername
                  ? "Link your GitHub account so providers can submit repos and verify deliverables."
                  : "Grant repository access so providers can submit and verify code deliverables."}
              </div>
            </div>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                window.location.href = buildGithubAppInstallUrl();
              }}
            >
              {!user.githubUsername ? "Connect GitHub" : "Install GitHub App"}
            </button>
          </div>
        )}

        {/* Projects section */}
        <div className="row-between" style={{ marginBottom: 12 }}>
          <h2 className="h-display h3" style={{ margin: 0 }}>
            Recent projects
          </h2>
          <button className="btn btn-sm" onClick={() => navigate("/projects")}>
            View all <Ico.arrowR />
          </button>
        </div>

        {projects.length === 0 ? (
          <div
            className="card card-pad"
            style={{ textAlign: "center", padding: "48px 24px", color: "var(--ink-4)" }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>No projects yet</div>
            <div style={{ fontSize: 13, marginBottom: 20 }}>
              Spin up your first project to begin defining milestones and inviting developers.
            </div>
            <button className="btn btn-primary" onClick={() => setCreateOpen(true)}>
              <Ico.plus /> Create your first project
            </button>
          </div>
        ) : (
          <div className="proj-grid">
            {projects.slice(0, 3).map((p) => (
              <button
                key={p.id}
                className="proj-card"
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                <div>
                  <div className="muted-2 mono" style={{ fontSize: 11, marginBottom: 4 }}>
                    #{p.id}
                  </div>
                  <div className="h-display" style={{ fontWeight: 700, fontSize: 16 }}>
                    {p.name}
                  </div>
                  <div className="muted" style={{ fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>
                    {p.description}
                  </div>
                </div>
                <div className="row-between" style={{ marginTop: 16 }}>
                  <span className="muted-2" style={{ fontSize: 12 }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                  <Ico.arrowR className="muted-2" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(projectId) => {
          setCreateOpen(false);
          navigate(`/projects/${projectId}`);
        }}
      />
    </AppShell>
  );
}

function ProviderDashboard({
  projects,
  invites,
  onAccept,
}: {
  projects: Project[];
  invites: Array<{
    project: Project;
    invite: { id: string; address: string; short: string; invitedAt: string };
  }>;
  onAccept: (inviteId: string) => void;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <AppShell>
      <div className="page">
        <PageHead
          title="My work"
          subtitle={`${projects.length} active project${projects.length === 1 ? "" : "s"} delivering under escrow.`}
        />

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-ico stat-card-ico--brand">
                <Ico.briefcase width={17} height={17} />
              </div>
            </div>
            <div className="stat-label">Active engagements</div>
            <div className="stat-val">{projects.length}</div>
            <div className="stat-sub">Current</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-ico stat-card-ico--warn">
                <Ico.bell width={17} height={17} />
              </div>
            </div>
            <div className="stat-label">Pending invites</div>
            <div className="stat-val">{invites.length}</div>
            <div className="stat-sub">Awaiting response</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-ico stat-card-ico--ok">
                <Ico.sparkle width={17} height={17} />
              </div>
            </div>
            <div className="stat-label">Earned</div>
            <div className="stat-val">◎ 0</div>
            <div className="stat-sub">Lifetime</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-ico stat-card-ico--info">
                <Ico.trend width={17} height={17} />
              </div>
            </div>
            <div className="stat-label">Completion rate</div>
            <div className="stat-val">—</div>
            <div className="stat-sub">No data yet</div>
          </div>
        </div>

        {/* Active projects */}
        <div className="row-between" style={{ marginBottom: 12 }}>
          <h2 className="h-display h3" style={{ margin: 0 }}>
            Active engagements
          </h2>
        </div>
        {projects.length === 0 ? (
          <div
            className="card card-pad"
            style={{ textAlign: "center", padding: "48px 24px", color: "var(--ink-4)" }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>No active projects</div>
            <div style={{ fontSize: 13 }}>
              Once a consumer adds you and you accept their invite, projects will appear here.
            </div>
          </div>
        ) : (
          <div className="proj-grid" style={{ marginBottom: 32 }}>
            {projects.map((p) => (
              <button
                key={p.id}
                className="proj-card"
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                <div>
                  <div className="muted-2 mono" style={{ fontSize: 11, marginBottom: 4 }}>
                    #{p.id}
                  </div>
                  <div className="h-display" style={{ fontWeight: 700, fontSize: 16 }}>
                    {p.name}
                  </div>
                  <div className="muted" style={{ fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>
                    {p.description}
                  </div>
                </div>
                <div className="row-between" style={{ marginTop: 16 }}>
                  <span className="muted-2" style={{ fontSize: 12 }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                  <Ico.arrowR className="muted-2" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Pending invites */}
        <div className="row-between" style={{ marginBottom: 12, marginTop: 24 }}>
          <h2 className="h-display h3" style={{ margin: 0 }}>
            Pending invites
          </h2>
        </div>
        {invites.length === 0 ? (
          <div
            className="card card-pad"
            style={{ textAlign: "center", padding: "48px 24px", color: "var(--ink-4)" }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>No pending invites</div>
            <div style={{ fontSize: 13 }}>
              You'll be notified here when a consumer invites you to a project.
            </div>
          </div>
        ) : (
          <div className="invite-list">
            {invites.map(({ project, invite }) => (
              <div key={invite.id} className="invite-row">
                <div className="av av-lg">{project.name[0].toUpperCase()}</div>
                <div className="meta">
                  <div className="name">{project.name}</div>
                  <div className="sub">
                    Invited {new Date(invite.invitedAt).toLocaleDateString()} · {invite.short}
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => onAccept(invite.id)}>
                  Accept
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
