import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { SectorResponsibles } from '../../types/company';

interface CompanyResponsiblesProps {
  sectorResponsibles?: SectorResponsibles;
  companyName: string;
}

export const CompanyResponsibles = ({ sectorResponsibles, companyName }: CompanyResponsiblesProps) => {
  const { users } = useAuth();

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Não definido';
  };

  const sectors = [
    { key: 'fiscal' as const, name: 'Fiscal' },
    { key: 'pessoal' as const, name: 'Pessoal' },
    { key: 'contabil' as const, name: 'Contábil' },
    { key: 'financeiro' as const, name: 'Financeiro/Cobrança' }
  ];

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1">
        <Users className="w-4 h-4" />
        Responsáveis da {companyName}
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {sectors.map(({ key, name }) => {
          const responsibleId = sectorResponsibles?.[key];
          const responsibleName = responsibleId ? getUserName(responsibleId) : null;
          
          return (
            <div key={key} className="flex flex-col space-y-1">
              <span className="text-xs font-medium text-gray-600">{name}:</span>
              {responsibleName ? (
                <Badge variant="default" className="text-xs w-fit">
                  {responsibleName}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs w-fit text-gray-400">
                  Não definido
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
