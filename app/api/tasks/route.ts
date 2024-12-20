import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// 新規タスクを作成
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category_id } = body

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ 
        name, 
        category_id,
        status: 'not-started',
        checked_by: [],
        attachments: []
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
} 