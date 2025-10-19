'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  Menu,
  ChevronDown
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SettingsDrawer from '@/components/SettingsDrawer'
import { Breadcrumbs } from './Breadcrumbs'
import { ThemeSwitch } from './ThemeSwitch'

interface TopbarProps {
  onMenuClick?: () => void
  isMobile?: boolean
}

export function Topbar({ onMenuClick, isMobile = false }: TopbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-brand-green flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">VA</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm sm:text-lg font-semibold">Valuation Agent</h1>
              <p className="text-xs text-muted-foreground hidden md:block">Financial Risk Platform</p>
            </div>
          </div>
        </div>

        {/* Center - Breadcrumbs (Desktop only) */}
        <div className="flex-1 max-w-md mx-4 hidden lg:block">
          <Breadcrumbs />
        </div>

        {/* Center - Search (Tablet only) */}
        <div className="flex-1 max-w-md mx-4 hidden md:block lg:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Environment Badge - Hidden on mobile */}
          <Badge variant="secondary" className="hidden sm:flex text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
            DEV
          </Badge>

          {/* Theme Switch - Hidden on mobile */}
          <div className="hidden sm:block">
            <ThemeSwitch />
          </div>

          {/* Settings - Always visible */}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setIsSettingsOpen(true)}
            title="Settings"
          >
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* Notifications - Hidden on mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hidden sm:flex h-9 w-9 sm:h-10 sm:w-10"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 h-9 px-2 sm:px-3">
                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <span className="hidden sm:block">John Doe</span>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </header>
  )
}