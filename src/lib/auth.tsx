import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { authApi, authMeApi, userApi, githubApi } from "./api";

const JWT_KEY = "jwt";

export type UserRole = "provider" | "consumer";

export type User = {
  id: string;
  publicKey: string;
  role: UserRole | null;
  githubId: string | null;
  githubUsername: string | null;
  githubAvatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthUser = {
  id: string;
  address: string;
  short: string;
  initial: string;
  name: string;
  role: UserRole | null;
  githubUsername: string | null;
  githubAvatarUrl: string | null;
};

type PhantomProvider = {
  isPhantom?: boolean;
  connect: (opts?: {
    onlyIfTrusted?: boolean;
  }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array, encoding: "utf8") => Promise<{ signature: Uint8Array }>;
};

function getPhantom(): PhantomProvider | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    solana?: PhantomProvider;
    phantom?: { solana?: PhantomProvider };
  };
  const provider = w.phantom?.solana ?? w.solana;
  if (provider?.isPhantom) return provider;
  return null;
}

function uint8ArrayToBase58(bytes: Uint8Array): string {
  const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let result = "";
  let num = BigInt(0);
  for (const byte of bytes) {
    num = num * BigInt(256) + BigInt(byte);
  }
  while (num > BigInt(0)) {
    result = ALPHABET[Number(num % BigInt(58))] + result;
    num = num / BigInt(58);
  }
  for (const byte of bytes) {
    if (byte === 0) result = "1" + result;
    else break;
  }
  return result;
}

function shorten(addr: string) {
  if (addr.length <= 10) return addr;
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

type AuthCtx = {
  user: AuthUser | null;
  token: string | null;
  isInitializing: boolean;
  connectPhantom: () => Promise<AuthUser>;
  setRole: (role: UserRole) => Promise<void>;
  connectGithub: (code: string) => Promise<void>;
  disconnectGithub: () => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(JWT_KEY);
    if (!stored) {
      setIsInitializing(false);
      return;
    }
    authMeApi
      .getMe(stored)
      .then((serverUser) => {
        setToken(stored);
        const short = shorten(serverUser.publicKey);
        setUser({
          id: serverUser.id,
          address: serverUser.publicKey,
          short,
          initial: serverUser.publicKey.charAt(0).toUpperCase(),
          name: short,
          role: serverUser.role,
          githubUsername: serverUser.githubUsername ?? null,
          githubAvatarUrl: serverUser.githubAvatarUrl ?? null,
        });
      })
      .catch((err: unknown) => {
        const status = (err as { status?: number })?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem(JWT_KEY);
        }
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }, []);

  const connectPhantom = async (): Promise<AuthUser> => {
    const phantom = getPhantom();
    if (!phantom) {
      if (typeof window !== "undefined") {
        window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
      }
      throw new Error("Phantom wallet not detected. Please install Phantom and retry.");
    }

    const { publicKey: publicKeyObj } = await phantom.connect();
    const address = publicKeyObj.toString();

    const { message, nonce } = await authApi.getMessage();

    const encoded = new TextEncoder().encode(message);
    const { signature: signatureBytes } = await phantom.signMessage(encoded, "utf8");
    const signature = uint8ArrayToBase58(signatureBytes);

    const { token: jwt, user: serverUser } = await authApi.authenticate({
      publicKey: address,
      signature,
      nonce,
    });

    setToken(jwt);
    localStorage.setItem(JWT_KEY, jwt);

    const short = shorten(address);
    const u: AuthUser = {
      id: serverUser.id,
      address,
      short,
      initial: address.charAt(0).toUpperCase(),
      name: short,
      role: serverUser.role,
      githubUsername: serverUser.githubUsername ?? null,
      githubAvatarUrl: serverUser.githubAvatarUrl ?? null,
    };
    setUser(u);
    return u;
  };

  const setRole = async (role: UserRole) => {
    if (!token) throw new Error("Not authenticated");
    await userApi.setRole(token, role);
    setUser((u) => (u ? { ...u, role } : u));
  };

  const connectGithub = async (code: string) => {
    if (!token) throw new Error("Not authenticated");
    const updated = await githubApi.connect(token, code);
    setUser((u) =>
      u
        ? {
            ...u,
            githubUsername: updated.githubUsername ?? null,
            githubAvatarUrl: updated.githubAvatarUrl ?? null,
          }
        : u,
    );
  };

  const disconnectGithub = async () => {
    if (!token) throw new Error("Not authenticated");
    await githubApi.disconnect(token);
    setUser((u) => (u ? { ...u, githubUsername: null, githubAvatarUrl: null } : u));
  };

  const logout = async () => {
    const phantom = getPhantom();
    try {
      await phantom?.disconnect();
    } catch {
      /* ignore */
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem(JWT_KEY);
  };

  return (
    <Ctx.Provider
      value={{
        user,
        token,
        isInitializing,
        connectPhantom,
        setRole,
        connectGithub,
        disconnectGithub,
        logout,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
