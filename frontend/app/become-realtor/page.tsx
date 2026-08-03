"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  BadgeCheck,
  Building2,
  Camera,
  ChevronLeft,
  Sparkles,
  Zap,
} from "lucide-react"

import ConsumerShell from "@/components/ConsumerShell"
import ProtectedRoute from "@/components/ProtectedRoute"
import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import {
  createRealtorApplication,
  getMyRealtorApplication,
} from "@/services/api"

const BENEFITS = [
  {
    icon: Building2,
    title: "Professional Workspace",
    description: "Manage listings professionally.",
  },
  {
    icon: Camera,
    title: "Unlimited Property Photos",
    description: "Present every property beautifully.",
  },
  {
    icon: Zap,
    title: "Fast Publishing",
    description: "Create listings in minutes.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Realtor",
    description: "Build trust with tenants.",
  },
] as const

const WHY_RENTO = [
  "Only active listings",
  "Mobile-first platform",
  "Professional tools",
  "Designed for long-term rentals",
] as const

const TIMELINE = [
  { step: 1, title: "Request access" },
  { step: 2, title: "Application review" },
  { step: 3, title: "Workspace activated" },
  { step: 4, title: "Publish listings" },
] as const

const ROADMAP = [
  {
    title: "Professional Workspace",
    status: "available" as const,
  },
  {
    title: "AI Listing Generator",
    status: "soon" as const,
  },
  {
    title: "Performance Analytics",
    status: "soon" as const,
  },
  {
    title: "Premium Promotion",
    status: "soon" as const,
  },
] as const

const EMPTY_FORM = {
  full_name: "",
  phone: "",
  agency_name: "",
  message: "",
}

const FORM_ERROR_ID = "become-realtor-form-error"

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"

const primaryCtaClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:pointer-events-none disabled:opacity-50"

const earlyAccessBadgeClassName =
  "inline-flex shrink-0 rounded-full border border-[#DFC58A]/20 bg-[#252525] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#DFC58A]"

const availableBadgeClassName =
  "inline-flex shrink-0 rounded-full border border-[#DFC58A]/20 bg-[#252525] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#DFC58A]"

const comingSoonBadgeClassName =
  "inline-flex shrink-0 rounded-full border border-white/10 bg-[#252525] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#B8B8B8]"

const backLinkClassName =
  "inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#DFC58A] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

const labelClassName = "mb-1.5 block text-[13px] font-medium text-[#F5F5F5]"

const inputClassName =
  "min-h-11 w-full rounded-xl border border-white/[0.08] bg-[#252525] px-3.5 py-3 text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-50"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-3 py-2.5 text-sm leading-relaxed text-red-100/90"

const surfaceItemClassName =
  "rounded-2xl border border-white/8 bg-[#252525] p-4"

