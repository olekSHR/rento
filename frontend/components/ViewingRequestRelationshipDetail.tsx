"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import RentalDocumentsSection from "@/components/RentalDocumentsSection"
import { getImageUrl } from "@/lib/getImageUrl"
import {
  canCancelViewingRequest,
  getViewingRequestStatusLabel,
  isPropertyPubliclyAvailable,
  type ViewingRequest,
  type ViewingRequestRealtor,
  type ViewingRequestStatus,
} from "@/types/viewingRequest"

type ViewingRequestRelationshipDetailProps = {
  request: ViewingRequest | ViewingRequestRealtor
  role: "renter" | "realtor"
  backHref: string
  backLabel: string
  onCancel?: () => void
  isCancelling?: boolean
  cancelError?: string
  onAccept?: () => void
  onDecline?: () => void
  isWorking?: boolean
}

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const secondaryActionClassName =
  "inline-flex h-11 min-h-11 items-center justify-center rounded-2xl border border-white/15 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const primaryActionClassName =
  "inline-flex h-11 min-h-11 items-center justify-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#e8d099] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const cancelActionClassName =
  "inline-flex h-11 min-h-11 items-center justify-center rounded-2xl border border-red-400/20 bg-[#2A2020] px-4 text-sm font-semibold text-red-200 transition active:scale-[0.98] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function getRenterStatusGuidance(status: ViewingRequestStatus): string {
  switch (status) {
    case "pending":
      return "Your request is waiting for the listing realtor to respond."
    case "accepted":
      return "Your request was accepted. Contact the realtor to arrange the viewing time. Rental documents remain available here if you decide to proceed afterward."
    case "declined":
      return "The realtor declined this viewing request."
    case "cancelled":
      return "This viewing request was cancelled."
    default:
      return ""
  }
}

function isRealtorRequest(
  request: ViewingRequest | ViewingRequestRealtor
): request is ViewingRequestRealtor {
  return "requester_email" in request
}

function getPropertyListingBannerMessage(
  propertyStatus: string,
  role: "renter" | "realtor"
): string | null {
  if (propertyStatus === "available") {
    return null
  }

  if (propertyStatus === "archived") {
    if (role === "realtor") {
      return "This listing is no longer public. The viewing request and shared documents remain available here."
    }

    return "This listing is no longer public. Your viewing request and shared documents remain available here."
  }

  if (propertyStatus === "pending") {
    return "This listing is not currently public."
  }

  return "This listing is not currently public."
}

export default function ViewingRequestRelationshipDetail({
  request,
  role,
  backHref,
  backLabel,
  onCancel,
  isCancelling = false,
  cancelError,
  onAccept,
  onDecline,
  isWorking = false,
}: ViewingRequestRelationshipDetailProps) {
  const imageSrc = getImageUrl(request.property.image_url)
  const isPublic = isPropertyPubliclyAvailable(request.property.status)
  const listingBannerMessage = getPropertyListingBannerMessage(
    request.property.status,
    role
  )
  const realtorRequest = isRealtorRequest(request) ? request : null

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-6 md:px-8 md:py-8">
      <header className="mb-6 flex items-center gap-3 md:mb-8">
        <Link
          href={backHref}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#2D2D2D] text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
          aria-label={backLabel}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </Link>
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
            Private viewing relationship
          </p>
          <h1 className="mt-1 truncate text-[1.375rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.625rem]">
            {request.property.title}
          </h1>
        </div>
      </header>

      {listingBannerMessage ? (
        <p
          role="status"
          className="mb-4 rounded-xl border border-[#DFC58A]/20 bg-[#2A2820] px-4 py-3 text-sm leading-relaxed text-[#DFC58A]"
        >
          {listingBannerMessage}
        </p>
      ) : null}

      <div className={cardClassName}>
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#252525]">
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#F5F5F5]">
              {request.property.title}
            </p>
            {request.property.city ? (
              <p className="mt-1 text-xs text-[#B8B8B8]">{request.property.city}</p>
            ) : null}
            <p className="mt-2 text-sm font-medium text-[#DFC58A]">
              {getViewingRequestStatusLabel(request.status)}
            </p>
            <p className="mt-1 text-xs text-[#B8B8B8]">
              Requested {formatDate(request.created_at)}
            </p>
          </div>
        </div>

        {role === "renter" ? (
          <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
            {getRenterStatusGuidance(request.status)}
          </p>
        ) : null}

        {role === "realtor" && realtorRequest ? (
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#B8B8B8]">
            <p>
              <span className="font-medium text-[#F5F5F5]">Renter:</span>{" "}
              {realtorRequest.requester_email}
            </p>
            {request.status === "accepted" ? (
              <p>
                Contact the renter to arrange the viewing time and manage shared
                rental documents below.
              </p>
            ) : null}
          </div>
        ) : null}

        {request.message ? (
          <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
            <span className="font-medium text-[#F5F5F5]">
              {role === "realtor" ? "Renter message:" : "Your message:"}
            </span>{" "}
            {request.message}
          </p>
        ) : null}

        {cancelError ? (
          <p role="alert" className={`mt-4 ${errorClassName}`}>
            {cancelError}
          </p>
        ) : null}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {isPublic ? (
            <Link
              href={`/properties/${request.property_id}`}
              className={secondaryActionClassName}
            >
              Open property
            </Link>
          ) : null}

          {role === "realtor" &&
          realtorRequest &&
          request.status === "accepted" ? (
            <a
              href={`mailto:${realtorRequest.requester_email}`}
              className={primaryActionClassName}
            >
              Email renter
            </a>
          ) : null}

          {role === "renter" &&
          request.status === "accepted" &&
          isPublic ? (
            <Link
              href={`/properties/${request.property_id}#property-contact`}
              className={primaryActionClassName}
            >
              Arrange viewing
            </Link>
          ) : null}

          {role === "renter" && onCancel && canCancelViewingRequest(request.status) ? (
            <button
              type="button"
              onClick={onCancel}
              disabled={isCancelling}
              aria-busy={isCancelling}
              className={cancelActionClassName}
            >
              {isCancelling ? "Cancelling..." : "Cancel request"}
            </button>
          ) : null}

          {role === "realtor" && request.status === "pending" && onAccept && onDecline ? (
            <>
              <button
                type="button"
                onClick={onAccept}
                disabled={isWorking}
                className={primaryActionClassName}
              >
                Accept
              </button>
              <button
                type="button"
                onClick={onDecline}
                disabled={isWorking}
                className={cancelActionClassName}
              >
                Decline
              </button>
            </>
          ) : null}
        </div>
      </div>

      <RentalDocumentsSection
        viewingRequestId={request.id}
        viewingRequestStatus={request.status}
        variant="relationship-page"
      />
    </div>
  )
}
