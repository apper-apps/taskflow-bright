import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const CategoryCard = ({ category, isActive, onClick, taskCount }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-3 rounded-lg transition-all duration-200 text-left group hover:shadow-md",
        isActive
          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
          : "bg-white border border-gray-200 hover:border-primary-200 hover:bg-primary-50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: isActive ? "white" : category.color }}
          />
          <span className={cn(
            "font-medium transition-colors",
            isActive ? "text-white" : "text-gray-700 group-hover:text-primary-700"
          )}>
            {category.name}
          </span>
        </div>
        
        <Badge
          variant={isActive ? "default" : "primary"}
          size="sm"
          className={cn(
            "transition-colors",
            isActive 
              ? "bg-white/20 text-white border-white/30" 
              : "bg-primary-100 text-primary-700 border-primary-200"
          )}
        >
          {taskCount}
        </Badge>
      </div>
    </button>
  )
}

export default CategoryCard