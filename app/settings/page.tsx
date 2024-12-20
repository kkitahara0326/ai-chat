'use client'

import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import Header from '../components/Header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [email, setEmail] = useState('user@example.com')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header projectName="設定" />
      <main className="flex-grow p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">設定</h1>
          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">プロフィール</TabsTrigger>
              <TabsTrigger value="notifications">通知</TabsTrigger>
              <TabsTrigger value="appearance">外観</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button>保存</Button>
              </div>
            </TabsContent>
            <TabsContent value="notifications">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">通知を有効にする</Label>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
            </TabsContent>
            <TabsContent value="appearance">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">ダークモード</Label>
                <Switch
                  id="theme"
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

