"use client";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";

export default function HeaderAuthButton() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="
          rounded-full
          bg-blue-50
          px-4
          py-2
          text-sm
          font-semibold
          text-blue-700
          active:scale-95
          transition
        "
      >
        Login
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="
        rounded-full
        bg-zinc-900
        px-4
        py-2
        text-sm
        font-semibold
        text-white
        active:scale-95
        transition
      "
    >
      Logout
    </button>
  );
}
