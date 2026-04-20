"use client"

import Image from "next/image"
import * as React from "react"
import { cn } from "@/lib/utils"

type ProductGalleryProps = {
  images: string[]
  alt: string
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = React.useState(0)
  const current = images[active] ?? images[0] ?? "/placeholder.svg"

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full overflow-hidden border border-border bg-secondary">
        <div className="aspect-[4/5] w-full">
          <Image
            src={current || "/placeholder.svg"}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                "relative aspect-square overflow-hidden border bg-secondary",
                i === active ? "border-foreground" : "border-border",
              )}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
