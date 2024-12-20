'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Header from '@/components/Header'
import PCCategoryGrid from '@/components/PCCategoryGrid'
import MobileCategoryList from '@/components/MobileCategoryList'
import type { Project, Category, Task } from '@/types/database'

interface ProjectWithCategories extends Project {
  categories: (Category & { tasks: Task[] })[]
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<ProjectWithCategories | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch project')
      const data = await response.json()
      setProject(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTaskUpdate = async (taskId: number, updates: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error('Failed to update task')
      
      // プロジェクトデータを再取得して最新の状態を���映
      fetchProject()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (isLoading || !project) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header projectName="読み込み中..." />
        <main className="flex-grow p-6">
          <div className="max-w-7xl mx-auto">
            <p>読み込み中...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header projectName={project.name} />
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          {isDesktop ? (
            <PCCategoryGrid
              categories={project.categories}
              onTaskUpdate={handleTaskUpdate}
            />
          ) : (
            <MobileCategoryList
              categories={project.categories}
              onTaskUpdate={handleTaskUpdate}
            />
          )}
        </div>
      </main>
    </div>
  )
}

