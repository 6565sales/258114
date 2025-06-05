
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTableModal } from './ChartTableModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface ClassificationChartProps {
  data: { name: string; count: number }[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];

export const ClassificationChart = ({ data }: ClassificationChartProps) => {
  const [showModal, setShowModal] = useState(false);

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
          <CardTitle>Classificação dos Clientes</CardTitle>
          <CardDescription>
            Distribuição das empresas por classificação (clique para ver detalhes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {data.map((_, index) => (
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
        title="Detalhes - Classificação"
        data={data}
      />
    </MacOSFade>
  );
};
