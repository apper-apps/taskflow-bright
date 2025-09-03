export const taskService = {
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "created_at_c" } }
        ],
        orderBy: [
          { fieldName: "created_at_c", sorttype: "DESC" }
        ],
        pagingInfo: { limit: 100, offset: 0 }
      }
      
      const response = await apperClient.fetchRecords("task_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message)
      } else {
        console.error("Error fetching tasks:", error.message)
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "created_at_c" } }
        ]
      }
      
      const response = await apperClient.getRecordById("task_c", parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message)
      }
      throw error
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [{
          Name: taskData.title_c || taskData.title || "",
          Tags: taskData.Tags || "",
          title_c: taskData.title_c || taskData.title || "",
          description_c: taskData.description_c || taskData.description || "",
          category_c: taskData.category_c || taskData.category || "",
          priority_c: taskData.priority_c || taskData.priority || "medium",
          due_date_c: taskData.due_date_c || taskData.dueDate || "",
          completed_c: taskData.completed_c || false,
          created_at_c: new Date().toISOString()
        }]
      }
      
      const response = await apperClient.createRecord("task_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          throw new Error("Failed to create some tasks")
        }
        
        return successfulRecords[0]?.data
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message)
      } else {
        console.error("Error creating task:", error.message)
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
          ...(updates.title_c !== undefined && { title_c: updates.title_c }),
          ...(updates.title !== undefined && { title_c: updates.title }),
          ...(updates.description_c !== undefined && { description_c: updates.description_c }),
          ...(updates.description !== undefined && { description_c: updates.description }),
          ...(updates.category_c !== undefined && { category_c: updates.category_c }),
          ...(updates.category !== undefined && { category_c: updates.category }),
          ...(updates.priority_c !== undefined && { priority_c: updates.priority_c }),
          ...(updates.priority !== undefined && { priority_c: updates.priority }),
          ...(updates.due_date_c !== undefined && { due_date_c: updates.due_date_c }),
          ...(updates.dueDate !== undefined && { due_date_c: updates.dueDate }),
          ...(updates.completed_c !== undefined && { completed_c: updates.completed_c }),
          ...(updates.completed !== undefined && { completed_c: updates.completed }),
          ...(updates.Tags !== undefined && { Tags: updates.Tags })
        }]
      }
      
      const response = await apperClient.updateRecord("task_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update tasks ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          throw new Error("Failed to update task")
        }
        
        return successfulUpdates[0]?.data
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error updating task with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(`Error updating task with ID ${id}:`, error.message)
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
      
      const response = await apperClient.deleteRecord("task_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete tasks ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          throw new Error("Failed to delete task")
        }
        
        return successfulDeletions.length > 0
      }
      
      return true
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error deleting task with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(`Error deleting task with ID ${id}:`, error.message)
      }
      throw error
    }
  },

  async toggleComplete(id) {
    try {
      const task = await this.getById(id)
      const updatedTask = await this.update(id, { 
        completed_c: !task.completed_c 
      })
      return updatedTask
    } catch (error) {
      console.error(`Error toggling task completion for ID ${id}:`, error.message)
      throw error
    }
  }
}