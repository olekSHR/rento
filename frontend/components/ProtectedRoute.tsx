"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRouteSkeleton() {
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

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  const isDenied = !isLoading && !isAuthenticated;

  useEffect(() => {
    if (isDenied) {
      router.push("/login");
    }
  }, [isDenied, router]);

  if (isLoading || isDenied) {
    return <ProtectedRouteSkeleton />;
  }

  return <>{children}</>;
}
