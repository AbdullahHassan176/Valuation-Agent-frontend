'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  PlayCircle,
  FileText,
  TrendingUp,
  Calculator,
  Shield,
  FileCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  BarChart3,
  Activity,
  FileDown
} from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobile?: boolean
}

const navigationItems = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
        badge: null,
      },
    ],
  },
  {
    title: 'Valuation',
    items: [
      {
        title: 'Runs',
        href: '/runs',
        icon: PlayCircle,
        badge: '12',
      },
      {
        title: 'Reports',
        href: '/reports',
        icon: FileText,
        badge: '7',
      },
      {
        title: 'Generate Reports',
        href: '/reports/generate',
        icon: FileDown,
        badge: null,
      },
      {
        title: 'Intake',
        href: '/intake',
        icon: FileText,
        badge: null,
      },
      {
        title: 'Document Analysis',
        href: '/intake/analyze',
        icon: FileCheck,
        badge: null,
      },
      {
        title: 'Curves',
        href: '/curves',
        icon: TrendingUp,
        badge: null,
      },
      {
        title: 'Instruments',
        href: '/instruments',
        icon: Calculator,
        badge: null,
      },
    ],
  },
  {
    title: 'Risk & Compliance',
    items: [
      {
        title: 'XVA',
        href: '/xva',
        icon: BarChart3,
        badge: null,
      },
      {
        title: 'Governance',
        href: '/governance',
        icon: Shield,
        badge: null,
      },
      {
        title: 'Policy Editor',
        href: '/governance/policy',
        icon: Shield,
        badge: null,
      },
      {
        title: 'Audit Log',
        href: '/audit',
        icon: FileCheck,
        badge: null,
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
        badge: null,
      },
    ],
  },
]

export function Sidebar({ isCollapsed, onToggle, isMobile = false }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "flex h-full flex-col border-r bg-card transition-all duration-300",
      isMobile ? "w-full" : isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header - Hidden on mobile */}
      {!isMobile && (
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-brand-green flex items-center justify-center">
                <span className="text-white font-bold text-xs">VA</span>
              </div>
              <span className="font-semibold">Valuation Agent</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-6">
          {navigationItems.map((section, sectionIndex) => (
            <div key={section.title}>
              {(!isCollapsed || isMobile) && (
                <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start h-10 sm:h-9",
                          (isCollapsed && !isMobile) ? "px-2" : "px-3",
                          isActive && "bg-secondary text-secondary-foreground"
                        )}
                        aria-label={`Navigate to ${item.title}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon className={cn("h-4 w-4", (isCollapsed && !isMobile) ? "mx-auto" : "mr-3")} />
                        {(!isCollapsed || isMobile) && (
                          <>
                            <span className="flex-1 text-left text-sm sm:text-base">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Button>
                    </Link>
                  )
                })}
              </div>
              {sectionIndex < navigationItems.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Chat Panel Toggle - Hidden on mobile */}
      {!isMobile && (
        <div className="p-2 border-t">
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start",
              isCollapsed ? "px-2" : "px-3"
            )}
            aria-label="Open chat assistant"
            onClick={() => {
              // Dispatch event to open chat panel
              const event = new CustomEvent('toggleChat', { detail: { open: true } })
              window.dispatchEvent(event)
            }}
          >
            <MessageSquare className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-3")} />
            {!isCollapsed && <span>Chat Assistant</span>}
          </Button>
        </div>
      )}
    </div>
  )
}