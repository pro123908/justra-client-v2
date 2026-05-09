import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useAppData, type Project } from "@/lib/app-data";
import { AppShell } from "@/components/app/AppShell";
import { PageHead } from "@/components/app/PageHead";
import { Ico } from "@/components/app/Icons";
import { CreateProjectModal } from "@/components/app/CreateProjectModal";

export default function ProjectsPage() {
  const { user } = useAuth();
  const { projectsOwnedBy, projectsForProvider } = useAppData();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"all" | "recent">("all");
  const [showCreate, setShowCreate] = useState(false);

  const role = user?.role ?? "consumer";
  const projects =
    role === "consumer"
      ? projectsOwnedBy(user?.id ?? "")
      : projectsForProvider(user?.address ?? "");

  return (
    <AppShell onCreate={role === "consumer" ? () => setShowCreate(true) : undefined}>
      <div className="page">
        <PageHead
          title="Projects"
          subtitle="Every engagement, past and present."
          actions={
            role === "consumer" ? (
              <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                <Ico.plus /> New project
              </button>
            ) : undefined
          }
        />

        <div className="tabs">
          {[
            { id: "all", label: "All", n: projects.length },
            { id: "recent", label: "Recent", n: Math.min(projects.length, 5) },
          ].map((t) => (
            <button
              key={t.id}
              className={`tab${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id as typeof tab)}
            >
              {t.label}
              <span className="count">{t.n}</span>
            </button>
          ))}
        </div>

        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Created</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="clickable" onClick={() => navigate(`/projects/${p.id}`)}>
                  <td>
                    <div style={{ fontWeight: 600, color: "var(--ink)" }}>{p.name}</div>
                    <div className="muted-2 mono" style={{ fontSize: 12, marginTop: 2 }}>
                      #{p.id}
                    </div>
                  </td>
                  <td>
                    <span className="muted-2" style={{ fontSize: 13 }}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <span className="muted" style={{ fontSize: 13 }}>
                      {p.description || "—"}
                    </span>
                  </td>
                  <td>
                    <Ico.arrowR className="muted-2" />
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", color: "var(--ink-4)", padding: "32px 0" }}
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {role === "consumer" && (
        <CreateProjectModal
          open={showCreate}
          onClose={() => setShowCreate(false)}
          onCreated={(projectId) => {
            setShowCreate(false);
            navigate(`/projects/${projectId}`);
          }}
        />
      )}
    </AppShell>
  );
}
