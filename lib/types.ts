// lib/types.ts
// arquivo que cria as interfaces (estruturas e tipagem dos objetos) dos dados da api do Google Sheets
export interface RawFinanceItem {
  'Data': string;
  'Descrição': string;
  'Tipo': string; 
  'Valor': string; 
  'Categoria': string;
  [key: string]: string; // mais propriedades
}

export interface FinanceItem {
  id: string; 
  data: string; 
  descricao: string;
  tipo: 'Entrada' | 'Saída'; 
  valor: number;
  categoria: string;
}

export interface MonthlySummary {
  mes: string; 
  valor: number;
}

export interface CategorySummary {
  name: string; 
  value: number; 
  color: string; 
}

export interface DashboardClientProps {
  initialData: FinanceItem[];
  entradasMensais: MonthlySummary[];
  saidasMensais: MonthlySummary[];
  pieDataEntradas: CategorySummary[];
  pieDataSaidas: CategorySummary[];
}

