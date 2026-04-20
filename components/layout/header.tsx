"use client"

import Link from "next/link"
import { Search, User, ShoppingBag, Menu, X } from "lucide-react"
import * as React from "react"
import { useCart } from "@/components/cart/cart-provider"
import { CategoryNav } from "@/components/layout/category-nav"
import { cn } from "@/lib/utils"

type HeaderProps = {
  showCategoryNav?: boolean
  border?: boolean
}

export function Header({ showCategoryNav = true, border = true }: HeaderProps) {
  const { openCart, totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background",
        border && "border-b border-border",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-8">
        {/* Left */}
        <div className="flex flex-1 items-center gap-4">
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center text-foreground md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Search"
            className="hidden h-9 w-9 items-center justify-center text-foreground md:inline-flex"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Center — boxed wordmark */}
        <Link
          href="/"
          className="group inline-flex items-center"
          aria-label="Studio Nord — Home"
        >
          <span className="inline-flex items-center justify-center border border-foreground px-5 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-foreground">
            STUDIO NORD
          </span>
        </Link>

        {/* Right */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Link
            href="/account"
            aria-label="Account"
            className="inline-flex h-9 w-9 items-center justify-center text-foreground"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label={`Open cart${totalItems ? `, ${totalItems} items` : ""}`}
            onClick={openCart}
            className="relative inline-flex h-9 w-9 items-center justify-center text-foreground"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center bg-foreground px-1 text-[10px] font-medium leading-none text-background">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-3 md:px-8">
            <div className="flex items-center gap-3 border border-border px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                autoFocus
                type="text"
                placeholder="Search for products, categories, journal entries…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
                onClick={() => setSearchOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCategoryNav && <CategoryNav />}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <span className="inline-flex items-center justify-center border border-foreground px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em]">
              STUDIO NORD
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col px-4 py-6">
            {[
              { href: "/shop/new-in", label: "New In" },
              { href: "/shop/mens", label: "Mens" },
              { href: "/shop/womens", label: "Womens" },
              { href: "/shop/essentials", label: "Essentials" },
              { href: "/shop/accessories", label: "Accessories" },
              { href: "/shop/collections", label: "Collections" },
              { href: "/journal", label: "Journal" },
              { href: "/about", label: "About" },
            ].map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border py-4 text-sm uppercase tracking-[0.18em]"
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
