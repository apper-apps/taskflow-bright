import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const StatsCard = ({ title, value, icon, gradient, textColor, iconBg }) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200",
      gradient && `bg-gradient-to-br ${gradient}`
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className={cn(
            "text-sm font-medium mb-1",
            textColor || "text-gray-600"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-2xl font-bold font-display",
            textColor || "text-gray-900"
          )}>
            {value}
          </p>
        </div>
        
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          iconBg || "bg-primary-100"
        )}>
          <ApperIcon
            name={icon}
            size={24}
            className={textColor || "text-primary-600"}
          />
        </div>
      </div>
    </div>
  )
}

export default StatsCard