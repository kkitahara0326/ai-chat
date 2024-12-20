import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// タスクを更新
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, status, memo, checked_by, attachments } = body

    const { data, error } = await supabase
      .from('tasks')
      .update({ 
        ...(name && { name }),
        ...(status && { status }),
        ...(memo !== undefined && { memo }),
        ...(checked_by && { checked_by }),
        ...(attachments && { attachments })
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

// タスクを削除
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
} 