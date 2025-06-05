
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useChartData } from '../../hooks/useChartData';
import { MetricsCards } from './MetricsCards';
import { TaxRegimeChart } from './charts/TaxRegimeChart';
import { ComplexityChart } from './charts/ComplexityChart';
import { ClientClassChart } from './charts/ClientClassChart';
import { SectorClientChart } from './charts/SectorClientChart';
import { NewTaxRegimeChart } from './charts/NewTaxRegimeChart';
import { CompanySectorChart } from './charts/CompanySectorChart';
import { MunicipalityChart } from './charts/MunicipalityChart';
import { ClassificationChart } from './charts/ClassificationChart';
import { SituationChart } from './charts/SituationChart';
import { GroupChart } from './charts/GroupChart';

export const DashboardCharts = () => {
  const { user } = useAuth();
  
  // Check if user has permission to view charts
  const canViewCharts = user?.role === 'root' || user?.role === 'manager';

  // If user doesn't have permission, show access denied message
  if (!canViewCharts) {
    return (
      <div className="flex items-center justify-center h-64 animate-fade-in">
        <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-lg hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Acesso Restrito</h3>
          <p className="text-gray-600 dark:text-gray-300">Apenas administradores e gerentes podem visualizar os gráficos do dashboard.</p>
        </div>
      </div>
    );
  }

  const chartData = useChartData();

  // Show loading state if data is not ready
  if (!chartData || chartData.totalCompanies === 0) {
    return (
      <div className="flex items-center justify-center h-64 animate-fade-in">
        <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-lg hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Carregando...</h3>
          <p className="text-gray-600 dark:text-gray-300">Aguarde enquanto carregamos os dados do dashboard.</p>
        </div>
      </div>
    );
  }

  const {
    totalCompanies,
    highComplexityCompanies,
    simplesNacionalCompanies,
    lucroPresumidoCompanies,
    lucroRealCompanies,
    taxRegimeChartData,
    complexityChartData,
    clientClassChartData,
    sectorVsClientData,
    newTaxRegimeChartData,
    companySectorChartData,
    municipalityChartData,
    classificationChartData,
    situationChartData,
    groupChartData
  } = chartData;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Metrics Cards */}
      <div className="transition-all duration-200 hover:scale-[1.01]">
        <MetricsCards
          totalCompanies={totalCompanies}
          highComplexityCompanies={highComplexityCompanies}
          simplesNacionalCompanies={simplesNacionalCompanies}
          lucroPresumidoCompanies={lucroPresumidoCompanies}
          lucroRealCompanies={lucroRealCompanies}
        />
      </div>

      {/* Primeira linha - Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
          <NewTaxRegimeChart data={newTaxRegimeChartData} />
        </div>
        <div className="transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
          <CompanySectorChart data={companySectorChartData} />
        </div>
      </div>

      {/* Segunda linha - Localização e classificação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
          <MunicipalityChart data={municipalityChartData} />
        </div>
        <div className="transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
          <ClassificationChart data={classificationChartData} />
        </div>
      </div>

      {/* Terceira linha - Situação e legados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
          <SituationChart data={situationChartData} />
        </div>
        <div className="transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
          <TaxRegimeChart data={taxRegimeChartData} />
        </div>
      </div>

      {/* Quarta linha - Complexidade e classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
          <ComplexityChart data={complexityChartData} />
        </div>
        <div className="transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
          <ClientClassChart data={clientClassChartData} />
        </div>
      </div>

      {/* Quinta linha - Gráfico de grupos (ocupando toda a largura) */}
      <div className="grid grid-cols-1 gap-6">
        <div className="transition-all duration-200 hover:scale-[1.01] hover:shadow-xl">
          <GroupChart data={groupChartData} />
        </div>
      </div>

      {/* Sexta linha - Setor vs Cliente */}
      <div className="grid grid-cols-1 gap-6">
        <div className="transition-all duration-200 hover:scale-[1.01] hover:shadow-xl">
          <SectorClientChart data={sectorVsClientData} />
        </div>
      </div>
    </div>
  );
};
