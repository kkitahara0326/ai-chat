'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, PlusCircle } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import TaskList from './TaskList'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"

interface Task {
  id: number
  name: string
  status: 'not-started' | 'in-progress' | 'completed'
  checkedBy: { name: string; timestamp: string }[]
  lastUpdated: string
  memo: { text: string; author: string; timestamp: string } | null
  attachments: { name: string; url: string }[]
}

interface Category {
  id: number
  name: string
  tasks: Task[]
}

interface CategorySectionProps {
  category: Category
  onTaskUpdate: (taskId: number, updates: Partial<Task>) => void
}

export default function CategorySection({ category, onTaskUpdate }: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')

  const handleAddTaskClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNewTaskDialog(true);
  };

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: newTaskName.trim(),
        status: 'not-started',
        checkedBy: [],
        lastUpdated: new Date().toLocaleString('ja-JP'),
        memo: null,
        attachments: []
      }
      onTaskUpdate(newTask.id, newTask)
      setNewTaskName('')
      setShowNewTaskDialog(false)
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 rounded-t-lg">
        <div className="flex items-center">
          <h2 className="text-lg font-bold">{category.name}</h2>
          <div
            className="ml-2 p-1 hover:bg-gray-200 rounded-full cursor-pointer"
            onClick={handleAddTaskClick}
          >
            <PlusCircle className="h-5 w-5" />
          </div>
        </div>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <TaskList tasks={category.tasks} onTaskUpdate={onTaskUpdate} />
      </CollapsibleContent>

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
    </Collapsible>
  )
}

