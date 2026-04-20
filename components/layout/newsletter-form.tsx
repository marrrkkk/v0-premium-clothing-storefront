"use client"

import { useState } from "react"
import { toast } from "sonner"

export function NewsletterForm() {
  const [email, setEmail] = useState("")

  return (
    <form
      className="mt-8 flex max-w-sm items-center border border-border"
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
        className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="h-full bg-foreground px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-background"
      >
        Subscribe
      </button>
    </form>
  )
}
