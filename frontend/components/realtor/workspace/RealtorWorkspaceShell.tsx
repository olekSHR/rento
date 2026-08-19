"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  CalendarCheck,
  ExternalLink,
  LayoutDashboard,
  Menu,
  UserCircle,
  X,
} from "lucide-react"
import { useEffect, useMemo, useState, type ReactNode } from "react"

import { useAuth } from "@/context/AuthContext"
import { getRentoLogoSrc } from "@/lib/rentoBrandAssets"
import {
  buildWorkspaceNavItems,
  getActiveWorkspaceNavId,
  REALTOR_PROPERTIES_HREF,
  REALTOR_PROPERTIES_SECTION_ID,
  scrollToRealtorPropertiesSection,
  type WorkspaceNavItem,
  type WorkspaceNavItemId,
} from "@/lib/realtorWorkspace"

type RealtorWorkspaceShellProps = {
  children: ReactNode
}

const navIconById: Record<WorkspaceNavItemId, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  properties: Building2,
  "viewing-requests": CalendarCheck,
  profile: UserCircle,
  "public-profile": ExternalLink,
}

function getNavItemKey(item: WorkspaceNavItem, index: number) {
  return `${item.group}-${item.label}-${index}`
}

const navLinkBaseClassName =
  "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"

function getNavLinkClassName(isActive: boolean) {
  if (isActive) {
    return "bg-[#2D2D2D] font-semibold text-[#DFC58A] ring-1 ring-[#DFC58A]/40"
  }

  return "font-medium text-[#B8B8B8] hover:bg-white/5 hover:text-[#F5F5F5]"
}

type WorkspaceNavListProps = {
  items: WorkspaceNavItem[]
  activeNavId: WorkspaceNavItemId
  pathname: string
  onNavigate?: () => void
}

function WorkspaceNavList({
  items,
  activeNavId,
  pathname,
  onNavigate,
}: WorkspaceNavListProps) {
  const groups = ["Overview", "Work", "Account"] as const

  function handlePropertiesClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/realtor") {
      return
    }

    event.preventDefault()

    if (window.location.hash !== `#${REALTOR_PROPERTIES_SECTION_ID}`) {
      window.history.replaceState(null, "", REALTOR_PROPERTIES_HREF)
    }

    scrollToRealtorPropertiesSection()
    onNavigate?.()
  }

  return (
    <nav aria-label="Realtor workspace" className="space-y-6">
      {groups.map((group) => {
        const groupItems = items.filter((item) => item.group === group)

        if (groupItems.length === 0) {
          return null
        }

        return (
          <div key={group}>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-[#B8B8B8]">
              {group}
            </p>
            <ul className="mt-2 space-y-1">
              {groupItems.map((item, index) => {
                const isPropertiesLink = item.href === REALTOR_PROPERTIES_HREF
                const isActive = !item.external && item.id === activeNavId
                const Icon =
                  navIconById[item.id as WorkspaceNavItemId] ?? UserCircle

                return (
                  <li key={getNavItemKey(item, index)}>
                    <Link
                      href={item.href}
                      onClick={(event) => {
                        if (isPropertiesLink) {
                          handlePropertiesClick(event)
                          return
                        }

                        onNavigate?.()
                      }}
                      className={`${navLinkBaseClassName} ${getNavLinkClassName(isActive)}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

export default function RealtorWorkspaceShell({
  children,
}: RealtorWorkspaceShellProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const activeNavId = getActiveWorkspaceNavId(pathname)
  const navItems = useMemo(
    () => buildWorkspaceNavItems(user?.id),
    [user?.id]
  )

  useEffect(() => {
    if (!isMobileNavOpen) {
      return
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isMobileNavOpen])

  const displayName =
    user?.email?.split("@")[0]?.trim() || "Realtor workspace"

  return (
    <div className="min-h-screen bg-[#1B1B1B] text-[#F5F5F5]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#252525] lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-5 py-5">
            <Link
              href="/realtor"
              className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"
            >
              <Image
                src={getRentoLogoSrc("symbol")}
                alt="Rento"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#F5F5F5]">
                  Realtor Workspace
                </p>
                <p className="truncate text-xs text-[#B8B8B8]">{displayName}</p>
              </div>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-5">
            <WorkspaceNavList
              items={navItems}
              activeNavId={activeNavId}
              pathname={pathname}
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#252525]/95 backdrop-blur">
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-[#B8B8B8] transition-colors hover:bg-white/5 hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525] lg:hidden"
                  aria-label="Open workspace navigation"
                  aria-expanded={isMobileNavOpen}
                  aria-controls="realtor-workspace-mobile-nav"
                  onClick={() => setIsMobileNavOpen(true)}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="min-w-0 lg:hidden">
                  <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                    Realtor Workspace
                  </p>
                  <p className="truncate text-xs text-[#B8B8B8]">{displayName}</p>
                </div>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-full bg-[#2D2D2D] px-3 py-1 text-xs font-semibold text-[#DFC58A] ring-1 ring-[#DFC58A]/25">
                  Realtor
                </span>
              </div>
            </div>
          </header>

          {/* Content surface stays light until the dashboard and viewing-requests
              pages define their own backgrounds: their headings and body copy are
              still zinc and rely on this inherited light context. */}
          <main className="min-w-0 flex-1 overflow-x-hidden bg-zinc-50 text-zinc-900">
            {children}
          </main>
        </div>
      </div>

      {isMobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#1B1B1B]/80 backdrop-blur-[2px]"
            aria-label="Close workspace navigation"
            onClick={() => setIsMobileNavOpen(false)}
          />

          <div
            id="realtor-workspace-mobile-nav"
            className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col border-r border-white/10 bg-[#252525] shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Realtor workspace navigation"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#F5F5F5]">
                  Navigation
                </p>
                <p className="truncate text-xs text-[#B8B8B8]">{displayName}</p>
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#2D2D2D] text-[#B8B8B8] transition-colors hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"
                aria-label="Close workspace navigation"
                onClick={() => setIsMobileNavOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <WorkspaceNavList
                items={navItems}
                activeNavId={activeNavId}
                pathname={pathname}
                onNavigate={() => setIsMobileNavOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
