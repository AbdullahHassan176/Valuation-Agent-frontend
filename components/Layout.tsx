import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Runs', href: '/runs', icon: '📊' },
    { name: 'New IRS', href: '/runs/new', icon: '💹' },
    { name: 'New CCS', href: '/ccs/new', icon: '🌍' },
    { name: 'Intake', href: '/intake', icon: '📄' },
    { name: 'Curves', href: '/curves', icon: '📈' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-200">
          <h1 className="text-xl font-bold text-primary-700">Valuation Agent</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close sidebar"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${
                  isActive(item.href) ? 'nav-link-active' : 'nav-link-inactive'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <span className="mr-3 text-lg" aria-hidden="true">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary-200">
          <div className="text-xs text-secondary-500">
            <div>Valuation Agent v1.0</div>
            <div>Professional Financial Modeling</div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-secondary-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-secondary-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Open sidebar"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="text-sm text-secondary-600">
                  Professional Financial Modeling Platform
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success-500 rounded-full animate-pulse" aria-label="System online"></div>
                <span className="text-sm text-secondary-600">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

