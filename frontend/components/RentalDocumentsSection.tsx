"use client"

import { useEffect, useRef, useState } from "react"
import { Download, FileText, Upload } from "lucide-react"

import ConfirmDialog from "@/components/realtor/ConfirmDialog"
import { useAuth } from "@/context/AuthContext"
import {
  archiveRentalDocument,
  downloadRentalDocument,
  getMyViewingRequests,
  getRealtorViewingRequests,
  getRentalDocuments,
  uploadRentalDocument,
} from "@/services/api"
import {
  formatDocumentSize,
  getRentalDocumentStatusLabel,
  RENTAL_DOCUMENT_TYPE_OPTIONS,
  type RentalDocument,
  type RentalDocumentType,
} from "@/types/rentalDocument"
import type { ViewingRequest, ViewingRequestRealtor } from "@/types/viewingRequest"

type RentalDocumentsSectionProps = {
  propertyId: number
}

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const primaryButtonClassName =
  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition active:scale-[0.98] disabled:opacity-70"

const secondaryButtonClassName =
  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] transition active:scale-[0.98] disabled:opacity-70"

const inputClassName =
  "h-11 w-full rounded-xl border border-white/[0.08] bg-[#252525] px-4 text-sm text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function pickViewingRequest(
  items: Array<ViewingRequest | ViewingRequestRealtor>,
  propertyId: number
) {
  const forProperty = items.filter((item) => item.property_id === propertyId)
  const accepted = forProperty.find((item) => item.status === "accepted")
  if (accepted) {
    return accepted
  }

  return forProperty.find((item) =>
    ["accepted", "cancelled"].includes(item.status)
  )
}

export default function RentalDocumentsSection({
  propertyId,
}: RentalDocumentsSectionProps) {
  const { isAuthenticated, isLoading, isRealtor } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [viewingRequestId, setViewingRequestId] = useState<number | null>(null)
  const [viewingRequestStatus, setViewingRequestStatus] = useState<string | null>(
    null
  )
  const [documents, setDocuments] = useState<RentalDocument[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [documentType, setDocumentType] =
    useState<RentalDocumentType>("lease_agreement")
  const [title, setTitle] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isWorking, setIsWorking] = useState(false)
  const [pendingArchiveId, setPendingArchiveId] = useState<number | null>(null)
  const [error, setError] = useState("")

  const canUpload = isRealtor && viewingRequestStatus === "accepted"

  useEffect(() => {
    if (!isAuthenticated || isLoading) {
      return
    }

    let cancelled = false

    async function loadContext() {
      setIsFetching(true)
      setError("")

      try {
        const response = isRealtor
          ? await getRealtorViewingRequests()
          : await getMyViewingRequests({ propertyId })

        const selected = isRealtor
          ? pickViewingRequest(response.items, propertyId)
          : pickViewingRequest(response.items, propertyId)

        if (!selected) {
          if (!cancelled) {
            setViewingRequestId(null)
            setViewingRequestStatus(null)
            setDocuments([])
          }
          return
        }

        const docs = await getRentalDocuments(selected.id)

        if (!cancelled) {
          setViewingRequestId(selected.id)
          setViewingRequestStatus(selected.status)
          setDocuments(docs.items)
        }

        if (!cancelled && docs.total === 0 && selected.status !== "accepted") {
          setViewingRequestId(null)
          setViewingRequestStatus(null)
          setDocuments([])
        }
      } catch {
        if (!cancelled) {
          setViewingRequestId(null)
          setViewingRequestStatus(null)
          setDocuments([])
        }
      } finally {
        if (!cancelled) {
          setIsFetching(false)
        }
      }
    }

    void loadContext()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, isLoading, isRealtor, propertyId])

  if (
    !isAuthenticated ||
    isLoading ||
    isFetching ||
    !viewingRequestId ||
    (documents.length === 0 && !canUpload)
  ) {
    return null
  }

  async function refreshDocuments(requestId: number) {
    const docs = await getRentalDocuments(requestId)
    setDocuments(docs.items)
  }

  async function handleUpload(file: File) {
    if (!viewingRequestId || !canUpload) {
      return
    }

    try {
      setError("")
      setIsUploading(true)
      await uploadRentalDocument(
        viewingRequestId,
        file,
        documentType,
        documentType === "other" ? title : undefined
      )
      await refreshDocuments(viewingRequestId)
      setTitle("")
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to upload rental document."
      )
    } finally {
      setIsUploading(false)
    }
  }

  async function handleDownload(documentId: number) {
    try {
      setError("")
      setIsWorking(true)
      await downloadRentalDocument(documentId)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to download rental document."
      )
    } finally {
      setIsWorking(false)
    }
  }

  async function handleArchive(documentId: number) {
    if (!viewingRequestId) {
      return
    }

    try {
      setError("")
      setIsWorking(true)
      await archiveRentalDocument(documentId)
      await refreshDocuments(viewingRequestId)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to archive rental document."
      )
    } finally {
      setIsWorking(false)
      setPendingArchiveId(null)
    }
  }

  return (
    <section
      id="property-documents"
      aria-labelledby="property-documents-heading"
      className={`${cardClassName} mt-8 scroll-mt-6`}
    >
      <div className="flex items-start gap-3">
        <FileText className="mt-0.5 h-5 w-5 text-[#DFC58A]" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h2
            id="property-documents-heading"
            className="text-xs font-medium uppercase tracking-[0.12em] text-[#B8B8B8]"
          >
            Rental Documents
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
            Private rental documents shared for this viewing request relationship.
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className={`${errorClassName} mt-4`}>
          {error}
        </p>
      )}

      {canUpload && (
        <div className="mt-5 space-y-3 rounded-2xl border border-white/8 bg-[#252525] p-4">
          <p className="text-sm font-medium text-[#F5F5F5]">Upload document</p>

          <label className="block text-xs font-medium uppercase tracking-[0.12em] text-[#B8B8B8]">
            Document type
            <select
              value={documentType}
              onChange={(event) =>
                setDocumentType(event.target.value as RentalDocumentType)
              }
              className={`${inputClassName} mt-2`}
            >
              {RENTAL_DOCUMENT_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {documentType === "other" && (
            <label className="block text-xs font-medium uppercase tracking-[0.12em] text-[#B8B8B8]">
              Title
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={200}
                className={`${inputClassName} mt-2`}
                placeholder="Describe this document"
              />
            </label>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0]
              event.target.value = ""

              if (file) {
                void handleUpload(file)
              }
            }}
          />

          <button
            type="button"
            className={primaryButtonClassName}
            disabled={isUploading || (documentType === "other" && !title.trim())}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            {isUploading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>
      )}

      <div className="mt-5 space-y-3">
        {documents.length === 0 ? (
          <p className="text-sm text-[#B8B8B8]">No documents uploaded yet.</p>
        ) : (
          documents.map((document) => (
            <article
              key={document.id}
              className="rounded-2xl border border-white/8 bg-[#252525] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[#F5F5F5]">
                    {document.display_name}
                  </h3>
                  <p className="mt-1 text-xs text-[#B8B8B8]">
                    {formatDocumentSize(document.size_bytes)} · Uploaded{" "}
                    {formatDate(document.created_at)}
                  </p>
                  <p className="mt-1 text-xs text-[#B8B8B8]">
                    {getRentalDocumentStatusLabel(document.status)}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-2">
                  {document.can_download ? (
                    <button
                      type="button"
                      className={secondaryButtonClassName}
                      disabled={isWorking}
                      onClick={() => void handleDownload(document.id)}
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download
                    </button>
                  ) : null}

                  {isRealtor && document.can_archive ? (
                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center rounded-2xl border border-red-400/20 bg-[#2A2020] px-4 text-sm font-semibold text-red-200 transition active:scale-[0.98] disabled:opacity-70"
                      disabled={isWorking}
                      onClick={() => setPendingArchiveId(document.id)}
                    >
                      Archive
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      <ConfirmDialog
        isOpen={pendingArchiveId !== null}
        isPending={isWorking}
        titleId="archive-document-title"
        title="Archive document?"
        description="This document will be archived and replaced only after a new upload of the same type."
        confirmLabel="Archive"
        destructive
        onCancel={() => setPendingArchiveId(null)}
        onConfirm={() => {
          if (pendingArchiveId !== null) {
            void handleArchive(pendingArchiveId)
          }
        }}
      />
    </section>
  )
}
