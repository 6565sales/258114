
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTableModal } from './ChartTableModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface SectorClientChartProps {
  data: any[];
}

const chartConfig = {
  Executive: {
    label: "Executive",
    color: "#6B7280",
  },
  VIP: {
    label: "VIP", 
    color: "#10B981",
  },
  Diamond: {
    label: "Diamond",
    color: "#F59E0B",
  },
};

export const SectorClientChart = ({ data }: SectorClientChartProps) => {
  const [showModal, setShowModal] = useState(false);

  // Transformar os dados para o formato do modal
  const modalData = data.flatMap(sector => [
    { name: `${sector.name} - Executive`, count: sector.Executive || 0 },
    { name: `${sector.name} - VIP`, count: sector.VIP || 0 },
    { name: `${sector.name} - Diamond`, count: sector.Diamond || 0 }
  ]).filter(item => item.count > 0);

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
          <CardTitle>Comparação Setor vs Classe de Cliente</CardTitle>
          <CardDescription>
            Distribuição por setor e classe de cliente (clique para ver detalhes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
              />
              <Legend />
              <Bar dataKey="Executive" stackId="a" fill="var(--color-Executive)" />
              <Bar dataKey="VIP" stackId="a" fill="var(--color-VIP)" />
              <Bar dataKey="Diamond" stackId="a" fill="var(--color-Diamond)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </MacOSCardAnimated>

      <ChartTableModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detalhes - Setor vs Classe de Cliente"
        data={modalData}
      />
    </MacOSFade>
  );
};
