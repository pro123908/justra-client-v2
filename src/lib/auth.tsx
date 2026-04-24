import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "provider" | "consumer";

export type AuthUser = {
  /** Full Solana wallet public key (base58) */
  address: string;
  /** Shortened display, e.g. 7xKX…d3Qa */
  short: string;
  /** First char of the address for the avatar */
  initial: string;
  /** Display name shown in navbar */
  name: string;
  /** Role chosen after wallet connect */
  role: UserRole | null;
};

type PhantomProvider = {
  isPhantom?: boolean;
  connect: (opts?: {
    onlyIfTrusted?: boolean;
  }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
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

type AuthCtx = {
  user: AuthUser | null;
  connectPhantom: () => Promise<AuthUser>;
  setRole: (role: UserRole) => void;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

function shorten(addr: string) {
  if (addr.length <= 10) return addr;
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const connectPhantom = async (): Promise<AuthUser> => {
    const provider = getPhantom();
    if (!provider) {
      if (typeof window !== "undefined") {
        window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
      }
      throw new Error("Phantom wallet not detected. Please install Phantom and retry.");
    }
    const res = await provider.connect();
    const address = res.publicKey.toString();
    const short = shorten(address);
    const u: AuthUser = {
      address,
      short,
      initial: address.charAt(0).toUpperCase(),
      name: short,
      role: null,
    };
    setUser(u);
    return u;
  };

  const setRole = (role: UserRole) => {
    setUser((u) => (u ? { ...u, role } : u));
  };

  const logout = async () => {
    const provider = getPhantom();
    try {
      await provider?.disconnect();
    } catch {
      /* ignore */
    }
    setUser(null);
  };

  return <Ctx.Provider value={{ user, connectPhantom, setRole, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
