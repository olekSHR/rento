export default function PropertyListSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <span className="sr-only">Loading properties</span>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="overflow-hidden rounded-[24px] border border-white/8 bg-[#2D2D2D]"
        >
          <div className="h-44 animate-pulse bg-white/5 motion-reduce:animate-none" />
          <div className="space-y-3 p-4">
            <div className="h-6 w-24 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none" />
            <div className="h-5 w-3/4 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none" />
            <div className="h-4 w-1/2 animate-pulse rounded-lg bg-white/5 motion-reduce:animate-none" />
            <div className="flex gap-2 pt-2">
              <div className="h-11 flex-1 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
              <div className="h-11 w-11 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
