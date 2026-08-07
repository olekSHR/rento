"use client";

import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { buildLoginHref, sanitizeReturnUrl } from "@/lib/returnUrl";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRouteSkeleton() {
  return (
    <main
      role="status"
      aria-live="polite"
      className="min-h-screen bg-[#1B1B1B] px-5 pt-6 text-[#F5F5F5] md:px-8 md:pt-8"
    >
      <span className="sr-only">Loading</span>

      <div className="mx-auto max-w-[1280px] space-y-4">
        <div className="h-12 w-48 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />

        <div className="h-64 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />

        <div className="h-64 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
      </div>
    </main>
  );
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  const isDenied = !isLoading && !isAuthenticated;

  useEffect(() => {
    if (isDenied) {
      const search = window.location.search;
      const requestedPath = search ? `${pathname}${search}` : pathname;
      const returnPath = sanitizeReturnUrl(requestedPath) ?? pathname;

      router.push(buildLoginHref(returnPath));
    }
  }, [isDenied, pathname, router]);

  if (isLoading || isDenied) {
    return <ProtectedRouteSkeleton />;
  }

  return <>{children}</>;
}
