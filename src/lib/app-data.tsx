import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { projectApi, inviteApi, type ProjectResponse, type InviteResponse } from "./api";
import { useAuth } from "./auth";

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
  /** user id (UUID) */
  id: string;
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
  description: string;
  fileCount: number;
  fileNames: string[];
  createdAt: string;
  /** UUID of the user who owns this project */
  ownerId: string;
  /** providers with access */
  providers: ProviderMember[];
  /** outstanding invites awaiting acceptance */
  invites: ProjectInvite[];
  milestones: Milestone[];
};

type DataCtx = {
  projects: Project[];
  projectsLoading: boolean;
  createProject: (input: { name: string; description: string }) => Promise<Project>;
  updateProject: (id: string, input: { name?: string; description?: string }) => Promise<Project>;
  getProject: (id: string) => Project | undefined;
  fetchProject: (id: string) => Promise<Project>;
  addMilestone: (projectId: string, m: Omit<Milestone, "id" | "status">) => Milestone;
  setMilestoneStatus: (
    projectId: string,
    milestoneId: string,
    status: MilestoneStatus,
    note?: string,
  ) => void;
  inviteProvider: (projectId: string, address: string, name?: string) => Promise<ProjectInvite>;
  removeProvider: (projectId: string, address: string) => void;
  cancelInvite: (projectId: string, address: string) => void;
  acceptInvite: (inviteId: string) => Promise<void>;
  /** projects owned by the consumer */
  projectsOwnedBy: (address: string) => Project[];
  /** projects where the current user is an active provider */
  projectsForProvider: (address: string) => Project[];
  /** pending invites for the current provider */
  invitesForProvider: (
    address: string,
  ) => Array<{ project: Project; invite: ProjectInvite & { id: string } }>;
};

const Ctx = createContext<DataCtx | null>(null);

const slug = () => Math.random().toString(36).slice(2, 8).toUpperCase();

const shortenAddr = (addr: string) =>
  addr.length <= 10 ? addr : `${addr.slice(0, 4)}…${addr.slice(-4)}`;

function mapProject(r: ProjectResponse): Project {
  return {
    id: r.id,
    name: r.title,
    description: r.description ?? "",
    fileCount: 0,
    fileNames: [],
    createdAt: r.createdAt,
    ownerId: r.ownerId,
    providers: (r.members ?? []).map((m) => ({
      id: m.id,
      address: m.publicKey,
      short: shortenAddr(m.publicKey),
      addedAt: r.createdAt,
    })),
    invites: [],
    milestones: [],
  };
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [memberProjects, setMemberProjects] = useState<Project[]>([]);
  const [myInvites, setMyInvites] = useState<InviteResponse[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  useEffect(() => {
    if (!token || !user) return;
    setProjectsLoading(true);
    if (user.role === "provider") {
      Promise.all([projectApi.getMembers(token), inviteApi.getMyInvites(token)])
        .then(([members, invites]) => {
          setMemberProjects(members.map((r) => mapProject(r)));
          setMyInvites(invites);
        })
        .catch(() => {})
        .finally(() => setProjectsLoading(false));
    } else {
      projectApi
        .list(token)
        .then((list) => setProjects(list.map((r) => mapProject(r))))
        .catch(() => {})
        .finally(() => setProjectsLoading(false));
    }
  }, [token, user]);

  const createProject: DataCtx["createProject"] = async ({ name, description }) => {
    const r = await projectApi.create(token!, { title: name, description });
    const p = mapProject(r);
    setProjects((curr) => [p, ...curr]);
    return p;
  };

  const updateProject: DataCtx["updateProject"] = async (id, { name, description }) => {
    const r = await projectApi.update(token!, id, {
      ...(name !== undefined && { title: name }),
      ...(description !== undefined && { description }),
    });
    const updated = mapProject(r);
    setProjects((curr) =>
      curr.map((p) =>
        p.id === id ? { ...p, name: updated.name, description: updated.description } : p,
      ),
    );
    return updated;
  };

  const getProject = (id: string) =>
    projects.find((p) => p.id === id) ?? memberProjects.find((p) => p.id === id);

  const fetchProject: DataCtx["fetchProject"] = async (id) => {
    const r = await projectApi.get(token!, id);
    const p = mapProject(r);
    if (user?.role === "provider") {
      setMemberProjects((curr) => (curr.some((mp) => mp.id === id) ? curr : [p, ...curr]));
    } else {
      setProjects((curr) => (curr.some((cp) => cp.id === id) ? curr : [p, ...curr]));
    }
    return p;
  };

  const addMilestone: DataCtx["addMilestone"] = (projectId, m) => {
    const ms: Milestone = { ...m, id: "M-" + slug(), status: "pending" };
    setProjects((curr) =>
      curr.map((p) => (p.id === projectId ? { ...p, milestones: [...p.milestones, ms] } : p)),
    );
    return ms;
  };

  const setMilestoneStatus: DataCtx["setMilestoneStatus"] = (
    projectId,
    milestoneId,
    status,
    note,
  ) => {
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

  const inviteProvider: DataCtx["inviteProvider"] = async (projectId, address, _name) => {
    await inviteApi.send(token!, { projectId, publicKeys: [address] });
    const invite: ProjectInvite = {
      address,
      short: shortenAddr(address),
      invitedAt: new Date().toISOString(),
    };
    setProjects((curr) =>
      curr.map((p) => {
        if (p.id !== projectId) return p;
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

  const acceptInvite: DataCtx["acceptInvite"] = async (inviteId) => {
    await inviteApi.accept(token!, inviteId);
    setMyInvites((curr) =>
      curr.map((inv) => (inv.id === inviteId ? { ...inv, status: "accepted" } : inv)),
    );
    const accepted = myInvites.find((inv) => inv.id === inviteId);
    if (accepted) {
      const p = mapProject(accepted.project);
      setMemberProjects((curr) => (curr.some((mp) => mp.id === p.id) ? curr : [p, ...curr]));
    }
  };

  const projectsOwnedBy: DataCtx["projectsOwnedBy"] = (id) =>
    projects.filter((p) => p.ownerId === id);

  const projectsForProvider: DataCtx["projectsForProvider"] = (_address) => memberProjects;

  const invitesForProvider: DataCtx["invitesForProvider"] = (_address) =>
    myInvites
      .filter((inv) => inv.status.toLowerCase() === "pending")
      .map((inv) => ({
        project: mapProject(inv.project, inv.invitedBy.publicKey),
        invite: {
          id: inv.id,
          address: inv.for.publicKey,
          short: shortenAddr(inv.for.publicKey),
          invitedAt: inv.createdAt,
        },
      }));

  return (
    <Ctx.Provider
      value={{
        projects,
        projectsLoading,
        createProject,
        updateProject,
        getProject,
        fetchProject,
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
