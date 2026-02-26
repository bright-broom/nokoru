import { cn } from "@/lib/utils"
import { formInputBaseClasses } from "@/lib/styles"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        formInputBaseClasses,
        "min-h-[120px] px-4 py-3 resize-y",
        className
      )}
      suppressHydrationWarning
      {...props}
    />
  )
}

export { Textarea }
