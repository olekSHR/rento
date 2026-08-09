"use client"

import { CalendarCheck, MessageCircle } from "lucide-react"

type Props = {
  canRequestViewing: boolean
  showContact: boolean
  canOpenRequestViewing: boolean
  onRequestViewing: () => void
}

const primaryButtonClassName =
  "flex h-12 min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#e8d099] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

const secondaryButtonClassName =
  "flex h-12 min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

function scrollToContactSection() {
  document.getElementById("property-contact")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

export default function PropertyDetailStickyActions({
  canRequestViewing,
  showContact,
  canOpenRequestViewing,
  onRequestViewing,
}: Props) {
  if (!canRequestViewing) {
    return null
  }

  const showPrimary = canOpenRequestViewing
  const showSecondary = showContact

  if (!showPrimary && !showSecondary) {
    return null
  }

  return (
    <div
      className="
        fixed
        inset-x-0
        bottom-0
        z-40
        border-t
        border-white/10
        bg-[#1B1B1B]/95
        px-5
        py-4
        backdrop-blur
        md:hidden
        supports-[padding:env(safe-area-inset-bottom)]:pb-[max(1rem,env(safe-area-inset-bottom))]
      "
    >
      <div className="mx-auto flex max-w-xl gap-3">
        {showPrimary ? (
          <button
            type="button"
            onClick={onRequestViewing}
            className={primaryButtonClassName}
          >
            <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            Request a viewing
          </button>
        ) : null}

        {showSecondary ? (
          <button
            type="button"
            onClick={scrollToContactSection}
            className={
              showPrimary ? secondaryButtonClassName : primaryButtonClassName
            }
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Contact
          </button>
        ) : null}
      </div>
    </div>
  )
}
