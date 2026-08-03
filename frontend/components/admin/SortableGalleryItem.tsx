"use client"

import type { ReactNode } from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const DEFAULT_DRAG_HANDLE_CLASSNAME =
  "absolute left-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1B1B1B]/90 text-[#F5F5F5] shadow backdrop-blur touch-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"

type SortableGalleryItemProps = {
  id: number
  children: ReactNode
  dragHandleClassName?: string
}

export default function SortableGalleryItem({
  id,
  children,
  dragHandleClassName = DEFAULT_DRAG_HANDLE_CLASSNAME,
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
        className={dragHandleClassName}
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
