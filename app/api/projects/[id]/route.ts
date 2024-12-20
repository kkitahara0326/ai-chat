import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// プロジェクトの詳細を取得
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', params.id)
      .single()

    if (projectError) throw projectError

    // プロジェクトに関連するカテゴリーとタスクを取得
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select(`
        *,
        tasks (*)
      `)
      .eq('project_id', params.id)

    if (categoriesError) throw categoriesError

    return NextResponse.json({
      ...project,
      categories
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

// プロジェクトを更新
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description } = body

    const { data, error } = await supabase
      .from('projects')
      .update({ name, description })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

// プロジェクトを削除
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
} 