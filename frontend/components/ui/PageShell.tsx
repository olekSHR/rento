import type { ReactNode } from "react"

type PageShellProps = {
  children: ReactNode
  className?: string
}

export default function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <main className={`min-h-screen bg-zinc-100 pb-24 ${className}`}>
      <div className="mx-auto max-w-md space-y-4 px-4 pt-6">{children}</div>
    </main>
  )
}
