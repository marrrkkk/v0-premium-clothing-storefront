import Link from "next/link"

const pillars = [
  {
    title: "Made in small batches",
    body: "Designed in our studio and produced in small runs with partner mills in Portugal and Japan.",
  },
  {
    title: "Built to last",
    body: "Premium fabrics and reinforced construction mean our essentials wear in, not out.",
  },
  {
    title: "Considered footprint",
    body: "Lower-impact fibres, recyclable packaging, and honest materials — no marketing speak.",
  },
]

export function EssentialsStrip() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 md:px-8 md:py-12">
        {pillars.map((p) => (
          <div key={p.title}>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.22em]">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-10 sm:px-6 md:px-8 md:pb-12">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground underline-offset-4 hover:underline"
        >
          Read the Studio
        </Link>
      </div>
    </section>
  )
}
