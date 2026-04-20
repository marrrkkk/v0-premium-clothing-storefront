"use client"

import type { ProductColor } from "@/lib/products"
import { cn } from "@/lib/utils"

type ColorSwatchesProps = {
  colors: ProductColor[]
  value: string
  onChange: (name: string) => void
  size?: "sm" | "md"
}

export function ColorSwatches({ colors, value, onChange, size = "md" }: ColorSwatchesProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {colors.map((c) => {
        const selected = c.name === value
        return (
          <button
            key={c.name}
            type="button"
            aria-label={c.name}
            aria-pressed={selected}
            onClick={() => onChange(c.name)}
            className={cn(
              "relative inline-flex items-center justify-center border",
              size === "md" ? "h-7 w-7" : "h-5 w-5",
              selected ? "border-foreground" : "border-border",
            )}
          >
            <span
              className="block border border-foreground/10"
              style={{
                backgroundColor: c.hex,
                width: size === "md" ? "20px" : "14px",
                height: size === "md" ? "20px" : "14px",
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
