import Link from "next/link"

export default function ViewingRequestsEmptyState() {
  return (
    <div
      role="status"
      className="rounded-[24px] border border-white/8 bg-[#252525] px-6 py-10 text-center"
    >
      <h2 className="text-xl font-semibold tracking-tight text-[#F5F5F5]">
        No viewing requests yet
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#B8B8B8]">
        Request a viewing from a listing to track its status here.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex h-11 min-w-[9.5rem] items-center justify-center rounded-full bg-[#DFC58A] px-6 text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#e8d099] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
      >
        Browse listings
      </Link>
    </div>
  )
}
