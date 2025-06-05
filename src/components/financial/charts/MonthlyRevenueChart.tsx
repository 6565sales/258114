
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Company } from '../../../types/company';
import { MacOSFade } from '@/components/ui/macos-animations';

interface MonthlyRevenueChartProps {
  companies: Company[];
}

export const MonthlyRevenueChart = ({ companies }: MonthlyRevenueChartProps) => {
  // Simular receita mensal (em um sistema real, isso viria de dados históricos)
  const totalMonthlyRevenue = companies.reduce((sum, c) => sum + (c.honoraryValue || 0), 0);
  
  const monthlyData = [
    { month: 'Jan', revenue: totalMonthlyRevenue * 0.8 },
    { month: 'Fev', revenue: totalMonthlyRevenue * 0.85 },
    { month: 'Mar', revenue: totalMonthlyRevenue * 0.9 },
    { month: 'Abr', revenue: totalMonthlyRevenue * 0.95 },
    { month: 'Mai', revenue: totalMonthlyRevenue },
    { month: 'Jun', revenue: totalMonthlyRevenue * 1.05 },
  ];

  return (
    <MacOSFade>
      <MacOSCardAnimated interactive glassEffect>
        <CardHeader>
          <CardTitle>Evolução da Receita Mensal</CardTitle>
          <CardDescription>
            Projeção baseada nos honorários atuais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
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
                formatter={(value) => [
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(value as number),
                  'Receita'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#82ca9d" 
                strokeWidth={2}
                dot={{ fill: '#82ca9d' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </MacOSCardAnimated>
    </MacOSFade>
  );
};
