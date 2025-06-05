
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

interface ResponsiblePersonsProps {
  sector: string;
}

export const ResponsiblePersons = ({ sector }: ResponsiblePersonsProps) => {
  const { users } = useAuth();

  const getResponsibleBySector = (targetSector: string) => {
    return users.find(user => 
      user.role === 'manager' && user.sector === targetSector
    );
  };

  const sectors = [
    { key: 'fiscal', name: 'Fiscal' },
    { key: 'pessoal', name: 'Pessoal' },
    { key: 'contabil', name: 'Contábil' },
    { key: 'financeiro', name: 'Financeiro' }
  ];

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1">
        <User className="w-4 h-4" />
        Responsáveis por Setor
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {sectors.map(({ key, name }) => {
          const responsible = getResponsibleBySector(key);
          const isCompanySector = sector === key;
          
          return (
            <div key={key} className="flex flex-col space-y-1">
              <span className="text-xs font-medium text-gray-600">{name}:</span>
              {responsible ? (
                <Badge 
                  variant={isCompanySector ? "default" : "secondary"} 
                  className="text-xs w-fit"
                >
                  {responsible.name}
                  {isCompanySector && " ★"}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs w-fit text-gray-400">
                  Sem responsável
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
