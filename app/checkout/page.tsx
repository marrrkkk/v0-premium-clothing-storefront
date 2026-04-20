import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutFlow } from "@/components/checkout/checkout-flow"

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showCategoryNav={false} />
      <main className="mx-auto w-full max-w-[1200px] px-4 py-10 md:px-8">
        <CheckoutFlow />
      </main>
      <Footer />
    </div>
  )
}
