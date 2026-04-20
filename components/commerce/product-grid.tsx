import { ProductCard } from "@/components/commerce/product-card"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"

type ProductGridProps = {
  products: Product[]
  columns?: 2 | 3 | 4
  className?: string
}

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns]

  return (
    <div
      className={cn(
        "grid gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-x-6",
        gridCols,
        className,
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
