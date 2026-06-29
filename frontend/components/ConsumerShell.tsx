"use client"

import type { ReactNode } from "react"

import BottomNav from "@/components/BottomNav"

type ConsumerShellProps = {
  children: ReactNode
  onOpenFilters?: () => void
}

export default function ConsumerShell({
  children,
  onOpenFilters,
}: ConsumerShellProps) {
  return (
    <>
      {children}
      <BottomNav onOpenFilters={onOpenFilters} />
    </>
  )
}
