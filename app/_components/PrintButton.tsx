'use client'

import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="no-print"
      aria-label="Print this page"
    >
      <Printer className="h-4 w-4 mr-2" />
      Print View
    </Button>
  )
}
