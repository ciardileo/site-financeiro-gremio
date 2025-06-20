import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          Financeiro - Elza Soares
        </Link>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/doadores">Doadores</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/rifas">Rifas</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}