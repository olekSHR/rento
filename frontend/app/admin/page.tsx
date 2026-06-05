"use client";

import AdminRoute from "@/components/AdminRoute";
import Link from "next/link";
export default function AdminPage() {
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
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Управление marketplace платформой.
            </p>
          </div>

          <section className="space-y-4">
            <Link
  href="/admin/properties"
  className="
    block
    w-full
    rounded-3xl
    bg-slate-900
    p-5
    text-left
    transition-all
    duration-200
    active:scale-[0.98]
  "
>
  <div className="mb-2 text-2xl">
    🏠
  </div>

  <h2 className="text-lg font-semibold">
    Manage Properties
  </h2>

  <p className="mt-1 text-sm text-slate-400">
    Создание и редактирование объектов.
  </p>
</Link>

            <button
              type="button"
              className="
                w-full
                rounded-3xl
                bg-slate-900
                p-5
                text-left
                transition-all
                duration-200
                active:scale-[0.98]
              "
            >
              <div className="mb-2 text-2xl">
                🖼️
              </div>

              <h2 className="text-lg font-semibold">
                Uploads
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Управление изображениями объектов.
              </p>
            </button>

            <button
              type="button"
              className="
                w-full
                rounded-3xl
                bg-slate-900
                p-5
                text-left
                transition-all
                duration-200
                active:scale-[0.98]
              "
            >
              <div className="mb-2 text-2xl">
                👥
              </div>

              <h2 className="text-lg font-semibold">
                Users
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Управление пользователями платформы.
              </p>
            </button>
          </section>
        </div>
      </main>
    </AdminRoute>
  );
}