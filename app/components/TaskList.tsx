import TaskCard from './TaskCard'

interface Task {
  id: number
  name: string
  status: 'not-started' | 'in-progress' | 'completed'
  checkedBy: string[]
  lastUpdated: string
  memo: string
}

interface TaskListProps {
  tasks: Task[]
  onTaskUpdate: (taskId: number, updates: Partial<Task>) => void
}

export default function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} onTaskUpdate={onTaskUpdate} />
        </li>
      ))}
    </ul>
  )
}

