export const categoryService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "color_c" } },
          { field: { Name: "task_count_c" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ],
        pagingInfo: { limit: 100, offset: 0 }
      }
      
      const response = await apperClient.fetchRecords("category_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message)
      } else {
        console.error("Error fetching categories:", error.message)
      }
      throw error
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "color_c" } },
          { field: { Name: "task_count_c" } }
        ]
      }
      
      const response = await apperClient.getRecordById("category_c", parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(`Error fetching category with ID ${id}:`, error.message)
      }
      throw error
    }
  },

  async create(categoryData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [{
          Name: categoryData.name || categoryData.Name || "",
          Tags: categoryData.Tags || "",
          color_c: categoryData.color_c || categoryData.color || "#3B82F6",
          task_count_c: categoryData.task_count_c || categoryData.taskCount || 0
        }]
      }
      
      const response = await apperClient.createRecord("category_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create categories ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          throw new Error("Failed to create category")
        }
        
        return successfulRecords[0]?.data
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message)
      } else {
        console.error("Error creating category:", error.message)
      }
      throw error
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.Name !== undefined && { Name: updates.Name }),
          ...(updates.name !== undefined && { Name: updates.name }),
          ...(updates.Tags !== undefined && { Tags: updates.Tags }),
          ...(updates.color_c !== undefined && { color_c: updates.color_c }),
          ...(updates.color !== undefined && { color_c: updates.color }),
          ...(updates.task_count_c !== undefined && { task_count_c: updates.task_count_c }),
          ...(updates.taskCount !== undefined && { task_count_c: updates.taskCount })
        }]
      }
      
      const response = await apperClient.updateRecord("category_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update categories ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          throw new Error("Failed to update category")
        }
        
        return successfulUpdates[0]?.data
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error updating category with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(`Error updating category with ID ${id}:`, error.message)
      }
      throw error
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord("category_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete categories ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          throw new Error("Failed to delete category")
        }
        
        return successfulDeletions.length > 0
      }
      
      return true
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error deleting category with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(`Error deleting category with ID ${id}:`, error.message)
      }
      throw error
    }
  }
}