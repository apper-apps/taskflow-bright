import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ className, variant = "default", size = "md", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium transition-all duration-200"
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    primary: "bg-primary-100 text-primary-800 border border-primary-200",
    success: "bg-success-100 text-success-800 border border-success-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    danger: "bg-red-100 text-red-800 border border-red-200",
    high: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm",
    medium: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-sm",
    low: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  }
  
  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge