// app/components/Navbar.tsx
"use client" 

import Link from 'next/link'

export default function Navbar() {
 
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          Financeiro - Elza Soares
        </Link>
      </div>
    </nav>
  )
}
