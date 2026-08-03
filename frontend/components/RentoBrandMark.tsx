import RentoGlyph from "@/components/RentoGlyph"

type RentoBrandMarkProps = {
  align?: "center" | "start"
  className?: string
}

export default function RentoBrandMark({
  align = "start",
  className = "",
}: RentoBrandMarkProps) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      } ${className}`.trim()}
    >
      <RentoGlyph
        size={36}
        className="shrink-0 shadow-[0_4px_14px_rgba(223,197,138,0.18)]"
      />

      <div className="min-w-0 leading-none">
        <p className="truncate text-[1.375rem] font-semibold tracking-tight text-[#F5F5F5]">
          Rento
        </p>

        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
          Rentals
        </p>
      </div>
    </div>
  )
}
