import type { ReactNode } from "react"

import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"

type PageShellProps = {
  children: ReactNode
  className?: string
}

export default function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <main
      className={`min-h-screen bg-zinc-100 ${BOTTOM_NAV_CONTENT_CLASS} ${className}`}
    >
      <div className="mx-auto max-w-md space-y-4 px-4 pt-6">{children}</div>
    </main>
  )
}
