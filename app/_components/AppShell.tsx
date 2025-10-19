'use client'

import { useState, useEffect } from 'react'
import { Topbar } from './Topbar'
import { Sidebar } from './Sidebar'
import { ChatPanel } from './ChatPanel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, MessageSquare } from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [])

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <nav 
        role="navigation" 
        aria-label="Main navigation"
        className="hidden lg:flex flex-shrink-0"
      >
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </nav>

      {/* Mobile Sidebar */}
      <nav 
        role="navigation" 
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <Sidebar 
          isCollapsed={false}
          onToggle={() => setMobileMenuOpen(false)}
          isMobile={true}
        />
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header role="banner">
          <Topbar 
            onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            isMobile={true}
          />
        </header>

        {/* Page Content */}
        <main role="main" className="flex-1 overflow-auto">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
            {children}
          </div>
        </main>

        {/* Status Footer - Hidden on mobile */}
        <footer role="contentinfo" className="hidden sm:block border-t border-gray-700 bg-gray-800 px-4 sm:px-6 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <span>© 2024 Valuation Agent Platform</span>
              <span className="hidden sm:inline">•</span>
              <span>Version 1.0.0</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                System Online
              </Badge>
            </div>
          </div>
        </footer>
      </div>

      {/* Chat Panel - Always visible */}
      <ChatPanel />
      
      {/* Global Chat Toggle Button - Always visible */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => {
            const event = new CustomEvent('toggleChat', { detail: { open: true } })
            window.dispatchEvent(event)
          }}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 shadow-lg"
          aria-label="Open chat assistant"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}