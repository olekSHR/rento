import type { ReactNode } from "react"

import RentoBrandMark from "@/components/RentoBrandMark"

type AuthShellProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export const authLabelClassName =
  "mb-1.5 block text-[13px] font-medium text-[#F5F5F5]"

export const authInputClassName =
  "h-11 w-full rounded-xl border border-white/[0.08] bg-[#252525] px-3.5 text-[#F5F5F5] placeholder:text-[#B8B8B8]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-50"

export const authPrimaryButtonClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:pointer-events-none disabled:opacity-50"

export const authErrorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-3 py-2.5 text-sm leading-relaxed text-red-100/90"

export const authSuccessClassName =
  "rounded-xl border border-emerald-400/15 bg-[#222A25] px-3 py-2.5 text-sm leading-relaxed text-emerald-100/90"

export const authLinkClassName =
  "inline-flex min-h-11 items-center font-semibold text-[#DFC58A] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

export const authSecondaryTextClassName = "text-[13px] leading-relaxed text-[#B8B8B8]"

export const authRealtorNoteClassName =
  "border-t border-white/[0.08] pt-3 text-center text-[11px] leading-5 text-[#B8B8B8]/90"

export const authFormStackClassName = "flex flex-col gap-3"

export const authSkeletonClassName =
  "h-11 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none"

export default function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1B1B1B] px-4 py-6">
      <div className="w-full max-w-[460px]">
        <RentoBrandMark align="center" className="mb-3" />

        <section className="rounded-[24px] border border-white/[0.08] bg-[#2D2D2D] p-5 md:p-6">
          <h1 className="text-[1.5rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.625rem]">
            {title}
          </h1>

          <p className="mt-1.5 text-[13px] leading-relaxed text-[#B8B8B8]/90">
            {description}
          </p>

          <div className="mt-4">{children}</div>

          {footer ? <div className="mt-4">{footer}</div> : null}
        </section>
      </div>
    </main>
  )
}
