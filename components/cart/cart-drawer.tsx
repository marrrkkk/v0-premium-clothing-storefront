"use client"

import Link from "next/link"
import Image from "next/image"
import { X, Minus, Plus } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/products"
import { cn } from "@/lib/utils"
import * as React from "react"

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } = useCart()

  // Lock scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-50 bg-foreground/20 transition-opacity duration-300",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      {/* Drawer */}
      <aside
        aria-label="Your cart"
        aria-hidden={!isOpen}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-border bg-background transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Your Cart</h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="inline-flex h-8 w-8 items-center justify-center text-foreground"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em]">Your cart is empty</p>
            <p className="max-w-[28ch] text-sm text-muted-foreground">
              Start with our essentials — considered pieces, built to last.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-4 inline-flex items-center justify-center bg-foreground px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
            >
              Shop Essentials
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <ul>
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.color}-${item.size}`}
                    className="flex gap-4 border-b border-border px-5 py-4"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="relative block h-20 w-16 flex-shrink-0 overflow-hidden bg-secondary"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="block truncate text-[12px] font-medium uppercase tracking-[0.18em]"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.color} / {item.size}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.productId, item.color, item.size)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="mt-3">
                        <QtyStepper
                          value={item.quantity}
                          onDecrement={() =>
                            updateQuantity(
                              item.productId,
                              item.color,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          onIncrement={() =>
                            updateQuantity(
                              item.productId,
                              item.color,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-5 py-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em]">
                <span>Subtotal ({items.length} {items.length === 1 ? "item" : "items"})</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>

              <form
                className="mt-4 flex items-center border border-border"
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

              <p className="mt-3 text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-5 inline-flex w-full items-center justify-center bg-foreground px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-2 inline-flex w-full items-center justify-center border border-foreground/90 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

function QtyStepper({
  value,
  onIncrement,
  onDecrement,
}: {
  value: number
  onIncrement: () => void
  onDecrement: () => void
}) {
  return (
    <div className="inline-flex items-center border border-border">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrement}
        className="inline-flex h-8 w-8 items-center justify-center"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <span className="min-w-8 px-2 text-center text-xs tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrement}
        className="inline-flex h-8 w-8 items-center justify-center"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  )
}
