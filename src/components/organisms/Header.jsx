import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import ApperIcon from "@/components/ApperIcon"

const Header = ({ onAddTask, onSearch, onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden p-2"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-gray-600">Organize your day efficiently</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="flex-1 max-w-lg">
            <SearchBar
              onSearch={onSearch}
              placeholder="Search tasks..."
            />
          </div>
          
          <Button
            variant="primary"
            onClick={onAddTask}
            className="shrink-0"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header