
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTableModal } from './ChartTableModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface CompanySectorChartProps {
  data: { name: string; count: number }[];
}

export const CompanySectorChart = ({ data }: CompanySectorChartProps) => {
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
          <CardTitle>Empresas por Setor</CardTitle>
          <CardDescription>
            Distribuição das empresas por setor de atividade (clique para ver detalhes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </MacOSCardAnimated>

      <ChartTableModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalhes - Setor da Empresa"
        data={data}
      />
    </MacOSFade>
  );
};
