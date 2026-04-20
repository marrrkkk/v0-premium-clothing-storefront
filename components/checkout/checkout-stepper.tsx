import { cn } from "@/lib/utils"

export type CheckoutStep = 1 | 2 | 3 | 4

const steps: { step: CheckoutStep; label: string }[] = [
  { step: 1, label: "Shipping" },
  { step: 2, label: "Delivery" },
  { step: 3, label: "Payment" },
  { step: 4, label: "Review" },
]

export function CheckoutStepper({ current }: { current: CheckoutStep }) {
  return (
    <nav aria-label="Checkout progress">
      <ol className="grid grid-cols-4 items-start">
        {steps.map((s, i) => {
          const active = s.step === current
          const completed = s.step < current
          return (
            <li key={s.step} className="relative flex flex-col items-center">
              {/* Connector */}
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
