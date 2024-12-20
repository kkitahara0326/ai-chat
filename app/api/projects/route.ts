import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types/database'

// プロジェクト一覧を取得
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

// 新規プロジェクトを作成
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description } = body

    const { data, error } = await supabase
      .from('projects')
      .insert([{ name, description }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
} 