import { useState } from "react"
import { format, isToday, isPast, parseISO } from "date-fns"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const dueDate = parseISO(task.dueDate)
  const isOverdue = isPast(dueDate) && !isToday(dueDate) && !task.completed
  const isDueToday = isToday(dueDate)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return isOverdue ? "priority-pulse" : ""
      case "medium": return ""
      case "low": return ""
      default: return ""
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      "Work": "bg-primary-100 text-primary-800 border-primary-200",
      "Personal": "bg-blue-100 text-blue-800 border-blue-200",
      "Health": "bg-success-100 text-success-800 border-success-200",
      "Career": "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div
      className={cn(
        "task-card bg-white rounded-xl p-4 border border-gray-200 animate-slide-up",
        task.completed && "opacity-75",
        isOverdue && !task.completed && "border-red-200 bg-red-50/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.Id)}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-display font-semibold text-gray-900 mb-1 transition-colors",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600 mb-3 line-clamp-2",
                  task.completed && "text-gray-400"
                )}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant={task.priority}
                  size="sm"
                  className={getPriorityColor(task.priority)}
                >
                  {task.priority}
                </Badge>
                
                <Badge
                  size="sm"
                  className={getCategoryColor(task.category)}
                >
                  {task.category}
                </Badge>
                
                <div className={cn(
                  "flex items-center gap-1 text-xs",
                  isOverdue && !task.completed ? "text-red-600 font-medium" :
                  isDueToday ? "text-primary-600 font-medium" : "text-gray-500"
                )}>
                  <ApperIcon name="Calendar" size={12} />
                  <span>
                    {isDueToday ? "Today" : format(dueDate, "MMM d")}
                  </span>
                  {isOverdue && !task.completed && (
                    <span className="text-red-500 font-medium">(Overdue)</span>
                  )}
                </div>
              </div>
            </div>
            
            {isHovered && (
              <div className="flex items-center gap-1 opacity-0 animate-scale-in">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="p-1.5 h-8 w-8"
                >
                  <ApperIcon name="Edit2" size={14} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.Id)}
                  className="p-1.5 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <ApperIcon name="Trash2" size={14} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard