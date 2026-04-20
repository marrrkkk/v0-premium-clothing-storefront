"use client"

import { cn } from "@/lib/utils"

type SizeSelectorProps = {
  sizes: string[]
  value: string
  onChange: (size: string) => void
}

export function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {sizes.map((s) => {
        const selected = s === value
        return (
          <button
            key={s}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(s)}
            className={cn(
              "flex h-10 items-center justify-center border text-[12px] font-medium uppercase tracking-[0.18em] transition-colors",
              selected
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:border-foreground",
            )}
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}
