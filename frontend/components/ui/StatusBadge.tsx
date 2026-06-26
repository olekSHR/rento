import type { ReactNode } from "react"

type StatusBadgeVariant = "success" | "warning" | "neutral" | "danger" | "info"

type StatusBadgeProps = {
  children: ReactNode
  variant?: StatusBadgeVariant
}

const variantClassNames: Record<StatusBadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  neutral: "bg-zinc-100 text-zinc-500 ring-zinc-200",
  danger: "bg-red-50 text-red-600 ring-red-200",
  info: "bg-blue-50 text-blue-700 ring-blue-200",
}

export default function StatusBadge({
  children,
  variant = "neutral",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ${variantClassNames[variant]}`}
    >
      {children}
    </span>
  )
}
