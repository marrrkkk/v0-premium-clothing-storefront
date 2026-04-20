import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { ProductDetail } from "@/components/commerce/product-detail"
import { getProductBySlug, products } from "@/lib/products"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: product.categoryLabel, href: `/shop/${product.category}` },
            { label: product.name },
          ]}
        />
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  )
}
