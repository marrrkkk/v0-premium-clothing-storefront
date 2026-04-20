import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    slug: "tees",
    label: "Tees",
    image: "/flat-lay-of-folded-premium-t-shirts-neutral-tones.jpg",
  },
  {
    slug: "bottoms",
    label: "Bottoms",
    image: "/folded-olive-and-stone-trousers-minimalist-studio.jpg",
  },
  {
    slug: "outerwear",
    label: "Outerwear",
    image: "/minimalist-black-work-jacket-flat-lay.jpg",
  },
  {
    slug: "accessories",
    label: "Accessories",
    image: "/minimalist-accessories-caps-scarves-beanies.jpg",
  },
]

export function FeaturedCategories() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 md:px-8 md:py-12">
      <div className="mb-5 flex items-baseline justify-between md:mb-6">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Featured Categories</h2>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop/${c.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden bg-secondary sm:aspect-[4/3]"
          >
            <Image
              src={c.image || "/placeholder.svg"}
              alt={c.label}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-3 sm:items-center sm:justify-center sm:pb-0">
              <span className="inline-flex items-center justify-center bg-background/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]">
                {c.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
