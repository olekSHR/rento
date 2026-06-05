"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function BottomNav() {
  const pathname = usePathname();

  const { isAuthenticated, logout } = useAuth();

  const isHome = pathname === "/";
  const isFavorites = pathname === "/favorites";
  const isLogin = pathname === "/login";

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-zinc-200
        bg-white/90
        backdrop-blur-md
        pb-safe
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-md
          items-center
          justify-around
        "
      >
        <Link
          href="/"
          className={`
            flex
            h-14
            min-w-20
            flex-col
            items-center
            justify-center
            rounded-xl
            transition
            active:scale-95
            ${isHome ? "font-semibold text-black" : "text-zinc-500"}
          `}
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs">Home</span>
        </Link>

        <Link
          href="/favorites"
          className={`
            flex
            h-14
            min-w-20
            flex-col
            items-center
            justify-center
            rounded-xl
            transition
            active:scale-95
            ${isFavorites ? "font-semibold text-black" : "text-zinc-500"}
          `}
        >
          <span className="text-xl">❤️</span>
          <span className="text-xs">Favorites</span>
        </Link>

        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="
              flex
              h-14
              min-w-20
              flex-col
              items-center
              justify-center
              rounded-xl
              text-zinc-500
              transition
              active:scale-95
            "
          >
            <span className="text-xl">🚪</span>
            <span className="text-xs">Logout</span>
          </button>
        ) : (
          <Link
            href="/login"
            className={`
              flex
              h-14
              min-w-20
              flex-col
              items-center
              justify-center
              rounded-xl
              transition
              active:scale-95
              ${isLogin ? "font-semibold text-black" : "text-zinc-500"}
            `}
          >
            <span className="text-xl">👤</span>
            <span className="text-xs">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}