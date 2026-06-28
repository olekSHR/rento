"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminWorkspaceHeader from "@/components/admin/AdminWorkspaceHeader";
import { useAuth } from "@/context/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter();

  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAdmin) {
      router.push("/");
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 pt-6 text-white">
        <div className="space-y-4">
          <div className="h-12 w-48 animate-pulse rounded-xl bg-slate-800" />
          <div className="h-64 animate-pulse rounded-3xl bg-slate-800" />
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <>
      <AdminWorkspaceHeader />
      {children}
    </>
  );
}