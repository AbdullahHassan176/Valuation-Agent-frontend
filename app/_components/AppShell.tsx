'use client'

import { useState, useEffect } from 'react'
import { Topbar } from './Topbar'
import { Sidebar } from './Sidebar'
import { ChatPanel } from './ChatPanel'
import { Badge } from '@/components/ui/badge'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <nav 
        role="navigation" 
        aria-label="Main navigation"
        className="flex-shrink-0"
      >
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header role="banner">
          <Topbar onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </header>

        {/* Page Content */}
        <main role="main" className="flex-1 overflow-auto">
          <div className="max-w-[1440px] mx-auto px-6 py-6">
            {children}
          </div>
        </main>

        {/* Status Footer */}
        <footer role="contentinfo" className="border-t border-gray-700 bg-gray-800 px-6 py-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span>© 2024 Valuation Agent Platform</span>
              <span>•</span>
              <span>Version 1.0.0</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="status-badge dev">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                DEV Environment
              </Badge>
            </div>
          </div>
        </footer>
      </div>

      {/* Chat Panel */}
      <ChatPanel />
    </div>
  )
}
