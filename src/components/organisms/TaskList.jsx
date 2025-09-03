import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { taskService } from "@/services/api/taskService"
import TaskCard from "@/components/molecules/TaskCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

const TaskList = ({ 
  searchTerm, 
  selectedCategory, 
  onEdit, 
  onTasksChange,
  refreshTrigger 
}) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadTasks = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await taskService.getAll()
      setTasks(data)
      onTasksChange?.(data)
    } catch (err) {
      setError(err.message)
      toast.error("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [refreshTrigger])

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId)
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      
      const updatedTasks = tasks.map(task => 
        task.Id === taskId ? updatedTask : task
      )
      onTasksChange?.(updatedTasks)
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉")
      } else {
        toast.success("Task marked as incomplete")
      }
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      await taskService.delete(taskId)
      const updatedTasks = tasks.filter(task => task.Id !== taskId)
      setTasks(updatedTasks)
      onTasksChange?.(updatedTasks)
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
    }
  }

const filteredTasks = tasks.filter(task => {
    const title = task.title_c || task.title || ""
    const description = task.description_c || task.description || ""
    const matchesSearch = !searchTerm || 
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const category = task.category_c || task.category
    const matchesCategory = !selectedCategory || 
      selectedCategory === "All" || 
      category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTasks} />
  if (filteredTasks.length === 0) {
    return (
      <Empty
        title={searchTerm || selectedCategory !== "All" ? "No matching tasks" : "No tasks yet"}
        description={
          searchTerm || selectedCategory !== "All" 
            ? "Try adjusting your search or filter criteria"
            : "Create your first task to get organized and stay productive"
        }
      />
    )
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task, index) => (
        <div
          key={task.Id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TaskCard
            task={task}
            onToggleComplete={handleToggleComplete}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  )
}

export default TaskList