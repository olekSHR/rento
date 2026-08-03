import type { ReactNode } from "react"

type AdminPageShellProps = {
  children: ReactNode
  className?: string
}

export default function AdminPageShell({
  children,
  className = "",
}: AdminPageShellProps) {
  return (
    <main
      className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${className}`.trim()}
    >
      <div className="mx-auto max-w-[1280px] space-y-4 px-4 py-6 md:px-8 md:py-8">
        {children}
      </div>
    </main>
  )
}
