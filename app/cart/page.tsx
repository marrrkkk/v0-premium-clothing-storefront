import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { CartView } from "@/components/cart/cart-view"

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[1400px] px-4 py-10 md:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
        <h1 className="mt-6 text-2xl font-medium uppercase tracking-[-0.01em] md:text-3xl">
          Your Cart
        </h1>
        <CartView />
      </main>
      <Footer />
    </div>
  )
}
