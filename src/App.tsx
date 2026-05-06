import { Buffer } from "buffer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { AppDataProvider } from "@/lib/app-data";
import IndexPage from "@/routes/index";
import AuthPage from "@/routes/auth";
import RolePage from "@/routes/role";
import DashboardPage from "@/routes/dashboard";
import GithubPage from "@/routes/github";
import GithubCallbackPage from "@/routes/github-callback";
import ProjectDetailPage from "@/routes/projects.$projectId";
import MilestoneDetailPage from "@/routes/projects.$projectId_.milestones.$milestoneId";

if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

export default function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/role" element={<RolePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/github" element={<GithubPage />} />
            <Route path="/github-callback" element={<GithubCallbackPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route
              path="/projects/:projectId/milestones/:milestoneId"
              element={<MilestoneDetailPage />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppDataProvider>
    </AuthProvider>
  );
}
