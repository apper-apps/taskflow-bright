import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get organized and stay productive",
  actionLabel = "Add Your First Task",
  onAction
}) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto">
            <ApperIcon name="CheckSquare" size={36} className="text-primary-600" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-success-400 to-success-500 rounded-full flex items-center justify-center">
            <ApperIcon name="Plus" size={16} className="text-white" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold font-display text-gray-900 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <Button
            variant="primary"
            size="lg"
            onClick={onAction}
            className="inline-flex items-center"
          >
            <ApperIcon name="Plus" size={18} className="mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Empty