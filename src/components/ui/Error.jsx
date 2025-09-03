import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-semibold font-display text-gray-900 mb-2">
          Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message || "We encountered an error while loading your tasks. Please try again."}
        </p>
        
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            className="inline-flex items-center"
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

export default Error