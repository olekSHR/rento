"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import AdminRoute from "@/components/AdminRoute"
import PageHeader from "@/components/ui/PageHeader"
import PageShell from "@/components/ui/PageShell"
import PrimaryButton from "@/components/ui/PrimaryButton"
import SecondaryButton from "@/components/ui/SecondaryButton"
import SectionCard from "@/components/ui/SectionCard"
import StatusBadge from "@/components/ui/StatusBadge"
import { getToken } from "@/lib/tokenStorage"
import {
  getAdminUserById,
  updateUserRole,
  type AdminUserDetail,
  type ManageableUserRole,
} from "@/services/api"

const ADMIN_USERS_RELOAD_KEY = "adminUsersNeedsReload"

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

function getRoleVariant(
  role: string
): "success" | "warning" | "neutral" | "info" {
  if (role === "admin") {
    return "info"
  }

  if (role === "realtor") {
    return "success"
  }

  return "neutral"
}

function getApplicationVariant(
  status: string
): "success" | "warning" | "danger" | "neutral" {
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

function DetailSkeleton() {
  return (
    <PageShell>
      <div className="h-5 w-32 animate-pulse rounded bg-zinc-200" />
      <div className="h-40 animate-pulse rounded-3xl bg-zinc-200" />
      <div className="h-48 animate-pulse rounded-3xl bg-zinc-200" />
    </PageShell>
  )
}

function ProfileSection({ user }: { user: AdminUserDetail }) {
  return (
    <SectionCard>
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-lg font-bold text-white">
          {getDisplayInitials(user.display_name)}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-extrabold tracking-tight text-zinc-900">
            {user.display_name}
          </h2>
          <p className="mt-1 truncate text-sm text-zinc-500">{user.email}</p>

          <div className="mt-3 flex flex-wrap gap-1">
            <StatusBadge variant={getRoleVariant(user.role)}>
              {user.role}
            </StatusBadge>
            {user.is_verified_realtor && (
              <StatusBadge variant="success">Verified</StatusBadge>
            )}
            {user.application_status && (
              <StatusBadge
                variant={getApplicationVariant(user.application_status)}
              >
                {user.application_status}
              </StatusBadge>
            )}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

function AccountSection({ user }: { user: AdminUserDetail }) {
  return (
    <SectionCard>
      <h2 className="text-sm font-bold text-zinc-900">Account</h2>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-zinc-700">User ID</dt>
          <dd className="mt-0.5 text-zinc-500">{user.id}</dd>
        </div>
        <div>
          <dt className="font-semibold text-zinc-700">Role</dt>
          <dd className="mt-0.5 text-zinc-500">{user.role}</dd>
        </div>
        <div>
          <dt className="font-semibold text-zinc-700">Listings</dt>
          <dd className="mt-0.5 text-zinc-500">
            {user.listings_count.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-zinc-700">Registered</dt>
          <dd className="mt-0.5 text-zinc-500">
            {formatRegisteredAt(user.registered_at)}
          </dd>
        </div>
      </dl>
    </SectionCard>
  )
}

function ContactSection({ user }: { user: AdminUserDetail }) {
  return (
    <SectionCard>
      <h2 className="text-sm font-bold text-zinc-900">Contact</h2>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-zinc-700">Phone</dt>
          <dd className="mt-0.5 text-zinc-500">
            {formatOptionalValue(user.phone)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-zinc-700">Agency</dt>
          <dd className="mt-0.5 text-zinc-500">
            {formatOptionalValue(user.agency_name)}
          </dd>
        </div>
      </dl>
    </SectionCard>
  )
}

function RoleConfirmDialog({
  isOpen,
  isSaving,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean
  isSaving: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="presentation"
      onClick={isSaving ? undefined : onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-confirm-title"
        className="w-full max-w-md rounded-3xl bg-white p-6 ring-1 ring-zinc-200 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="role-confirm-title"
          className="text-base font-bold text-zinc-900"
        >
          Confirm role change
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Are you sure you want to change this user&apos;s role?
        </p>

        <div className="mt-6 space-y-3">
          <PrimaryButton disabled={isSaving} onClick={onConfirm}>
            {isSaving ? "Saving..." : "Confirm"}
          </PrimaryButton>
          <SecondaryButton disabled={isSaving} onClick={onCancel}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </div>
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

      const token = getToken()

      if (!token) {
        throw new Error("Unable to update user role.")
      }

      await updateUserRole(token, user.id, selectedRole)

      const refreshedUser = await getAdminUserById(token, user.id)

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
      <SectionCard>
        <h2 className="text-sm font-bold text-zinc-900">Role Management</h2>
        <p className="mt-2 text-sm text-zinc-500">
          Admin role is protected and cannot be changed from this page.
        </p>
      </SectionCard>
    )
  }

  return (
    <>
      <SectionCard>
        <h2 className="text-sm font-bold text-zinc-900">Role Management</h2>

        <div className="mt-4 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
              Current Role
            </p>
            <div className="mt-2">
              <StatusBadge variant={getRoleVariant(user.role)}>
                {user.role}
              </StatusBadge>
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
              New Role
            </span>
            <select
              value={selectedRole}
              disabled={isSaving}
              onChange={(event) =>
                setSelectedRole(event.target.value as ManageableUserRole)
              }
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-900 outline-none disabled:opacity-50"
            >
              <option value="user">User</option>
              <option value="realtor">Realtor</option>
            </select>
          </label>

          {saveError && (
            <p className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
              {saveError}
            </p>
          )}

          <PrimaryButton
            disabled={!hasRoleChange || isSaving}
            onClick={handleSaveClick}
          >
            Save
          </PrimaryButton>
        </div>
      </SectionCard>

      <RoleConfirmDialog
        isOpen={showConfirm}
        isSaving={isSaving}
        onCancel={handleCancelConfirm}
        onConfirm={() => void handleConfirmRoleChange()}
      />
    </>
  )
}

export default function AdminUserDetailPage() {
  const params = useParams()
  const userId = Number(params.id)

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

        const token = getToken()

        if (!token) {
          throw new Error("Unable to load user.")
        }

        const data = await getAdminUserById(token, userId)

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
      <PageShell>
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to users
        </Link>

        {error || !user ? (
          <>
            <PageHeader title="User Details" subtitle="Account overview." />
            <SectionCard>
              <p className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
                {error || "User not found."}
              </p>
              <div className="mt-4">
                <PrimaryButton href="/admin/users">Back to users</PrimaryButton>
              </div>
            </SectionCard>
          </>
        ) : (
          <>
            <PageHeader
              title="User Details"
              subtitle="Account overview and role management."
            />

            <ProfileSection user={user} />
            <AccountSection user={user} />
            <ContactSection user={user} />
            <RoleManagementSection
              key={`${user.id}-${user.role}`}
              user={user}
              onRoleUpdated={setUser}
              onSuccess={() => setToastMessage("Role updated successfully.")}
            />

            {user.application_status && (
              <SectionCard>
                <h2 className="text-sm font-bold text-zinc-900">
                  Realtor Application
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                  Latest application status:{" "}
                  <span className="font-semibold text-zinc-700">
                    {user.application_status}
                  </span>
                </p>
              </SectionCard>
            )}
          </>
        )}

        {toastMessage && (
          <div className="fixed bottom-24 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg">
            {toastMessage}
          </div>
        )}
      </PageShell>
    </AdminRoute>
  )
}
