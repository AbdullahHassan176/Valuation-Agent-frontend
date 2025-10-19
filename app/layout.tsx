import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppShell } from './_components/AppShell'
import { ThemeProvider } from './_components/ThemeProvider'
import { SettingsProvider } from '@/contexts/SettingsContext'
import { Toaster } from '@/components/ui/toaster'
import { ErrorBoundary } from './_components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Deloitte Valuation Platform',
  description: 'Advanced Financial Risk Management & Compliance Platform',
  keywords: ['financial', 'valuation', 'risk', 'compliance', 'IFRS', 'accounting'],
  authors: [{ name: 'Valuation Agent Team' }],
  creator: 'Valuation Agent Platform',
  publisher: 'Valuation Agent Platform',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://valuation-agent.com',
    title: 'Deloitte Valuation Platform',
    description: 'Advanced Financial Risk Management & Compliance Platform',
    siteName: 'Deloitte Valuation Platform',
  },
  twitter: {
    card: 'summary',
    title: 'Deloitte Valuation Platform',
    description: 'Advanced Financial Risk Management & Compliance Platform',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const themeColor = [
  { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  { media: '(prefers-color-scheme: dark)', color: '#111827' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <SettingsProvider>
              <AppShell>
                {children}
              </AppShell>
              <Toaster />
            </SettingsProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
