import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
  onCreate?: () => void;
}

function deriveActive(pathname: string): string {
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/settings")) return "settings";
  if (pathname.startsWith("/dashboard")) return "dashboard";
  return "dashboard";
}

export function AppShell({ children, onCreate }: AppShellProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const active = deriveActive(location.pathname);

  const handleNav = (id: string) => {
    if (id === "dashboard") navigate("/dashboard");
    else if (id === "projects" || id === "milestones") navigate("/projects");
    else if (id === "settings") navigate("/settings");
  };

  const sidebarUser = {
    name: user?.name ?? "Wallet",
    short: user?.short ?? "",
    initial: user?.initial ?? "A",
    address: user?.address,
  };

  return (
    <div className="app">
      <Sidebar
        active={active}
        onNav={handleNav}
        role={(user?.role as "consumer" | "provider") ?? "consumer"}
        user={sidebarUser}
      />
      <div className="main">
        <Topbar onCreate={onCreate} />
        {children}
      </div>
    </div>
  );
}
