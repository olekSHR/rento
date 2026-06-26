import Link from "next/link"
import type { ButtonHTMLAttributes, ReactNode } from "react"

type PrimaryButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  className?: string
}

const baseClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl bg-blue-700 text-sm font-semibold text-white transition-transform active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"

export default function PrimaryButton({
  children,
  href,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: PrimaryButtonProps) {
  const classNames = `${baseClassName} ${className}`.trim()

  if (href && !disabled) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames}
    >
      {children}
    </button>
  )
}
