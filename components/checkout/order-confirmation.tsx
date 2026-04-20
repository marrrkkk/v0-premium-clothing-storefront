"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Check } from "lucide-react"

export function OrderConfirmation() {
  const params = useSearchParams()
  const orderNumber = params.get("order") ?? "SN12345678"
  const name = params.get("name") ?? "Friend"
  const shipping = params.get("shipping") ?? "Standard Shipping"
  const shippingCostRaw = params.get("shippingCost")
  const shippingCost = shippingCostRaw ? Number(shippingCostRaw) : 120
  const payment = params.get("payment") ?? "card"
  const paymentLabel =
    payment === "card"
      ? "Visa ending in 4242"
      : payment === "gcash"
        ? "GCash"
        : payment === "maya"
          ? "Maya"
          : "Bank Transfer"

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Total rendered is decorative; the cart has been cleared by this point.
  const total = shippingCost + 2940

  return (
    <div className="flex flex-col items-center text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-foreground">
        <Check className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h1 className="mt-6 text-3xl font-medium uppercase tracking-[-0.01em] md:text-4xl">
        Thank You,
        <br />
        {name}!
      </h1>
      <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Your order has been received.
      </p>
      <p className="mt-6 text-sm uppercase tracking-[0.18em]">Order #{orderNumber}</p>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
        We&apos;ll send you an email confirmation with tracking details once your order has shipped.
      </p>

      <Link
        href="/shop/new-in"
        className="mt-8 inline-flex items-center justify-center bg-foreground px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
      >
        Continue Shopping
      </Link>

      <section className="mt-12 w-full border border-border p-6 text-left">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Order Summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <Row label="Date" value={date} />
          <Row label="Payment Method" value={paymentLabel} />
          <Row label="Shipping" value={shipping} />
          <Row label="Total" value={`PHP ${total.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} bold />
        </dl>
      </section>

      <section className="mt-8 w-full text-left">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Need Help?</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Visit our{" "}
          <Link href="/help" className="text-foreground underline-offset-4 hover:underline">
            Help Center
          </Link>{" "}
          or contact us at{" "}
          <a href="mailto:hello@studionord.com" className="text-foreground underline-offset-4 hover:underline">
            hello@studionord.com
          </a>
        </p>
      </section>
    </div>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={bold ? "font-medium tabular-nums" : "tabular-nums"}>{value}</dd>
    </div>
  )
}
