"use client";
import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function TopBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [search, setSearch] = useState("");
  const { user, logout } = useAuth();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(search.trim());
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow bg-white sticky top-0 z-10 border-b border-gray-100">
      <form onSubmit={handleSubmit} autoComplete="off" className="flex-1 max-w-lg">
        <input
          type="search"
          name="q"
          className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Search songs, artists, albums, playlists..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>
      <div className="ml-8 flex items-center gap-4">
        {user ? (
          <>
            <span className="font-semibold text-accent">{user.username}</span>
            <button
              onClick={logout}
              className="px-3 py-1 rounded bg-accent text-white hover:bg-primary font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-accent font-semibold hover:underline">
              Login
            </Link>
            <Link href="/register" className="px-3 py-1 rounded bg-primary text-white hover:bg-accent font-semibold">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
