import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { categoryService } from "@/services/api/categoryService"
import CategoryCard from "@/components/molecules/CategoryCard"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"

const CategorySidebar = ({ selectedCategory, onCategorySelect, tasks = [] }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadCategories = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError(err.message)
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const getTaskCountForCategory = (categoryName) => {
    return tasks.filter(task => task.category === categoryName).length
  }

  const getTotalTasks = () => tasks.length
  const getCompletedTasks = () => tasks.filter(task => task.completed).length
  const getPendingTasks = () => tasks.filter(task => !task.completed).length

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCategories} />

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <ApperIcon name="BarChart3" size={18} className="text-primary-600" />
          Quick Stats
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Tasks</span>
            <span className="font-semibold text-gray-900">{getTotalTasks()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Completed</span>
            <span className="font-semibold text-success-600">{getCompletedTasks()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Pending</span>
            <span className="font-semibold text-primary-600">{getPendingTasks()}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <ApperIcon name="Folder" size={18} className="text-primary-600" />
          Categories
        </h3>
        
        <div className="space-y-2">
          <CategoryCard
            category={{ name: "All", color: "#6B7280" }}
            isActive={selectedCategory === "All"}
            onClick={() => onCategorySelect("All")}
            taskCount={getTotalTasks()}
          />
          
{categories.map(category => (
            <CategoryCard
              key={category.Id}
              category={category}
              isActive={selectedCategory === (category.Name || category.name)}
              onClick={() => onCategorySelect(category.Name || category.name)}
              taskCount={getTaskCountForCategory(category.Name || category.name)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white shadow-lg">
        <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
          <ApperIcon name="Zap" size={18} />
          Quick Actions
        </h3>
        <p className="text-primary-100 text-sm mb-3">
          Stay organized and productive with TaskFlow
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
          onClick={() => window.location.reload()}
        >
          <ApperIcon name="RefreshCw" size={14} className="mr-2" />
          Refresh Tasks
        </Button>
      </div>
    </div>
  )
}

export default CategorySidebar