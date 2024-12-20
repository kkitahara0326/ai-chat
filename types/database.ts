export interface Project {
  id: number
  created_at: string
  name: string
  description: string
}

export interface Category {
  id: number
  created_at: string
  name: string
  project_id: number
}

export interface Task {
  id: number
  created_at: string
  updated_at: string
  name: string
  status: 'not-started' | 'in-progress' | 'completed'
  category_id: number
  memo: string | null
  attachments: string[] | null
  checked_by: string[] | null
} 