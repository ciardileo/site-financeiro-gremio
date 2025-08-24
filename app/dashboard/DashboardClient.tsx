// app/dashboard/DashboardClient.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"

// lib
import { formatCurrency } from "@/lib/finance-processing"
import { DashboardClientProps } from '@/lib/types'; 


export default function DashboardClient({ 
  initialData, 
  entradasMensais, 
  saidasMensais, 
  pieDataEntradas, 
  pieDataSaidas 
}: DashboardClientProps) {
  // verificar se já foi montado (necessário pro Recharts)
  const [isMounted, setIsMounted] = useState(false);

  // prevenir erros de hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const entradasDetalhadas = initialData.filter(item => item.tipo === 'Entrada');
  const saidasDetalhadas = initialData.filter(item => item.tipo === 'Saída');

  const totalEntradas = entradasDetalhadas.reduce((acc, item) => acc + item.valor, 0);
  const totalSaidas = saidasDetalhadas.reduce((acc, item) => acc + item.valor, 0);
  const saldoAtual = totalEntradas - totalSaidas;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Financeiro</h1>
        <p className="text-muted-foreground">Visão geral das movimentações financeiras do grêmio neste ano.</p>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(saldoAtual)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entradas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalEntradas)}</div>
            <p className="text-xs text-muted-foreground">
              Total das Entradas Carregadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saídas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalSaidas)}</div>
            <p className="text-xs text-muted-foreground">
              Total das Saídas Carregadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* gráficos e tabelas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* ENTRADAS */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h2 className="text-2xl font-semibold text-green-600">Entradas</h2>
          </div>

          {/* gráfico de barras */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal - Entradas</CardTitle>
            </CardHeader>
            <CardContent>
              {isMounted ? ( 
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={entradasMensais}> 
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <RechartsTooltip formatter={(value: number) => formatCurrency(Number(value))} />
                    <Bar dataKey="valor" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center bg-muted rounded">
                  <p className="text-muted-foreground">Carregando gráfico...</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* tabela */}
          <TooltipProvider>
            <Card>
              <CardHeader>
                <CardTitle>Últimas Entradas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entradasDetalhadas.map((entrada) => (
                      <TableRow key={entrada.id}> 
                        <TableCell>{entrada.data}</TableCell>
                        <TableCell className="max-w-[250px]">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="truncate text-left w-full">
                                {entrada.descricao}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{entrada.descricao}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{entrada.categoria}</Badge>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatCurrency(entrada.valor)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TooltipProvider>

          {/* gráfico de pizza */}
          <Card>
            <CardHeader>
              <CardTitle>Entradas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              {isMounted ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieDataEntradas}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name" 
                    >
                      {pieDataEntradas.map((entry, index) => (
                        <Cell key={`cell-entrada-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number, name: string) => [`${formatCurrency(Number(value))}`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center bg-muted rounded">
                  <p className="text-muted-foreground">Carregando gráfico...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* saídas */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <h2 className="text-2xl font-semibold text-red-600">Saídas</h2>
          </div>

          {/* gráfico de barras */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal - Saídas</CardTitle>
            </CardHeader>
            <CardContent>
              {isMounted ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={saidasMensais}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <RechartsTooltip formatter={(value: number) => formatCurrency(Number(value))} />
                    <Bar dataKey="valor" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center bg-muted rounded">
                  <p className="text-muted-foreground">Carregando gráfico...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* tabela */}
          <TooltipProvider>
            <Card>
              <CardHeader>
                <CardTitle>Últimas Saídas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {saidasDetalhadas.map((saida) => (
                      <TableRow key={saida.id}>
                        <TableCell>{saida.data}</TableCell>
                        <TableCell className="max-w-[250px]">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="truncate text-left w-full">
                                {saida.descricao}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{saida.descricao}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{saida.categoria}</Badge>
                        </TableCell>
                        <TableCell className="font-medium text-red-600">
                          {formatCurrency(saida.valor)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TooltipProvider>

          {/* gráfico de pizza */}
          <Card>
            <CardHeader>
              <CardTitle>Saídas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              {isMounted ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieDataSaidas}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name" 
                    >
                      {pieDataSaidas.map((entry, index) => (
                        <Cell key={`cell-saida-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number, name: string) => [`${formatCurrency(Number(value))}`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center bg-muted rounded">
                  <p className="text-muted-foreground">Carregando gráfico...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
