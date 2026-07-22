  "use client";

  import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
  import type { User } from "@/types/user";
  import type { LoginRequest, RegisterRequest } from "@/types/auth";
  import { getCurrentUser, loginUser, logoutUser, registerUser } from "@/services/authApi";
  import { removeToken } from "@/lib/tokenStorage";

  type AuthContextValue = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isRealtor: boolean;
    login: (data: LoginRequest) => Promise<User>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
  };

  const AuthContext = createContext<AuthContextValue | null>(null);

  export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      async function restoreSession() {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch {
          removeToken();
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }

      restoreSession();
    }, []);

    useEffect(() => {
      function handleUnauthorized() {
        removeToken();
        setUser(null);
      }

      window.addEventListener("auth:unauthorized", handleUnauthorized);
      return () => {
        window.removeEventListener("auth:unauthorized", handleUnauthorized);
      };
    }, []);

    const login = useCallback(async (data: LoginRequest) => {
  await loginUser(data);

  const currentUser = await getCurrentUser();

  setUser(currentUser);

  return currentUser;
}, []);

    const register = useCallback(
  async (data: RegisterRequest) => {
    await registerUser(data);

    const currentUser = await getCurrentUser();

    setUser(currentUser);
  },
  []
);

    const logout = useCallback(async () => {
      try {
        await logoutUser();
      } finally {
        removeToken();
        setUser(null);
      }
    }, []);

    const value = useMemo<AuthContextValue>(
      () => ({
        user,
        isLoading,
        isAuthenticated: user !== null,
        isAdmin: user?.role === "admin",
        isRealtor: user?.role === "realtor",
        login,
        register,
        logout,
      }),
      [user, isLoading, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
      throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
  }
