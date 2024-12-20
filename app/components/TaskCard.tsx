'use client'

import { useState } from 'react'
import { Check, MessageSquare, Clock, Paperclip, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useMediaQuery } from '../hooks/useMediaQuery'
import type { Task } from '@/types/database'

interface TaskCardProps {
  task: Task
  onTaskUpdate: (taskId: number, updates: Partial<Task>) => void
}

export default function TaskCard({ task, onTaskUpdate }: TaskCardProps) {
  const [showMemoDialog, setShowMemoDialog] = useState(false)
  const [showFileDialog, setShowFileDialog] = useState(false)
  const [memo, setMemo] = useState(task.memo || '')
  const [file, setFile] = useState<File | null>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleStatusChange = () => {
    const statusMap = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started',
    } as const
    onTaskUpdate(task.id, { status: statusMap[task.status] })
  }

  const handleMemoSave = () => {
    onTaskUpdate(task.id, { memo })
    setShowMemoDialog(false)
  }

  const handleFileUpload = () => {
    if (file) {
      const mockUrl = URL.createObjectURL(file)
      onTaskUpdate(task.id, {
        attachments: [...(task.attachments || []), mockUrl]
      })
      setFile(null)
      setShowFileDialog(false)
    }
  }

  const handleCheck = (checked: boolean) => {
    const currentChecked = task.checked_by || []
    const newChecked = checked
      ? [...currentChecked, 'current-user'] // 実際のユーザー名に置き換える
      : currentChecked.filter(user => user !== 'current-user')
    onTaskUpdate(task.id, { checked_by: newChecked })
  }

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = () => {
    switch (task.status) {
      case 'completed':
        return '完了'
      case 'in-progress':
        return '進行中'
      default:
        return '未着手'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const isChecked = (task.checked_by || []).includes('current-user')

  return (
    <TooltipProvider>
      <div className={`border rounded-md p-4 bg-background ${task.status === 'completed' ? 'opacity-60' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={`${getStatusColor()} text-white hover:${getStatusColor()}`}
              onClick={handleStatusChange}
            >
              <Check className="h-4 w-4" />
            </Button>
            <span className="font-medium">{task.name}</span>
            <span className="text-sm text-muted-foreground">
              {getStatusText()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMemoDialog(true)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>メモを追加</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFileDialog(true)}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>ファイルを添付</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCheck(!isChecked)}
                  className={isChecked ? 'text-green-500' : ''}
                >
                  {isChecked ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isChecked ? 'チェック済み' : 'チェックする'}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {formatDate(task.updated_at)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                作成: {formatDate(task.created_at)}
                <br />
                更新: {formatDate(task.updated_at)}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {task.memo && (
          <div className="mt-2 text-sm text-muted-foreground bg-muted p-2 rounded">
            {task.memo}
          </div>
        )}

        {task.attachments && task.attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {task.attachments.map((url, index) => (
              <div
                key={index}
                className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer flex items-center"
                onClick={() => window.open(url, '_blank')}
              >
                <Paperclip className="h-3 w-3 mr-1" />
                添付ファイル {index + 1}
              </div>
            ))}
          </div>
        )}

        <Dialog open={showMemoDialog} onOpenChange={setShowMemoDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>タスクメモ</DialogTitle>
              <DialogDescription>
                このタスクに関するメモを入力してください。
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="メモを入力..."
              rows={4}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMemoDialog(false)}>キャンセル</Button>
              <Button onClick={handleMemoSave}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showFileDialog} onOpenChange={setShowFileDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ファイルを添付</DialogTitle>
              <DialogDescription>
                このタスクに添付するファイルを選択してください。
              </DialogDescription>
            </DialogHeader>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="mt-2"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFileDialog(false)}>キャンセル</Button>
              <Button onClick={handleFileUpload} disabled={!file}>アップロード</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

