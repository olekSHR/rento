import { authFetch } from "@/lib/authFetch";

export type FavoriteRecord = {
  id: number;
  user_id: number;
  property_id: number;
};

type FavoriteListResponse = {
  items: FavoriteRecord[];
  total: number;
};

export async function getFavorites(): Promise<FavoriteRecord[]> {
  const response = (await authFetch("/favorites/")) as FavoriteListResponse;

  return Array.isArray(response.items) ? response.items : [];
}

export async function addFavorite(
  propertyId: number
): Promise<FavoriteRecord> {
  return authFetch(`/favorites/${propertyId}`, {
    method: "POST",
  });
}

export async function removeFavorite(
  propertyId: number
): Promise<void> {
  await authFetch(`/favorites/${propertyId}`, {
    method: "DELETE",
  });
}
