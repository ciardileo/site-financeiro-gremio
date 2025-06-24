// app/page.tsx
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Gift, ArrowRight, Ticket } from 'lucide-react'

// libs
import { FinanceItem, HomePageSummaryProps } from '@/lib/types'
import { formatCurrency } from '@/lib/finance-processing'

export default async function Home() {
  let financeData: FinanceItem[] = []; // armazenar os dados brutos
  let error: string | null = null; // mensagens de erro

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // chama a API
    const response = await fetch(`${baseUrl}/api/finances`, {
      cache: 'no-store', 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || `Erro ${response.status}: Falha ao buscar dados financeiros para a página inicial.`);
    }

    // converte os dados para JSON
    const rawData: Omit<FinanceItem, 'id'>[] = await response.json();

    // adiciona um ID
    financeData = rawData.map((item, index) => ({
      ...item,
      id: `${item.data}-${item.descricao}-${index}`, 
    }));

  } catch (err: unknown) {
    let errorMessage = 'Erro desconhecido ao buscar dados para a página inicial.';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }
    console.error("Erro ao buscar dados para a página inicial:", err);
    error = errorMessage;
  }

  // resumos
  let summaryData: HomePageSummaryProps = {
    saldoAtual: 0,
    totalGasto: 0,
    totalArrecadado: 0,
    numeroDespesas: 0,
    numeroEntradas: 0,
  };

  // calcula os dados para o resumo
  if (!error && financeData.length > 0) {
    const totalEntradas = financeData
      .filter(item => item.tipo === 'Entrada')
      .reduce((acc, item) => acc + item.valor, 0);

    const totalSaidas = financeData
      .filter(item => item.tipo === 'Saída')
      .reduce((acc, item) => acc + item.valor, 0);

    const numeroEntradas = financeData.filter(item => item.tipo === 'Entrada').length;
    const numeroDespesas = financeData.filter(item => item.tipo === 'Saída').length;

    // inicializa o object
    summaryData = {
      saldoAtual: totalEntradas - totalSaidas,
      totalGasto: totalSaidas,
      totalArrecadado: totalEntradas,
      numeroDespesas: numeroDespesas,
      numeroEntradas: numeroEntradas,
    };
  }

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

        {/* link para a página de doadores */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Doadores (EM CONSTRUÇÃO)</CardTitle>
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

        {/* link para a página de rifas*/}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Gift className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Rifas (EM CONSTRUÇÃO)</CardTitle>
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
              <div className="text-2xl font-bold text-primary mb-2">{formatCurrency(summaryData.saldoAtual)}</div>
              <div className="text-sm text-muted-foreground">Saldo Atual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{formatCurrency(summaryData.totalArrecadado)}</div>
              <div className="text-sm text-muted-foreground">Entradas do Mês</div>
              <Badge variant="secondary" className="mt-1">{summaryData.numeroEntradas} transações</Badge>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">{formatCurrency(summaryData.totalGasto)}</div>
              <div className="text-sm text-muted-foreground">Saídas do Mês</div>
              <Badge variant="secondary" className="mt-1">{(summaryData.numeroDespesas)} transações</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* rodapé */}
      <div className="text-center pt-5 border-t"> 
        <p className="text-muted-foreground">
          Desenvolvido por <a href="https://github.com/ciardileo/site-financeiro-gremio" target="_blank" className="underline">Diretoria Financeira</a> - Grêmio Elza Soares &copy; 2025 .
        </p>
      </div>
    </div>
  )
}