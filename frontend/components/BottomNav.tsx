"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function BottomNav() {
  const pathname = usePathname();

  const { isAuthenticated, isAdmin, logout } = useAuth();

  const isHome = pathname === "/";
  const isFavorites = pathname === "/favorites";
  const isAdminActive = pathname === "/admin" || pathname.startsWith("/admin/");
  const isProfile = pathname === "/login" || pathname === "/profile";

  const itemClass = (isActive: boolean) => `
    flex
    h-14
    min-w-16
    flex-1
    flex-col
    items-center
    justify-center
    rounded-2xl
    text-xs
    font-medium
    transition
    active:scale-95
    ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-zinc-500 hover:text-zinc-800"
    }
  `;

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
        bg-white/95
        px-3
        pb-[max(env(safe-area-inset-bottom),0.75rem)]
        pt-2
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-md
          items-center
          gap-1
          rounded-3xl
          bg-white
        "
      >
        <Link href="/" className={itemClass(isHome)}>
          <span className="text-lg leading-none">🏠</span>
          <span className="mt-1">Home</span>
        </Link>

        <Link href="/favorites" className={itemClass(isFavorites)}>
          <span className="text-lg leading-none">❤️</span>
          <span className="mt-1">Favorites</span>
        </Link>

        {isAdmin && (
          <Link href="/admin" className={itemClass(isAdminActive)}>
            <span className="text-lg leading-none">🛡️</span>
            <span className="mt-1">Admin</span>
          </Link>
        )}

        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className={itemClass(false)}
          >
            <span className="text-lg leading-none">🚪</span>
            <span className="mt-1">Logout</span>
          </button>
        ) : (
          <Link href="/login" className={itemClass(isProfile)}>
            <span className="text-lg leading-none">👤</span>
            <span className="mt-1">Profile</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
