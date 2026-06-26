import type { ReactNode } from "react"

type SectionCardProps = {
  children: ReactNode
  className?: string
}

export default function SectionCard({
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </section>
  )
}
