import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"

export default function Loading() {
  return (
    <main
      role="status"
      aria-live="polite"
      className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${BOTTOM_NAV_CONTENT_CLASS}`}
    >
      <span className="sr-only">Loading page</span>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#252525]/95 shadow-[0_1px_0_rgba(255,255,255,0.04)]">
        <div className="mx-auto flex h-[4rem] max-w-md items-center justify-between px-5">
          <div aria-hidden="true" className="flex min-w-0 items-center gap-3">
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
            <div className="min-w-0 space-y-2">
              <div className="h-4 w-20 animate-pulse rounded-md bg-white/10 motion-reduce:animate-none" />
              <div className="h-2 w-14 animate-pulse rounded-md bg-white/5 motion-reduce:animate-none" />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="h-11 w-16 shrink-0 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none"
          />
        </div>
      </header>

      <div className="mx-auto max-w-md px-5 pb-6 pt-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className="mb-5 overflow-hidden rounded-[24px] border border-white/8 bg-[#2D2D2D]"
          >
            <div className="h-60 animate-pulse bg-white/5 motion-reduce:animate-none" />

            <div className="px-5 pb-5 pt-4">
              <div className="mb-3 h-5 w-4/5 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none" />
              <div className="mb-4 h-4 w-32 animate-pulse rounded-lg bg-white/5 motion-reduce:animate-none" />

              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-16 animate-pulse rounded bg-white/5 motion-reduce:animate-none" />
                  <div className="h-7 w-24 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none" />
                </div>
                <div className="h-10 w-24 animate-pulse rounded-xl bg-[#252525] ring-1 ring-white/10 motion-reduce:animate-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
