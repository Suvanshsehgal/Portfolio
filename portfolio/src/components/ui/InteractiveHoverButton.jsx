import React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils"

export const InteractiveHoverButton = React.forwardRef(
  ({ text = "Button", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative w-fit cursor-pointer overflow-hidden rounded-xl border-2 border-white bg-transparent px-10 py-4 text-lg font-semibold text-white shadow-[2px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 hover:shadow-[4px_6px_0px_0px_rgba(255,255,255,1)]",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {text}
        </span>
        <div className="absolute inset-0 z-0 h-full w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
        <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {text}
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
    )
  }
)

InteractiveHoverButton.displayName = "InteractiveHoverButton"
