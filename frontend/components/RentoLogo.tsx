import {
  getRentoLogoSrc,
  type RentoLogoVariant,
} from "@/lib/rentoBrandAssets"

type RentoLogoProps = {
  className?: string
  size?: number
  title?: string
  variant?: RentoLogoVariant
}

export default function RentoLogo({
  className = "",
  size = 36,
  title,
  variant = "symbol",
}: RentoLogoProps) {
  const src = getRentoLogoSrc(variant)

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#DFC58A] ${className}`.trim()}
      style={{ width: size, height: size }}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <img
        src={src}
        alt={title ?? ""}
        width={size}
        height={size}
        className="h-full w-full object-contain"
        draggable={false}
      />
    </span>
  )
}
