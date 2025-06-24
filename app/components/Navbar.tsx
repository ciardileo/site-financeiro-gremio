// app/components/Navbar.tsx
"use client" 

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet" 
import { MenuIcon } from 'lucide-react' 
import { useState } from 'react' 

export default function Navbar() {
  // controla o estado do menu
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // links desabilitados
  const disabledLinkClasses = "text-gray-400 cursor-not-allowed opacity-50 pointer-events-none";

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          Financeiro - Elza Soares
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/doadores" className={disabledLinkClasses} aria-disabled="true">
              Doadores
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/rifas" className={disabledLinkClasses} aria-disabled="true">
              Rifas
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir Menu">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                <Button variant="ghost" asChild onClick={() => setIsSheetOpen(false)}>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" asChild onClick={() => setIsSheetOpen(false)}>
                  <Link href="/doadores" className={disabledLinkClasses} aria-disabled="true">
                    Doadores
                  </Link>
                </Button>
                <Button variant="ghost" asChild onClick={() => setIsSheetOpen(false)}>
                  <Link href="/rifas" className={disabledLinkClasses} aria-disabled="true">
                    Rifas
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
