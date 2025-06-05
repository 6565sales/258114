
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Company } from '../../../types/company';
import { ChartTableModal } from '../../dashboard/charts/ChartTableModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface HonoraryValueChartProps {
  companies: Company[];
}

export const HonoraryValueChart = ({ companies }: HonoraryValueChartProps) => {
  const [showModal, setShowModal] = useState(false);

  // Agrupar empresas por faixas de valor
  const getValueRange = (value: number) => {
    if (value <= 1000) return 'Até R$ 1.000';
    if (value <= 5000) return 'R$ 1.001 - R$ 5.000';
    if (value <= 10000) return 'R$ 5.001 - R$ 10.000';
    if (value <= 20000) return 'R$ 10.001 - R$ 20.000';
    return 'Acima de R$ 20.000';
  };

  const rangeData = companies.reduce((acc, company) => {
    const range = getValueRange(company.honoraryValue || 0);
    if (!acc[range]) {
      acc[range] = { name: range, count: 0, total: 0 };
    }
    acc[range].count += 1;
    acc[range].total += company.honoraryValue || 0;
    return acc;
  }, {} as Record<string, { name: string; count: number; total: number }>);

  const chartData = Object.values(rangeData);
  
  // Dados para o modal
  const modalData = chartData.map(item => ({
    name: item.name,
    count: item.count
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
          <CardTitle>Distribuição por Faixa de Honorários</CardTitle>
          <CardDescription>
            Quantidade de empresas por faixa de valor (clique para ver detalhes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  return [value, name === 'count' ? 'Empresas' : 'Total'];
                }}
              />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </MacOSCardAnimated>

      <ChartTableModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Distribuição por Faixa de Honorários"
        data={modalData}
      />
    </MacOSFade>
  );
};
