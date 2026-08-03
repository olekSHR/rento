"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Home,
  Search,
  User,
  Building2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type BottomNavProps = {
  onOpenFilters?: () => void;
};

const itemBaseClassName = `
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
  transition-colors
  duration-200
  active:scale-95
`;

export default function BottomNav({ onOpenFilters }: BottomNavProps) {
  const pathname = usePathname();

  const { isRealtor, isAuthenticated } = useAuth();

  const profileHref = isAuthenticated ? "/profile" : "/login";

  const isHome = pathname === "/";
  const isFavorites = pathname === "/favorites";
  const isRealtorActive =
    pathname === "/realtor" ||
    pathname.startsWith("/realtor/");
  const isProfile = pathname === "/login" || pathname === "/profile";

  const isDarkNav = isHome || isFavorites;

  const appearance = isDarkNav
    ? {
        shell:
          "border-white/10 bg-[#252525]/95 shadow-[0_8px_32px_rgba(0,0,0,0.32)]",
        focus:
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]",
        activeItem: "text-[#DFC58A]",
        inactiveItem: "text-[#B8B8B8] hover:text-[#F5F5F5]",
        activeIcon: "text-[#DFC58A]",
        inactiveIcon: "text-[#B8B8B8]",
        activeDot: "bg-[#DFC58A]",
        actionItem: "text-[#F5F5F5]",
        actionIcon: "text-[#F5F5F5]",
      }
    : {
        shell:
          "border-zinc-200/80 bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.16)]",
        focus:
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        activeItem: "text-blue-700",
        inactiveItem: "text-zinc-400 hover:text-zinc-700",
        activeIcon: "text-blue-700",
        inactiveIcon: "text-zinc-400",
        activeDot: "bg-blue-700",
        actionItem: "text-zinc-400 hover:text-zinc-700",
        actionIcon: "text-zinc-400",
      };

  const routeItemClass = (isActive: boolean) =>
    `${itemBaseClassName} ${appearance.focus} ${
      isActive ? appearance.activeItem : appearance.inactiveItem
    }`;

  const routeIconClass = (isActive: boolean) =>
    `h-5 w-5 stroke-[2.3] ${
      isActive ? appearance.activeIcon : appearance.inactiveIcon
    }`;

  const shouldShowFilters = Boolean(onOpenFilters);

  return (
    <nav
      aria-label="Primary"
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
        className={`
          pointer-events-auto
          mx-auto
          flex
          max-w-md
          items-center
          gap-1
          rounded-[28px]
          border
          px-2
          py-2
          backdrop-blur-xl
          ${appearance.shell}
        `}
      >
        <Link
          href="/"
          className={routeItemClass(isHome)}
          aria-current={isHome ? "page" : undefined}
        >
          {isHome && (
            <span
              aria-hidden="true"
              className={`absolute top-1 h-1 w-5 rounded-full ${appearance.activeDot}`}
            />
          )}
          <Home className={routeIconClass(isHome)} />
          <span className="mt-1">Home</span>
        </Link>

        <Link
          href="/favorites"
          className={routeItemClass(isFavorites)}
          aria-current={isFavorites ? "page" : undefined}
        >
          {isFavorites && (
            <span
              aria-hidden="true"
              className={`absolute top-1 h-1 w-5 rounded-full ${appearance.activeDot}`}
            />
          )}
          <Heart className={routeIconClass(isFavorites)} />
          <span className="mt-1">Favorites</span>
        </Link>

        {shouldShowFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            aria-label="Open filters"
            className={`${itemBaseClassName} ${appearance.focus} ${appearance.actionItem}`}
          >
            <Search className={`h-5 w-5 stroke-[2.3] ${appearance.actionIcon}`} />
            <span className="mt-1">Filters</span>
          </button>
        )}

        {isRealtor && (
          <Link
            href="/realtor"
            className={routeItemClass(isRealtorActive)}
            aria-current={isRealtorActive ? "page" : undefined}
          >
            {isRealtorActive && (
              <span
                aria-hidden="true"
                className={`absolute top-1 h-1 w-5 rounded-full ${appearance.activeDot}`}
              />
            )}

            <Building2 className={routeIconClass(isRealtorActive)} />

            <span className="mt-1">
              Realtor
            </span>
          </Link>
        )}

        <Link
          href={profileHref}
          className={routeItemClass(isProfile)}
          aria-current={isProfile ? "page" : undefined}
        >
          {isProfile && (
            <span
              aria-hidden="true"
              className={`absolute top-1 h-1 w-5 rounded-full ${appearance.activeDot}`}
            />
          )}
          <User className={routeIconClass(isProfile)} />
          <span className="mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
