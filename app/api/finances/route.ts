// app/api/finances/route.ts
// arquivo que acessa a API

import { NextResponse } from 'next/server';
import csv from 'csvtojson';
import { RawFinanceItem, FinanceItem } from '@/lib/types'; // Importe as interfaces do arquivo compartilhado

// url da planilha em csv
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSigkTG_im1KTXViAGybCfpJ-BPqRirt4uNARHNhMgn1Q7zjwG_BJ2F_-SqIF6iydQtuhCCGpsRKO4K/pub?output=csv'; 

// função que é executada quando a url for acessada
export async function GET() {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);

    // checa erros
    if (!response.ok) {
      return NextResponse.json(
        { error: `Erro ao buscar a planilha: ${response.statusText}`, status: response.status },
        { status: response.status }
      );
    }

    // resultado do fetch  
    const csvText = await response.text();

    // Converte o CSV para um array de objetos JSON, usando a interface RawFinanceItem
    const jsonData: RawFinanceItem[] = await csv().fromString(csvText);

    // formata os dados para o padrão da interface FinanceItem
    const formattedData: Omit<FinanceItem, 'id'>[] = jsonData.map((row: RawFinanceItem) => ({
      data: row['Data'], 
      descricao: row['Descrição'],
      tipo: row['Tipo'] as 'Entrada' | 'Saída', 
      valor: parseFloat(row['Valor']), 
      categoria: row['Categoria']
    }));

    // Retorna os dados formatados (ainda sem o ID único)
    return NextResponse.json(formattedData, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido ao buscar dados financeiros.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    console.error('Erro na API Route de finanças:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados financeiros.', details: errorMessage },
      { status: 500 }
    );
  }
}
