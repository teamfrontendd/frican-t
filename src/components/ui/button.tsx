import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" &&
            "bg-indigo-600 text-white hover:bg-indigo-700",
          variant === "outline" &&
            "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
          variant === "ghost" &&
            "text-slate-900 hover:bg-slate-100",
          size === "default" && "h-10 px-4 py-2 text-base",
          size === "sm" && "h-9 px-3 text-sm",
          size === "lg" && "h-12 px-6 text-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
