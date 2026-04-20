"use client"

import * as React from "react"

export type CartLine = {
  productId: string
  slug: string
  name: string
  image: string
  price: number
  color: string
  size: string
  quantity: number
}

type CartState = {
  items: CartLine[]
  isOpen: boolean
}

type CartContextValue = CartState & {
  addItem: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQuantity: (
    productId: string,
    color: string,
    size: string,
    quantity: number,
  ) => void
  clear: () => void
  subtotal: number
  totalItems: number
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const CartContext = React.createContext<CartContextValue | null>(null)
const STORAGE_KEY = "studio-nord-cart-v1"

function lineKey(l: Pick<CartLine, "productId" | "color" | "size">) {
  return `${l.productId}::${l.color}::${l.size}`
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartLine[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const [hydrated, setHydrated] = React.useState(false)

  // Hydrate from localStorage
  React.useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[]
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  // Persist
  React.useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items, hydrated])

  const addItem: CartContextValue["addItem"] = React.useCallback((line) => {
    setItems((prev) => {
      const key = lineKey(line)
      const existing = prev.find((l) => lineKey(l) === key)
      const quantity = line.quantity ?? 1
      if (existing) {
        return prev.map((l) =>
          lineKey(l) === key ? { ...l, quantity: l.quantity + quantity } : l,
        )
      }
      return [...prev, { ...line, quantity }]
    })
  }, [])

  const removeItem: CartContextValue["removeItem"] = React.useCallback((productId, color, size) => {
    setItems((prev) =>
      prev.filter((l) => !(l.productId === productId && l.color === color && l.size === size)),
    )
  }, [])

  const updateQuantity: CartContextValue["updateQuantity"] = React.useCallback(
    (productId, color, size, quantity) => {
      setItems((prev) =>
        prev
          .map((l) =>
            l.productId === productId && l.color === color && l.size === size
              ? { ...l, quantity: Math.max(1, quantity) }
              : l,
          )
          .filter((l) => l.quantity > 0),
      )
    },
    [],
  )

  const clear = React.useCallback(() => setItems([]), [])

  const subtotal = React.useMemo(
    () => items.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [items],
  )
  const totalItems = React.useMemo(
    () => items.reduce((sum, l) => sum + l.quantity, 0),
    [items],
  )

  const value: CartContextValue = {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    subtotal,
    totalItems,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((v) => !v),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
