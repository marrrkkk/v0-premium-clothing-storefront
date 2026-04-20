"use client"

import Image from "next/image"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/products"

type Props = {
  shippingLabel?: string
  shippingCost?: number
}

export function OrderSummary({ shippingLabel, shippingCost = 0 }: Props) {
  const { items, subtotal } = useCart()
  const total = subtotal + shippingCost

  return (
    <aside className="border border-border p-6">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Order Review</h2>

      <ul className="mt-5 divide-y divide-border">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.color}-${item.size}`}
            className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden bg-secondary">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium uppercase tracking-[0.18em]">
                {item.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.color} / {item.size}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Qty {item.quantity}</p>
            </div>
            <div className="text-right text-[12px] tabular-nums">
              {formatPrice(item.price * item.quantity)}
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">
            Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
          </dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">
            Shipping{shippingLabel ? ` · ${shippingLabel}` : ""}
          </dt>
          <dd className="tabular-nums">{formatPrice(shippingCost)}</dd>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-base">
          <dt>Total</dt>
          <dd className="font-medium tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
    </aside>
  )
}
