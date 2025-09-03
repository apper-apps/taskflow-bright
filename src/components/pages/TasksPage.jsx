import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import TaskList from "@/components/organisms/TaskList"
import TaskStats from "@/components/organisms/TaskStats"
import TaskModal from "@/components/organisms/TaskModal"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TasksPage = () => {
  const { searchTerm, selectedCategory, onTasksChange, tasks } = useOutletContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleAddTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const handleTaskChange = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">
              {selectedCategory === "All" ? "All Tasks" : `${selectedCategory} Tasks`}
            </h1>
            <p className="text-gray-600">
              {searchTerm 
                ? `Searching for "${searchTerm}"` 
                : "Organize and complete your daily tasks efficiently"
              }
            </p>
          </div>
          
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddTask}
            className="hidden md:flex"
          >
            <ApperIcon name="Plus" size={18} className="mr-2" />
            Add New Task
          </Button>
          
          {/* Mobile Add Button */}
          <Button
            variant="primary"
            onClick={handleAddTask}
            className="md:hidden p-3 rounded-xl"
          >
            <ApperIcon name="Plus" size={20} />
          </Button>
        </div>

        <TaskStats tasks={tasks} />
      </div>

      <TaskList
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onEdit={handleEditTask}
        onTasksChange={onTasksChange}
        refreshTrigger={refreshTrigger}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
        onTaskChange={handleTaskChange}
      />
    </div>
  )
}

export default TasksPage