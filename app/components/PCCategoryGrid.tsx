'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import TaskCard from './TaskCard'
import type { Category, Task } from '@/app/types/database'

interface PCCategoryGridProps {
  categories: (Category & { tasks: Task[] })[]
  onTaskUpdate: (taskId: number, updates: Partial<Task>) => void
}

export default function PCCategoryGrid({ categories, onTaskUpdate }: PCCategoryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')

  const handleAddTask = async () => {
    if (selectedCategory && newTaskName.trim()) {
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newTaskName.trim(),
            category_id: selectedCategory.id,
          }),
        })

        if (!response.ok) throw new Error('Failed to create task')

        const newTask = await response.json()
        onTaskUpdate(newTask.id, newTask)
        setNewTaskName('')
        setShowNewTaskDialog(false)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div key={category.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{category.name}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedCategory(category)
                setShowNewTaskDialog(true)
              }}
            >
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-2">
            {category.tasks.map((task) => (
              <TaskCard key={task.id} task={task} onTaskUpdate={onTaskUpdate} />
            ))}
          </div>
        </div>
      ))}

      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新しいタスクを追加</DialogTitle>
          </DialogHeader>
          <Input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="タスク名を入力..."
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTaskDialog(false)}>キャンセル</Button>
            <Button onClick={handleAddTask}>追加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

