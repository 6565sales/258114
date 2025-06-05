
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Company } from '../../../types/company';
import { FinancialChartModal } from './FinancialChartModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface SegmentRevenueChartProps {
  companies: Company[];
}

export const SegmentRevenueChart = ({ companies }: SegmentRevenueChartProps) => {
  const [showModal, setShowModal] = useState(false);

  const totalRevenue = companies.reduce((sum, c) => sum + (c.honoraryValue || 0), 0);

  // Agrupar por segmento
  const segmentData = companies.reduce((acc, company) => {
    const segment = company.segment || 'Não informado';
    if (!acc[segment]) {
      acc[segment] = { name: segment, value: 0, count: 0 };
    }
    acc[segment].value += company.honoraryValue || 0;
    acc[segment].count += 1;
    return acc;
  }, {} as Record<string, { name: string; value: number; count: number }>);

  // Pegar top segmentos e calcular percentuais
  const topSegments = Object.values(segmentData)
    .filter(segment => segment.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
    .map(segment => ({
      ...segment,
      percentage: (segment.value / totalRevenue * 100).toFixed(1),
      averageValue: segment.count > 0 ? segment.value / segment.count : 0,
      shortName: segment.name.length > 15 ? segment.name.substring(0, 15) + '...' : segment.name
    }));

  const modalData = topSegments.map(item => ({
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
          <CardTitle className="macos-text-primary">Top 10 Segmentos por Faturamento</CardTitle>
          <CardDescription className="macos-text-secondary">
            Segmentos que mais contribuem para o faturamento (clique para ver detalhes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topSegments} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--macos-border)" />
              <XAxis 
                type="number" 
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
              <YAxis 
                dataKey="shortName" 
                type="category" 
                width={120} 
                fontSize={12}
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
                labelFormatter={(label) => topSegments.find(s => s.shortName === label)?.name || label}
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
                fill="rgb(var(--macos-green))" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </MacOSCardAnimated>

      <FinancialChartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Top 10 Segmentos por Faturamento"
        data={modalData}
        columns={[
          { key: 'name', label: 'Segmento' },
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
