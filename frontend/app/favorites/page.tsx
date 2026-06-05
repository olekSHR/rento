"use client";

import { useEffect, useState } from "react";

import PropertyCard from "@/components/PropertyCard";

import { useFavorites } from "@/context/FavoritesContext";

import { getPropertyById } from "@/services/api";

import type { Property } from "@/types/property";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link"

export default function FavoritesPage() {
  const {
    favorites,
    isLoading: favoritesLoading,
  } = useFavorites();

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProperties() {
      try {
        setIsLoading(true);
        setError(null);

        if (favorites.length === 0) {
          setProperties([]);
          return;
        }

        const results = await Promise.allSettled(
          favorites.map((id) => getPropertyById(id))
        );

        const validProperties = results
          .filter(
            (
              result
            ): result is PromiseFulfilledResult<Property> =>
              result.status === "fulfilled"
          )
          .map((result) => result.value);

        setProperties(validProperties);
      } catch (error) {
        console.error(error);

        setError(
          "Не удалось загрузить избранные объекты."
        );

        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (!favoritesLoading) {
      loadProperties();
    }
  }, [favorites, favoritesLoading]);

  if (favoritesLoading || isLoading) {
    return (
      <ProtectedRoute>
      <main className="min-h-screen bg-slate-950 px-4 pb-24 pt-6 text-white">
        <h1 className="mb-6 text-2xl font-bold">
          Избранное
        </h1>

        <div className="space-y-4">
          <div className="h-64 animate-pulse rounded-3xl bg-slate-800" />
          <div className="h-64 animate-pulse rounded-3xl bg-slate-800" />
          <div className="h-64 animate-pulse rounded-3xl bg-slate-800" />
        </div>
      </main>
      </ProtectedRoute>
    );
  }

  return (
  <ProtectedRoute>
    <main className="min-h-screen bg-slate-950 px-4 pb-24 pt-6 text-white">
      <h1 className="mb-2 text-2xl font-bold">
        Избранное
      </h1>

      <p className="mb-6 text-sm text-slate-400">
        Все сохранённые объекты отображаются здесь.
      </p>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {!error && properties.length === 0 && (
  <div
    className="
      rounded-3xl
      border
      border-slate-800
      bg-slate-900
      p-6
      text-center
    "
  >
    <h2 className="mb-2 text-lg font-semibold">
      Пока нет избранных объектов
    </h2>

    <p className="mb-6 text-sm text-slate-400">
      Нажимайте на сердечко у объектов,
      чтобы добавить их сюда.
    </p>

    <Link
  href="/"
  className="
    inline-flex
    items-center
    justify-center
    rounded-2xl
    bg-white
    px-5
    py-3
    text-sm
    font-semibold
    text-black
    transition-all
    duration-200
    active:scale-95
  "
>
  Смотреть объекты
</Link>
  </div>
)}

      {properties.length > 0 && (
        <section className="space-y-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}
        </section>
      )}
    </main>
    </ProtectedRoute> 
  );
}