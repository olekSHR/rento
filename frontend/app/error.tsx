"use client"

import { authPrimaryButtonClassName } from "@/components/auth/AuthShell"

type Props = {
  error: Error
  reset: () => void
}

export default function ErrorPage({ error, reset }: Props) {
  console.error(error)

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1B1B1B] px-4 py-6">
      <div className="w-full max-w-[460px]">
        <section className="rounded-[24px] border border-white/[0.08] bg-[#2D2D2D] p-5 text-center md:p-6">
          <h1 className="text-[1.5rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.625rem]">
            Something went wrong
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#B8B8B8]">
            Failed to load data. Please try again.
          </p>

          <button
            type="button"
            onClick={reset}
            className={`mt-6 ${authPrimaryButtonClassName}`}
          >
            Retry
          </button>
        </section>
      </div>
    </main>
  )
}
