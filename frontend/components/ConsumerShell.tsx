"use client"

import type { ReactNode } from "react"

import BottomNav from "@/components/BottomNav"

type ConsumerShellProps = {
  children: ReactNode
  onOpenFilters?: () => void
  hideBottomNav?: boolean
}

export default function ConsumerShell({
  children,
  onOpenFilters,
  hideBottomNav = false,
}: ConsumerShellProps) {
  return (
    <>
      {children}
      {!hideBottomNav && <BottomNav onOpenFilters={onOpenFilters} />}
    </>
  )
}
