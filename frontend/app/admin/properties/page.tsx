"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AdminRoute from "@/components/AdminRoute";
import {
  deleteProperty,
  getAdminProperties,
  verifyProperty,
} from "@/services/api";
import type { Property } from "@/types/property";
import Image from "next/image"
import { getImageUrl } from "@/lib/getImageUrl"

function getVerificationLabel(
  lastVerifiedAt?: string | null,
) {
  if (!lastVerifiedAt) {
    return "Needs Verification"
  }

  const verifiedDate = new Date(lastVerifiedAt)
  const now = new Date()

  const diffMs =
    now.getTime() - verifiedDate.getTime()

  const diffDays = Math.floor(
    diffMs / (1000 * 60 * 60 * 24),
  )

  if (diffDays <= 0) {
    return "Verified Today"
  }

  if (diffDays === 1) {
    return "Verified Yesterday"
  }

  if (diffDays <= 7) {
    return `Verified ${diffDays} days ago`
  }

  return "Needs Verification"
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  let isMounted = true;

  async function loadProperties() {
    try {
      const token = localStorage.getItem("access_token");

     if (!token) {
       throw new Error("No token");
     }

const data = await getAdminProperties(token);

      if (!isMounted) {
        return;
      }

      setProperties(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  }

  void loadProperties();

  return () => {
    isMounted = false;
  };
}, []);

  async function handleDelete(id: number) {
    try {
      const confirmed = window.confirm(
        "Delete this property?"
      );

      if (!confirmed) {
        return;
      }

      const token =
        localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No token");
      }

      await deleteProperty(id, token);

      setProperties((prev) =>
        prev.filter((property) => property.id !== id)
      );
    } catch (error) {
      console.error(error);

      alert("Failed to delete property");
    }
  }

async function handleVerify(id: number) {
  try {
    const token =
      localStorage.getItem("access_token")

    if (!token) {
      throw new Error("No token")
    }

    const updatedProperty =
      await verifyProperty(id, token)

    setProperties((prev) =>
      prev.map((property) =>
        property.id === id
          ? {
              ...property,
              last_verified_at:
                updatedProperty.last_verified_at,
            }
          : property
      )
    )
  } catch (error) {
    console.error(error)

    alert("Failed to verify property")
  }
}

  return (
    <AdminRoute>
      <main
        className="
          min-h-screen
          bg-slate-950
          px-4
          pb-24
          pt-6
          text-white
        "
      >
        <div className="mx-auto max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Properties
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Управление объектами недвижимости.
              </p>
            </div>

            <Link
              href="/admin/properties/create"
              className="
                rounded-2xl
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                text-black
              "
            >
              + Add
            </Link>
          </div>

          {isLoading ? (
  <div className="space-y-4">
    <div className="h-40 animate-pulse rounded-3xl bg-slate-800" />
    <div className="h-40 animate-pulse rounded-3xl bg-slate-800" />
  </div>
) : properties.length === 0 ? (
  <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center">
    <h2 className="mb-2 text-lg font-semibold">
      No properties yet
    </h2>

    <p className="mb-6 text-sm text-slate-400">
      Create your first property to start filling the marketplace.
    </p>

    <Link
      href="/admin/properties/create"
      className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black"
    >
      Add Property
    </Link>
  </div>
) : (
  <div className="space-y-4">
    {properties.map((property) => {
  const verificationLabel =
    getVerificationLabel(
      property.last_verified_at
    )

  return (
      <div
        key={property.id}
        className="
          overflow-hidden
          rounded-3xl
          bg-slate-900
        "
      >
        <div className="relative h-48 w-full">
          <Image
            src={getImageUrl(property.image_url) || "/placeholder.jpg"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
            unoptimized
          />
        </div>

                  <div className="p-4">
                    <h2 className="text-lg font-semibold">
                      {property.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      {property.city}
                    </p>

                    <p className="mt-2 text-sm font-medium text-emerald-400">
                      {verificationLabel}
                    </p>                    

                    <span
                      className={`
                        mt-3
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${
                          property.status === "available"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : property.status === "reserved"
                              ? "bg-yellow-500/15 text-yellow-400"
                              : property.status === "rented"
                                ? "bg-red-500/15 text-red-400"
                                : "bg-slate-700 text-slate-300"
                        }
                     `}
                    >
                      {property.status === "available"
                        ? "🟢 Available"
                        : property.status === "reserved"
                          ? "🟡 Reserved"
                          : property.status === "rented"
                            ? "🔴 Rented"
                            : "⚫ Archived"}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleVerify(property.id)
                      }
                      className="
                        flex-1
                        rounded-2xl
                        bg-emerald-500
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      Verify
                    </button>

                    <div className="mt-4 flex gap-3">
                      <Link
                        href={`/admin/properties/${property.id}/edit`}
                        className="
                          flex-1
                          rounded-2xl
                          bg-white
                          px-4
                          py-3
                          text-center
                          text-sm
                          font-semibold
                          text-black
                        "
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(property.id)
                        }
                        className="
                          flex-1
                          rounded-2xl
                          bg-red-500
                          px-4
                          py-3
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
               )
             })}
            </div>
          )}
        </div>
      </main>
    </AdminRoute>
  );
}
