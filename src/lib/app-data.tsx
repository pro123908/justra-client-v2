import { createContext, useContext, useState, type ReactNode } from "react";

export type MilestoneStatus = "pending" | "approved" | "rejected";

export type Milestone = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  amount: string;
  fileCount: number;
  status: MilestoneStatus;
  rejectionNote?: string;
};

export type ProviderMember = {
  /** wallet address (full) */
  address: string;
  /** display short, e.g. 7xKX…d3Qa */
  short: string;
  /** optional handle/name */
  name?: string;
  addedAt: string;
};

export type ProjectInvite = {
  /** invited provider wallet (full) */
  address: string;
  /** display short */
  short: string;
  invitedAt: string;
};

export type Project = {
  id: string;
  name: string;
  fileCount: number;
  fileNames: string[];
  createdAt: string;
  /** consumer wallet that owns this project */
  ownerAddress: string;
  /** providers with access */
  providers: ProviderMember[];
  /** outstanding invites awaiting acceptance */
  invites: ProjectInvite[];
  milestones: Milestone[];
};

type DataCtx = {
  projects: Project[];
  createProject: (input: {
    name: string;
    fileNames: string[];
    ownerAddress: string;
  }) => Project;
  getProject: (id: string) => Project | undefined;
  addMilestone: (projectId: string, m: Omit<Milestone, "id" | "status">) => Milestone;
  setMilestoneStatus: (
    projectId: string,
    milestoneId: string,
    status: MilestoneStatus,
    note?: string,
  ) => void;
  inviteProvider: (projectId: string, address: string, name?: string) => ProjectInvite;
  removeProvider: (projectId: string, address: string) => void;
  cancelInvite: (projectId: string, address: string) => void;
  acceptInvite: (projectId: string, address: string, name?: string) => void;
  /** projects owned by the consumer */
  projectsOwnedBy: (address: string) => Project[];
  /** projects where address is an active provider */
  projectsForProvider: (address: string) => Project[];
  /** outstanding invites for a provider address */
  invitesForProvider: (address: string) => Array<{ project: Project; invite: ProjectInvite }>;
};

const Ctx = createContext<DataCtx | null>(null);

const slug = () =>
  Math.random().toString(36).slice(2, 8).toUpperCase();

const shortenAddr = (addr: string) =>
  addr.length <= 10 ? addr : `${addr.slice(0, 4)}…${addr.slice(-4)}`;

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  const createProject: DataCtx["createProject"] = ({ name, fileNames, ownerAddress }) => {
    const p: Project = {
      id: "PRJ-" + slug(),
      name,
      fileCount: fileNames.length,
      fileNames,
      createdAt: new Date().toISOString(),
      ownerAddress,
      providers: [],
      invites: [],
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

  const setMilestoneStatus: DataCtx["setMilestoneStatus"] = (projectId, milestoneId, status, note) => {
    setProjects((curr) =>
      curr.map((p) =>
        p.id !== projectId
          ? p
          : {
              ...p,
              milestones: p.milestones.map((m) =>
                m.id === milestoneId
                  ? { ...m, status, rejectionNote: status === "rejected" ? note : undefined }
                  : m,
              ),
            },
      ),
    );
  };

  const inviteProvider: DataCtx["inviteProvider"] = (projectId, address, _name) => {
    const invite: ProjectInvite = {
      address,
      short: shortenAddr(address),
      invitedAt: new Date().toISOString(),
    };
    setProjects((curr) =>
      curr.map((p) => {
        if (p.id !== projectId) return p;
        // skip if already provider or already invited
        if (p.providers.some((pr) => pr.address === address)) return p;
        if (p.invites.some((iv) => iv.address === address)) return p;
        return { ...p, invites: [...p.invites, invite] };
      }),
    );
    return invite;
  };

  const removeProvider: DataCtx["removeProvider"] = (projectId, address) => {
    setProjects((curr) =>
      curr.map((p) =>
        p.id === projectId
          ? { ...p, providers: p.providers.filter((pr) => pr.address !== address) }
          : p,
      ),
    );
  };

  const cancelInvite: DataCtx["cancelInvite"] = (projectId, address) => {
    setProjects((curr) =>
      curr.map((p) =>
        p.id === projectId
          ? { ...p, invites: p.invites.filter((iv) => iv.address !== address) }
          : p,
      ),
    );
  };

  const acceptInvite: DataCtx["acceptInvite"] = (projectId, address, name) => {
    setProjects((curr) =>
      curr.map((p) => {
        if (p.id !== projectId) return p;
        if (!p.invites.some((iv) => iv.address === address)) return p;
        if (p.providers.some((pr) => pr.address === address)) {
          return { ...p, invites: p.invites.filter((iv) => iv.address !== address) };
        }
        return {
          ...p,
          invites: p.invites.filter((iv) => iv.address !== address),
          providers: [
            ...p.providers,
            { address, short: shortenAddr(address), name, addedAt: new Date().toISOString() },
          ],
        };
      }),
    );
  };

  const projectsOwnedBy: DataCtx["projectsOwnedBy"] = (address) =>
    projects.filter((p) => p.ownerAddress === address);

  const projectsForProvider: DataCtx["projectsForProvider"] = (address) =>
    projects.filter((p) => p.providers.some((pr) => pr.address === address));

  const invitesForProvider: DataCtx["invitesForProvider"] = (address) =>
    projects
      .map((project) => {
        const invite = project.invites.find((iv) => iv.address === address);
        return invite ? { project, invite } : null;
      })
      .filter((x): x is { project: Project; invite: ProjectInvite } => x !== null);

  return (
    <Ctx.Provider
      value={{
        projects,
        createProject,
        getProject,
        addMilestone,
        setMilestoneStatus,
        inviteProvider,
        removeProvider,
        cancelInvite,
        acceptInvite,
        projectsOwnedBy,
        projectsForProvider,
        invitesForProvider,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAppData() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppData must be used inside AppDataProvider");
  return v;
}