import { useState } from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, placeholder = "Search tasks..." }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="relative">
      <ApperIcon
        name="Search"
        size={18}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 bg-white border-gray-200 focus:border-primary-300 focus:ring-primary-100"
      />
      {searchTerm && (
        <button
          onClick={() => handleSearch("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchBar