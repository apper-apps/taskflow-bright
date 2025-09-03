import { useMemo } from "react"
import { isToday, isPast, parseISO } from "date-fns"
import StatsCard from "@/components/molecules/StatsCard"

const TaskStats = ({ tasks = [] }) => {
  const stats = useMemo(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.completed).length
    const pendingTasks = tasks.filter(task => !task.completed).length
    
    const todayTasks = tasks.filter(task => {
      try {
        return isToday(parseISO(task.dueDate))
      } catch {
        return false
      }
    }).length

    const overdueTasks = tasks.filter(task => {
try {
        const dueDate = parseISO(task.due_date_c || task.dueDate)
        return isPast(dueDate) && !isToday(dueDate) && !(task.completed_c || task.completed)
      } catch {
        return false
      }
    }).length

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return {
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      today: todayTasks,
      overdue: overdueTasks,
      completionRate
    }
  }, [tasks])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      <StatsCard
        title="Total Tasks"
        value={stats.total}
        icon="CheckSquare"
        iconBg="bg-primary-100"
        textColor="text-primary-600"
      />
      
      <StatsCard
        title="Completed"
        value={stats.completed}
        icon="CheckCircle2"
        iconBg="bg-success-100"
        textColor="text-success-600"
      />
      
      <StatsCard
        title="Pending"
        value={stats.pending}
        icon="Clock"
        iconBg="bg-yellow-100"
        textColor="text-yellow-600"
      />
      
      <StatsCard
        title="Due Today"
        value={stats.today}
        icon="Calendar"
        iconBg="bg-blue-100"
        textColor="text-blue-600"
      />
      
      <StatsCard
        title="Overdue"
        value={stats.overdue}
        icon="AlertCircle"
        iconBg="bg-red-100"
        textColor="text-red-600"
      />
      
      <StatsCard
        title="Completion"
        value={`${stats.completionRate}%`}
        icon="TrendingUp"
        iconBg="bg-primary-100"
        textColor="text-primary-600"
      />
    </div>
  )
}

export default TaskStats