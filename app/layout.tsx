import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation'
import { ThemeProvider } from './contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '建設プロジェクト管理',
  description: '建設プロジェクトのタスク管理アプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="flex-grow lg:ml-16">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

