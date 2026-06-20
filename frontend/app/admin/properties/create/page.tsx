"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import AdminRoute from "@/components/AdminRoute";

import {
  createProperty,
  uploadImage,
  addPropertyImage,
} from "@/services/api";
import Image from "next/image"
import { getImageUrl } from "@/lib/getImageUrl";


export default function CreatePropertyPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [, setImagePreview] =
  useState("");

  const [galleryImages, setGalleryImages] = useState<
  {
    url: string
    is_cover: boolean
    sort_order: number
  }[]
>([])

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

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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
    const files = Array.from(e.target.files || [])

    if (files.length === 0) {
      return
    }

    for (const file of files) {
      const response = await uploadImage(file)

      setGalleryImages((prev) => [
        ...prev,
        {
          url: response.url,
          is_cover: prev.length === 0,
          sort_order: prev.length,
        },
      ])

      setFormData((prev) => ({
        ...prev,
        image_url: prev.image_url || response.url,
      }))

      setImagePreview((prev) => prev || response.url)
    }

    e.target.value = ""
  } catch (error) {
    console.error(error)

    alert("Failed to upload images")
  }
}

function handleRemoveGalleryImage(indexToRemove: number) {
  setGalleryImages((prev) => {
    const filtered = prev.filter((_, index) => index !== indexToRemove)

    return filtered.map((image, index) => ({
      ...image,
      is_cover: index === 0,
      sort_order: index,
    }))
  })
}

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const token =
        localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No token found");
      }

      const createdProperty = await createProperty(
  {
    title: formData.title,
    description: formData.description,
    price: Number(formData.price),
    city: formData.city,
    rooms: Number(formData.rooms),
    image_url: formData.image_url,
    status: formData.status,
    contact_name: formData.contact_name,
    phone: formData.phone,
    whatsapp: formData.whatsapp,
  },
  token
);

await Promise.all(
  galleryImages.map((image) =>
    addPropertyImage(
      createdProperty.id,
      {
        url: image.url,
        is_cover: image.is_cover,
        sort_order: image.sort_order,
      },
      token
    )
  )
)

      router.push("/");
    } catch (error) {
      console.error(error);

      alert("Failed to create property");
    } finally {
      setIsLoading(false);
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Create Property
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Добавление нового объекта недвижимости.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              value={formData.title}
              onChange={handleChange}
              className="
                w-full
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-4
                text-white
                outline-none
              "
            />

            <textarea
              name="description"
              placeholder="Description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="
                w-full
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-4
                text-white
                outline-none
              "
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              value={formData.price}
              onChange={handleChange}
              className="
                w-full
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-4
                text-white
                outline-none
              "
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              required
              value={formData.city}
              onChange={handleChange}
              className="
                w-full
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-4
                text-white
                outline-none
              "
            />

            <input
              type="number"
              name="rooms"
              placeholder="Rooms"
              required
              value={formData.rooms}
              onChange={handleChange}
              className="
                w-full
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-4
                text-white
                outline-none
              "
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="
                w-full
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-4
                text-white
                outline-none
              "
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="rented">Rented</option>
              <option value="archived">Archived</option>
            </select>

            <div>
  
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

<label className="mb-2 block text-sm font-semibold text-white">
    Photos
  </label>

  <label
    className="
      flex
      h-40
      w-full
      cursor-pointer
      flex-col
      items-center
      justify-center
      overflow-hidden
      rounded-3xl
      border
      border-dashed
      border-slate-600
      bg-slate-900
      text-slate-400
      transition-all
      duration-200
      active:scale-[0.98]
    "
  >
    <input
  type="file"
  accept="image/*"
  multiple
  onChange={handleImageUpload}
  className="hidden"
/>

    {galleryImages.length > 0 ? (
  <div
    className="
      grid
      grid-cols-2
      gap-3
      p-3
      w-full
    "
  >
    {galleryImages.map((image, index) => (
      <div
        key={`${image.url}-${index}`}
        className="
          relative
          h-32
          overflow-hidden
          rounded-2xl
          border
          border-slate-700
        "
      >
        <Image
  src={getImageUrl(image.url) || "/placeholder.jpg"}
  alt={`Preview ${index + 1}`}
  fill
  sizes="(max-width: 768px) 50vw, 200px"
  className="object-cover"
/>

        {image.is_cover && (
          <div
            className="
              absolute
              left-2
              top-2
              rounded-full
              bg-black/80
              px-3
              py-1
              text-xs
              font-semibold
              text-white
            "
          >
            Cover
          </div>
        )}

        <button
  type="button"
  onClick={(event) => {
    event.preventDefault()
    handleRemoveGalleryImage(index)
  }}
  className="
    absolute
    right-2
    top-2
    flex
    h-8
    w-8
    items-center
    justify-center
    rounded-full
    bg-black/80
    text-sm
    font-bold
    text-white
  "
>
  ×
</button>
      </div>
    ))}
  </div>
) : (
  <>
    <span
      className="
        mb-3
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-slate-800
        text-4xl
        text-white
      "
    >
      +
    </span>

    <span className="text-sm">
      Add Photos
    </span>
  </>
)}
  </label>
</div>

  

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                rounded-2xl
                bg-white
                p-4
                font-semibold
                text-black
                transition-all
                duration-200
                active:scale-[0.98]
                disabled:opacity-50
              "
            >
              {isLoading
                ? "Creating..."
                : "Create Property"}
            </button>
          </form>
        </div>
      </main>
    </AdminRoute>
  );
}
