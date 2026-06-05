"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "@/context/AuthContext";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "@/services/favoritesApi";

interface FavoritesContextType {
  favorites: number[];

  isFavorite: (propertyId: number) => boolean;

  toggleFavorite: (propertyId: number) => Promise<void>;

  isLoading: boolean;
}

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);

      if (isAuthenticated) {
        const backendFavorites = await getFavorites();

        const favoriteIds = backendFavorites
          .map((favorite) => Number(favorite.property_id))
          .filter((id) => Number.isFinite(id));

        setFavorites(favoriteIds);
      } else {
        const localFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );

        const normalizedFavorites = localFavorites
          .map((id: string | number) => Number(id))
          .filter((id: number) => Number.isFinite(id));

        setFavorites(normalizedFavorites);
      }
    } catch (error) {
      console.error("Favorites loading error:", error);

      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
  if (authLoading) {
    return;
  }

  const timeoutId = window.setTimeout(() => {
    void loadFavorites();
  }, 0);

  return () => {
    window.clearTimeout(timeoutId);
  };
}, [authLoading, loadFavorites]);

  const saveLocalFavorites = (updatedFavorites: number[]) => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const isFavorite = useCallback(
    (propertyId: number) => {
      return favorites.includes(propertyId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (propertyId: number) => {
      const exists = favorites.includes(propertyId);

      try {
        if (isAuthenticated) {
          if (exists) {
            await removeFavorite(propertyId);

            setFavorites((prev) =>
              prev.filter((id) => id !== propertyId)
            );
          } else {
            await addFavorite(propertyId);

            setFavorites((prev) => [...prev, propertyId]);
          }
        } else {
          let updatedFavorites: number[];

          if (exists) {
            updatedFavorites = favorites.filter(
              (id) => id !== propertyId
            );
          } else {
            updatedFavorites = [...favorites, propertyId];
          }

          setFavorites(updatedFavorites);

          saveLocalFavorites(updatedFavorites);
        }
      } catch (error) {
        console.error("Favorite toggle error:", error);
      }
    },
    [favorites, isAuthenticated]
  );

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      isLoading,
    }),
    [favorites, isFavorite, toggleFavorite, isLoading]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}