import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:from-primary-700 hover:to-primary-800 hover:shadow-xl transform hover:scale-[1.02] focus-visible:ring-primary-500",
    secondary: "bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 hover:border-primary-300 hover:shadow-md focus-visible:ring-primary-500",
    success: "bg-gradient-to-r from-success-500 to-success-600 text-white shadow-lg hover:from-success-600 hover:to-success-700 hover:shadow-xl transform hover:scale-[1.02] focus-visible:ring-success-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl transform hover:scale-[1.02] focus-visible:ring-red-500",
    ghost: "text-gray-600 hover:text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button