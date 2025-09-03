import tasksData from "@/services/mockData/tasks.json"

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      completed: false,
      createdAt: new Date().toISOString()
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasks[index] = { ...tasks[index], ...updates }
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(200)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    const deletedTask = { ...tasks[index] }
    tasks.splice(index, 1)
    return deletedTask
  },

  async toggleComplete(id) {
    await delay(200)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    tasks[index].completed = !tasks[index].completed
    return { ...tasks[index] }
  }
}