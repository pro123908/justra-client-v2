import { createContext, useContext, useState, type ReactNode } from "react";

export type AuthUser = {
  name: string;
  email: string;
  initial: string;
};

type AuthCtx = {
  user: AuthUser | null;
  loginWithGoogle: () => Promise<AuthUser>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const loginWithGoogle = async () => {
    // Mock OAuth latency
    await new Promise((r) => setTimeout(r, 700));
    const u: AuthUser = {
      name: "Alex Carter",
      email: "[email protected]",
      initial: "A",
    };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  return (
    <Ctx.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}