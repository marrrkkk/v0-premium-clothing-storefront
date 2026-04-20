import Link from "next/link"

const items = [
  { href: "/shop/new-in", label: "New In" },
  { href: "/shop/mens", label: "Mens" },
  { href: "/shop/womens", label: "Womens" },
  { href: "/shop/essentials", label: "Essentials" },
  { href: "/shop/accessories", label: "Accessories" },
  { href: "/shop/collections", label: "Collections" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
]

export function CategoryNav() {
  return (
    <nav
      aria-label="Primary"
      className="hidden border-t border-border md:block"
    >
      <ul className="mx-auto flex w-full max-w-[1400px] items-center justify-center gap-8 px-4 py-3 md:px-8">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
