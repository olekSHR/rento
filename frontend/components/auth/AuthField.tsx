"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

import { authInputClassName, authLabelClassName } from "@/components/auth/AuthShell"

type AuthFieldProps = {
  id: string
  label: string
  name: string
  type: "email" | "password" | "text"
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  required?: boolean
  invalid?: boolean
  errorDescribedBy?: string
}

const authPasswordToggleButtonClassName =
  "absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#B8B8B8] transition-colors hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"

export default function AuthField({
  id,
  label,
  name,
  type,
  value,
  onChange,
  autoComplete,
  required = false,
  invalid = false,
  errorDescribedBy,
}: AuthFieldProps) {
  const isPasswordField = type === "password"
  const [isVisible, setIsVisible] = useState(false)

  const sharedInputProps = {
    id,
    name,
    value,
    onChange,
    required,
    autoComplete,
    "aria-invalid": invalid || undefined,
    "aria-describedby": errorDescribedBy,
  }

  return (
    <div>
      <label htmlFor={id} className={authLabelClassName}>
        {label}
      </label>

      {isPasswordField ? (
        <div className="relative">
          <input
            {...sharedInputProps}
            type={isVisible ? "text" : "password"}
            className={`${authInputClassName} pr-11`}
          />

          <button
            type="button"
            onClick={() => setIsVisible((current) => !current)}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            className={authPasswordToggleButtonClassName}
          >
            {isVisible ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      ) : (
        <input {...sharedInputProps} type={type} className={authInputClassName} />
      )}
    </div>
  )
}
