import Link from "next/link"
import { products } from "@/lib/products"
import { ProductGrid } from "@/components/commerce/product-grid"

export function NewArrivals() {
  const wanted = ["graphic-tee", "utility-tee", "henley-shirt", "twill-cap"]
  const featured = wanted
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 md:px-8 md:py-12">
      <div className="mb-5 flex items-baseline justify-between md:mb-6">
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
