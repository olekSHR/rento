import Link from "next/link"
import type { ButtonHTMLAttributes, ReactNode } from "react"

type SecondaryButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  className?: string
}

const baseClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-900 transition-transform active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"

export default function SecondaryButton({
  children,
  href,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: SecondaryButtonProps) {
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
