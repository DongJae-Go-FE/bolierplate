"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { customFetch } from "@/lib/network/custom-fetch";
import {
  loginAction,
  logoutAction,
} from "@/lib/serverActions/sever-actions";

export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a CommonProvider");
  }
  return context;
}

export default function CommonProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getClientToken = () => {
    if (typeof document === "undefined") return "";

    return (
      document.cookie
        ?.split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith("auth-token="))
        ?.split("=")[1] || ""
    );
  };

  const refreshUser = async () => {
    const token = getClientToken();

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await customFetch("/api/auth/me");
      const data = await res.json();

      if (data.success && data.data) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (id: string, password: string) => {
    const result = await loginAction({ id, pw: password });

    if (!result.success) {
      throw new Error(result.message || "로그인에 실패했습니다");
    }

    if (result.data?.user) {
      setUser(result.data.user);
    }

    if (result.data?.token) {
      const token = result.data.token;

      document.cookie = `auth-token=${token}; Path=/; SameSite=Lax; Max-Age=86400`;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("auth-token", token);
      }
    }
  };

  const logout = async () => {
    const result = await logoutAction();

    if (!result.success) {
      throw new Error(result.message || "로그아웃에 실패했습니다");
    }

    setUser(null);

    document.cookie = "auth-token=; Path=/; Max-Age=0";
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("auth-token");
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
