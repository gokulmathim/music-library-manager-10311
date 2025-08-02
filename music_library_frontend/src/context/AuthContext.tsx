"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

type User = {
  id: string;
  username: string;
  email: string;
  // other user fields as needed
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load initial user info (session) from backend on mount
  useEffect(() => {
    refreshUser();
  }, []);

  // PUBLIC_INTERFACE
  async function refreshUser() {
    setLoading(true);
    try {
      const data = await apiFetch("/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    }
    setLoading(false);
  }

  // PUBLIC_INTERFACE
  async function login(username: string, password: string) {
    setLoading(true);
    try {
      await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      await refreshUser();
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  async function logout() {
    setLoading(true);
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  async function register(username: string, email: string, password: string) {
    setLoading(true);
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      await login(username, password);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
