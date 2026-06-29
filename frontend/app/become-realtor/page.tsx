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
import EmptyState from "@/components/ui/EmptyState"
import PageHeader from "@/components/ui/PageHeader"
import PageShell from "@/components/ui/PageShell"
import PrimaryButton from "@/components/ui/PrimaryButton"
import SectionCard from "@/components/ui/SectionCard"
import StatusBadge from "@/components/ui/StatusBadge"
import { getToken } from "@/lib/tokenStorage"
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

export default function BecomeRealtorPage() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isLoadingApplication, setIsLoadingApplication] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadExistingApplication() {
      try {
        const token = getToken()

        if (!token) {
          return
        }

        const application = await getMyRealtorApplication(token)

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

    const token = getToken()

    if (!token) {
      setError("Please sign in to submit your application.")
      return
    }

    try {
      setIsSubmitting(true)

      await createRealtorApplication(
        {
          full_name: fullName,
          phone,
          ...(formData.agency_name.trim()
            ? { agency_name: formData.agency_name.trim() }
            : {}),
          ...(formData.message.trim()
            ? { message: formData.message.trim() }
            : {}),
        },
        token
      )

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
      <PageShell>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to profile
        </Link>

        <SectionCard className="border-blue-100 bg-white shadow-[0_8px_30px_rgba(29,78,216,0.08)]">
          <div className="space-y-5">
            <StatusBadge variant="info">Early Access</StatusBadge>

            <PageHeader
              title="Become a Verified Realtor"
              subtitle="Grow your business with a professional workspace built for modern real estate agents."
            />

            {!isSubmitted && (
              <div className="space-y-2">
                <PrimaryButton onClick={scrollToApplicationForm}>
                  Request Access
                </PrimaryButton>
                <p className="text-center text-xs font-medium text-zinc-500">
                  Free during Early Access
                </p>
              </div>
            )}
          </div>
        </SectionCard>

        <div id="application-form">
          <SectionCard>
          <h2 className="text-sm font-bold text-zinc-900">Application</h2>

          {isLoadingApplication ? (
            <div className="mt-4 space-y-3">
              <div className="h-12 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-12 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-24 animate-pulse rounded-2xl bg-zinc-200" />
            </div>
          ) : isSubmitted ? (
            <div className="mt-4">
              <EmptyState
                title="Your application has been submitted."
                description="Our team will review your request shortly."
                action={
                  <PrimaryButton href="/">Back to Home</PrimaryButton>
                }
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="text"
                name="full_name"
                placeholder="Full name *"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 outline-none"
              />

              <input
                type="text"
                name="agency_name"
                placeholder="Agency name (optional)"
                value={formData.agency_name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 outline-none"
              />

              <textarea
                name="message"
                placeholder="Message (optional)"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 outline-none"
              />

              {error && (
                <p className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
                  {error}
                </p>
              )}

              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </PrimaryButton>
            </form>
          )}
          </SectionCard>
        </div>

        <SectionCard>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-700" />
            <h2 className="text-sm font-bold text-zinc-900">Benefits</h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>

        <SectionCard>
          <h2 className="text-sm font-bold text-zinc-900">Why Rento</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {WHY_RENTO.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-zinc-50 px-3 py-3 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-100"
              >
                {item}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <h2 className="text-sm font-bold text-zinc-900">How it works</h2>

          <ol className="mt-5 space-y-0">
            {TIMELINE.map((item, index) => (
              <li key={item.step} className="relative flex gap-4 pb-6 last:pb-0">
                {index < TIMELINE.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-4 top-8 h-[calc(100%-1rem)] w-px bg-zinc-200"
                  />
                )}

                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                  {item.step}
                </span>

                <div className="pt-1">
                  <p className="text-sm font-bold text-zinc-900">{item.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </SectionCard>

        <SectionCard>
          <h2 className="text-sm font-bold text-zinc-900">Future roadmap</h2>

          <div className="mt-4 space-y-2">
            {ROADMAP.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-50 px-4 py-3 ring-1 ring-zinc-100"
              >
                <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                <StatusBadge
                  variant={item.status === "available" ? "success" : "neutral"}
                >
                  {item.status === "available" ? "Available today" : "Coming soon"}
                </StatusBadge>
              </div>
            ))}
          </div>
        </SectionCard>

        {!isSubmitted && (
          <SectionCard className="border-blue-100 bg-blue-50 text-center">
            <h2 className="text-xl font-extrabold tracking-tight text-zinc-900">
              Ready to grow your business?
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Join Rento&apos;s Early Access program for professional realtors.
            </p>
            <div className="mt-5">
              <PrimaryButton onClick={scrollToApplicationForm}>
                Request Access
              </PrimaryButton>
            </div>
          </SectionCard>
        )}
      </PageShell>
      </ConsumerShell>
    </ProtectedRoute>
  )
}
