"use client"

import type { ReactNode } from "react"

import BottomNav from "@/components/BottomNav"

type ConsumerShellProps = {
  children: ReactNode
  onOpenFilters?: () => void
  hasActiveFilters?: boolean
  hideBottomNav?: boolean
}

export default function ConsumerShell({
  children,
  onOpenFilters,
  hasActiveFilters = false,
  hideBottomNav = false,
}: ConsumerShellProps) {
  return (
    <>
      {children}
      {!hideBottomNav && (
        <BottomNav
          onOpenFilters={onOpenFilters}
          hasActiveFilters={hasActiveFilters}
        />
      )}
    </>
  )
}
