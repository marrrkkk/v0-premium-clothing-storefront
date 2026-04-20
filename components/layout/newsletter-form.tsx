"use client"

import { useState } from "react"
import { toast } from "sonner"

export function NewsletterForm() {
  const [email, setEmail] = useState("")

  return (
    <form
      className="mt-6 flex w-full max-w-sm items-stretch border border-border md:mt-8"
      onSubmit={(e) => {
        e.preventDefault()
        if (!email) return
        toast.success("You're subscribed", {
          description: "We'll be in touch with new drops and journal entries.",
        })
        setEmail("")
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="flex-shrink-0 bg-foreground px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-background sm:px-5"
      >
        Subscribe
      </button>
    </form>
  )
}
