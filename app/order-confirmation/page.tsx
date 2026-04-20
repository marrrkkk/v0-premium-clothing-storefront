import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { OrderConfirmation } from "@/components/checkout/order-confirmation"
import { Suspense } from "react"

export default function OrderConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showCategoryNav={false} />
      <main className="mx-auto w-full max-w-[720px] px-4 py-16 md:px-8">
        <Suspense fallback={null}>
          <OrderConfirmation />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
