'use client'

import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PasteGuideBannerProps {
  fragmentPath: string
}

export function PasteGuideBanner({ fragmentPath }: PasteGuideBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyPath = async () => {
    try {
      await navigator.clipboard.writeText(fragmentPath)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy path:', err)
    }
  }

  if (isDismissed) return null

  return (
    <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6 relative">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-blue-200">
            <strong>Paste your raw HTML into the mapped file</strong> (see{' '}
            <a 
              href="/PASTE_GUIDE.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-100 underline"
            >
              PASTE_GUIDE.md
            </a>
            ).
          </p>
          <p className="text-xs text-blue-300/80 mt-1">
            Fragment path: <code className="bg-blue-800/50 px-2 py-1 rounded text-xs">{fragmentPath}</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyPath}
            className="bg-blue-800/50 border-blue-600 hover:bg-blue-700/50 text-blue-100"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy path
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
