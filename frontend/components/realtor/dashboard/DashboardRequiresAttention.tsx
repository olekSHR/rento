import Link from "next/link"
import { ChevronRight } from "lucide-react"

import EmptyState from "@/components/ui/EmptyState"
import SectionCard from "@/components/ui/SectionCard"
import type { DashboardAttentionItem } from "@/lib/realtorWorkspace"

type DashboardRequiresAttentionProps = {
  items: DashboardAttentionItem[]
  className?: string
}

export default function DashboardRequiresAttention({
  items,
  className = "",
}: DashboardRequiresAttentionProps) {
  return (
    <div className={className}>
      <SectionCard className="h-full">
      <h2 className="text-sm font-semibold text-zinc-900">Requires attention</h2>
      <p className="mt-1 text-xs text-zinc-500">
        Actionable items that need your response now.
      </p>

      {items.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="Nothing requires attention"
            description="You're caught up on profile, viewing requests, and listing photos."
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`flex items-center justify-between rounded-2xl px-3 py-3 transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
                  item.tone === "urgent"
                    ? "border border-amber-200 bg-amber-50/60"
                    : "border border-zinc-200 bg-zinc-50"
                }`}
              >
                <div className="min-w-0 pr-3">
                  <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">
                    {item.description}
                  </p>
                </div>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-zinc-400"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
      </SectionCard>
    </div>
  )
}
