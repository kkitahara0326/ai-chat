'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Home, List, Settings, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', icon: Home, label: 'ホーム' },
    { href: '/projects', icon: List, label: 'プロジェクト一覧' },
    { href: '/settings', icon: Settings, label: '設定' },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  const NavContent = () => (
    <nav className={`${isDesktop ? 'flex-col' : 'flex-row justify-around'} flex`}>
      {navItems.map((item) => (
        <Link 
          key={item.href} 
          href={item.href} 
          className={`flex items-center p-4 ${isDesktop ? (isOpen ? '' : 'justify-center') : 'flex-col'}`} 
          onClick={() => setIsOpen(false)}
        >
          <item.icon size={24} className={isDesktop && isOpen ? 'mr-2' : ''} />
          {(isDesktop && isOpen) || !isDesktop ? (
            <span className={isDesktop ? '' : 'text-xs'}>{item.label}</span>
          ) : null}
        </Link>
      ))}
    </nav>
  )

  if (isDesktop) {
    return (
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-50 ${isOpen ? 'w-64' : 'w-16'}`}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={toggleMenu}
          aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        <div className="pt-16">
          <NavContent />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <NavContent />
    </div>
  )
}

