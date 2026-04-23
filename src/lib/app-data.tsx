import { createContext, useContext, useState, type ReactNode } from "react";

export type MilestoneStatus = "pending" | "approved";

export type Milestone = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  amount: string;
  fileCount: number;
  status: MilestoneStatus;
};

export type Project = {
  id: string;
  name: string;
  fileCount: number;
  fileNames: string[];
  createdAt: string;
  milestones: Milestone[];
};

type DataCtx = {
  projects: Project[];
  createProject: (input: { name: string; fileNames: string[] }) => Project;
  getProject: (id: string) => Project | undefined;
  addMilestone: (projectId: string, m: Omit<Milestone, "id" | "status">) => Milestone;
};

const Ctx = createContext<DataCtx | null>(null);

const slug = () =>
  Math.random().toString(36).slice(2, 8).toUpperCase();

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  const createProject: DataCtx["createProject"] = ({ name, fileNames }) => {
    const p: Project = {
      id: "PRJ-" + slug(),
      name,
      fileCount: fileNames.length,
      fileNames,
      createdAt: new Date().toISOString(),
      milestones: [],
    };
    setProjects((curr) => [p, ...curr]);
    return p;
  };

  const getProject = (id: string) => projects.find((p) => p.id === id);

  const addMilestone: DataCtx["addMilestone"] = (projectId, m) => {
    const ms: Milestone = { ...m, id: "M-" + slug(), status: "pending" };
    setProjects((curr) =>
      curr.map((p) =>
        p.id === projectId ? { ...p, milestones: [...p.milestones, ms] } : p,
      ),
    );
    return ms;
  };

  return (
    <Ctx.Provider value={{ projects, createProject, getProject, addMilestone }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppData() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppData must be used inside AppDataProvider");
  return v;
}