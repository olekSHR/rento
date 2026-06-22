"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Home,
  Search,
  ShieldCheck,
  User,
  Building2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type BottomNavProps = {
  onOpenFilters?: () => void;
};

export default function BottomNav({ onOpenFilters }: BottomNavProps) {
  const pathname = usePathname();

  const { isAdmin, isRealtor } = useAuth();

  const isHome = pathname === "/";
  const isFavorites = pathname === "/favorites";
  const isAdminActive = pathname === "/admin" || pathname.startsWith("/admin/");
  const isRealtorActive =
  pathname === "/realtor" ||
  pathname.startsWith("/realtor/");
  const isProfile = pathname === "/login" || pathname === "/profile";

  const itemClass = (isActive: boolean) => `
    relative
    flex
    h-14
    min-w-0
    flex-1
    flex-col
    items-center
    justify-center
    rounded-2xl
    text-[11px]
    font-semibold
    tracking-tight
    transition-all
    duration-200
    active:scale-95
    ${
      isActive
        ? "text-blue-700"
        : "text-zinc-400 hover:text-zinc-700"
    }
  `;

  const iconClass = (isActive: boolean) => `
    h-5
    w-5
    stroke-[2.3]
    ${
      isActive
        ? "text-blue-700"
        : "text-zinc-400"
    }
  `;

  const shouldShowFilters = Boolean(onOpenFilters);

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        px-4
        pb-[max(env(safe-area-inset-bottom),0.75rem)]
        pt-2
        pointer-events-none
      "
    >
      <div
        className="
          pointer-events-auto
          mx-auto
          flex
          max-w-md
          items-center
          gap-1
          rounded-[28px]
          border
          border-zinc-200/80
          bg-white/95
          px-2
          py-2
          shadow-[0_18px_45px_rgba(15,23,42,0.16)]
          backdrop-blur-xl
        "
      >
        <Link href="/" className={itemClass(isHome)}>
          {isHome && (
            <span className="absolute top-1 h-1 w-5 rounded-full bg-blue-700" />
          )}
          <Home className={iconClass(isHome)} />
          <span className="mt-1">Home</span>
        </Link>

        <Link href="/favorites" className={itemClass(isFavorites)}>
          {isFavorites && (
            <span className="absolute top-1 h-1 w-5 rounded-full bg-blue-700" />
          )}
          <Heart className={iconClass(isFavorites)} />
          <span className="mt-1">Favorites</span>
        </Link>

        {shouldShowFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            className={itemClass(false)}
          >
            <Search className={iconClass(false)} />
            <span className="mt-1">Filters</span>
          </button>
        )}

        {isAdmin && (
          <Link href="/admin" className={itemClass(isAdminActive)}>
            {isAdminActive && (
              <span className="absolute top-1 h-1 w-5 rounded-full bg-blue-700" />
            )}
            <ShieldCheck className={iconClass(isAdminActive)} />
            <span className="mt-1">Admin</span>
          </Link>
        )}

        {isRealtor && (
          <Link
            href="/realtor"
            className={itemClass(isRealtorActive)}
          >
            {isRealtorActive && (
              <span className="absolute top-1 h-1 w-5 rounded-full bg-blue-700" />
            )}

            <Building2 className={iconClass(isRealtorActive)} />

            <span className="mt-1">
              Realtor
            </span>
          </Link>
        )}

        <Link href="/login" className={itemClass(isProfile)}>
          {isProfile && (
            <span className="absolute top-1 h-1 w-5 rounded-full bg-blue-700" />
          )}
          <User className={iconClass(isProfile)} />
          <span className="mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
