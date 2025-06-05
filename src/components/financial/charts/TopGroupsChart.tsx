
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Company } from '../../../types/company';
import { FinancialChartModal } from './FinancialChartModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface TopGroupsChartProps {
  companies: Company[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

export const TopGroupsChart = ({ companies }: TopGroupsChartProps) => {
  const [showModal, setShowModal] = useState(false);

  const totalRevenue = companies.reduce((sum, c) => sum + (c.honoraryValue || 0), 0);

  // Agrupar por grupo e calcular totais
  const groupData = companies.reduce((acc, company) => {
    const group = company.group || 'Sem grupo';
    if (!acc[group]) {
      acc[group] = { name: group, value: 0, count: 0 };
    }
    acc[group].value += company.honoraryValue || 0;
    acc[group].count += 1;
    return acc;
  }, {} as Record<string, { name: string; value: number; count: number }>);

  // Pegar top grupos e calcular percentuais
  const topGroups = Object.values(groupData)
    .filter(group => group.name !== 'Sem grupo' && group.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)
    .map(group => ({
      ...group,
      percentage: (group.value / totalRevenue * 100).toFixed(1)
    }));

  const modalData = topGroups.map(item => ({
    name: item.name,
    value: item.value,
    count: item.count,
    percentage: item.percentage + '%'
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
          <CardTitle>Grupos por Faturamento</CardTitle>
          <CardDescription>
            Participação dos grupos no faturamento total (clique para ver detalhes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={topGroups}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {topGroups.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(value as number),
                  'Faturamento'
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </MacOSCardAnimated>

      <FinancialChartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Grupos por Faturamento"
        data={modalData}
        columns={[
          { key: 'name', label: 'Grupo' },
          { key: 'count', label: 'Empresas' },
          { key: 'value', label: 'Faturamento', 
            render: (value) => new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value as number)
          },
          { key: 'percentage', label: '% do Total' }
        ]}
      />
    </MacOSFade>
  );
};
