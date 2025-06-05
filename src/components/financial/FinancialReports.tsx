
import React, { useState } from 'react';
import { useCompanies } from '../../contexts/CompanyContext';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { MacOSButtonAnimated } from '@/components/ui/macos-button-animated';
import { MacOSFade, MacOSStagger } from '@/components/ui/macos-animations';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, DollarSign, TrendingUp, Building2, BarChart3 } from 'lucide-react';
import { useExcelExport } from '../../hooks/useExcelExport';
import { HonoraryValueChart } from './charts/HonoraryValueChart';
import { MonthlyRevenueChart } from './charts/MonthlyRevenueChart';
import { TopCompaniesChart } from './charts/TopCompaniesChart';
import { TopGroupsChart } from './charts/TopGroupsChart';
import { RegimeRevenueChart } from './charts/RegimeRevenueChart';
import { SegmentRevenueChart } from './charts/SegmentRevenueChart';
import { CompanyValueTable } from './CompanyValueTable';
import { CompanySectorRevenueChart } from './charts/CompanySectorRevenueChart';

interface ExportData {
  'Nome da Empresa': string;
  'CNPJ': string;
  'Valor Honorário': number | string;
  'Grupo': string;
  'Classificação': string;
  'Regime Tributário': string;
  'Município': string;
  'Situação': string;
}

export const FinancialReports = () => {
  const { companies } = useCompanies();
  const { exportToExcel, isExporting } = useExcelExport();
  const [activeTab, setActiveTab] = useState('overview');

  // Calcular métricas financeiras
  const companiesWithValue = companies.filter(c => c.honoraryValue && c.honoraryValue > 0);
  const totalRevenue = companiesWithValue.reduce((sum, c) => sum + (c.honoraryValue || 0), 0);
  const averageValue = totalRevenue / (companiesWithValue.length || 1);
  const highestValue = Math.max(...companiesWithValue.map(c => c.honoraryValue || 0));

  const handleExportFinancialReport = () => {
    const exportData: ExportData[] = companiesWithValue.map(company => ({
      'Nome da Empresa': company.name,
      'CNPJ': company.taxId,
      'Valor Honorário': company.honoraryValue || 0,
      'Grupo': company.group || 'Sem grupo',
      'Classificação': company.classification || 'Não informado',
      'Regime Tributário': company.newTaxRegime || company.taxRegime,
      'Município': company.municipality || 'Não informado',
      'Situação': company.situation || 'Não informado'
    }));

    // Adicionar linha de totais
    exportData.push({
      'Nome da Empresa': 'TOTAL',
      'CNPJ': '-',
      'Valor Honorário': totalRevenue,
      'Grupo': '-',
      'Classificação': '-',
      'Regime Tributário': '-',
      'Município': '-',
      'Situação': '-'
    });

    exportToExcel(exportData, 'relatorio-financeiro');
  };

  const metricsData = [
    {
      title: "Receita Total",
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(totalRevenue),
      description: "Total dos honorários",
      icon: DollarSign
    },
    {
      title: "Valor Médio",
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(averageValue),
      description: "Média por empresa",
      icon: TrendingUp
    },
    {
      title: "Maior Valor",
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(highestValue),
      description: "Maior honorário",
      icon: BarChart3
    },
    {
      title: "Empresas Ativas",
      value: companiesWithValue.length.toString(),
      description: "Com honorários definidos",
      icon: Building2
    }
  ];

  return (
    <MacOSFade>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <MacOSFade delay={100}>
            <div>
              <h2 className="text-3xl font-bold macos-text-primary">Relatórios Financeiros</h2>
              <p className="macos-text-secondary">Análise detalhada dos honorários e receitas</p>
            </div>
          </MacOSFade>
          <MacOSFade delay={200}>
            <MacOSButtonAnimated
              onClick={handleExportFinancialReport}
              disabled={isExporting}
              macosStyle
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exportando...' : 'Exportar Excel'}</span>
            </MacOSButtonAnimated>
          </MacOSFade>
        </div>

        {/* Cards de Métricas */}
        <MacOSStagger delay={150}>
          {metricsData.map((metric, index) => (
            <MacOSCardAnimated key={index} interactive glassEffect>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium macos-text-primary">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold macos-text-primary">
                  {metric.value}
                </div>
                <p className="text-xs macos-text-tertiary">
                  {metric.description}
                </p>
              </CardContent>
            </MacOSCardAnimated>
          ))}
        </MacOSStagger>

        {/* Tabs com Relatórios */}
        <MacOSFade delay={300}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="macos-glass backdrop-blur-xl border border-macos-border">
              <TabsTrigger value="overview" className="macos-tab">Visão Geral</TabsTrigger>
              <TabsTrigger value="rankings" className="macos-tab">Rankings</TabsTrigger>
              <TabsTrigger value="charts" className="macos-tab">Gráficos</TabsTrigger>
              <TabsTrigger value="table" className="macos-tab">Tabela Detalhada</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MacOSFade delay={400}>
                  <HonoraryValueChart companies={companiesWithValue} />
                </MacOSFade>
                <MacOSFade delay={500}>
                  <MonthlyRevenueChart companies={companiesWithValue} />
                </MacOSFade>
              </div>
            </TabsContent>

            <TabsContent value="rankings" className="space-y-6">
              <MacOSStagger delay={200}>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <TopCompaniesChart companies={companiesWithValue} />
                  <TopGroupsChart companies={companiesWithValue} />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <RegimeRevenueChart companies={companiesWithValue} />
                  <SegmentRevenueChart companies={companiesWithValue} />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <CompanySectorRevenueChart companies={companiesWithValue} />
                </div>
              </MacOSStagger>
            </TabsContent>

            <TabsContent value="charts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MacOSFade delay={400}>
                  <HonoraryValueChart companies={companiesWithValue} />
                </MacOSFade>
                <MacOSFade delay={500}>
                  <MonthlyRevenueChart companies={companiesWithValue} />
                </MacOSFade>
              </div>
            </TabsContent>

            <TabsContent value="table">
              <MacOSFade delay={400}>
                <CompanyValueTable companies={companiesWithValue} />
              </MacOSFade>
            </TabsContent>
          </Tabs>
        </MacOSFade>
      </div>
    </MacOSFade>
  );
};
