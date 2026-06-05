"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [
    isAuthenticated,
    isLoading,
    router,
  ]);

  if (isLoading) {
    return (
      <main
        className="
          min-h-screen
          bg-slate-950
          px-4
          pt-6
          text-white
        "
      >
        <div className="space-y-4">
          <div className="h-12 w-48 animate-pulse rounded-xl bg-slate-800" />

          <div className="h-64 animate-pulse rounded-3xl bg-slate-800" />

          <div className="h-64 animate-pulse rounded-3xl bg-slate-800" />
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}