export type ProductColor = {
  name: string
  hex: string
}

export type Product = {
  id: string
  slug: string
  name: string
  category: "tees" | "shirts" | "bottoms" | "outerwear" | "accessories" | "essentials"
  categoryLabel: string
  price: number
  description: string
  details: string[]
  colors: ProductColor[]
  sizes: string[]
  images: string[]
  badge?: string
}

// All prices are in PHP to match reference image
export const products: Product[] = [
  {
    id: "p-001",
    slug: "graphic-tee",
    name: "Graphic Tee",
    category: "tees",
    categoryLabel: "Tees",
    price: 1080,
    description:
      "A heavyweight cotton tee with a subtle chest graphic. Relaxed boxy silhouette with dropped shoulders and a tight crew neck.",
    details: [
      "Made with our custom heavyweight cotton",
      "220gsm",
      "Rib knit collar",
      "Shoulder-to-shoulder tape",
      "Double-needle sleeves and bottom hem",
      "Reactive dyed for maximum printability",
      "Tight crew neck",
      "Worn-out feel",
      "Dropped shoulders",
      "Oversized fit",
    ],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Sand", hex: "#c9bfa6" },
      { name: "Off-white", hex: "#f2efe7" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/graphic-tee-black-flat-lay-studio.jpg",
      "/graphic-tee-back-editorial-model.jpg",
    ],
    badge: "New",
  },
  {
    id: "p-002",
    slug: "utility-tee",
    name: "Utility Tee",
    category: "tees",
    categoryLabel: "Tees",
    price: 1080,
    description:
      "Our signature utility tee in a military-inspired olive. Mid-weight jersey with a clean, considered fit.",
    details: [
      "Mid-weight 200gsm cotton jersey",
      "Pre-shrunk for lasting fit",
      "Rib knit collar with shoulder tape",
      "Clean double-needle hems",
      "Regular fit",
    ],
    colors: [
      { name: "Olive", hex: "#5a5a3a" },
      { name: "Black", hex: "#0a0a0a" },
      { name: "Sand", hex: "#c9bfa6" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["/olive-utility-tee-flat-lay.jpg", "/olive-tee-on-model-editorial.jpg"],
  },
  {
    id: "p-003",
    slug: "minimal-tee",
    name: "Minimal Tee",
    category: "tees",
    categoryLabel: "Tees",
    price: 980,
    description: "A quiet essential. Clean, undyed cotton with a small woven label at the chest.",
    details: ["Undyed organic cotton", "190gsm", "Soft-washed finish", "Regular fit"],
    colors: [
      { name: "Off-white", hex: "#f2efe7" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/minimal-tee-off-white-crew-flat-lay-v2.jpg",
      "/minimal-tee-off-white-hanging-detail-v2.jpg",
    ],
  },
  {
    id: "p-004",
    slug: "striped-tee",
    name: "Striped Tee",
    category: "tees",
    categoryLabel: "Tees",
    price: 1180,
    description: "Horizontal stripe jersey inspired by maritime workwear, cut in a modern relaxed silhouette.",
    details: ["Yarn-dyed cotton stripe", "Relaxed fit", "Ribbed crew", "Reinforced shoulder seams"],
    colors: [
      { name: "Off-white / Black", hex: "#f2efe7" },
      { name: "Sand / Charcoal", hex: "#c9bfa6" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/striped-tee-breton-black-white-flat-lay-v2.jpg",
      "/striped-tee-breton-black-white-hanging-v2.jpg",
    ],
    badge: "Best Seller",
  },
  {
    id: "p-005",
    slug: "pocket-tee",
    name: "Pocket Tee",
    category: "tees",
    categoryLabel: "Tees",
    price: 1080,
    description: "A garment-dyed pocket tee in warm sand. Cut with a slightly longer body and a clean chest pocket.",
    details: ["Garment-dyed cotton", "Chest pocket detail", "Longer body", "Regular fit"],
    colors: [
      { name: "Sand", hex: "#c9bfa6" },
      { name: "Olive", hex: "#5a5a3a" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/pocket-tee-sand-chest-pocket-flat-lay-v2.jpg",
      "/pocket-tee-sand-hanging-pocket-detail-v2.jpg",
    ],
  },
  {
    id: "p-006",
    slug: "washed-tee",
    name: "Washed Tee",
    category: "tees",
    categoryLabel: "Tees",
    price: 1180,
    description: "A heavyweight washed tee in deep charcoal. Broken-in from the first wear.",
    details: ["Heavyweight 230gsm cotton", "Garment washed", "Broken-in feel", "Boxy fit"],
    colors: [
      { name: "Charcoal", hex: "#2a2a2a" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "/washed-tee-charcoal-heavyweight-flat-lay-v2.jpg",
      "/washed-tee-charcoal-hanging-broken-in-v2.jpg",
    ],
  },
  {
    id: "p-007",
    slug: "henley-shirt",
    name: "Henley Shirt",
    category: "shirts",
    categoryLabel: "Shirts",
    price: 1480,
    description: "A refined henley with a three-button placket and a clean cotton-linen weave.",
    details: ["Cotton-linen blend", "Three-button placket", "Regular fit", "Reinforced shoulder seams"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Stone", hex: "#c8c2b5" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/henley-shirt-black-three-button-placket-flat-lay.jpg",
      "/henley-shirt-black-hanging-placket-closeup.jpg",
    ],
  },
  {
    id: "p-008",
    slug: "twill-cap",
    name: "Twill Cap",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 780,
    description: "A low-profile six-panel cap in soft cotton twill with a curved brim and brass adjuster.",
    details: ["Cotton twill", "Six-panel construction", "Curved brim", "Brass adjuster"],
    colors: [
      { name: "Sand", hex: "#c9bfa6" },
      { name: "Black", hex: "#0a0a0a" },
      { name: "Olive", hex: "#5a5a3a" },
    ],
    sizes: ["One Size"],
    images: ["/sand-cotton-cap-minimalist.jpg", "/sand-cotton-cap-side-angle.jpg"],
  },
  {
    id: "p-009",
    slug: "relaxed-trouser",
    name: "Relaxed Trouser",
    category: "bottoms",
    categoryLabel: "Bottoms",
    price: 2480,
    description: "A straight-leg trouser with a relaxed rise, cut from mid-weight cotton twill.",
    details: ["Mid-weight cotton twill", "Relaxed straight leg", "Side slant pockets", "Clean waistband"],
    colors: [
      { name: "Stone", hex: "#c8c2b5" },
      { name: "Charcoal", hex: "#2a2a2a" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      "/relaxed-trouser-stone-cotton-twill-flat-lay-v2.jpg",
      "/relaxed-trouser-stone-hanging-clip-hanger-v2.jpg",
    ],
  },
  {
    id: "p-010",
    slug: "work-jacket",
    name: "Work Jacket",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: 4280,
    description: "A four-pocket work jacket in heavy cotton canvas. Our most enduring essential.",
    details: ["Heavy cotton canvas", "Four utility pockets", "Corozo buttons", "Regular fit"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Olive", hex: "#5a5a3a" },
      { name: "Sand", hex: "#c9bfa6" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: ["/black-canvas-work-jacket-editorial.jpg", "/work-jacket-hanging-detail.jpg"],
  },
  {
    id: "p-011",
    slug: "overshirt",
    name: "Overshirt",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: 3280,
    description: "A relaxed overshirt in mid-weight cotton. Wear open as a layer or buttoned as a shirt.",
    details: ["Mid-weight cotton", "Two chest pockets", "Horn buttons", "Relaxed fit"],
    colors: [
      { name: "Olive", hex: "#5a5a3a" },
      { name: "Stone", hex: "#c8c2b5" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: ["/olive-overshirt-minimalist.jpg", "/olive-overshirt-hanging-detail.jpg"],
  },
  {
    id: "p-012",
    slug: "knit-beanie",
    name: "Knit Beanie",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 680,
    description: "A fine-gauge wool beanie with a clean ribbed cuff.",
    details: ["Merino wool", "Fine-gauge knit", "Ribbed cuff"],
    colors: [
      { name: "Charcoal", hex: "#2a2a2a" },
      { name: "Sand", hex: "#c9bfa6" },
      { name: "Olive", hex: "#5a5a3a" },
    ],
    sizes: ["One Size"],
    images: ["/charcoal-merino-beanie.jpg", "/charcoal-beanie-folded-side.jpg"],
  },
  {
    id: "p-013",
    slug: "leather-belt",
    name: "Leather Belt",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 1480,
    description: "A full-grain leather belt with a brushed brass buckle.",
    details: ["Full-grain Italian leather", "Brushed brass buckle", "Single keeper"],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Tan", hex: "#a07a52" },
    ],
    sizes: ["S", "M", "L"],
    images: ["/black-leather-belt-minimalist.jpg", "/black-leather-belt-laid-flat.jpg"],
  },
  {
    id: "p-014",
    slug: "linen-shirt",
    name: "Linen Shirt",
    category: "shirts",
    categoryLabel: "Shirts",
    price: 1880,
    description: "A lightweight linen shirt with a clean camp collar and natural slubbed texture.",
    details: ["100% European linen", "Camp collar", "Single chest pocket", "Regular fit"],
    colors: [
      { name: "Off-white", hex: "#f2efe7" },
      { name: "Sand", hex: "#c9bfa6" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: ["/off-white-linen-camp-collar-shirt.jpg", "/off-white-linen-shirt-hanging.jpg"],
  },
  {
    id: "p-015",
    slug: "wool-scarf",
    name: "Wool Scarf",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 1280,
    description: "A rectangular wool scarf with a clean finished edge.",
    details: ["Merino wool", "Finished edges", "Generous length"],
    colors: [
      { name: "Stone", hex: "#c8c2b5" },
      { name: "Charcoal", hex: "#2a2a2a" },
    ],
    sizes: ["One Size"],
    images: ["/stone-wool-scarf-flat-lay.jpg", "/stone-wool-scarf-draped.jpg"],
  },
  {
    id: "p-016",
    slug: "wide-leg-trouser",
    name: "Wide-Leg Trouser",
    category: "bottoms",
    categoryLabel: "Bottoms",
    price: 2680,
    description: "A pleated wide-leg trouser cut from drapey wool blend.",
    details: ["Wool blend", "Single pleat front", "Wide leg", "Clean waistband"],
    colors: [
      { name: "Charcoal", hex: "#2a2a2a" },
      { name: "Stone", hex: "#c8c2b5" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    images: ["/charcoal-wide-leg-wool-trouser.jpg", "/charcoal-wide-leg-trouser-hanging.jpg"],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category)
}

export function getAllCategories(): { slug: Product["category"]; label: string }[] {
  return [
    { slug: "tees", label: "Tees" },
    { slug: "shirts", label: "Shirts" },
    { slug: "bottoms", label: "Bottoms" },
    { slug: "outerwear", label: "Outerwear" },
    { slug: "accessories", label: "Accessories" },
    { slug: "essentials", label: "Essentials" },
  ]
}

export function formatPrice(value: number): string {
  return `PHP ${value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
