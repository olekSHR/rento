import Link from "next/link"
import { Home } from "lucide-react"

export default function AdminWorkspaceHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
          Admin Workspace
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Exit Admin
        </Link>
      </div>
    </header>
  )
}
