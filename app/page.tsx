import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { NewArrivals } from "@/components/home/new-arrivals"
import { FeaturedCategories } from "@/components/home/featured-categories"
import { EssentialsStrip } from "@/components/home/essentials-strip"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <HeroSection />
        <NewArrivals />
        <FeaturedCategories />
        <EssentialsStrip />
      </main>
      <Footer />
    </div>
  )
}
