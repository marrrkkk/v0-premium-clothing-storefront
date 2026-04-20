"use client"

import * as React from "react"
import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export type Filters = {
  subcategories: string[]
  colors: string[]
  sizes: string[]
  priceMax: number
}

export const DEFAULT_FILTERS: Filters = {
  subcategories: [],
  colors: [],
  sizes: [],
  priceMax: 5000,
}

const subOptions = ["All Tees", "Short Sleeve", "Long Sleeve", "Tanks"]
const colorOptions: { name: string; hex: string }[] = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "Off-white", hex: "#f2efe7" },
  { name: "Sand", hex: "#c9bfa6" },
  { name: "Stone", hex: "#c8c2b5" },
  { name: "Olive", hex: "#5a5a3a" },
  { name: "Charcoal", hex: "#2a2a2a" },
]
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]

type Props = {
  value: Filters
  onChange: (next: Filters) => void
  minPrice?: number
  maxPrice?: number
}

export function FilterSidebar({ value, onChange, minPrice = 0, maxPrice = 5000 }: Props) {
  function toggle<T>(arr: T[], v: T): T[] {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
  }

  return (
    <aside className="w-full">
      <div className="mb-6 flex items-center gap-2 border-y border-border py-3 text-[11px] uppercase tracking-[0.18em]">
        <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
        Filter
      </div>

      <Section title="Category">
        <ul className="space-y-2">
          {subOptions.map((o) => {
            const checked = value.subcategories.includes(o)
            return (
              <li key={o}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      onChange({ ...value, subcategories: toggle(value.subcategories, o) })
                    }
                    className="h-3.5 w-3.5 appearance-none border border-border checked:bg-foreground"
                  />
                  <span className="text-foreground/80">{o}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((c) => {
            const selected = value.colors.includes(c.name)
            return (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                onClick={() => onChange({ ...value, colors: toggle(value.colors, c.name) })}
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center border",
                  selected ? "border-foreground" : "border-border",
                )}
              >
                <span
                  className="block h-5 w-5 border border-foreground/10"
                  style={{ backgroundColor: c.hex }}
                />
              </button>
            )
          })}
        </div>
      </Section>

      <Section
        title="Size"
        action={
          value.sizes.length > 0 ? (
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              onClick={() => onChange({ ...value, sizes: [] })}
            >
              Clear
            </button>
          ) : null
        }
      >
        <ul className="space-y-2">
          {sizeOptions.map((s) => {
            const checked = value.sizes.includes(s)
            return (
              <li key={s}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onChange({ ...value, sizes: toggle(value.sizes, s) })}
                    className="h-3.5 w-3.5 appearance-none border border-border checked:bg-foreground"
                  />
                  <span className="text-foreground/80">{s}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section title="Price">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>PHP {minPrice.toLocaleString()}</span>
          <span>PHP {value.priceMax.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={100}
          value={value.priceMax}
          onChange={(e) => onChange({ ...value, priceMax: Number(e.target.value) })}
          aria-label="Maximum price"
          className="mt-3 w-full accent-foreground"
        />
      </Section>
    </aside>
  )
}

function Section({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border py-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.22em]">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}
