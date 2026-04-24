const BASE_URL = "http://localhost:3000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export type AuthMessageResponse = {
  message: string;
  nonce: string;
};

export type AuthenticateResponse = {
  token: string;
  user: import("./auth").User;
};

export const authApi = {
  getMessage: () => apiFetch<AuthMessageResponse>("/auth/message"),

  authenticate: (body: { publicKey: string; signature: string; nonce: string }) =>
    apiFetch<AuthenticateResponse>("/auth/wallet", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

export const authMeApi = {
  getMe: (token: string) =>
    apiFetch<import("./auth").User>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const userApi = {
  setRole: (token: string, role: import("./auth").UserRole) =>
    apiFetch<import("./auth").User>("/user/role", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role }),
    }),
};

export type ProjectResponse = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner?: ApiUser;
  members?: ApiUser[];
};

export type InviteStatus = "pending" | "accepted" | "rejected" | "PENDING" | "ACCEPTED" | "REJECTED";

export type ApiUser = {
  id: string;
  publicKey: string;
  role: string | null;
  createdAt: string;
};

export type InviteResponse = {
  id: string;
  /** The user being invited */
  for: ApiUser;
  /** The user who sent the invite */
  invitedBy: ApiUser;
  project: ProjectResponse;
  status: InviteStatus;
  expiresAt: string;
  createdAt: string;
};

export const inviteApi = {
  /** Send invites to a project. Only callable by project owner or consumer. */
  send: (token: string, body: { projectId: string; publicKeys: string[] }) =>
    apiFetch<InviteResponse[]>("/invite", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    }),

  /** Get invites sent/received for the current user. */
  getMyInvites: (token: string) =>
    apiFetch<InviteResponse[]>("/invite/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  /** Get all invites for a project. Only callable by project owner or consumer. */
  getProjectInvites: (token: string, projectId: string) =>
    apiFetch<InviteResponse[]>(`/invite/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  /** Accept an invite by id. */
  accept: (token: string, id: string) =>
    apiFetch<InviteResponse>(`/invite/${id}/accept`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }),

  /** Reject an invite by id. */
  reject: (token: string, id: string) =>
    apiFetch<InviteResponse>(`/invite/${id}/reject`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const projectApi = {
  list: (token: string) =>
    apiFetch<ProjectResponse[]>("/project", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getMembers: (token: string) =>
    apiFetch<ProjectResponse[]>("/project/members", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  get: (token: string, id: string) =>
    apiFetch<ProjectResponse>(`/project/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  create: (token: string, body: { title: string; description?: string }) =>
    apiFetch<ProjectResponse>("/project", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    }),

  update: (token: string, id: string, body: { title?: string; description?: string }) =>
    apiFetch<ProjectResponse>(`/project/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    }),
};