const iconChipClassName =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DFC58A]/25 bg-[#252525] text-[#DFC58A]"

function formatApplicationError(message: string): string {
  const normalized = message.toLowerCase()

  if (normalized.includes("pending application")) {
    return "You already have a pending application."
  }

  if (normalized.includes("already a realtor")) {
    return "Your account already has realtor access."
  }

  if (normalized.includes("invalid token") || normalized.includes("sign in")) {
    return "Please sign in to submit your application."
  }

  return message
}

function scrollToApplicationForm() {
  document.getElementById("application-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

function BecomeRealtorIntro({
  isSubmitted,
}: {
  isSubmitted: boolean
}) {
  return (
    <header className="mb-6 md:mb-8">
      <span className={earlyAccessBadgeClassName}>Early Access</span>

      <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
        Realtor access
      </p>

      <h1 className="mt-2 text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
        Become a Realtor
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#B8B8B8]">
        Grow your business with a professional workspace built for modern real
        estate agents.
      </p>

      {!isSubmitted && (
        <div className="mt-5 max-w-md space-y-2">
          <button
            type="button"
            onClick={scrollToApplicationForm}
            className={primaryCtaClassName}
          >
            Request Access
          </button>
          <p className="text-center text-xs font-medium text-[#B8B8B8]">
            Free during Early Access
          </p>
        </div>
      )}
    </header>
  )
}

function ApplicationLoadingSkeleton() {
  return (
    <div role="status" aria-live="polite" className="mt-4 space-y-3">
      <span className="sr-only">Loading application</span>
      <div className="h-11 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
      <div className="h-11 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
      <div className="h-24 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
      <div className="h-12 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
    </div>
  )
}

function ApplicationSubmittedState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-4 rounded-[20px] border border-white/8 bg-[#252525] px-4 py-5 text-center"
    >
      <p className="text-sm font-semibold text-[#F5F5F5]">
        Your application has been submitted.
      </p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#B8B8B8]">
        Our team will review your request shortly.
      </p>
      <div className="mt-4">
        <Link href="/" className={primaryCtaClassName}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

type ApplicationFormProps = {
  formData: typeof EMPTY_FORM
  error: string
  isSubmitting: boolean
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function ApplicationForm({
  formData,
  error,
  isSubmitting,
  onChange,
  onSubmit,
}: ApplicationFormProps) {
  const hasError = error.length > 0

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="become-realtor-full-name" className={labelClassName}>
          Full name <span className="text-[#DFC58A]">*</span>
        </label>
        <input
          id="become-realtor-full-name"
          type="text"
          name="full_name"
          required
          autoComplete="name"
          value={formData.full_name}
          onChange={onChange}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? FORM_ERROR_ID : undefined}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="become-realtor-phone" className={labelClassName}>
          Phone <span className="text-[#DFC58A]">*</span>
        </label>
        <input
          id="become-realtor-phone"
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          inputMode="tel"
          value={formData.phone}
          onChange={onChange}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? FORM_ERROR_ID : undefined}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="become-realtor-agency-name" className={labelClassName}>
          Agency name <span className="text-[#B8B8B8]">(optional)</span>
        </label>
        <input
          id="become-realtor-agency-name"
          type="text"
          name="agency_name"
          autoComplete="organization"
          value={formData.agency_name}
          onChange={onChange}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? FORM_ERROR_ID : undefined}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="become-realtor-message" className={labelClassName}>
          Message <span className="text-[#B8B8B8]">(optional)</span>
        </label>
        <textarea
          id="become-realtor-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={onChange}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? FORM_ERROR_ID : undefined}
          className={`${inputClassName} min-h-[6.5rem] resize-y py-3`}
        />
      </div>

      {error && (
        <p
          id={FORM_ERROR_ID}
          role="alert"
          aria-live="polite"
          className={errorClassName}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className={primaryCtaClassName}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  )
}

function BenefitsSection() {
  return (
    <section aria-labelledby="become-realtor-benefits-heading" className={cardClassName}>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#DFC58A]" aria-hidden="true" />
        <h2
          id="become-realtor-benefits-heading"
          className="text-sm font-semibold text-[#F5F5F5]"
        >
          Benefits
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon

          return (
            <div key={benefit.title} className={surfaceItemClassName}>
              <div className="flex items-start gap-3">
                <div className={iconChipClassName}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F5F5]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#B8B8B8]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function WhyRentoSection() {
  return (
    <section aria-labelledby="become-realtor-why-heading" className={cardClassName}>
      <h2
        id="become-realtor-why-heading"
        className="text-sm font-semibold text-[#F5F5F5]"
      >
        Why Rento
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {WHY_RENTO.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/8 bg-[#252525] px-3 py-3 text-sm font-semibold text-[#F5F5F5]"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

function TimelineSection() {
  return (
    <section aria-labelledby="become-realtor-timeline-heading" className={cardClassName}>
      <h2
        id="become-realtor-timeline-heading"
        className="text-sm font-semibold text-[#F5F5F5]"
      >
        How it works
      </h2>

      <ol className="mt-5 space-y-0">
        {TIMELINE.map((item, index) => (
          <li key={item.step} className="relative flex gap-4 pb-6 last:pb-0">
            {index < TIMELINE.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-4 top-8 h-[calc(100%-1rem)] w-px bg-white/10"
              />
            )}

            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DFC58A]/25 bg-[#252525] text-xs font-bold text-[#DFC58A]">
              {item.step}
            </span>

            <div className="pt-1">
              <p className="text-sm font-semibold text-[#F5F5F5]">{item.title}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function RoadmapSection() {
  return (
    <section aria-labelledby="become-realtor-roadmap-heading" className={cardClassName}>
      <h2
        id="become-realtor-roadmap-heading"
        className="text-sm font-semibold text-[#F5F5F5]"
      >
        Future roadmap
      </h2>

      <div className="mt-4 space-y-2">
        {ROADMAP.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-[#252525] px-4 py-3"
          >
            <p className="text-sm font-semibold text-[#F5F5F5]">{item.title}</p>
            <span
              className={
                item.status === "available"
                  ? availableBadgeClassName
                  : comingSoonBadgeClassName
              }
            >
              {item.status === "available" ? "Available today" : "Coming soon"}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function BottomCtaSection() {
  return (
    <section
      aria-labelledby="become-realtor-bottom-cta-heading"
      className={`${cardClassName} border-[#DFC58A]/15 text-center`}
    >
      <h2
        id="become-realtor-bottom-cta-heading"
        className="text-lg font-semibold tracking-tight text-[#F5F5F5] md:text-xl"
      >
        Ready to grow your business?
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#B8B8B8]">
        Join Rento&apos;s Early Access program for professional realtors.
      </p>
      <div className="mx-auto mt-5 max-w-md">
        <button
          type="button"
          onClick={scrollToApplicationForm}
          className={primaryCtaClassName}
        >
          Request Access
        </button>
      </div>
    </section>
  )
}

export default function BecomeRealtorPage() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isLoadingApplication, setIsLoadingApplication] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadExistingApplication() {
      try {
        const application = await getMyRealtorApplication()

        if (application?.status === "pending") {
          setIsSubmitted(true)
        }
      } catch (loadError) {
        console.error(loadError)
      } finally {
        setIsLoadingApplication(false)
      }
    }

    loadExistingApplication()
  }, [])

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const fullName = formData.full_name.trim()
    const phone = formData.phone.trim()

    if (!fullName) {
      setError("Full name is required.")
      return
    }

    if (fullName.length < 2) {
      setError("Full name must be at least 2 characters.")
      return
    }

    if (!phone) {
      setError("Phone is required.")
      return
    }

    if (phone.length < 3) {
      setError("Phone must be at least 3 characters.")
      return
    }

    try {
      setIsSubmitting(true)

      await createRealtorApplication({
        full_name: fullName,
        phone,
        ...(formData.agency_name.trim()
          ? { agency_name: formData.agency_name.trim() }
          : {}),
        ...(formData.message.trim()
          ? { message: formData.message.trim() }
          : {}),
      })

      setIsSubmitted(true)
    } catch (submitError) {
      setError(
        formatApplicationError(
          submitError instanceof Error
            ? submitError.message
            : "Something went wrong. Please try again later."
        )
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ProtectedRoute>
      <ConsumerShell>
        <main
          className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${BOTTOM_NAV_CONTENT_CLASS}`}
        >
          <div className="mx-auto max-w-[1280px] px-5 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8 lg:px-10">
            <Link href="/profile" className={backLinkClassName}>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back to profile
            </Link>

            <BecomeRealtorIntro isSubmitted={isSubmitted} />

            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:items-start">
                <section
                  id="application-form"
                  aria-labelledby="become-realtor-application-heading"
                  className={cardClassName}
                >
                  <h2
                    id="become-realtor-application-heading"
                    className="text-sm font-semibold text-[#F5F5F5]"
                  >
                    Application
                  </h2>

                  {isLoadingApplication ? (
                    <ApplicationLoadingSkeleton />
                  ) : isSubmitted ? (
                    <ApplicationSubmittedState />
                  ) : (
                    <ApplicationForm
                      formData={formData}
                      error={error}
                      isSubmitting={isSubmitting}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                    />
                  )}
                </section>

                <div className="space-y-4 md:space-y-6">
                  <BenefitsSection />
                  <WhyRentoSection />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <TimelineSection />
                <RoadmapSection />
              </div>

              {!isSubmitted && <BottomCtaSection />}
            </div>
          </div>
        </main>
      </ConsumerShell>
    </ProtectedRoute>
  )
}
