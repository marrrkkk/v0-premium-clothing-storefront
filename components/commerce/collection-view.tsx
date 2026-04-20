"use client"

import * as React from "react"
import { ProductGrid } from "@/components/commerce/product-grid"
import { FilterSidebar, DEFAULT_FILTERS, type Filters } from "@/components/commerce/filter-sidebar"
import { SlidersHorizontal, X } from "lucide-react"
import type { Product } from "@/lib/products"

type SortKey = "newest" | "price-asc" | "price-desc"

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
]

type Props = {
  initialProducts: Product[]
}

export function CollectionView({ initialProducts }: Props) {
  const [filters, setFilters] = React.useState<Filters>(DEFAULT_FILTERS)
  const [sort, setSort] = React.useState<SortKey>("newest")
  const [sortOpen, setSortOpen] = React.useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)

  const filtered = React.useMemo(() => {
    let list = [...initialProducts]
    if (filters.colors.length > 0) {
      list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)))
    }
    if (filters.sizes.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)))
    }
    if (filters.priceMax < 5000) {
      list = list.filter((p) => p.price <= filters.priceMax)
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price)
    return list
  }, [initialProducts, filters, sort])

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <FilterSidebar value={filters} onChange={setFilters} />
      </div>

      {/* Right: toolbar + grid */}
      <div>
        <div className="mb-6 flex items-center justify-between border-y border-border py-3 text-[11px] uppercase tracking-[0.18em]">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="inline-flex items-center gap-2 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
              Filter
            </button>
            <div className="relative hidden items-center gap-1 lg:flex">
              <span className="text-muted-foreground">Sort:</span>
              <button
                type="button"
                onClick={() => setSortOpen((v) => !v)}
                className="inline-flex items-center gap-2 text-foreground"
              >
                {sortOptions.find((o) => o.value === sort)?.label}
                <span aria-hidden>▾</span>
              </button>
              {sortOpen && (
                <ul className="absolute left-0 top-full z-10 mt-2 min-w-[200px] border border-border bg-background py-1 shadow-sm">
                  {sortOptions.map((o) => (
                    <li key={o.value}>
                      <button
                        type="button"
                        onClick={() => {
                          setSort(o.value)
                          setSortOpen(false)
                        }}
                        className="block w-full px-3 py-2 text-left text-[11px] uppercase tracking-[0.18em] text-foreground hover:bg-secondary"
                      >
                        {o.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="text-muted-foreground">{filtered.length} Items</div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-border py-24 text-center">
            <p className="text-[11px] uppercase tracking-[0.18em]">No products match your filters</p>
            <button
              type="button"
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              onClick={() => setFilters(DEFAULT_FILTERS)}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ProductGrid products={filtered} columns={3} />
        )}
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-[11px] uppercase tracking-[0.22em]">Filter</span>
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="px-4 py-4">
            <FilterSidebar value={filters} onChange={setFilters} />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center bg-foreground px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-background"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
