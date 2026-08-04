"use client"

import { useEffect, useRef } from "react"

type ConfirmDialogProps = {
  isOpen: boolean
  isPending: boolean
  titleId: string
  title: string
  description: string
  confirmLabel?: string
  pendingLabel?: string
  destructive?: boolean
  onCancel: () => void
  onConfirm: () => void
}

const confirmButtonClassName =
  "flex h-11 flex-1 items-center justify-center rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-70"

const destructiveButtonClassName =
  "flex h-11 flex-1 items-center justify-center rounded-2xl border border-red-400/25 bg-[#2A2020] text-sm font-semibold text-red-200 transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-70"

const cancelButtonClassName =
  "flex h-11 flex-1 items-center justify-center rounded-2xl border border-white/10 bg-[#252525] text-sm font-semibold text-[#F5F5F5] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-70"

export default function ConfirmDialog({
  isOpen,
  isPending,
  titleId,
  title,
  description,
  confirmLabel = "Confirm",
  pendingLabel = "Working...",
  destructive = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    cancelRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isPending) {
        onCancel()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, isPending, onCancel])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#1B1B1B]/80 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={`${titleId}-description`}
        className="w-full max-w-md rounded-[24px] border border-white/8 bg-[#2D2D2D] p-6 shadow-lg"
      >
        <h2 id={titleId} className="text-base font-bold text-[#F5F5F5]">
          {title}
        </h2>
        <p id={`${titleId}-description`} className="mt-2 text-sm text-[#B8B8B8]">
          {description}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            type="button"
            disabled={isPending}
            onClick={onConfirm}
            className={destructive ? destructiveButtonClassName : confirmButtonClassName}
          >
            {isPending ? pendingLabel : confirmLabel}
          </button>
          <button
            ref={cancelRef}
            type="button"
            disabled={isPending}
            onClick={onCancel}
            className={cancelButtonClassName}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
