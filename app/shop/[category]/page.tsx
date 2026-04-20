import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { CollectionView } from "@/components/commerce/collection-view"
import { products } from "@/lib/products"

type Params = { category: string }

const knownSlugs = new Set([
  "new-in",
  "mens",
  "womens",
  "essentials",
  "collections",
  "tees",
  "shirts",
  "bottoms",
  "outerwear",
  "accessories",
])

const titleMap: Record<string, { title: string; description: string }> = {
  "new-in": {
    title: "New In",
    description: "Our latest arrivals — quiet essentials cut from premium fabrics.",
  },
  mens: {
    title: "Mens",
    description: "Everyday staples made with premium fabrics and a focus on fit, comfort and longevity.",
  },
  womens: {
    title: "Womens",
    description: "Refined basics built for every day — relaxed silhouettes, considered details.",
  },
  essentials: {
    title: "Essentials",
    description: "The pieces we wear on repeat. Built to last, made to be lived in.",
  },
  collections: {
    title: "Collections",
    description: "Seasonal drops and capsule collaborations from the Studio Nord archive.",
  },
  tees: {
    title: "Tees",
    description: "Everyday staples made with premium fabrics and a focus on fit, comfort and longevity.",
  },
  shirts: {
    title: "Shirts",
    description: "Considered shirting in natural fibres — clean lines, refined construction.",
  },
  bottoms: {
    title: "Bottoms",
    description: "Trousers and denim cut for modern wear, built from enduring fabrics.",
  },
  outerwear: {
    title: "Outerwear",
    description: "Layering pieces for every season — heavy cottons, washed twills, clean lines.",
  },
  accessories: {
    title: "Accessories",
    description: "The finishing pieces. Quiet accents in leather, wool and cotton.",
  },
}

function getProductsForCategory(category: string) {
  if (category === "new-in") return products.slice(0, 8)
  if (category === "mens" || category === "womens" || category === "essentials") return products
  if (category === "collections") return products.slice(0, 12)
  return products.filter((p) => p.category === category)
}

export function generateStaticParams() {
  return Array.from(knownSlugs).map((category) => ({ category }))
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { category } = await params
  if (!knownSlugs.has(category)) {
    notFound()
  }
  const meta = titleMap[category]
  const filtered = getProductsForCategory(category)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[1400px] px-4 py-10 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop/new-in" },
            { label: meta.title },
          ]}
        />
        <header className="mt-6 max-w-2xl">
          <h1 className="text-2xl font-medium uppercase tracking-[-0.01em] md:text-3xl">
            {meta.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{meta.description}</p>
        </header>
        <CollectionView initialProducts={filtered} />
      </main>
      <Footer />
    </div>
  )
}
