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
    <main className="min-h-screen bg-slate-950 px-4 pt-6 text-white">
      <div className="space-y-4">
        <div className="h-12 w-48 animate-pulse rounded-xl bg-slate-800" />
        <div className="h-64 animate-pulse rounded-3xl bg-slate-800" />
      </div>
    </main>
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
