import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="group relative w-full bg-secondary">
      <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[21/9]">
        <Image
          src="/hero-studio-nord.jpg"
          alt="Model wearing Studio Nord essentials"
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent sm:bg-gradient-to-r sm:from-background/25 sm:via-transparent sm:to-transparent" />
        <div className="absolute inset-0 flex items-end sm:items-center">
          <div className="mx-auto w-full max-w-[1400px] px-5 pb-10 sm:px-8 sm:pb-0 md:px-12">
            <div className="max-w-md">
              <h1 className="text-pretty text-[2rem] font-medium uppercase leading-[1.05] tracking-[-0.01em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Timeless Essentials.
                <br className="hidden sm:inline" />
                <span className="sm:hidden"> </span>
                Modern Perspective.
              </h1>
              <div className="mt-6 sm:mt-8">
                <Link
                  href="/shop/new-in"
                  className="inline-flex w-full items-center justify-center bg-foreground px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background hover:bg-foreground/90 sm:w-auto"
                >
                  Shop New In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
