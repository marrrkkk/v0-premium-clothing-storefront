"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/products"

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center gap-4 border border-dashed border-border px-6 py-24 text-center">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Your cart is empty</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Start with our essentials — considered pieces, built to last.
        </p>
        <Link
          href="/shop/new-in"
          className="mt-4 inline-flex items-center justify-center bg-foreground px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
        >
          Shop New In
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
      <ul className="border-y border-border">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.color}-${item.size}`}
            className="grid grid-cols-[96px_1fr_auto] gap-5 border-b border-border py-5 last:border-b-0 md:grid-cols-[120px_1fr_auto]"
          >
            <Link
              href={`/product/${item.slug}`}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-secondary"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
            </Link>

            <div className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/product/${item.slug}`}
                    className="text-[12px] font-medium uppercase tracking-[0.18em]"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.color} / {item.size}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.color, item.size)}
                  aria-label={`Remove ${item.name}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="mt-auto flex items-center gap-4 pt-4">
                <div className="inline-flex items-center border border-border">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      updateQuantity(item.productId, item.color, item.size, item.quantity - 1)
                    }
                    className="inline-flex h-8 w-8 items-center justify-center"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                  <span className="min-w-8 px-2 text-center text-xs tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      updateQuantity(item.productId, item.color, item.size, item.quantity + 1)
                    }
                    className="inline-flex h-8 w-8 items-center justify-center"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right text-[12px] tabular-nums">
              {formatPrice(item.price * item.quantity)}
            </div>
          </li>
        ))}
      </ul>

      <aside className="border border-border p-6">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Order Summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="text-muted-foreground">Calculated at checkout</dd>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-base">
            <dt>Total</dt>
            <dd className="font-medium tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
        </dl>

        <form
          className="mt-6 flex items-center border border-border"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="border-l border-border px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            Apply
          </button>
        </form>

        <Link
          href="/checkout"
          className="mt-6 inline-flex w-full items-center justify-center bg-foreground px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
        >
          Checkout
        </Link>
        <Link
          href="/shop/new-in"
          className="mt-2 inline-flex w-full items-center justify-center border border-foreground px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground"
        >
          Continue Shopping
        </Link>
      </aside>
    </div>
  )
}
