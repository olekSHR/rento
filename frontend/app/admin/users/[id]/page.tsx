"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"

import AdminRoute from "@/components/AdminRoute"
import AdminPageShell from "@/components/admin/AdminPageShell"
import { useAuth } from "@/context/AuthContext"
import {
  getAdminUserById,
  updateAdminUserAccountStatus,
  updateUserRole,
  type AdminUserDetail,
  type ManageableAccountStatus,
  type ManageableUserRole,
} from "@/services/api"

const ADMIN_USERS_RELOAD_KEY = "adminUsersNeedsReload"

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info"

const badgeClassNames: Record<BadgeVariant, string> = {
  success:
    "border border-emerald-400/30 bg-emerald-950/40 text-emerald-200",
  warning: "border border-amber-400/30 bg-amber-950/40 text-amber-200",
  danger: "border border-red-400/30 bg-red-950/40 text-red-200",
  neutral: "border border-white/10 bg-[#252525] text-[#B8B8B8]",
  info: "border border-sky-400/30 bg-sky-950/40 text-sky-200",
}

const actionButtonClassName =
  "inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-50"

const selectClassName =
  "mt-2 min-h-11 w-full rounded-2xl border border-white/10 bg-[#252525] px-4 text-sm text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-50"

function DarkBadge({
  children,
  variant = "neutral",
}: {
  children: ReactNode
  variant?: BadgeVariant
}) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badgeClassNames[variant]}`}
    >
      {children}
    </span>
  )
}

function DarkCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 ${className}`.trim()}
    >
      {children}
    </section>
  )
}

function getDisplayInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
  }

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }

  return "U"
}

function getRoleVariant(role: string): BadgeVariant {
  if (role === "admin") {
    return "info"
  }

  if (role === "realtor") {
    return "success"
  }

  return "neutral"
}

function getApplicationVariant(status: string): BadgeVariant {
  if (status === "approved") {
    return "success"
  }

  if (status === "rejected") {
    return "danger"
  }

  if (status === "pending") {
    return "warning"
  }

  return "neutral"
}

function getAccountStatusVariant(status: string): BadgeVariant {
  if (status === "active") {
    return "success"
  }

  if (status === "suspended") {
    return "warning"
  }

  if (status === "blocked") {
    return "danger"
  }

  return "neutral"
}

function formatAccountStatusLabel(status: string): string {
  if (status === "active") {
    return "Active"
  }

  if (status === "suspended") {
    return "Suspended"
  }

  if (status === "blocked") {
    return "Blocked"
  }

  return status
}

function formatRegisteredAt(value: string | null): string {
  if (!value) {
    return "—"
  }

  return new Date(value).toLocaleDateString(undefined, {
    dateStyle: "medium",
  })
}

function formatOptionalValue(value: string | null): string {
  return value?.trim() || "—"
}

function isManageableRole(role: string): role is ManageableUserRole {
  return role === "user" || role === "realtor"
}

function canManageAccountStatus(role: string): boolean {
  return role !== "admin"
}

function isAccountStatusValue(
  value: string
): value is ManageableAccountStatus {
  return value === "active" || value === "suspended" || value === "blocked"
}

function DetailSkeleton() {
  return (
    <AdminPageShell>
      <div
        role="status"
        aria-live="polite"
        className="space-y-4"
      >
        <span className="sr-only">Loading user details</span>
        <div className="h-5 w-32 animate-pulse rounded bg-[#2D2D2D] motion-reduce:animate-none" />
        <div className="h-40 animate-pulse rounded-[24px] bg-[#2D2D2D] motion-reduce:animate-none" />
        <div className="h-48 animate-pulse rounded-[24px] bg-[#2D2D2D] motion-reduce:animate-none" />
      </div>
    </AdminPageShell>
  )
}

