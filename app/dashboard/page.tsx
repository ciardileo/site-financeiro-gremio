// app/dashboard/page.tsx

import DashboardClient from './DashboardClient'; 
import { FinanceItem, DashboardClientProps } from '@/lib/types'; 
import { processMonthlyData, processCategoryData } from '@/lib/finance-processing'; 

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  let financeData: FinanceItem[] = [];
  let error: string | null = null;

  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` // em produção
      : 'http://localhost:3000'; // em desenvolvimento local

    const response = await fetch(`${baseUrl}/api/finances`, { // chama a API
      cache: 'no-store', 
    });

    // debug da resposta
    console.log(`[dashboard/page.tsx] Log: resultado de GET ${baseUrl}/api/finances:`, response.status, response.statusText, response.ok);
    const rawText = await response.text();
    console.log(rawText);

    if (!response.ok) {
      console.error("[dashboard/page.tsx] Erro: falha ao chamar API Finances na dashboard/page.tsx.")
      throw new Error(`Erro ${response.status}: Falha ao buscar dados financeiros.`);
    }

    // dados brutos da API
    const rawData: Omit<FinanceItem, 'id'>[] = JSON.parse(rawText);

    // adiciona uma coluna ID
    financeData = rawData.map((item, index) => ({
      ...item,
      id: `${item.data}-${item.descricao}-${index}`, 
    }));

    console.log("[dashboard/page.tsx] Log: os dados foram carregados e a coluna ID adicionada com sucesso na página dashboard.")

  } catch (err: unknown) {
    let errorMessage = 'Erro desconhecido ao buscar dados financeiros.';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }
    console.error("[dashboard/page.tsx] Erro: falha ao buscar dados do dashboard (Server Component):", err);
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

  console.log("[dashboard/page.tsx] Log: a página dashboard será carregada!")
  return <DashboardClient {...clientProps} />;
}
