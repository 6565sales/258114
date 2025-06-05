import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTableModal } from './ChartTableModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface TaxRegimeChartProps {
  data: { name: string; count: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const TaxRegimeChart = ({ data }: TaxRegimeChartProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleChartClick = () => {
    setShowModal(true);
  };

  // Ordenar os dados por regime tributário
  const sortedData = [...data].sort((a, b) => {
    const order = { 
      'SIMPLES NACIONAL': 1, 
      'LUCRO PRESUMIDO': 2, 
      'LUCRO REAL': 3,
      'Não informado': 4 
    };
    return (order[a.name as keyof typeof order] || 0) - (order[b.name as keyof typeof order] || 0);
  });

  return (
    <MacOSFade>
      <MacOSCardAnimated 
        interactive 
        glassEffect 
        className="cursor-pointer hover:shadow-xl transition-all duration-300" 
        onClick={handleChartClick}
      >
        <CardHeader>
          <CardTitle>Distribuição por Regime Tributário</CardTitle>
          <CardDescription>Clique para ver detalhes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sortedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </MacOSCardAnimated>

      <ChartTableModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalhes - Regime Tributário"
        data={sortedData}
      />
    </MacOSFade>
  );
};
