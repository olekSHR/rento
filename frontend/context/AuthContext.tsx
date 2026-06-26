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
  import { getCurrentUser, loginUser, registerUser } from "@/services/authApi";
  import { removeToken, saveToken } from "@/lib/tokenStorage";

  type AuthContextValue = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isRealtor: boolean;
    login: (data: LoginRequest) => Promise<User>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
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

    const login = useCallback(async (data: LoginRequest) => {
  const response = await loginUser(data);

  saveToken(response.access_token);

  const currentUser = await getCurrentUser();

  setUser(currentUser);

  return currentUser;
}, []);

    const register = useCallback(
  async (data: RegisterRequest) => {
    await registerUser(data);

    await login(data);
  },
  [login]
);

    function logout() {
      removeToken();
      setUser(null);
    }

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
      [user, isLoading, login, register]
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
