import { Check } from "lucide-react"

import type { AreaLifestyleItem } from "@/lib/areaLifestyle"

type AreaLifestyleCardProps = {
  items: AreaLifestyleItem[]
}

const shellClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

export function AreaLifestyleCard({ items }: AreaLifestyleCardProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className={`${shellClassName} mt-4`}>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.category} className="flex items-center gap-3">
            <Check
              className="h-4 w-4 shrink-0 text-[#DFC58A]"
              aria-hidden={true}
            />
            <span className="text-sm text-[#F5F5F5]">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
