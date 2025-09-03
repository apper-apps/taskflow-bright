import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "@/components/organisms/Header"
import CategorySidebar from "@/components/organisms/CategorySidebar"
import { cn } from "@/utils/cn"

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [tasks, setTasks] = useState([])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSidebarOpen(false) // Close mobile sidebar when category is selected
  }

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleTasksChange = (newTasks) => {
    setTasks(newTasks)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onToggleSidebar={handleToggleSidebar}
      />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 bg-gray-50 border-r border-gray-200 p-6 min-h-[calc(100vh-73px)] overflow-y-auto">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            tasks={tasks}
          />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative w-80 bg-white p-6 overflow-y-auto transform transition-transform duration-300 ease-out">
              <CategorySidebar
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                tasks={tasks}
              />
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:max-w-none">
          <Outlet context={{ 
            searchTerm, 
            selectedCategory, 
            onTasksChange: handleTasksChange,
            tasks
          }} />
        </main>
      </div>
    </div>
  )
}

export default Layout