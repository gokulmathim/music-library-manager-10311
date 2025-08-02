"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg("");
    try {
      await register(username, email, password);
      router.replace("/library");
    } catch (err) {
      if (err instanceof Error) {
        setErrMsg(err.message || "Registration failed");
      } else {
        setErrMsg("Registration failed");
      }
    }
  }

  return (
    <div className="max-w-xs mx-auto mt-24 p-8 bg-white rounded-lg shadow-md border">
      <h1 className="text-2xl font-semibold mb-6 text-primary text-center">
        Register
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
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          required
          className="w-full p-2 border rounded focus:border-primary"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white rounded py-2 font-bold hover:bg-accent transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      <div className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <a href="/login" className="text-accent font-semibold hover:underline">
          Login
        </a>
      </div>
    </div>
  );
}
