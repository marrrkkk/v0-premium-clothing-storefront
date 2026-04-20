import Link from "next/link"
import { NewsletterForm } from "@/components/layout/newsletter-form"

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop/new-in", label: "New In" },
      { href: "/shop/mens", label: "Mens" },
      { href: "/shop/womens", label: "Womens" },
      { href: "/shop/essentials", label: "Essentials" },
      { href: "/shop/accessories", label: "Accessories" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/shipping", label: "Shipping & Returns" },
      { href: "/size-guide", label: "Size Guide" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/journal", label: "Journal" },
      { href: "/stores", label: "Stores" },
      { href: "/sustainability", label: "Sustainability" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_2fr] md:gap-12">
          <div>
            <div className="inline-flex items-center justify-center border border-foreground px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em]">
              STUDIO NORD
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground md:mt-6">
              Everyday staples made with premium fabrics and a focus on fit, comfort and longevity.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3 md:mt-5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:mt-16 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Studio Nord. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
