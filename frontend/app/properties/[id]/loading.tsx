import { SAFE_BOTTOM_CONTENT_CLASS } from "@/lib/bottomNavLayout"

const pulseClassName =
  "animate-pulse bg-white/10 motion-reduce:animate-none"

export default function Loading() {
  return (
    <main
      role="status"
      aria-live="polite"
      className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${SAFE_BOTTOM_CONTENT_CLASS}`}
    >
      <span className="sr-only">Loading property</span>

      <div className="mx-auto max-w-7xl">
        <div className="relative" aria-hidden="true">
          <div
            className={`aspect-[4/3] w-full bg-[#252525] sm:aspect-[16/10] ${pulseClassName}`}
          />
        </div>

        <section className="px-5 pt-6 md:px-8" aria-hidden="true">
          <div className={`h-7 w-32 rounded-full ${pulseClassName}`} />

          <div className={`mt-4 h-8 w-4/5 rounded-lg ${pulseClassName}`} />

          <div className={`mt-3 h-4 w-28 rounded-md ${pulseClassName}`} />

          <div className="mt-6 flex items-end justify-between gap-4">
            <div className="space-y-2">
              <div className={`h-3 w-20 rounded ${pulseClassName}`} />
              <div className={`h-8 w-24 rounded-lg ${pulseClassName}`} />
            </div>
            <div className={`h-10 w-24 rounded-xl ${pulseClassName}`} />
          </div>

          <div
            className={`mt-7 h-[4.5rem] rounded-[24px] border border-white/8 bg-[#2D2D2D] ${pulseClassName}`}
          />
        </section>

        <div className="px-5 pb-8 pt-8 md:px-8" aria-hidden="true">
          <div className={`h-6 w-44 rounded-lg ${pulseClassName}`} />

          <div className="mt-4 space-y-2">
            <div className={`h-4 w-full rounded ${pulseClassName}`} />
            <div className={`h-4 w-full rounded ${pulseClassName}`} />
            <div className={`h-4 w-3/4 rounded ${pulseClassName}`} />
          </div>

          <div
            className={`mt-8 rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5`}
          >
            <div className={`h-3 w-16 rounded ${pulseClassName}`} />
            <div className={`mt-4 h-20 rounded-2xl ${pulseClassName}`} />
            <div className={`mt-5 h-12 rounded-2xl ${pulseClassName}`} />
          </div>
        </div>
      </div>
    </main>
  )
}
