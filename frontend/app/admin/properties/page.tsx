"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AdminRoute from "@/components/AdminRoute";
import {
  activateProperty,
  archiveProperty,
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

function getVerificationColor(
  lastVerifiedAt?: string | null,
) {
  if (!lastVerifiedAt) {
    return "text-red-400"
  }

  const verifiedDate = new Date(lastVerifiedAt)
  const now = new Date()

  const diffMs =
    now.getTime() - verifiedDate.getTime()

  const diffDays = Math.floor(
    diffMs / (1000 * 60 * 60 * 24),
  )

  if (diffDays <= 1) {
    return "text-emerald-400"
  }

  if (diffDays <= 7) {
    return "text-yellow-400"
  }

  return "text-red-400"
}

const ACTIVE_PROPERTY_STATUSES: Property["status"][] = [
  "available",
  "reserved",
  "rented",
]

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
const [filter, setFilter] = useState<
  "all" | "active" | "pending" | "archived"
>("all");
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
              status: updatedProperty.status,
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

async function handleArchiveToggle(
  id: number,
  status: Property["status"]
) {
  try {
    const token =
      localStorage.getItem("access_token")

    if (!token) {
      throw new Error("No token")
    }

    const updatedProperty =
      status === "archived"
        ? await activateProperty(id, token)
        : await archiveProperty(id, token)

    setProperties((prev) =>
      prev.map((property) =>
        property.id === id
          ? {
              ...property,
              status: updatedProperty.status,
              last_verified_at:
                updatedProperty.last_verified_at,
            }
          : property
      )
    )
  } catch (error) {
    console.error(error)

    alert("Failed to update property status")
  }
}

const filteredProperties =
  filter === "all"
    ? properties
    : filter === "pending"
      ? properties.filter((property) => property.status === "pending")
      : filter === "archived"
        ? properties.filter((property) => property.status === "archived")
        : properties.filter((property) =>
            ACTIVE_PROPERTY_STATUSES.includes(property.status)
          )

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
          <div className="mb-6 flex items-start justify-between gap-4">
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
      shrink-0
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

<div className="mb-6 flex gap-2 overflow-x-auto pb-1">
  
  <button
    type="button"
    onClick={() => setFilter("all")}
    className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
      filter === "all"
        ? "bg-white text-black"
        : "bg-slate-800 text-white"
    }`}
  >
    All
  </button>

  <button
    type="button"
    onClick={() => setFilter("active")}
    className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
      filter === "active"
        ? "bg-white text-black"
        : "bg-slate-800 text-white"
    }`}
  >
    Active
  </button>

  <button
    type="button"
    onClick={() => setFilter("pending")}
    className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
      filter === "pending"
        ? "bg-white text-black"
        : "bg-slate-800 text-white"
    }`}
  >
    Pending
  </button>

  <button
    type="button"
    onClick={() => setFilter("archived")}
    className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
      filter === "archived"
        ? "bg-white text-black"
        : "bg-slate-800 text-white"
    }`}
  >
    Archived
  </button>
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
    {filteredProperties.map((property) => {
  const verificationLabel =
    getVerificationLabel(
      property.last_verified_at
    )

const verificationColor =
  getVerificationColor(
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

                                       
<div className="mt-3 flex flex-wrap items-center gap-2">

<span
  className={`
    inline-flex
    rounded-full
    px-3
    py-1
    text-xs
    font-semibold
    ${verificationColor}
    bg-slate-800
  `}
>
  {verificationLabel}
</span>

{property.report_count &&
  property.report_count > 0 && (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${
          property.report_count >= 3
            ? "bg-red-500/15 text-red-400"
            : "bg-yellow-500/15 text-yellow-400"
        }
      `}
    >
      ⚠ Reports: {property.report_count}
    </span>
)}
</div>
<div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`
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
                                : property.status === "pending"
                                  ? "bg-amber-500/15 text-amber-400"
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
                            : property.status === "pending"
                              ? "🟠 Pending"
                              : "⚫ Archived"}
                    </span>

                    {property.status === "pending" && (
  <button
    type="button"
    onClick={() =>
      handleVerify(property.id)
    }
    className="
  inline-flex
  rounded-full
  bg-emerald-500/15
  px-3
  py-1
  text-xs
  font-semibold
  text-emerald-400
"
  >
    Verify
  </button>
)}

                    <button
                      type="button"
                      onClick={() =>
                        handleArchiveToggle(
                        property.id,
                        property.status
                      )
                    }
                    className={`
  inline-flex
  rounded-full
  px-3
  py-1
  text-xs
  font-semibold
  ${
    property.status === "archived"
      ? "bg-blue-500/15 text-blue-400"
      : "bg-slate-700 text-slate-300"
  }
`}
                   >
                     {property.status === "archived"
                       ? "Activate"
                       : "Archive"}
                    </button>
                    </div>

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
