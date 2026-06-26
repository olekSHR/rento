export default function PropertyListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
        >
          <div className="h-44 animate-pulse bg-zinc-200" />
          <div className="space-y-3 p-4">
            <div className="h-6 w-24 animate-pulse rounded-lg bg-zinc-200" />
            <div className="h-5 w-3/4 animate-pulse rounded-lg bg-zinc-200" />
            <div className="h-4 w-1/2 animate-pulse rounded-lg bg-zinc-200" />
            <div className="flex gap-2 pt-2">
              <div className="h-11 flex-1 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-11 w-11 animate-pulse rounded-2xl bg-zinc-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
