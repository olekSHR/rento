type RentoGlyphProps = {
  className?: string
  size?: number
  title?: string
}

export default function RentoGlyph({
  className,
  size = 36,
  title,
}: RentoGlyphProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <rect width="64" height="64" rx="14" fill="#1B1B1B" />
      <path
        d="M18 49V15H33L47 27.5L33 40H18"
        fill="none"
        stroke="#DFC58A"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 40L48 50"
        fill="none"
        stroke="#DFC58A"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
