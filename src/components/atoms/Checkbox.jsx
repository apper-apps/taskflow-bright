import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ className, checked, onChange, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 task-checkbox",
          checked 
            ? "bg-gradient-to-r from-success-500 to-success-600 border-success-500 shadow-lg" 
            : "border-gray-300 hover:border-primary-400 bg-white",
          className
        )}
        onClick={() => onChange?.({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon
            name="Check"
            size={14}
            className="text-white animate-scale-in"
          />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox