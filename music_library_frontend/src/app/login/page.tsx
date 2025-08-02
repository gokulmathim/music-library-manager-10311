"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg("");
    try {
      await login(username, password);
      router.replace("/library");
    } catch (err) {
      if (err instanceof Error) {
        setErrMsg(err.message || "Login failed");
      } else {
        setErrMsg("Login failed");
      }
    }
  }

  return (
    <div className="max-w-xs mx-auto mt-24 p-8 bg-white rounded-lg shadow-md border">
      <h1 className="text-2xl font-semibold mb-6 text-primary text-center">
        Login
      </h1>
      {errMsg && (
        <div className="bg-red-100 text-red-700 py-1 mb-4 px-3 rounded">{errMsg}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          required
          className="w-full p-2 border rounded focus:border-primary"
          type="text"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          required
          className="w-full p-2 border rounded focus:border-primary"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white rounded py-2 font-bold hover:bg-accent transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-accent font-semibold hover:underline">
          Register
        </a>
      </div>
    </div>
  );
}
