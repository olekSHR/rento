"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import RealtorRoute from "@/components/RealtorRoute"
import {
  getMyRealtorProfile,
  updateMyRealtorProfile,
  type RealtorProfile,
} from "@/services/api"

export default function RealtorProfilePage() {
  const [profile, setProfile] = useState<RealtorProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    whatsapp: "",
    agency_name: "",
    avatar_url: "",
    bio: "",
    city: "",
  })

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem("access_token")

        if (!token) {
          setIsLoading(false)
          return
        }

        const data = await getMyRealtorProfile(token)

        setProfile(data)

        setFormData({
          full_name: data.full_name || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          agency_name: data.agency_name || "",
          avatar_url: data.avatar_url || "",
          bio: data.bio || "",
          city: data.city || "",
        })
      } catch {
        setError("Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
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

    try {
      setError("")
      setSuccess("")
      setIsSaving(true)

      const token = localStorage.getItem("access_token")

      if (!token) {
        throw new Error("No token")
      }

      const updatedProfile = await updateMyRealtorProfile(
        {
          full_name: formData.full_name,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          agency_name: formData.agency_name,
          avatar_url: formData.avatar_url,
          bio: formData.bio,
          city: formData.city,
        },
        token
      )

      setProfile(updatedProfile)
      setSuccess("Profile saved")
    } catch {
      setError("Failed to save profile")
    } finally {
      setIsSaving(false)
    }
  }

  const isCompleted = profile?.is_completed ?? false

  return (
    <RealtorRoute>
      <main className="min-h-screen bg-zinc-100 px-4 pb-24 pt-6">
        <div className="mx-auto max-w-md">
          <header className="mb-6">
            <Link
              href="/realtor"
              className="text-sm font-semibold text-blue-700"
            >
              ← Back to dashboard
            </Link>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900">
              Realtor Profile
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              This information will be used automatically in your rental listings.
            </p>
          </header>

          <section
            className={`mb-6 rounded-3xl border p-4 ${
              isCompleted
                ? "border-emerald-200 bg-emerald-50"
                : "border-amber-200 bg-amber-50"
            }`}
          >
            <p
              className={`text-sm font-bold ${
                isCompleted ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {isCompleted ? "Profile Complete ✓" : "Profile Incomplete"}
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Required: full name, city, and phone or WhatsApp.
            </p>
          </section>

          {isLoading ? (
            <div className="space-y-4">
              <div className="h-14 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-14 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-32 animate-pulse rounded-2xl bg-zinc-200" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="text"
                name="whatsapp"
                placeholder="WhatsApp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="text"
                name="agency_name"
                placeholder="Agency Name"
                value={formData.agency_name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="text"
                name="avatar_url"
                placeholder="Avatar URL"
                value={formData.avatar_url}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <textarea
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              {error && (
                <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p className="rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-600">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-2xl bg-blue-700 p-4 font-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          )}
        </div>
      </main>
    </RealtorRoute>
  )
}
