export type UserRole = "user" | "admin" | "realtor"

export type User = {
  id: number;
  email: string;
  role: UserRole;
};
