import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// 新規カテゴリーを作成
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, project_id } = body

    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, project_id }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
} 