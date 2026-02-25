import { cn, formInputBaseClasses } from "@/lib/utils"

function Input({
  className,
  type,
  ref,
  ...props
}: React.ComponentProps<"input"> & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        formInputBaseClasses,
        "px-4 py-2.5",
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      suppressHydrationWarning
      {...props}
    />
  )
}

export { Input }
