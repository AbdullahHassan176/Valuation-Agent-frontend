'use client'

import { FileX, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyProps {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
  showAction?: boolean
}

export function Empty({ 
  title = 'No data found', 
  message = 'There are no items to display at the moment.',
  actionLabel = 'Create New',
  onAction,
  showAction = true
}: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full bg-muted/50 p-3 mb-4">
        <FileX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md">{message}</p>
      {showAction && onAction && (
        <Button onClick={onAction} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
