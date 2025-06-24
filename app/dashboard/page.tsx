// app/dashboard/page.tsx

import DashboardClient from './DashboardClient'; 
import { FinanceItem, DashboardClientProps } from '@/lib/types'; 
import { processMonthlyData, processCategoryData } from '@/lib/finance-processing'; 

export default async function DashboardPage() {
  let financeData: FinanceItem[] = [];
  let error: string | null = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/finances`, {
      cache: 'no-store', // busca pela versão mais recente
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || `Erro ${response.status}: Falha ao buscar dados financeiros.`);
    }

    // dados brutos da API
    const rawData: Omit<FinanceItem, 'id'>[] = await response.json();

    // adiciona uma coluna ID
    financeData = rawData.map((item, index) => ({
      ...item,
      id: `${item.data}-${item.descricao}-${index}`, 
    }));

  } catch (err: unknown) {
    let errorMessage = 'Erro desconhecido ao buscar dados financeiros.';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }
    console.error("Erro ao buscar dados do dashboard (Server Component):", err);
    error = errorMessage;
  }

  // retorno da mensagem de erro
  if (error) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Algo deu errado.</h1>
        <p className="text-lg text-gray-700 mb-2">Não foi possível carregar os dados financeiros.</p>
        <p className="text-md text-gray-500">Detalhes: {error}</p>
        <p className="text-md text-gray-500 mt-4">
          Por favor, peça para os desenvolvedores analisar a disponibilidade da API.
        </p>
      </div>
    );
  }

  const entradasDetalhadas = financeData.filter(item => item.tipo === 'Entrada');
  const saidasDetalhadas = financeData.filter(item => item.tipo === 'Saída');

  const entradasMensais = processMonthlyData(entradasDetalhadas);
  const saidasMensais = processMonthlyData(saidasDetalhadas);
  const pieDataEntradas = processCategoryData(entradasDetalhadas);
  const pieDataSaidas = processCategoryData(saidasDetalhadas);

  const clientProps: DashboardClientProps = {
    initialData: financeData,
    entradasMensais,
    saidasMensais,
    pieDataEntradas,
    pieDataSaidas,
  };

  return <DashboardClient {...clientProps} />;
}
