import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-h-[120px] rounded-lg border-2 border-beige bg-white px-4 py-3 text-base shadow-sm transition-all duration-200 resize-y",
        "placeholder:text-text-light/60",
        "hover:border-site-accent/40 hover:bg-cream/30",
        "focus-visible:border-site-accent focus-visible:ring-4 focus-visible:ring-site-accent/20 focus-visible:shadow-md focus-visible:outline-none",
        "aria-invalid:border-error aria-invalid:ring-4 aria-invalid:ring-error/20",
        "disabled:bg-beige/50 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      suppressHydrationWarning
      {...props}
    />
  )
}

export { Textarea }
