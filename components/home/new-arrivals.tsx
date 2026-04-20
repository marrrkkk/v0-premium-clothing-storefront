import Link from "next/link"
import { products } from "@/lib/products"
import { ProductGrid } from "@/components/commerce/product-grid"

export function NewArrivals() {
  const featured = products.slice(0, 4)
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-12 md:px-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">New Arrivals</h2>
        <Link
          href="/shop/new-in"
          className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
        >
          View All
        </Link>
      </div>
      <ProductGrid products={featured} columns={4} />
    </section>
  )
}
