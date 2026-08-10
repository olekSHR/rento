"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

  toggleFavorite: (propertyId: number) => Promise<boolean>;

  isLoading: boolean;

  isToggling: (propertyId: number) => boolean;

  getToggleError: (propertyId: number) => string | null;
}

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

const GUEST_FAVORITES_STORAGE_KEY = "favorites";

const TOGGLE_ERROR_MESSAGE =
  "Could not update favorites. Please try again.";

function readGuestFavoriteIds(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const localFavorites = JSON.parse(
      localStorage.getItem(GUEST_FAVORITES_STORAGE_KEY) || "[]"
    );

    return localFavorites
      .map((id: string | number) => Number(id))
      .filter((id: number) => Number.isFinite(id));
  } catch {
    return [];
  }
}

function writeGuestFavoriteIds(ids: number[]) {
  localStorage.setItem(
    GUEST_FAVORITES_STORAGE_KEY,
    JSON.stringify(ids)
  );
}

function clearGuestFavoriteIds() {
  localStorage.removeItem(GUEST_FAVORITES_STORAGE_KEY);
}

function normalizeFavoriteRecords(
  records: Awaited<ReturnType<typeof getFavorites>>
): number[] {
  return records
    .map((favorite) => Number(favorite.property_id))
    .filter((id) => Number.isFinite(id));
}

function isTransientFavoriteMergeError(error: unknown): boolean {
  if (error instanceof TypeError) {
    return true;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("failed: 5")) {
      return true;
    }

    if (message.includes("network") || message.includes("fetch")) {
      return true;
    }
  }

  return false;
}

async function mergeGuestFavoritesIntoBackend(
  mergeLockRef: React.MutableRefObject<Promise<void> | null>
): Promise<void> {
  const guestIds = readGuestFavoriteIds();

  if (guestIds.length === 0) {
    return;
  }

  if (mergeLockRef.current) {
    await mergeLockRef.current;
    return;
  }

  const mergeTask = (async () => {
    const serverFavorites = await getFavorites();
    const serverIds = new Set(normalizeFavoriteRecords(serverFavorites));
    const uniqueGuestIds = [...new Set(guestIds)];
    const missingIds = uniqueGuestIds.filter((id) => !serverIds.has(id));
    const retryIds: number[] = [];

    for (const propertyId of missingIds) {
      try {
        await addFavorite(propertyId);
      } catch (error) {
        if (isTransientFavoriteMergeError(error)) {
          retryIds.push(propertyId);
          continue;
        }

        // Permanent failures (400/404/403, invalid property, etc.) are discarded.
      }
    }

    if (retryIds.length === 0) {
      clearGuestFavoriteIds();
      return;
    }

    writeGuestFavoriteIds(retryIds);
  })();

  mergeLockRef.current = mergeTask;

  try {
    await mergeTask;
  } finally {
    if (mergeLockRef.current === mergeTask) {
      mergeLockRef.current = null;
    }
  }
}

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [togglingIds, setTogglingIds] = useState<Set<number>>(
    () => new Set()
  );
  const [toggleErrors, setToggleErrors] = useState<
    Record<number, string>
  >({});
  const togglingRef = useRef<Set<number>>(new Set());
  const guestMergeLockRef = useRef<Promise<void> | null>(null);

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);

      if (isAuthenticated) {
        await mergeGuestFavoritesIntoBackend(guestMergeLockRef);

        const backendFavorites = await getFavorites();
        const favoriteIds = normalizeFavoriteRecords(backendFavorites);

        setFavorites(favoriteIds);
        return;
      }

      setFavorites(readGuestFavoriteIds());
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
  }, [authLoading, isAuthenticated, loadFavorites]);

  const saveLocalFavorites = (updatedFavorites: number[]) => {
    writeGuestFavoriteIds(updatedFavorites);
  };

  const beginToggle = useCallback((propertyId: number) => {
    setTogglingIds((prev) => {
      if (prev.has(propertyId)) {
        return prev;
      }

      const next = new Set(prev);
      next.add(propertyId);
      return next;
    });

    setToggleErrors((prev) => {
      if (!(propertyId in prev)) {
        return prev;
      }

      const next = { ...prev };
      delete next[propertyId];
      return next;
    });
  }, []);

  const endToggle = useCallback((propertyId: number) => {
    setTogglingIds((prev) => {
      if (!prev.has(propertyId)) {
        return prev;
      }

      const next = new Set(prev);
      next.delete(propertyId);
      return next;
    });
  }, []);

  const setToggleError = useCallback(
    (propertyId: number, message: string) => {
      setToggleErrors((prev) => ({
        ...prev,
        [propertyId]: message,
      }));
    },
    []
  );

  const isFavorite = useCallback(
    (propertyId: number) => {
      return favorites.includes(propertyId);
    },
    [favorites]
  );

  const isToggling = useCallback(
    (propertyId: number) => togglingIds.has(propertyId),
    [togglingIds]
  );

  const getToggleError = useCallback(
    (propertyId: number) => toggleErrors[propertyId] ?? null,
    [toggleErrors]
  );

  const toggleFavorite = useCallback(
    async (propertyId: number) => {
      if (togglingRef.current.has(propertyId)) {
        return false;
      }

      togglingRef.current.add(propertyId);

      const exists = favorites.includes(propertyId);

      beginToggle(propertyId);

      try {
        if (isAuthenticated) {
          const previousFavorites = favorites;

          setFavorites((prev) =>
            exists
              ? prev.filter((id) => id !== propertyId)
              : [...prev, propertyId]
          );

          try {
            if (exists) {
              await removeFavorite(propertyId);
            } else {
              await addFavorite(propertyId);
            }

            return true;
          } catch (error) {
            console.error("Favorite toggle error:", error);
            setFavorites(previousFavorites);
            setToggleError(propertyId, TOGGLE_ERROR_MESSAGE);
            return false;
          }
        }

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

        return true;
      } finally {
        togglingRef.current.delete(propertyId);
        endToggle(propertyId);
      }
    },
    [
      beginToggle,
      endToggle,
      favorites,
      isAuthenticated,
      setToggleError,
    ]
  );

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      isLoading,
      isToggling,
      getToggleError,
    }),
    [
      favorites,
      getToggleError,
      isFavorite,
      isLoading,
      isToggling,
      toggleFavorite,
    ]
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
