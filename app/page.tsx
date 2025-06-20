// app/page.tsx
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Gift, ArrowRight, Ticket } from 'lucide-react'

export default function Home() {

  return (
    <div className="container mx-auto p-6">
      {/* banner inicial */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Diretoria Financeira - Grêmio Elza Soares
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transparência total nas movimentações financeiras do nosso grêmio. 
          Acompanhe receitas, despesas, rifas e reconheça nossos apoiadores.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">
              <BarChart3 className="mr-2 h-4 w-4" />
              Ver Dashboard
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/rifas">
              <Ticket className="mr-2 h-4 w-4" />
              Comprar Rifa
            </Link>
          </Button>
        </div>
      </div>

      {/* funcionalidades do site */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

        {/* dashboard com entradas e saídas */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              Gráficos e estatísticas em tempo real das movimentações financeiras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href="/dashboard">
                Acessar <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* menu com doadores */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Doadores</CardTitle>
            <CardDescription>
              Reconhecimento aos nossos apoiadores e parceiros do grêmio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href="/doadores">
                Acessar <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Gift className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Rifas</CardTitle>
            <CardDescription>
              Acompanhe rifas ativas e o histórico de sorteios realizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between" asChild>
              <Link href="/rifas">
                Acessar <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* dados gerais */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Resumo Rápido
          </CardTitle>
          <CardDescription>
            Principais números do mês atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">R$ 550,00</div>
              <div className="text-sm text-muted-foreground">Saldo Atual</div>
              <Badge variant="secondary" className="mt-1">+12% vs mês anterior</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">R$ 1.100,00</div>
              <div className="text-sm text-muted-foreground">Entradas do Mês</div>
              <Badge variant="secondary" className="mt-1">4 transações</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">R$ 550,00</div>
              <div className="text-sm text-muted-foreground">Saídas do Mês</div>
              <Badge variant="secondary" className="mt-1">4 transações</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* rodapé */}
      <div className="text-center pt-5 border-t">
        <p className="text-muted-foreground">
          Desenvolvido por Diretoria Financeira - Grêmio Elza Soares &copy; 2025 .
        </p>
      </div>
    </div>
  )
}