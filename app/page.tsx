import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold mb-6">建設プロジェクト管理アプリへようこそ</h1>
      <p className="text-xl mb-8 text-center">
        効率的なプロジェクト管理で、建設作業を円滑に進めましょう。
      </p>
      <Link href="/projects" passHref>
        <Button size="lg">
          プロジェクト一覧を見る
        </Button>
      </Link>
    </div>
  )
}

