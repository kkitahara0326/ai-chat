import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

interface HeaderProps {
  projectName: string
}

export default function Header({ projectName }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{projectName}</h1>
        </div>
      </div>
    </header>
  )
}

