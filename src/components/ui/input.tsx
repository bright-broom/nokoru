import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "w-full rounded-lg border-2 border-beige bg-white px-4 py-2.5 text-base shadow-sm transition-all duration-200",
          "placeholder:text-text-light/60",
          "hover:border-site-accent/40 hover:bg-cream/30",
          "focus-visible:border-site-accent focus-visible:ring-4 focus-visible:ring-site-accent/20 focus-visible:shadow-md focus-visible:outline-none",
          "aria-invalid:border-error aria-invalid:ring-4 aria-invalid:ring-error/20",
          "disabled:bg-beige/50 disabled:cursor-not-allowed disabled:opacity-60",
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        suppressHydrationWarning
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
