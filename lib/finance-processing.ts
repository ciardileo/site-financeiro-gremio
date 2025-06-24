// lib/finance-processing.ts
// nesse arquivo estão as funções que fazem operações nos dados financeiros brutos para melhor apresentação

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CategorySummary, FinanceItem, MonthlySummary } from './types'; 

// pega os dados brutos e gera um array com os valores mensais
export function processMonthlyData(data: FinanceItem[]): MonthlySummary[] {
  const monthlyMap = new Map<string, number>();  // hashmap com o total de cada mês  

  data.forEach(item => {
    // converte string em data
    const [day, month, year] = item.data.split('/').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    // validação da data
    if (isNaN(date.getTime())) {
      console.warn(`Data inválida encontrada: "${item.data}"`);
      return;
    }

    const monthYearKey = format(date, 'MMM/yyyy', { locale: ptBR });
    const currentTotal = monthlyMap.get(monthYearKey) || 0;
    monthlyMap.set(monthYearKey, currentTotal + item.valor);  // atualiza o map
  });

  // converte o mapa em array ordenado
  const sortedMonths = Array.from(monthlyMap.entries())
      .map(([mesLabel, valor]) => {
          const [m, y] = mesLabel.split('/');
          const monthNum = new Date(Date.parse(`${m} 1, 2000`)).getMonth();
          const sortKey = `${y}-${String(monthNum + 1).padStart(2, '0')}`;
          return { monthKey: sortKey, mes: mesLabel, valor };
      })
      .sort((a, b) => (a.monthKey > b.monthKey ? 1 : -1))
      .map(({ mes, valor }) => ({ mes, valor })); 

  return sortedMonths;
}

// resumos por categoria
export function processCategoryData(data: FinanceItem[]): CategorySummary[] {
  const categoryMap = new Map<string, number>();
  data.forEach(item => {
    const currentTotal = categoryMap.get(item.categoria) || 0;
    categoryMap.set(item.categoria, currentTotal + item.valor);
  });

  const colors = [
    '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', 
    '#f97316', '#84cc16', '#06b6d4', '#6d28d9', '#db2777',
    '#a855f7', '#ec4899', '#facc15', '#6b7280', '#14b8a6'
  ];
  let colorIndex = 0;

  return Array.from(categoryMap.entries()).map(([name, value]) => {
    const color = colors[colorIndex % colors.length];
    colorIndex++;
    return { name, value, color };
  });
}

// função de formatar a moeda
export function formatCurrency(value: number){
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}