import type { ReactNode } from "react"

type PageHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}
