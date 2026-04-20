"use client"

import { Minus, Plus } from "lucide-react"

type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="inline-flex w-full items-center justify-between border border-border">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="inline-flex h-11 w-12 items-center justify-center disabled:opacity-40"
      >
        <Minus className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <span className="min-w-10 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="inline-flex h-11 w-12 items-center justify-center disabled:opacity-40"
      >
        <Plus className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  )
}
