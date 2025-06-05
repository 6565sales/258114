
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Company } from '../../../types/company';
import { FinancialChartModal } from './FinancialChartModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface RegimeRevenueChartProps {
  companies: Company[];
}

export const RegimeRevenueChart = ({ companies }: RegimeRevenueChartProps) => {
  const [showModal, setShowModal] = useState(false);

  const totalRevenue = companies.reduce((sum, c) => sum + (c.honoraryValue || 0), 0);

  // Agrupar por regime tributário
  const regimeData = companies.reduce((acc, company) => {
    const regime = company.newTaxRegime || company.taxRegime;
    if (!acc[regime]) {
      acc[regime] = { name: regime, value: 0, count: 0 };
    }
    acc[regime].value += company.honoraryValue || 0;
    acc[regime].count += 1;
    return acc;
  }, {} as Record<string, { name: string; value: number; count: number }>);

  const chartData = Object.values(regimeData)
    .sort((a, b) => b.value - a.value)
    .map(regime => ({
      ...regime,
      percentage: (regime.value / totalRevenue * 100).toFixed(1),
      averageValue: regime.count > 0 ? regime.value / regime.count : 0
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
          <CardTitle>Faturamento por Regime Tributário</CardTitle>
          <CardDescription>
            Receita total e percentual por regime (clique para ver detalhes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                fontSize={12}
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
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'value') {
                    return [
                      new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(value as number),
                      'Faturamento Total'
                    ];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => `Regime: ${label}`}
              />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </MacOSCardAnimated>

      <FinancialChartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Faturamento por Regime Tributário"
        data={modalData}
        columns={[
          { key: 'name', label: 'Regime' },
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
