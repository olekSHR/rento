"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import AdminRoute from "@/components/AdminRoute";

import {
  getPropertyById,
  updateProperty,
  uploadImage,
} from "@/services/api";

import { getToken } from "@/lib/tokenStorage";

import type { Property } from "@/types/property";
import AdminGalleryManager from "@/components/admin/AdminGalleryManager"
import Image from "next/image"
import { getImageUrl } from "@/lib/getImageUrl"

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();

  const propertyId = Number(params.id);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    rooms: "",
    image_url: "",
    status: "available",
    contact_name: "",
    phone: "",
    whatsapp: "",
  });

  useEffect(() => {
    async function loadProperty() {
      try {
        setIsLoading(true);

        const token = getToken();

        if (!token) {
          throw new Error("No token");
        }

        const property: Property = await getPropertyById(propertyId, token);

        setFormData({
          title: property.title,
          description: property.description ?? "",
          price: property.price?.toString() ?? "",
          city: property.city ?? "",
          rooms: property.rooms?.toString() ?? "",
          image_url: property.image_url ?? "",
          status: property.status,
          contact_name: property.contact_name ?? "",
          phone: property.phone ?? "",
          whatsapp: property.whatsapp ?? "",
        });

        setImagePreview(property.image_url ?? "");
      } catch (error) {
        console.error(error);
        alert("Failed to load property");
      } finally {
        setIsLoading(false);
      }
    }

    if (Number.isFinite(propertyId)) {
      loadProperty();
    }
  }, [propertyId]);

  function handleChange(
    e: React.ChangeEvent<
  HTMLInputElement |
  HTMLTextAreaElement |
  HTMLSelectElement
>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      const file = e.target.files?.[0];

      if (!file) {
        return;
      }

      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No token");
      }

      const response = await uploadImage(file, token);

      setFormData((prev) => ({
        ...prev,
        image_url: response.url,
      }));

      setImagePreview(response.url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image");
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setIsSaving(true);

      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No token");
      }

      await updateProperty(
  propertyId,
  {
    title: formData.title,
    description: formData.description,
    price: Number(formData.price),
    city: formData.city,
    rooms: Number(formData.rooms),
    status: formData.status,
    contact_name: formData.contact_name,
    phone: formData.phone,
    whatsapp: formData.whatsapp,

  },
  token
);

      router.push("/admin/properties");
    } catch (error) {
      console.error(error);
      alert("Failed to update property");
    } finally {
      setIsSaving(false);
    }
  }

  function getPreviewUrl() {
  return getImageUrl(imagePreview) || "";
}

  return (
    <AdminRoute>
      <main className="min-h-screen bg-slate-950 px-4 pb-24 pt-6 text-white">
        <div className="mx-auto max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Edit Property</h1>

            <p className="mt-2 text-sm text-slate-400">
              Редактирование объекта недвижимости.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="h-12 animate-pulse rounded-2xl bg-slate-800" />
              <div className="h-40 animate-pulse rounded-3xl bg-slate-800" />
              <div className="h-12 animate-pulse rounded-2xl bg-slate-800" />
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white outline-none"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white outline-none"
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white outline-none"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white outline-none"
                />

                <input
                  type="number"
                  name="rooms"
                  placeholder="Rooms"
                  required
                  value={formData.rooms}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white outline-none"
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white outline-none"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="rented">Rented</option>
                  <option value="archived">Archived</option>
                </select>
<input
  type="text"
  name="contact_name"
  placeholder="Contact Name"
  value={formData.contact_name}
  onChange={handleChange}
  className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white outline-none"
/>

<input
  type="text"
  name="phone"
  placeholder="Phone"
  value={formData.phone}
  onChange={handleChange}
  className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white outline-none"
/>

<input
  type="text"
  name="whatsapp"
  placeholder="WhatsApp"
  value={formData.whatsapp}
  onChange={handleChange}
  className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white outline-none"
/>
  
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Photos
                  </label>

                  <label className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-slate-600 bg-slate-900 text-slate-400 transition-all duration-200 active:scale-[0.98]">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {imagePreview ? (
                      <Image
  src={getPreviewUrl()}
  alt="Preview"
  fill
  sizes="100vw"
  className="object-cover"
/>
                    ) : (
                      <>
                        <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-4xl text-white">
                          +
                        </span>

                        <span className="text-sm">Add Photo</span>
                      </>
                    )}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full rounded-2xl bg-white p-4 font-semibold text-black transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </form>
              <AdminGalleryManager
                propertyId={Number(params.id)}
              />
            </>
          )}
        </div>
      </main>
    </AdminRoute>
  );
}
