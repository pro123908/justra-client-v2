const BASE_URL = "http://localhost:3000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = init?.body instanceof FormData;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: isFormData
      ? { ...init?.headers }
      : { "Content-Type": "application/json", ...init?.headers },
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
  owner?: ApiUser;
  members?: ApiUser[];
};

export type InviteStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED";

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

  /** Cancel (delete) a pending invite. Only callable by the project owner (consumer). */
  cancel: (token: string, inviteId: string) =>
    apiFetch<void>(`/invite/${inviteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export enum MilestoneStatus {
  PENDING_PROVIDER_APPROVAL = "pending_provider_approval",
  REJECTED = "rejected",
  WAITING_FOR_DEPOSIT = "waiting_for_deposit",
  ACTIVE = "active",
  IN_PROGRESS = "in_progress",
}

export type MilestoneResponse = {
  id: string;
  project: ProjectResponse;
  provider: ApiUser;
  title: string;
  description: string;
  amount: string;
  startDate: string | null;
  endDate: string | null;
  status: MilestoneStatus;
  rejectionReason: string | null;
  pda: string | null;
  depositDeadline: string | null;
  fundedAt: string | null;
  createdAt: string;
  updatedAt: string;
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

  /** Remove a member from a project. Only callable by the project owner (consumer). */
  removeMember: (token: string, projectId: string, userId: string) =>
    apiFetch<void>(`/project/${projectId}/members/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export type CreateMilestoneInput = {
  providerId: string;
  title: string;
  description: string;
  amount: string;
  startDate?: string;
  endDate?: string;
  files?: File[];
};

export type MilestoneFileResponse = {
  id: string;
  fileName: string;
  text: string;
  specCid: string;
  createdAt: string;
  updatedAt: string;
};

export const milestoneApi = {
  create: (token: string, projectId: string, input: CreateMilestoneInput) => {
    const form = new FormData();
    form.append("providerId", input.providerId);
    form.append("title", input.title);
    form.append("description", input.description);
    form.append("amount", input.amount);
    if (input.startDate) form.append("startDate", input.startDate);
    if (input.endDate) form.append("endDate", input.endDate);
    (input.files ?? []).forEach((f) => form.append("files", f));
    return apiFetch<MilestoneResponse>(`/milestone/project/${projectId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
  },

  listForProject: (token: string, projectId: string) =>
    apiFetch<MilestoneResponse[]>(`/milestone/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  listForProvider: (token: string) =>
    apiFetch<MilestoneResponse[]>("/milestone/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  get: (token: string, id: string) =>
    apiFetch<MilestoneResponse>(`/milestone/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  accept: (token: string, id: string) =>
    apiFetch<MilestoneResponse>(`/milestone/${id}/accept`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }),

  reject: (token: string, id: string, rejectionReason?: string) =>
    apiFetch<MilestoneResponse>(`/milestone/${id}/reject`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ rejectionReason }),
    }),

  fund: (token: string, id: string) =>
    apiFetch<MilestoneResponse>(`/milestone/${id}/fund`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getPinataGatewayUrl: (token: string) =>
    apiFetch<{ url: string }>("/milestone/pinata-gateway-url", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getFiles: (token: string, milestoneId: string) =>
    apiFetch<MilestoneFileResponse[]>(`/milestone/${milestoneId}/files`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
