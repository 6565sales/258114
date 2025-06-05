
import React from 'react';

interface MetricsCardsProps {
  totalCompanies: number;
  highComplexityCompanies: number;
  simplesNacionalCompanies: number;
  lucroPresumidoCompanies: number;
  lucroRealCompanies: number;
}

export const MetricsCards = ({
  totalCompanies,
  highComplexityCompanies,
  simplesNacionalCompanies,
  lucroPresumidoCompanies,
  lucroRealCompanies
}: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Total de Empresas</h3>
        <p className="text-3xl font-bold text-blue-600">{totalCompanies}</p>
      </div>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Complexidade Alta</h3>
        <p className="text-3xl font-bold text-orange-600">{highComplexityCompanies}</p>
      </div>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Simples Nacional</h3>
        <p className="text-3xl font-bold text-green-600">{simplesNacionalCompanies}</p>
      </div>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Lucro Presumido</h3>
        <p className="text-3xl font-bold text-purple-600">{lucroPresumidoCompanies}</p>
      </div>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Lucro Real</h3>
        <p className="text-3xl font-bold text-red-600">{lucroRealCompanies}</p>
      </div>
    </div>
  );
};
