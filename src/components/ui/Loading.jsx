import ApperIcon from "@/components/ApperIcon"

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="relative mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto">
            <ApperIcon 
              name="CheckSquare" 
              size={24} 
              className="text-white animate-pulse" 
            />
          </div>
          <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl mx-auto animate-ping opacity-20"></div>
        </div>
        
        <h3 className="text-lg font-semibold font-display text-gray-900 mb-2">
          Loading Tasks
        </h3>
        <p className="text-gray-600">
          Getting your tasks organized...
        </p>
        
        {/* Skeleton Cards */}
        <div className="mt-8 space-y-4 max-w-md mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-5 bg-gray-200 rounded w-12"></div>
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading