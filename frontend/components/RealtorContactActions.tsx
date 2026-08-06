import { MessageCircle, Phone } from "lucide-react"

import { buildTelegramUrl } from "@/lib/telegram"

type RealtorContactActionsProps = {
  displayName: string
  phone?: string | null
  whatsapp?: string | null
  telegramUsername?: string | null
}

export function RealtorContactActions({
  displayName,
  phone,
  whatsapp,
  telegramUsername,
}: RealtorContactActionsProps) {
  const hasContactMethods = Boolean(phone || whatsapp || telegramUsername)

  if (!hasContactMethods) {
    return null
  }

  return (
    <>
      <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
        Ask {displayName} about availability, viewing time, and rental
        conditions.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#e8d099] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] transition hover:border-white/25 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call
          </a>
        )}

        {telegramUsername && (
          <a
            href={buildTelegramUrl(telegramUsername)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] transition hover:border-white/25 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
          >
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.417 15.181 9.32 18.5c.413 0 .594-.177.807-.389l1.937-1.856 4.015 2.944c.737.405 1.263.193 1.448-.674l2.635-12.36c.239-1.117-.405-1.554-1.138-1.282L2.89 9.98c-1.086.424-1.073 1.033-.184 1.296l4.683 1.46 10.866-6.847c.512-.317.98-.142.596.192" />
            </svg>
            Telegram
          </a>
        )}
      </div>
    </>
  )
}
