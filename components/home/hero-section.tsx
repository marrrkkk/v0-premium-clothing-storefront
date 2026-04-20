import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full bg-secondary">
      <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
        <Image
          src="/fashion-editorial-male-model-wearing-dark-tee-and-.jpg"
          alt="Model wearing Studio Nord essentials"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
            <div className="max-w-md">
              <h1 className="text-pretty text-3xl font-medium uppercase leading-[1.1] tracking-[-0.01em] text-foreground md:text-5xl lg:text-6xl">
                Timeless
                <br /> Essentials.
                <br /> Modern
                <br /> Perspective.
              </h1>
              <div className="mt-8">
                <Link
                  href="/shop/new-in"
                  className="inline-flex items-center justify-center bg-foreground px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background hover:bg-foreground/90"
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
