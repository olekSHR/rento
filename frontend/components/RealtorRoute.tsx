"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

type RealtorRouteProps = {
  children: React.ReactNode;
};

function RealtorRouteSkeleton() {
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
