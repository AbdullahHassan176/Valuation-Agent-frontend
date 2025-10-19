'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
  isLast?: boolean
}

export function Breadcrumbs() {
  const pathname = usePathname()
  
  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ]
    
    let currentPath = ''
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Handle dynamic routes like [id]
      let label = segment
      if (segment.match(/^\d+$/)) {
        // If it's a number, it's likely an ID
        const parentSegment = segments[index - 1]
        if (parentSegment === 'runs') {
          label = `Run #${segment}`
        } else {
          label = segment
        }
      } else {
        // Capitalize and format segment names
        label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isLast: index === segments.length - 1
      })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm">
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            )}
            {item.isLast ? (
              <span 
                className="text-foreground font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {index === 0 ? (
                  <Home className="h-4 w-4" />
                ) : (
                  item.label
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
