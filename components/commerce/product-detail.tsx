"use client"

import * as React from "react"
import Link from "next/link"
import { ProductGallery } from "@/components/commerce/product-gallery"
import { ColorSwatches } from "@/components/commerce/color-swatches"
import { SizeSelector } from "@/components/commerce/size-selector"
import { QuantitySelector } from "@/components/commerce/quantity-selector"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice, type Product } from "@/lib/products"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Props = { product: Product }

export function ProductDetail({ product }: Props) {
  const router = useRouter()
  const { addItem, openCart } = useCart()
  const [color, setColor] = React.useState(product.colors[0]?.name ?? "")
  const [size, setSize] = React.useState(product.sizes[1] ?? product.sizes[0] ?? "")
  const [quantity, setQuantity] = React.useState(1)

  function addToCart() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "/placeholder.svg",
      price: product.price,
      color,
      size,
      quantity,
    })
    toast.success(`${product.name} added to your cart`)
    openCart()
  }

  function buyNow() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "/placeholder.svg",
      price: product.price,
      color,
      size,
      quantity,
    })
    router.push("/checkout")
  }

  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-8 md:mt-6 md:gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
        <ProductGallery images={product.images} alt={product.name} />

        <div className="lg:pt-2">
          <h1 className="text-xl font-medium uppercase leading-tight tracking-[-0.01em] sm:text-2xl md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{formatPrice(product.price)}</p>

          <div className="mt-6 md:mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">
                Color: <span className="text-muted-foreground">{color}</span>
              </h2>
            </div>
            <ColorSwatches colors={product.colors} value={color} onChange={setColor} />
          </div>

          <div className="mt-6 md:mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Size</h2>
              <Link
                href="/size-guide"
                className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Size Guide
              </Link>
            </div>
            <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
          </div>

          <div className="mt-6 md:mt-8">
            <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em]">Quantity</h2>
            <div className="w-36">
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>
          </div>

          <div className="mt-6 space-y-3 md:mt-8">
            <button
              type="button"
              onClick={addToCart}
              className="inline-flex w-full items-center justify-center bg-foreground px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-background hover:bg-foreground/90"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={buyNow}
              className="inline-flex w-full items-center justify-center border border-foreground px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background"
            >
              Buy It Now
            </button>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <ul className="mt-5 space-y-2">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-foreground/80">
                  <span aria-hidden className="mt-2 h-0.5 w-0.5 rounded-full bg-foreground/40" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
