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
    image: "/minimalist-caps-belts-wallets-sand-tones.jpg",
  },
]

export function FeaturedCategories() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-12 md:px-8">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.22em]">Featured Categories</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop/${c.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden bg-secondary"
          >
            <Image
              src={c.image || "/placeholder.svg"}
              alt={c.label}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <span className="inline-flex items-center justify-center bg-background/95 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground">
                {c.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
