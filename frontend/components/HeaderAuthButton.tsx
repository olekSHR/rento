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
          inline-flex
          h-11
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[#DFC58A]/45
          bg-[#2D2D2D]
          px-4
          text-sm
          font-medium
          text-[#DFC58A]
          transition
          active:scale-95
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#DFC58A]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#252525]
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
        inline-flex
        h-11
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-white/12
        bg-[#2D2D2D]
        px-4
        text-sm
        font-medium
        text-[#F5F5F5]
        transition
        active:scale-95
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#DFC58A]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#252525]
      "
    >
      Logout
    </button>
  );
}
