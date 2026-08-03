"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home } from "lucide-react"

type AdminNavItem = {
  label: string
  href: string
  isActive: (pathname: string) => boolean
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    isActive: (pathname) => pathname === "/admin",
  },
  {
    label: "Users",
    href: "/admin/users",
    isActive: (pathname) => pathname.startsWith("/admin/users"),
  },
  {
    label: "Properties",
    href: "/admin/properties",
    isActive: (pathname) => pathname.startsWith("/admin/properties"),
  },
  {
    label: "Applications",
    href: "/admin/realtor-applications",
    isActive: (pathname) => pathname.startsWith("/admin/realtor-applications"),
  },
]

const navLinkBaseClassName =
  "inline-flex h-11 shrink-0 items-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"

function getNavLinkClassName(isActive: boolean): string {
  if (isActive) {
    return `${navLinkBaseClassName} bg-[#2D2D2D] text-[#DFC58A] underline decoration-[#DFC58A] decoration-2 underline-offset-4`
  }

  return `${navLinkBaseClassName} text-[#B8B8B8] hover:text-[#F5F5F5]`
}

export default function AdminWorkspaceHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#252525]/95 backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="flex items-center justify-between gap-3 py-3">
          <p className="truncate text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
            Admin Workspace
          </p>

          <Link
            href="/"
            className="inline-flex h-11 shrink-0 items-center gap-1 rounded-xl px-3 text-sm font-semibold text-[#DFC58A] transition-colors hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Exit Admin
          </Link>
        </div>

        <nav aria-label="Admin workspace" className="pb-3">
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive = item.isActive(pathname)

              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className={getNavLinkClassName(isActive)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
