import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function SearchBar() {
  return (
    <div className="bg-white shadow-md py-2 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="タスク名やステータスで検索"
            className="pl-10 pr-4 py-2 w-full rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    </div>
  )
}

