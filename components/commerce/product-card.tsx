import Link from "next/link"
import Image from "next/image"
import { formatPrice, type Product } from "@/lib/products"
import { cn } from "@/lib/utils"

type ProductCardProps = {
  product: Product
  priority?: boolean
  className?: string
  aspect?: "portrait" | "square"
}

export function ProductCard({ product, priority, className, aspect = "portrait" }: ProductCardProps) {
  const primary = product.images[0] ?? "/placeholder.svg"
  const secondary = product.images[1]

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn("group block", className)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-secondary",
          aspect === "portrait" ? "aspect-[4/5]" : "aspect-square",
        )}
      >
        <Image
          src={primary || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 280px"
          priority={priority}
          className={cn(
            "object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]",
            secondary && "group-hover:opacity-0",
          )}
        />
        {secondary && (
          <Image
            src={secondary || "/placeholder.svg"}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 280px"
            aria-hidden
            className="pointer-events-none object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
          />
        )}
        {product.badge && (
          <span className="absolute left-2 top-2 inline-flex items-center bg-background px-2 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-foreground sm:left-3 sm:top-3 sm:text-[10px] sm:tracking-[0.18em]">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-3 sm:mt-4">
        <h3 className="text-[11px] font-medium uppercase leading-tight tracking-[0.16em] text-foreground sm:text-[12px] sm:tracking-[0.18em]">
          {product.name}
        </h3>
        <p className="mt-1 text-[11px] text-muted-foreground sm:text-[12px]">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}
