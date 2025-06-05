
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Company } from '../../../types/company';
import { FinancialChartModal } from './FinancialChartModal';
import { MacOSFade } from '@/components/ui/macos-animations';

interface TopCompaniesChartProps {
  companies: Company[];
}

export const TopCompaniesChart = ({ companies }: TopCompaniesChartProps) => {
  const [showModal, setShowModal] = useState(false);

  const totalRevenue = companies.reduce((sum, c) => sum + (c.honoraryValue || 0), 0);

  // Pegar top 10 empresas por valor de honorário
  const topCompanies = companies
    .sort((a, b) => (b.honoraryValue || 0) - (a.honoraryValue || 0))
    .slice(0, 10)
    .map(company => ({
      name: company.name.length > 20 ? company.name.substring(0, 20) + '...' : company.name,
      fullName: company.name,
      value: company.honoraryValue || 0,
      percentage: ((company.honoraryValue || 0) / totalRevenue * 100).toFixed(1)
    }));

  const modalData = topCompanies.map(item => ({
    name: item.fullName,
    value: item.value,
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
          <CardTitle>Top 10 Empresas por Honorários</CardTitle>
          <CardDescription>
            Empresas que mais contribuem para o faturamento (clique para ver detalhes)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topCompanies} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => 
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value)
              } />
              <YAxis dataKey="name" type="category" width={150} fontSize={12} />
              <Tooltip 
                formatter={(value) => [
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(value as number),
                  'Honorário'
                ]}
                labelFormatter={(label) => topCompanies.find(c => c.name === label)?.fullName || label}
              />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </MacOSCardAnimated>

      <FinancialChartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Top 10 Empresas por Honorários"
        data={modalData}
        columns={[
          { key: 'name', label: 'Empresa' },
          { key: 'value', label: 'Valor', 
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