function ConfirmDialog({
  isOpen,
  isSaving,
  titleId,
  title,
  description,
  onCancel,
  onConfirm,
  triggerRef,
}: {
  isOpen: boolean
  isSaving: boolean
  titleId: string
  title: string
  description: string
  onCancel: () => void
  onConfirm: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    cancelRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSaving) {
        onCancel()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, isSaving, onCancel])

  useEffect(() => {
    if (isOpen || isSaving) {
      return
    }

    triggerRef.current?.focus()
  }, [isOpen, isSaving, triggerRef])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1B1B1B]/80 p-4 sm:items-center"
      role="presentation"
      onClick={isSaving ? undefined : onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={`${titleId}-description`}
        className="w-full max-w-md rounded-[24px] border border-white/8 bg-[#2D2D2D] p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id={titleId}
          className="text-base font-bold text-[#F5F5F5]"
        >
          {title}
        </h2>
        <p
          id={`${titleId}-description`}
          className="mt-2 text-sm text-[#B8B8B8]"
        >
          {description}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            type="button"
            disabled={isSaving}
            onClick={onConfirm}
            className={`${actionButtonClassName} bg-[#DFC58A] text-[#1B1B1B]`}
          >
            {isSaving ? "Saving..." : "Confirm"}
          </button>
          <button
            ref={cancelRef}
            type="button"
            disabled={isSaving}
            onClick={onCancel}
            className={`${actionButtonClassName} border border-white/10 bg-[#252525] text-[#F5F5F5]`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function ProfileSection({ user }: { user: AdminUserDetail }) {
  return (
    <DarkCard>
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#252525] text-lg font-bold text-[#DFC58A] ring-1 ring-white/10">
          {getDisplayInitials(user.display_name)}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-extrabold tracking-tight text-[#F5F5F5]">
            {user.display_name}
          </h2>
          <p className="mt-1 break-all text-sm text-[#B8B8B8] sm:truncate">
            {user.email}
          </p>

          <div className="mt-3 flex flex-wrap gap-1">
            <DarkBadge variant={getRoleVariant(user.role)}>
              {user.role}
            </DarkBadge>
            <DarkBadge variant={getAccountStatusVariant(user.account_status)}>
              {formatAccountStatusLabel(user.account_status)}
            </DarkBadge>
            {user.is_verified_realtor && (
              <DarkBadge variant="success">Verified</DarkBadge>
            )}
            {user.application_status && (
              <DarkBadge
                variant={getApplicationVariant(user.application_status)}
              >
                {user.application_status}
              </DarkBadge>
            )}
          </div>
        </div>
      </div>
    </DarkCard>
  )
}

function AccountSection({ user }: { user: AdminUserDetail }) {
  return (
    <DarkCard>
      <h2 className="text-sm font-bold text-[#F5F5F5]">Account</h2>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-[#B8B8B8]">User ID</dt>
          <dd className="mt-0.5 text-[#F5F5F5]">{user.id}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#B8B8B8]">Role</dt>
          <dd className="mt-0.5 text-[#F5F5F5]">{user.role}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#B8B8B8]">Account Status</dt>
          <dd className="mt-0.5 text-[#F5F5F5]">
            {formatAccountStatusLabel(user.account_status)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-[#B8B8B8]">Listings</dt>
          <dd className="mt-0.5 text-[#F5F5F5]">
            {user.listings_count.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-[#B8B8B8]">Registered</dt>
          <dd className="mt-0.5 text-[#F5F5F5]">
            {formatRegisteredAt(user.registered_at)}
          </dd>
        </div>
      </dl>
    </DarkCard>
  )
}

function ContactSection({ user }: { user: AdminUserDetail }) {
  return (
    <DarkCard>
      <h2 className="text-sm font-bold text-[#F5F5F5]">Contact</h2>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-[#B8B8B8]">Phone</dt>
          <dd className="mt-0.5 text-[#F5F5F5]">
            {formatOptionalValue(user.phone)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-[#B8B8B8]">Agency</dt>
          <dd className="mt-0.5 text-[#F5F5F5]">
            {formatOptionalValue(user.agency_name)}
          </dd>
        </div>
      </dl>
    </DarkCard>
  )
}

function RoleManagementSection({
  user,
  onRoleUpdated,
  onSuccess,
}: {
  user: AdminUserDetail
  onRoleUpdated: (updatedUser: AdminUserDetail) => void
  onSuccess: () => void
}) {
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const [selectedRole, setSelectedRole] = useState<ManageableUserRole>(
    isManageableRole(user.role) ? user.role : "user"
  )
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  const hasRoleChange = isManageableRole(user.role) && selectedRole !== user.role

  function handleSaveClick() {
    if (!hasRoleChange || isSaving) {
      return
    }

    setSaveError("")
    setShowConfirm(true)
  }

  function handleCancelConfirm() {
    if (isSaving) {
      return
    }

    setShowConfirm(false)
  }

  async function handleConfirmRoleChange() {
    if (!hasRoleChange || isSaving) {
      return
    }

    setSaveError("")

    try {
      setIsSaving(true)

      await updateUserRole(user.id, selectedRole)

      const refreshedUser = await getAdminUserById(user.id)

      onRoleUpdated(refreshedUser)
      sessionStorage.setItem(ADMIN_USERS_RELOAD_KEY, "1")
      setShowConfirm(false)
      onSuccess()
    } catch (updateError) {
      setSaveError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update user role."
      )
      setShowConfirm(false)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isManageableRole(user.role)) {
    return (
      <DarkCard>
        <h2 className="text-sm font-bold text-[#F5F5F5]">Role Management</h2>
        <p className="mt-2 text-sm text-[#B8B8B8]">
          Admin role is protected and cannot be changed from this page.
        </p>
      </DarkCard>
    )
  }

  return (
    <>
      <DarkCard aria-busy={isSaving}>
        <h2 className="text-sm font-bold text-[#F5F5F5]">Role Management</h2>

        <div className="mt-4 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
              Current Role
            </p>
            <div className="mt-2">
              <DarkBadge variant={getRoleVariant(user.role)}>
                {user.role}
              </DarkBadge>
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
              New Role
            </span>
            <select
              value={selectedRole}
              disabled={isSaving}
              onChange={(event) =>
                setSelectedRole(event.target.value as ManageableUserRole)
              }
              className={selectClassName}
            >
              <option value="user">User</option>
              <option value="realtor">Realtor</option>
            </select>
          </label>

          {saveError && (
            <p
              role="alert"
              className="rounded-2xl border border-red-400/20 bg-red-950/30 p-3 text-sm font-medium text-red-100"
            >
              {saveError}
            </p>
          )}

          <button
            ref={saveButtonRef}
            type="button"
            disabled={!hasRoleChange || isSaving}
            onClick={handleSaveClick}
            className={`${actionButtonClassName} w-full bg-[#DFC58A] text-[#1B1B1B]`}
          >
            Save
          </button>
        </div>
      </DarkCard>

      <ConfirmDialog
        isOpen={showConfirm}
        isSaving={isSaving}
        titleId="role-confirm-title"
        title="Confirm role change"
        description="Are you sure you want to change this user's role?"
        onCancel={handleCancelConfirm}
        onConfirm={() => void handleConfirmRoleChange()}
        triggerRef={saveButtonRef}
      />
    </>
  )
}

function AccountStatusManagementSection({
  user,
  currentAdminId,
  onUserUpdated,
  onSuccess,
}: {
  user: AdminUserDetail
  currentAdminId: number | undefined
  onUserUpdated: (updatedUser: AdminUserDetail) => void
  onSuccess: () => void
}) {
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const initialStatus = isAccountStatusValue(user.account_status)
    ? user.account_status
    : "active"

  const [selectedStatus, setSelectedStatus] =
    useState<ManageableAccountStatus>(initialStatus)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  const isSelfTarget =
    currentAdminId !== undefined && currentAdminId === user.id
  const hasStatusChange =
    canManageAccountStatus(user.role) &&
    !isSelfTarget &&
    selectedStatus !== user.account_status

  function handleSaveClick() {
    if (!hasStatusChange || isSaving) {
      return
    }

    setSaveError("")
    setShowConfirm(true)
  }

  function handleCancelConfirm() {
    if (isSaving) {
      return
    }

    setShowConfirm(false)
  }

  async function handleConfirmStatusChange() {
    if (!hasStatusChange || isSaving) {
      return
    }

    setSaveError("")

    try {
      setIsSaving(true)

      const refreshedUser = await updateAdminUserAccountStatus(
        user.id,
        selectedStatus
      )

      onUserUpdated(refreshedUser)
      sessionStorage.setItem(ADMIN_USERS_RELOAD_KEY, "1")
      setShowConfirm(false)
      onSuccess()
    } catch (updateError) {
      setSaveError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update account status."
      )
      setShowConfirm(false)
    } finally {
      setIsSaving(false)
    }
  }

  if (!canManageAccountStatus(user.role)) {
    return (
      <DarkCard>
        <h2 className="text-sm font-bold text-[#F5F5F5]">Account Status</h2>
        <p className="mt-2 text-sm text-[#B8B8B8]">
          Admin account status is protected and cannot be changed from this page.
        </p>
      </DarkCard>
    )
  }

  if (isSelfTarget) {
    return (
      <DarkCard>
        <h2 className="text-sm font-bold text-[#F5F5F5]">Account Status</h2>
        <p className="mt-2 text-sm text-[#B8B8B8]">
          You cannot change your own account status from this page.
        </p>
      </DarkCard>
    )
  }

  return (
    <>
      <DarkCard aria-busy={isSaving}>
        <h2 className="text-sm font-bold text-[#F5F5F5]">Account Status</h2>

        <div className="mt-4 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
              Current Status
            </p>
            <div className="mt-2">
              <DarkBadge variant={getAccountStatusVariant(user.account_status)}>
                {formatAccountStatusLabel(user.account_status)}
              </DarkBadge>
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
              New Status
            </span>
            <select
              value={selectedStatus}
              disabled={isSaving}
              onChange={(event) => {
                const value = event.target.value
                if (isAccountStatusValue(value)) {
                  setSelectedStatus(value)
                }
              }}
              className={selectClassName}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="blocked">Blocked</option>
            </select>
          </label>

          {(selectedStatus === "suspended" || selectedStatus === "blocked") && (
            <p className="rounded-2xl border border-amber-400/20 bg-amber-950/20 p-3 text-sm text-amber-100">
              Suspended and blocked accounts cannot authenticate normally.
            </p>
          )}

          {saveError && (
            <p
              role="alert"
              className="rounded-2xl border border-red-400/20 bg-red-950/30 p-3 text-sm font-medium text-red-100"
            >
              {saveError}
            </p>
          )}

          <button
            ref={saveButtonRef}
            type="button"
            disabled={!hasStatusChange || isSaving}
            onClick={handleSaveClick}
            className={`${actionButtonClassName} w-full bg-[#DFC58A] text-[#1B1B1B]`}
          >
            Save
          </button>
        </div>
      </DarkCard>

      <ConfirmDialog
        isOpen={showConfirm}
        isSaving={isSaving}
        titleId="account-status-confirm-title"
        title="Confirm account status change"
        description="Are you sure you want to change this user's account status? Suspended and blocked accounts cannot authenticate normally."
        onCancel={handleCancelConfirm}
        onConfirm={() => void handleConfirmStatusChange()}
        triggerRef={saveButtonRef}
      />
    </>
  )
}

export default function AdminUserDetailPage() {
  const params = useParams()
  const userId = Number(params.id)
  const { user: currentAdmin } = useAuth()

  const [user, setUser] = useState<AdminUserDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [toastMessage, setToastMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadUser() {
      setError("")

      if (!Number.isFinite(userId) || userId < 1) {
        if (!isMounted) {
          return
        }

        setUser(null)
        setError("User not found.")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)

        const data = await getAdminUserById(userId)

        if (!isMounted) {
          return
        }

        setUser(data)
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setUser(null)
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load user."
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadUser()

    return () => {
      isMounted = false
    }
  }, [userId])

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timer = window.setTimeout(() => setToastMessage(""), 2800)

    return () => window.clearTimeout(timer)
  }, [toastMessage])

  if (isLoading) {
    return (
      <AdminRoute>
        <DetailSkeleton />
      </AdminRoute>
    )
  }

  return (
    <AdminRoute>
      <AdminPageShell>
        <Link
          href="/admin/users"
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#DFC58A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to users
        </Link>

        {error || !user ? (
          <>
            <header>
              <p className="text-xs font-bold uppercase tracking-wide text-[#DFC58A]">
                User Management
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#F5F5F5] md:text-3xl">
                User Details
              </h1>
              <p className="mt-2 text-sm text-[#B8B8B8]">Account overview.</p>
            </header>

            <section
              role="alert"
              className="rounded-[24px] border border-red-400/20 bg-red-950/30 p-5"
            >
              <p className="text-sm font-medium text-red-100">
                {error || "User not found."}
              </p>
              <Link
                href="/admin/users"
                className="mt-4 inline-flex h-11 items-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
              >
                Back to users
              </Link>
            </section>
          </>
        ) : (
          <>
            <header>
              <p className="text-xs font-bold uppercase tracking-wide text-[#DFC58A]">
                User Management
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#F5F5F5] md:text-3xl">
                User Details
              </h1>
              <p className="mt-2 text-sm text-[#B8B8B8]">
                Account overview, role, and status management.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">
              <div className="space-y-4">
                <ProfileSection user={user} />
                <AccountSection user={user} />
                <ContactSection user={user} />
                {user.application_status && (
                  <DarkCard>
                    <h2 className="text-sm font-bold text-[#F5F5F5]">
                      Realtor Application
                    </h2>
                    <p className="mt-2 text-sm text-[#B8B8B8]">
                      Latest application status:{" "}
                      <span className="font-semibold text-[#F5F5F5]">
                        {user.application_status}
                      </span>
                    </p>
                  </DarkCard>
                )}
              </div>

              <div className="space-y-4">
                <RoleManagementSection
                  key={`${user.id}-${user.role}`}
                  user={user}
                  onRoleUpdated={setUser}
                  onSuccess={() => setToastMessage("Role updated successfully.")}
                />
                <AccountStatusManagementSection
                  key={`${user.id}-${user.account_status}`}
                  user={user}
                  currentAdminId={currentAdmin?.id}
                  onUserUpdated={setUser}
                  onSuccess={() =>
                    setToastMessage("Account status updated successfully.")
                  }
                />
              </div>
            </div>
          </>
        )}

        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-[#DFC58A]/30 bg-[#2D2D2D] px-4 py-3 text-center text-sm font-semibold text-[#F5F5F5] shadow-lg"
          >
            {toastMessage}
          </div>
        )}
      </AdminPageShell>
    </AdminRoute>
  )
}
