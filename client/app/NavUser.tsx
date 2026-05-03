"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

type User = { id: string; email: string; name: string };

export function NavUser({ variant = "light" }: { variant?: "light" | "dark" }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: User | null) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoaded(true));
  }, []);

  async function logout() {
    await fetch(`${API_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  if (!loaded) {
    return <div className="w-32 h-8" aria-hidden />;
  }

  const isDark = variant === "dark";

  if (!user) {
    return (
      <div className="flex items-center gap-5">
        <Link
          href="/signin"
          className={
            isDark
              ? "text-zinc-200 hover:text-white text-sm"
              : "text-sm hover:text-zinc-600"
          }
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className={
            isDark
              ? "rounded-sm bg-white px-4 py-2 text-sm text-black hover:bg-zinc-100"
              : "rounded-sm bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800"
          }
        >
          Join Now
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer"
      >
        <div className="w-12 h-12 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-zinc-500">
          <User className="w-6 h-6" strokeWidth={1.75} />
        </div>
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 mt-2 w-52 bg-white border border-zinc-200 rounded-sm shadow-md z-20 text-sm overflow-hidden text-zinc-900">
            <div className="px-3 py-2.5 border-b border-zinc-100">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-xs text-zinc-500 truncate">{user.email}</div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="w-full text-left px-3 py-2 hover:bg-zinc-50 cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
