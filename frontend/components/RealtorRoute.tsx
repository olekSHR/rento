"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

type RealtorRouteProps = {
  children: React.ReactNode;
};

function RealtorRouteSkeleton() {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 pt-6">
      <div className="mx-auto max-w-md space-y-4">
        <div className="h-12 w-48 animate-pulse rounded-xl bg-zinc-200" />
        <div className="h-64 animate-pulse rounded-3xl bg-zinc-200" />
      </div>
    </main>
  );
}

export default function RealtorRoute({ children }: RealtorRouteProps) {
  const router = useRouter();

  const { isAuthenticated, isLoading, isRealtor } = useAuth();

  const isUnauthenticated = !isLoading && !isAuthenticated;
  const isUnauthorized = !isLoading && isAuthenticated && !isRealtor;
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
    return <RealtorRouteSkeleton />;
  }

  return <>{children}</>;
}
