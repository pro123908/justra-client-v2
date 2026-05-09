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
    const err = Object.assign(new Error(text || `Request failed: ${res.status}`), {
      status: res.status,
    });
    throw err;
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

  resolveByAddress: (token: string, address: string) =>
    apiFetch<{ id: string }>(`/user/resolve?address=${encodeURIComponent(address)}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export type GithubRepo = {
  id: number;
  full_name: string;
  name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  updated_at: string;
  language: string | null;
  default_branch: string;
};

export const githubApi = {
  /** Exchange a GitHub App OAuth code for a linked GitHub account. */
  connect: (token: string, code: string) =>
    apiFetch<import("./auth").User>("/auth/github", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ code }),
    }),

  /** Unlink the GitHub account from the current user. */
  disconnect: (token: string) =>
    apiFetch<import("./auth").User>("/auth/github", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  /** Save a GitHub App installation ID (grants repo access). */
  saveInstallation: (token: string, installationId: string) =>
    apiFetch<{ installationId: string }>("/auth/github/installation", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ installationId }),
    }),

  /** List GitHub repos accessible via the stored installation. */
  listRepos: (token: string) =>
    apiFetch<GithubRepo[]>("/github/repos", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  /** Check whether a GitHub App installation is saved for the user. */
  checkInstallation: (token: string) =>
    apiFetch<{ hasInstallation: boolean }>("/github/installation", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export enum ProjectCreationStatus {
  PENDING = "PENDING",
  CREATION_SUCCESSFUL = "CREATION_SUCCESSFUL",
  CREATION_FAILED = "CREATION_FAILED",
}

export type ProjectResponse = {
  id: string;
  title: string;
  description: string | null;
  status: ProjectCreationStatus;
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

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ExtractedMilestone {
  title: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  amount: string | null;
}

export interface UploadDocResponse {
  docId: string;
  initialMessage: string;
  approved: boolean;
  milestones: ExtractedMilestone[];
}

export interface ChatDocResponse {
  reply: string;
  approved: boolean;
}

export enum MilestoneStatus {
  PENDING_PROVIDER_APPROVAL = "pending_provider_approval",
  REJECTED = "rejected",
  WAITING_FOR_DEPOSIT = "waiting_for_deposit",
  ACTIVE = "active",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  DISPUTED = "disputed",
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
  githubRepo: string | null;
  githubRepoUrl: string | null;
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

  create: (token: string, body: { title: string; description?: string; docId?: string }) =>
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

  completeSetup: (token: string, id: string) =>
    apiFetch<ProjectResponse>(`/project/${id}/complete-setup`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const projectDocApi = {
  upload: (token: string, file: File): Promise<UploadDocResponse> => {
    const form = new FormData();
    form.append("document", file);
    return apiFetch<UploadDocResponse>("/project/upload-doc", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
  },

  chat: (token: string, docId: string, messages: ChatMessage[]): Promise<ChatDocResponse> =>
    apiFetch<ChatDocResponse>("/project/chat", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ docId, messages }),
    }),
};

export type CreateMilestoneInput = {
  providerId?: string;
  title: string;
  description: string;
  amount: string;
  startDate?: string;
  endDate?: string;
};

export type AnalysisRequirement = {
  id: string;
  requirement: string;
  category: string;
};

export type ReviewResult = AnalysisRequirement & {
  status: "pass" | "partial" | "fail";
  confidence: number;
  reason: string;
  evidence: string;
  relevantFiles: string[];
};

export type AnalysisSummary = {
  overallScore: number;
  totalRequirements: number;
  passed: number;
  partial: number;
  failed: number;
  codeFilesAnalyzed: number;
  codeChunksIndexed: number;
  totalOpenAITokens: number;
};

export type AnalysisResult = {
  summary: AnalysisSummary;
  requirements: ReviewResult[];
};

export type MilestoneAnalysisRequirementResponse = {
  id: string;
  sortOrder: number;
  requirementId: string;
  requirement: string;
  category: string;
  status: "pass" | "partial" | "fail";
  confidence: number;
  reason: string;
  evidence: string;
  relevantFiles: string[];
  createdAt: string;
  updatedAt: string;
};

export type StoredAnalysisResult = {
  id: string;
  overallScore: number;
  totalRequirements: number;
  passed: number;
  partial: number;
  failed: number;
  codeFilesAnalyzed: number;
  codeChunksIndexed: number;
  totalOpenAITokens: number;
  requirements: MilestoneAnalysisRequirementResponse[];
  createdAt: string;
  updatedAt: string;
};

export const milestoneApi = {
  create: (token: string, projectId: string, input: CreateMilestoneInput) =>
    apiFetch<MilestoneResponse>(`/milestone/project/${projectId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }),

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

  complete: (token: string, id: string) =>
    apiFetch<MilestoneResponse>(`/milestone/${id}/complete`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }),

  dispute: (token: string, id: string) =>
    apiFetch<MilestoneResponse>(`/milestone/${id}/dispute`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }),

  submitRepo: (token: string, id: string, githubRepo: string) =>
    apiFetch<MilestoneResponse>(`/milestone/${id}/github-repo`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ githubRepo }),
    }),

  assignProvider: (token: string, id: string, providerId: string) =>
    apiFetch<MilestoneResponse>(`/milestone/${id}/provider`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ providerId }),
    }),

  getPinataGatewayUrl: (token: string) =>
    apiFetch<{ url: string }>("/milestone/pinata-gateway-url", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const analysisApi = {
  listForMilestone: (token: string, milestoneId: string) =>
    apiFetch<StoredAnalysisResult[]>(`/analyze/milestone/${milestoneId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  runWithGithub: (token: string, milestoneId: string, githubRepo: string) =>
    apiFetch<AnalysisResult>("/analyze", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ milestoneId, githubRepo }),
    }),

  runWithZip: (token: string, milestoneId: string, codebase: File) => {
    const form = new FormData();
    form.append("milestoneId", milestoneId);
    form.append("codebase", codebase);
    return apiFetch<AnalysisResult>("/analyze", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
  },
};
