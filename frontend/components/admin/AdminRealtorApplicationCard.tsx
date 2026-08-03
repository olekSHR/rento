"use client"

import Link from "next/link"
import { useEffect, useId, useRef, useState } from "react"

import type { RealtorApplication } from "@/services/api"

const actionButtonClassName =
  "inline-flex min-h-11 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-50"

function formatCreatedAt(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function formatStatusLabel(status: string): string {
  if (status === "pending") {
    return "Pending"
  }

  return status
}

export type AdminRealtorApplicationCardProps = {
  application: RealtorApplication
  isQueueBusy: boolean
  isCardBusy: boolean
  error?: string
  headingRef?: (element: HTMLHeadingElement | null) => void
  onConfirmApprove: () => void
  onReject: () => void
}

export default function AdminRealtorApplicationCard({
  application,
  isQueueBusy,
  isCardBusy,
  error,
  headingRef,
  onConfirmApprove,
  onReject,
}: AdminRealtorApplicationCardProps) {
  const [showApproveConfirm, setShowApproveConfirm] = useState(false)
  const confirmTitleId = useId()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const disabled = isQueueBusy || isCardBusy

  useEffect(() => {
    if (!showApproveConfirm) {
      return
    }

    cancelButtonRef.current?.focus()
  }, [showApproveConfirm])

  function handleApproveClick() {
    if (disabled) {
      return
    }

    setShowApproveConfirm(true)
  }

  function handleCancelApprove() {
    if (disabled) {
      return
    }

    setShowApproveConfirm(false)
  }

  function handleConfirmApprove() {
    if (disabled) {
      return
    }

    setShowApproveConfirm(false)
    onConfirmApprove()
  }

  return (
    <article
      aria-busy={isCardBusy}
      className="rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-base font-bold text-[#F5F5F5] outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
          >
            {application.full_name}
          </h2>
          <p className="mt-1 break-all text-sm text-[#B8B8B8]">{application.phone}</p>
          <Link
            href={`/admin/users/${application.user_id}`}
            className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-[#DFC58A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
          >
            View user #{application.user_id}
          </Link>
        </div>

        <span className="inline-flex shrink-0 rounded-full border border-amber-400/30 bg-amber-950/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-200">
          {formatStatusLabel(application.status)}
        </span>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-[#B8B8B8]">Agency</dt>
          <dd className="mt-0.5 break-words text-[#F5F5F5]">
            {application.agency_name || "—"}
          </dd>
        </div>

        <div>
          <dt className="font-semibold text-[#B8B8B8]">Message</dt>
          <dd className="mt-0.5 whitespace-pre-wrap break-words text-[#F5F5F5]">
            {application.message || "—"}
          </dd>
        </div>

        <div>
          <dt className="font-semibold text-[#B8B8B8]">Submitted</dt>
          <dd className="mt-0.5 text-[#F5F5F5]">
            {formatCreatedAt(application.created_at)}
          </dd>
        </div>
      </dl>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-2xl border border-red-400/20 bg-red-950/30 p-3 text-sm font-medium text-red-100"
        >
          {error}
        </p>
      )}

      {showApproveConfirm ? (
        <div
          role="alertdialog"
          aria-labelledby={confirmTitleId}
          className="mt-4 rounded-2xl border border-[#DFC58A]/30 bg-[#252525] p-4"
        >
          <h3
            id={confirmTitleId}
            className="text-sm font-bold text-[#F5F5F5]"
          >
            Grant Realtor access to {application.full_name}?
          </h3>
          <p className="mt-2 text-sm text-[#B8B8B8]">
            Approval grants this user access to the Realtor workspace.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              ref={cancelButtonRef}
              type="button"
              disabled={disabled}
              onClick={handleCancelApprove}
              className={`${actionButtonClassName} border border-white/10 bg-[#2D2D2D] text-[#F5F5F5] sm:flex-1`}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={handleConfirmApprove}
              className={`${actionButtonClassName} bg-[#DFC58A] text-[#1B1B1B] sm:flex-1`}
            >
              {isCardBusy ? "Approving..." : "Confirm approval"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3 sm:grid sm:grid-cols-2">
          <button
            type="button"
            disabled={disabled}
            onClick={handleApproveClick}
            className={`${actionButtonClassName} bg-[#DFC58A] text-[#1B1B1B]`}
          >
            Approve
          </button>
          <button
            type="button"
            disabled={disabled}
            aria-label={`Reject application from ${application.full_name}`}
            onClick={onReject}
            className={`${actionButtonClassName} border border-red-400/30 bg-[#2A2222] text-red-100`}
          >
            Reject
          </button>
        </div>
      )}
    </article>
  )
}
