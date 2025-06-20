import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

// fontes
const inter = Inter({ subsets: ['latin'] })

// metadados do site
export const metadata: Metadata = {
  title: 'Grêmio Elza Soares - Diretoria Financeira',
  description: 'Transparência e efetividade',
}

// layout aplicado em todas as páginas
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}