
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Company } from '../../../types/company';
import { FinancialChartModal } from './FinancialChartModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface CompanySectorRevenueChartProps {
  companies: Company[];
}

export const CompanySectorRevenueChart = ({ companies }: CompanySectorRevenueChartProps) => {
  const [showModal, setShowModal] = useState(false);

  const totalRevenue = companies.reduce((sum, c) => sum + (c.honoraryValue || 0), 0);

  // Agrupar por setor da empresa
  const sectorData = companies.reduce((acc, company) => {
    const sector = company.companySector || 'Não informado';
    if (!acc[sector]) {
      acc[sector] = { name: sector, value: 0, count: 0 };
    }
    acc[sector].value += company.honoraryValue || 0;
    acc[sector].count += 1;
    return acc;
  }, {} as Record<string, { name: string; value: number; count: number }>);

  // Calcular percentuais e médias
  const chartData = Object.values(sectorData)
    .filter(sector => sector.value > 0)
    .sort((a, b) => b.value - a.value)
    .map(sector => ({
      ...sector,
      percentage: (sector.value / totalRevenue * 100).toFixed(1),
      averageValue: sector.count > 0 ? sector.value / sector.count : 0
    }));

  const modalData = chartData.map(item => ({
    name: item.name,
    count: item.count,
    value: item.value,
    percentage: item.percentage + '%',
    averageValue: item.averageValue
  }));

  const handleChartClick = () => {
    setShowModal(true);
  };

  return (
    <MacOSFade>
      <MacOSCardAnimated 
        interactive 
        glassEffect 
        className="cursor-pointer hover:shadow-xl transition-all duration-300" 
        onClick={handleChartClick}
      >
        <CardHeader>
          <CardTitle className="macos-text-primary">Faturamento por Setor da Empresa</CardTitle>
          <CardDescription className="macos-text-secondary">
            Receita total por setor empresarial (clique para ver detalhes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--macos-border)" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                fontSize={12}
                stroke="rgb(var(--macos-text-secondary))"
              />
              <YAxis 
                tickFormatter={(value) => 
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(value)
                }
                stroke="rgb(var(--macos-text-secondary))"
              />
              <Tooltip 
                formatter={(value) => [
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(value as number),
                  'Faturamento'
                ]}
                labelFormatter={(label) => `Setor: ${label}`}
                contentStyle={{
                  backgroundColor: 'var(--macos-glass)',
                  border: '1px solid var(--macos-border)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)',
                  color: 'rgb(var(--macos-text-primary))'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="rgb(var(--macos-blue))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </MacOSCardAnimated>

      <FinancialChartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Faturamento por Setor da Empresa"
        data={modalData}
        columns={[
          { key: 'name', label: 'Setor' },
          { key: 'count', label: 'Empresas' },
          { key: 'value', label: 'Faturamento Total', 
            render: (value) => new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value as number)
          },
          { key: 'percentage', label: '% do Total' },
          { key: 'averageValue', label: 'Média por Empresa',
            render: (value) => new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value as number)
          }
        ]}
      />
    </MacOSFade>
  );
};
