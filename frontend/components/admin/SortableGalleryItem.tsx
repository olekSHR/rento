"use client"

import type { ReactNode } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type SortableGalleryItemProps = {
  id: number
  children: ReactNode
}

export default function SortableGalleryItem({
  id,
  children,
}: SortableGalleryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
  relative
  transition-all
  duration-200
  ease-out
  ${isDragging
    ? "z-50 scale-105 rotate-1 opacity-90 shadow-2xl"
    : "shadow-sm"
  }
`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="
          absolute
          left-2
          top-2
          z-20
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-black/60
          text-white
          shadow
          backdrop-blur
          touch-none
          active:scale-95
        "
        aria-label="Drag image"
      >
        <span className="grid grid-cols-2 gap-0.5">
  <span className="h-1 w-1 rounded-full bg-white" />
  <span className="h-1 w-1 rounded-full bg-white" />
  <span className="h-1 w-1 rounded-full bg-white" />
  <span className="h-1 w-1 rounded-full bg-white" />
  <span className="h-1 w-1 rounded-full bg-white" />
  <span className="h-1 w-1 rounded-full bg-white" />
</span>
      </button>

      {children}
    </div>
  )
}