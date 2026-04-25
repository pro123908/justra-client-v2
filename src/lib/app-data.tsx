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
  id: string;
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
  removeProvider: (projectId: string, address: string) => Promise<void>;
  cancelInvite: (projectId: string, address: string) => Promise<void>;
  acceptInvite: (inviteId: string) => Promise<void>;
  /** projects owned by the consumer */
  projectsOwnedBy: (address: string) => Project[];
  /** projects where the current user is an active provider */
  projectsForProvider: (address: string) => Project[];
  /** pending invites for the current provider */
  invitesForProvider: (address: string) => Array<{ project: Project; invite: ProjectInvite }>;
};

const Ctx = createContext<DataCtx | null>(null);

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
    ownerId: r.owner!.id,
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
          console.log("🚀 ~ AppDataProvider ~ members:", members);
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

  // TODO: needs API — POST /project/:id/milestone
  const addMilestone: DataCtx["addMilestone"] = (_projectId, _m) => {
    throw new Error("addMilestone: API not implemented. Please create POST /project/:id/milestone");
  };

  // TODO: needs API — PATCH /project/:id/milestone/:milestoneId
  const setMilestoneStatus: DataCtx["setMilestoneStatus"] = (
    _projectId,
    _milestoneId,
    _status,
    _note,
  ) => {
    throw new Error(
      "setMilestoneStatus: API not implemented. Please create PATCH /project/:id/milestone/:milestoneId",
    );
  };

  const inviteProvider: DataCtx["inviteProvider"] = async (projectId, address, _name) => {
    const [sent] = await inviteApi.send(token!, { projectId, publicKeys: [address] });
    const invite: ProjectInvite = {
      id: sent.id,
      address,
      short: shortenAddr(address),
      invitedAt: sent.createdAt,
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

  const removeProvider: DataCtx["removeProvider"] = async (projectId, address) => {
    const project = projects.find((p) => p.id === projectId);
    const member = project?.providers.find((pr) => pr.address === address);
    if (!member) return;
    await projectApi.removeMember(token!, projectId, member.id);
    setProjects((curr) =>
      curr.map((p) =>
        p.id === projectId
          ? { ...p, providers: p.providers.filter((pr) => pr.address !== address) }
          : p,
      ),
    );
  };

  const cancelInvite: DataCtx["cancelInvite"] = async (projectId, address) => {
    const project = projects.find((p) => p.id === projectId);
    const invite = project?.invites.find((iv) => iv.address === address);
    if (!invite) return;
    await inviteApi.cancel(token!, invite.id);
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

  // GET /project already returns only projects owned by the authenticated consumer
  const projectsOwnedBy: DataCtx["projectsOwnedBy"] = (_id) => projects;

  const projectsForProvider: DataCtx["projectsForProvider"] = (_address) => memberProjects;

  // GET /invite/me already returns only pending invites for the authenticated provider
  const invitesForProvider: DataCtx["invitesForProvider"] = (_address) =>
    myInvites.map((inv) => ({
      project: mapProject(inv.project),
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
