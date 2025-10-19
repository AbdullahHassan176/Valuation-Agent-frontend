import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppShell } from './_components/AppShell'
import { ThemeProvider } from './_components/ThemeProvider'
import { SettingsProvider } from '@/contexts/SettingsContext'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Valuation Agent Platform',
  description: 'Financial risk valuation and compliance platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <SettingsProvider>
            <AppShell>
              {children}
            </AppShell>
            <Toaster />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
