import { useState } from "react"
import { toast } from "react-toastify"
import { taskService } from "@/services/api/taskService"
import { categoryService } from "@/services/api/categoryService"
import TaskForm from "@/components/molecules/TaskForm"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { useEffect } from "react"

const TaskModal = ({ isOpen, onClose, task, onTaskChange }) => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadCategories()
    }
  }, [isOpen])

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      toast.error("Failed to load categories")
    }
  }

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true)
      let savedTask
      
      if (task) {
        savedTask = await taskService.update(task.Id, formData)
        toast.success("Task updated successfully!")
      } else {
        savedTask = await taskService.create(formData)
        toast.success("Task created successfully!")
      }
      
      onTaskChange()
      onClose()
    } catch (err) {
      toast.error(task ? "Failed to update task" : "Failed to create task")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-gray-900 flex items-center gap-2">
              <ApperIcon 
                name={task ? "Edit3" : "Plus"} 
                size={20} 
                className="text-primary-600" 
              />
              {task ? "Edit Task" : "Create New Task"}
            </h2>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ApperIcon name="X" size={20} className="text-gray-500" />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <TaskForm
            task={task}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default TaskModal