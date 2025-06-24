// app/rifas/page.tsx

import React from 'react';
import Link from 'next/link'; 
import { ArrowLeft } from 'lucide-react'; 

export default function RifasPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Em Breve... ⏳
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-lg">
        A página de <strong>Rifas</strong> está em desenvolvimento e será lançada em breve!
      </p>

      <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}
