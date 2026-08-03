"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminWorkspaceHeader from "@/components/admin/AdminWorkspaceHeader";
import { useAuth } from "@/context/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

function AdminRouteSkeleton() {
  return (
    <div className="min-h-screen bg-[#1B1B1B] text-[#F5F5F5]">
      <div
        role="status"
        aria-live="polite"
        className="min-h-screen"
      >
        <span className="sr-only">Loading admin workspace</span>

        <div className="sticky top-0 z-40 border-b border-white/10 bg-[#252525]">
          <div className="mx-auto max-w-[1280px] px-4 md:px-8">
            <div className="flex items-center justify-between gap-3 py-3">
              <div className="h-4 w-32 animate-pulse rounded bg-[#2D2D2D] motion-reduce:animate-none" />
              <div className="h-11 w-28 animate-pulse rounded-xl bg-[#2D2D2D] motion-reduce:animate-none" />
            </div>
            <div className="flex gap-2 overflow-hidden pb-3">
              <div className="h-11 w-28 animate-pulse rounded-xl bg-[#2D2D2D] motion-reduce:animate-none" />
              <div className="h-11 w-24 animate-pulse rounded-xl bg-[#2D2D2D] motion-reduce:animate-none" />
              <div className="h-11 w-32 animate-pulse rounded-xl bg-[#2D2D2D] motion-reduce:animate-none" />
              <div className="h-11 w-32 animate-pulse rounded-xl bg-[#2D2D2D] motion-reduce:animate-none" />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1280px] space-y-4 px-4 py-6 md:px-8 md:py-8">
          <div className="h-8 w-56 animate-pulse rounded-lg bg-[#2D2D2D] motion-reduce:animate-none" />
          <div className="h-40 animate-pulse rounded-3xl bg-[#2D2D2D] motion-reduce:animate-none" />
          <div className="h-64 animate-pulse rounded-3xl bg-[#2D2D2D] motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter();

  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  const isUnauthenticated = !isLoading && !isAuthenticated;
  const isUnauthorized = !isLoading && isAuthenticated && !isAdmin;
  const isDenied = isUnauthenticated || isUnauthorized;

  useEffect(() => {
    if (isUnauthenticated) {
      router.push("/login");
      return;
    }

    if (isUnauthorized) {
      router.push("/");
    }
  }, [isUnauthenticated, isUnauthorized, router]);

  if (isLoading || isDenied) {
    return <AdminRouteSkeleton />;
  }

  return (
    <>
      <AdminWorkspaceHeader />
      {children}
    </>
  );
}
