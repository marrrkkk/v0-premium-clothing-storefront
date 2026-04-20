"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { CheckoutStepper, type CheckoutStep } from "@/components/checkout/checkout-stepper"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/products"
import { cn } from "@/lib/utils"
import Link from "next/link"

type ShippingInfo = {
  fullName: string
  email: string
  phone: string
  address: string
  apartment: string
  city: string
  state: string
  zip: string
  country: string
  saveInfo: boolean
}

type DeliveryMethod = "standard" | "express" | "pickup"
type PaymentMethod = "card" | "gcash" | "maya" | "bank"

const deliveryOptions: {
  value: DeliveryMethod
  title: string
  description: string
  price: number
}[] = [
  {
    value: "standard",
    title: "Standard Shipping",
    description: "3–5 business days",
    price: 120,
  },
  {
    value: "express",
    title: "Express Shipping",
    description: "1–2 business days",
    price: 250,
  },
  { value: "pickup", title: "Pick up in-store (Makati)", description: "Ready in 24 hours", price: 0 },
]

export function CheckoutFlow() {
  const router = useRouter()
  const { items, subtotal, clear } = useCart()
  const [step, setStep] = React.useState<CheckoutStep>(1)

  const [shipping, setShipping] = React.useState<ShippingInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "Philippines",
    saveInfo: true,
  })
  const [delivery, setDelivery] = React.useState<DeliveryMethod>("standard")
  const [payment, setPayment] = React.useState<PaymentMethod>("card")
  const [agreed, setAgreed] = React.useState(false)
  const [summaryOpen, setSummaryOpen] = React.useState(false)

  const deliveryOption = deliveryOptions.find((o) => o.value === delivery)!
  const total = subtotal + deliveryOption.price

  function handlePlaceOrder() {
    // Fake place order
    const orderNumber = "SN" + Math.floor(10_000_000 + Math.random() * 90_000_000).toString()
    const customerName = shipping.fullName.trim().split(" ")[0] || "Friend"
    const params = new URLSearchParams({
      order: orderNumber,
      name: customerName,
      shipping: deliveryOption.title,
      shippingCost: String(deliveryOption.price),
      payment,
    })
    clear()
    router.push(`/order-confirmation?${params.toString()}`)
  }

  if (items.length === 0 && step !== 4) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center gap-4 border border-dashed border-border px-6 py-24 text-center">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">
          Nothing to check out yet
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Add a few essentials to your cart to continue.
        </p>
        <Link
          href="/shop/new-in"
          className="mt-2 inline-flex items-center justify-center bg-foreground px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
        >
          Shop New In
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <CheckoutStepper current={step} />
      </div>

      {/* Mobile-only: collapsible order summary at the top */}
      <div className="mt-8 border-y border-border lg:hidden">
        <button
          type="button"
          onClick={() => setSummaryOpen((v) => !v)}
          className="flex w-full items-center justify-between px-1 py-4 text-left"
          aria-expanded={summaryOpen}
          aria-controls="mobile-order-summary"
        >
          <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]">
            {summaryOpen ? "Hide Order Summary" : "Show Order Summary"}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                summaryOpen && "rotate-180",
              )}
              strokeWidth={1.5}
            />
          </span>
          <span className="text-sm font-medium tabular-nums">{formatPrice(total)}</span>
        </button>
        {summaryOpen && (
          <div id="mobile-order-summary" className="pb-4">
            <OrderSummary
              shippingLabel={deliveryOption.title}
              shippingCost={deliveryOption.price}
            />
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-[1fr_360px]">
        <div>
          {step === 1 && (
            <StepShipping
              value={shipping}
              onChange={setShipping}
              onContinue={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <StepDelivery
              value={delivery}
              onChange={setDelivery}
              onBack={() => setStep(1)}
              onContinue={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <StepPayment
              value={payment}
              onChange={setPayment}
              onBack={() => setStep(2)}
              onContinue={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <StepReview
              shipping={shipping}
              delivery={deliveryOption}
              payment={payment}
              agreed={agreed}
              onAgreedChange={setAgreed}
              onBack={() => setStep(3)}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
        </div>

        {/* Desktop-only sidebar */}
        <div className="hidden lg:block">
          <OrderSummary
            shippingLabel={deliveryOption.title}
            shippingCost={deliveryOption.price}
          />
        </div>
      </div>
    </div>
  )
}

/* ---------- Step 1 : Shipping ---------- */

function StepShipping({
  value,
  onChange,
  onContinue,
}: {
  value: ShippingInfo
  onChange: (v: ShippingInfo) => void
  onContinue: () => void
}) {
  function set<K extends keyof ShippingInfo>(k: K, v: ShippingInfo[K]) {
    onChange({ ...value, [k]: v })
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    onContinue()
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Shipping Information</h2>

      <FormRow>
        <Field label="Full name">
          <input
            required
            value={value.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            placeholder="Juan Dela Cruz"
            className={inputClass}
          />
        </Field>
      </FormRow>

      <FormRow>
        <Field label="Email">
          <input
            required
            type="email"
            value={value.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="juan.delacruz@email.com"
            className={inputClass}
          />
        </Field>
      </FormRow>

      <FormRow>
        <Field label="Phone">
          <input
            required
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+63 912 345 6789"
            className={inputClass}
          />
        </Field>
      </FormRow>

      <FormRow>
        <Field label="Address">
          <input
            required
            value={value.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="123 Rizal Avenue, Makati City"
            className={inputClass}
          />
        </Field>
      </FormRow>

      <FormRow>
        <Field label="Apartment, suite, etc. (optional)">
          <input
            value={value.apartment}
            onChange={(e) => set("apartment", e.target.value)}
            placeholder="Unit 5B"
            className={inputClass}
          />
        </Field>
      </FormRow>

      <FormRow columns={2}>
        <Field label="City">
          <input
            required
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Makati City"
            className={inputClass}
          />
        </Field>
        <Field label="State / Province">
          <input
            required
            value={value.state}
            onChange={(e) => set("state", e.target.value)}
            placeholder="Metro Manila"
            className={inputClass}
          />
        </Field>
      </FormRow>

      <FormRow columns={2}>
        <Field label="ZIP / Postal code">
          <input
            required
            value={value.zip}
            onChange={(e) => set("zip", e.target.value)}
            placeholder="1200"
            className={inputClass}
          />
        </Field>
        <Field label="Country">
          <select
            value={value.country}
            onChange={(e) => set("country", e.target.value)}
            className={inputClass}
          >
            <option>Philippines</option>
            <option>Singapore</option>
            <option>Hong Kong</option>
            <option>Japan</option>
          </select>
        </Field>
      </FormRow>

      <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={value.saveInfo}
          onChange={(e) => set("saveInfo", e.target.checked)}
          className="h-3.5 w-3.5 appearance-none border border-border checked:bg-foreground"
        />
        Save this information for next time
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center bg-foreground px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
      >
        Continue to Delivery
      </button>
    </form>
  )
}

/* ---------- Step 2 : Delivery ---------- */

function StepDelivery({
  value,
  onChange,
  onBack,
  onContinue,
}: {
  value: DeliveryMethod
  onChange: (v: DeliveryMethod) => void
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onContinue()
      }}
      className="space-y-6"
    >
      <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Delivery Method</h2>

      <div className="space-y-3">
        {deliveryOptions.map((o) => {
          const selected = o.value === value
          return (
            <label
              key={o.value}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 border px-4 py-4",
                selected ? "border-foreground" : "border-border",
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={cn(
                    "relative inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border",
                    selected ? "border-foreground" : "border-border",
                  )}
                >
                  {selected && <span className="h-2 w-2 rounded-full bg-foreground" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-medium uppercase tracking-[0.18em]">
                    {o.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {o.description}
                  </span>
                </span>
              </span>
              <span className="flex-shrink-0 text-sm tabular-nums">
                {o.price === 0 ? "FREE" : `PHP ${o.price.toFixed(2)}`}
              </span>
              <input
                type="radio"
                name="delivery"
                value={o.value}
                checked={selected}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
            </label>
          )
        })}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex flex-1 items-center justify-center border border-foreground px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center bg-foreground px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  )
}

/* ---------- Step 3 : Payment ---------- */

function StepPayment({
  value,
  onChange,
  onBack,
  onContinue,
}: {
  value: PaymentMethod
  onChange: (v: PaymentMethod) => void
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onContinue()
      }}
      className="space-y-6"
    >
      <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Payment Method</h2>

      <div className="space-y-3">
        <PaymentOption
          label="Credit / Debit Card"
          value="card"
          selected={value === "card"}
          onSelect={() => onChange("card")}
          right={
            <div className="hidden items-center gap-1.5 sm:flex">
              <Badge>VISA</Badge>
              <Badge>MC</Badge>
              <Badge>AMEX</Badge>
            </div>
          }
        >
          <div className="space-y-4 px-4 pb-4">
            <Field label="Card number">
              <input placeholder="1234 5678 9012 3456" className={inputClass} />
            </Field>
            <Field label="Name on card">
              <input placeholder="Juan Dela Cruz" className={inputClass} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Expiry date">
                <input placeholder="MM / YY" className={inputClass} />
              </Field>
              <Field label="CVC">
                <input placeholder="123" className={inputClass} />
              </Field>
            </div>
          </div>
        </PaymentOption>

        <PaymentOption
          label="GCash"
          value="gcash"
          selected={value === "gcash"}
          onSelect={() => onChange("gcash")}
        />
        <PaymentOption
          label="Maya"
          value="maya"
          selected={value === "maya"}
          onSelect={() => onChange("maya")}
        />
        <PaymentOption
          label="Bank Transfer"
          value="bank"
          selected={value === "bank"}
          onSelect={() => onChange("bank")}
        />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex flex-1 items-center justify-center border border-foreground px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center bg-foreground px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
        >
          Continue to Review
        </button>
      </div>
    </form>
  )
}

/* ---------- Step 4 : Review ---------- */

function StepReview({
  shipping,
  delivery,
  payment,
  agreed,
  onAgreedChange,
  onBack,
  onPlaceOrder,
}: {
  shipping: ShippingInfo
  delivery: (typeof deliveryOptions)[number]
  payment: PaymentMethod
  agreed: boolean
  onAgreedChange: (v: boolean) => void
  onBack: () => void
  onPlaceOrder: () => void
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Review Your Order</h2>

      <ReviewBlock
        title="Shipping to"
        onEdit={onBack}
        rows={[
          shipping.fullName || "—",
          [shipping.address, shipping.apartment].filter(Boolean).join(", "),
          [shipping.city, shipping.state, shipping.zip].filter(Boolean).join(", "),
          shipping.country,
          shipping.email,
          shipping.phone,
        ].filter(Boolean)}
      />

      <ReviewBlock
        title="Delivery method"
        rows={[`${delivery.title} — ${delivery.description}`]}
      />

      <ReviewBlock
        title="Payment method"
        rows={[
          payment === "card"
            ? "Credit / Debit Card ending in 3456"
            : payment === "gcash"
              ? "GCash"
              : payment === "maya"
                ? "Maya"
                : "Bank Transfer",
        ]}
      />

      <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreedChange(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 appearance-none border border-border checked:bg-foreground"
        />
        <span>
          I agree to the Terms & Conditions and Privacy Policy.
        </span>
      </label>

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex flex-1 items-center justify-center border border-foreground px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={!agreed}
          className="inline-flex flex-1 items-center justify-center bg-foreground px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-background disabled:opacity-40"
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

/* ---------- Helpers ---------- */

const inputClass =
  "h-11 w-full border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}

function FormRow({
  columns = 1,
  children,
}: {
  columns?: 1 | 2
  children: React.ReactNode
}) {
  return (
    <div className={cn("grid gap-4", columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
      {children}
    </div>
  )
}

function PaymentOption({
  label,
  value,
  selected,
  onSelect,
  right,
  children,
}: {
  label: string
  value: PaymentMethod
  selected: boolean
  onSelect: () => void
  right?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "border",
        selected ? "border-foreground" : "border-border",
      )}
    >
      <label className="flex cursor-pointer items-center justify-between gap-3 px-4 py-4">
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "relative inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border",
              selected ? "border-foreground" : "border-border",
            )}
          >
            {selected && <span className="h-2 w-2 rounded-full bg-foreground" />}
          </span>
          <span className="text-[12px] font-medium uppercase tracking-[0.18em]">{label}</span>
        </span>
        <input
          type="radio"
          name="payment"
          value={value}
          checked={selected}
          onChange={onSelect}
          className="sr-only"
        />
        {right}
      </label>
      {selected && children}
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center justify-center border border-border px-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
      {children}
    </span>
  )
}

function ReviewBlock({
  title,
  rows,
  onEdit,
}: {
  title: string
  rows: string[]
  onEdit?: () => void
}) {
  return (
    <div className="border border-border p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.22em]">{title}</h3>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Edit
          </button>
        )}
      </div>
      <div className="mt-3 space-y-1 text-sm text-foreground/80">
        {rows.map((r, i) => (
          <p key={i}>{r}</p>
        ))}
      </div>
    </div>
  )
}
