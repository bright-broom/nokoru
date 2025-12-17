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
          // 基本スタイル
          "w-full rounded-lg border-2 border-beige bg-white px-4 py-2.5 text-base shadow-sm transition-all duration-200",
          // プレースホルダー
          "placeholder:text-text-light/60",
          // ホバー状態
          "hover:border-site-accent/40 hover:bg-cream/30",
          // フォーカス状態
          "focus-visible:border-site-accent focus-visible:ring-4 focus-visible:ring-site-accent/20 focus-visible:shadow-md focus-visible:outline-none",
          // エラー状態
          "aria-invalid:border-error aria-invalid:ring-4 aria-invalid:ring-error/20",
          // 無効状態
          "disabled:bg-beige/50 disabled:cursor-not-allowed disabled:opacity-60",
          // ファイル入力
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        // ブラウザ拡張（パスワードマネージャー等）による属性挿入を許容
        suppressHydrationWarning
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
