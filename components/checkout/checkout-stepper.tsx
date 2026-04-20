import { cn } from "@/lib/utils"

export type CheckoutStep = 1 | 2 | 3 | 4

const steps: { step: CheckoutStep; label: string }[] = [
  { step: 1, label: "Shipping" },
  { step: 2, label: "Delivery" },
  { step: 3, label: "Payment" },
  { step: 4, label: "Review" },
]

export function CheckoutStepper({ current }: { current: CheckoutStep }) {
  const currentLabel = steps.find((s) => s.step === current)?.label ?? ""

  return (
    <nav aria-label="Checkout progress">
      {/* Mobile: compact indicator with current step text */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Step {current} of 4
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground">
            {currentLabel}
          </span>
        </div>
        <div className="mt-3 flex h-0.5 items-stretch gap-1.5">
          {steps.map((s) => (
            <span
              key={s.step}
              aria-hidden
              className={cn(
                "flex-1",
                s.step <= current ? "bg-foreground" : "bg-border",
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop: full circle+label stepper */}
      <ol className="hidden grid-cols-4 items-start sm:grid">
        {steps.map((s, i) => {
          const active = s.step === current
          const completed = s.step < current
          return (
            <li key={s.step} className="relative flex flex-col items-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute right-1/2 top-4 h-px w-full",
                    completed || active ? "bg-foreground" : "bg-border",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative z-[1] inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background text-[11px] font-medium",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : completed
                      ? "border-foreground text-foreground"
                      : "border-border text-muted-foreground",
                )}
              >
                {s.step}
              </span>
              <span
                className={cn(
                  "mt-3 text-[11px] uppercase tracking-[0.18em]",
                  active || completed ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
