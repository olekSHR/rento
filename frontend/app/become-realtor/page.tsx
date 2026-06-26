"use client"

import Link from "next/link"
import { useState } from "react"
import {
  BadgeCheck,
  Building2,
  Camera,
  ChevronLeft,
  Sparkles,
  Zap,
} from "lucide-react"

import BottomNav from "@/components/BottomNav"
import Modal from "@/components/Modal"
import ProtectedRoute from "@/components/ProtectedRoute"
import PageHeader from "@/components/ui/PageHeader"
import PageShell from "@/components/ui/PageShell"
import PrimaryButton from "@/components/ui/PrimaryButton"
import SectionCard from "@/components/ui/SectionCard"
import StatusBadge from "@/components/ui/StatusBadge"

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

export default function BecomeRealtorPage() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  function openRequestModal() {
    setIsRequestModalOpen(true)
  }

  return (
    <ProtectedRoute>
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

            <div className="space-y-2">
              <PrimaryButton onClick={openRequestModal}>
                Request Access
              </PrimaryButton>
              <p className="text-center text-xs font-medium text-zinc-500">
                Free during Early Access
              </p>
            </div>
          </div>
        </SectionCard>

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

        <SectionCard className="border-blue-100 bg-blue-50 text-center">
          <h2 className="text-xl font-extrabold tracking-tight text-zinc-900">
            Ready to grow your business?
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Join Rento&apos;s Early Access program for professional realtors.
          </p>
          <div className="mt-5">
            <PrimaryButton onClick={openRequestModal}>Request Access</PrimaryButton>
          </div>
        </SectionCard>
      </PageShell>

      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      >
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <Building2 className="h-6 w-6" />
          </div>

          <h3 className="text-lg font-bold text-zinc-900">
            Applications will open soon
          </h3>

          <p className="text-sm leading-6 text-zinc-500">
            Thank you for your interest. Realtor workspace access is granted by
            Rento during Early Access. We will notify you when applications open.
          </p>

          <PrimaryButton onClick={() => setIsRequestModalOpen(false)}>
            Got it
          </PrimaryButton>
        </div>
      </Modal>

      <BottomNav />
    </ProtectedRoute>
  )
}
