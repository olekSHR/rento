import Link from "next/link"
import { ChevronRight } from "lucide-react"

import type { DashboardAttentionItem } from "@/lib/realtorWorkspace"

type DashboardRequiresAttentionProps = {
  items: DashboardAttentionItem[]
  className?: string
}

const cardClassName =
  "h-full rounded-3xl border border-white/8 bg-[#2D2D2D] p-5"

const rowBaseClassName =
  "flex items-center justify-between rounded-2xl px-3 py-3 transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

// Amber stays semantic for urgent items; gold is reserved for brand/primary emphasis.
const rowUrgentClassName = "border border-amber-400/30 bg-[#2A2718]"

const rowDefaultClassName = "border border-white/10 bg-[#252525]"

export default function DashboardRequiresAttention({
  items,
  className = "",
}: DashboardRequiresAttentionProps) {
  return (
    <div className={className}>
      <section className={cardClassName}>
        <h2 className="text-sm font-semibold text-[#F5F5F5]">
          Requires attention
        </h2>
        <p className="mt-1 text-xs text-[#B8B8B8]">
          Actionable items that need your response now.
        </p>

        {items.length === 0 ? (
          <div className="mt-4">
            <div className="rounded-2xl bg-[#252525] p-4 text-center ring-1 ring-white/10">
              <h3 className="text-sm font-bold text-[#F5F5F5]">
                Nothing requires attention
              </h3>
              <p className="mt-1 text-sm text-[#B8B8B8]">
                {"You're caught up on profile, viewing requests, and listing photos."}
              </p>
            </div>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`${rowBaseClassName} ${
                    item.tone === "urgent"
                      ? rowUrgentClassName
                      : rowDefaultClassName
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-sm font-semibold text-[#F5F5F5]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#B8B8B8]">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-[#B8B8B8]"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
