import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { projectApi, inviteApi, type ProjectResponse, type InviteResponse } from "./api";
import { useAuth } from "./auth";

export type ProviderMember = {
  id: string;
  address: string;
  short: string;
  name?: string;
  addedAt: string;
};

export type ProjectInvite = {
  id: string;
  address: string;
  short: string;
  invitedAt: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  ownerId: string;
};

type DataCtx = {
  projects: Project[];
  memberProjects: Project[];
  myInvites: InviteResponse[];
  projectsLoading: boolean;
  createProject: (input: { name: string; description: string }) => Promise<Project>;
  updateProject: (id: string, input: { name?: string; description?: string }) => Promise<Project>;
  acceptInvite: (inviteId: string) => Promise<void>;
  projectsOwnedBy: (address: string) => Project[];
  projectsForProvider: (address: string) => Project[];
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
    createdAt: r.createdAt,
    ownerId: r.owner!.id,
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
          console.log("🚀 ~ AppDataProvider ~ invites:", invites);
          setMemberProjects(members.map(mapProject));
          setMyInvites(invites);
        })
        .catch(() => {})
        .finally(() => setProjectsLoading(false));
    } else {
      projectApi
        .list(token)
        .then((list) => setProjects(list.map(mapProject)))
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

  const projectsOwnedBy: DataCtx["projectsOwnedBy"] = (_id) => projects;
  const projectsForProvider: DataCtx["projectsForProvider"] = (_address) => memberProjects;

  const invitesForProvider: DataCtx["invitesForProvider"] = (_address) =>
    myInvites.filter((inv) => inv.status === "pending").map((inv) => ({
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
        memberProjects,
        myInvites,
        projectsLoading,
        createProject,
        updateProject,
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
