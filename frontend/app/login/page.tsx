"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError("");
      setIsLoading(true);

      await login({
        email,
        password,
      });

      router.push("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          p-6
          shadow-sm
        "
      >
        <h1
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="
            flex
            flex-col
            gap-4
          "
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="
              h-12
              rounded-2xl
              border
              border-zinc-300
              px-4
              outline-none
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="
              h-12
              rounded-2xl
              border
              border-zinc-300
              px-4
              outline-none
            "
          />

          {error && (
            <p
              className="
                text-sm
                text-red-500
              "
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="
              h-12
              rounded-2xl
              bg-black
              text-white
              font-medium
              active:scale-[0.98]
              transition-transform
            "
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}