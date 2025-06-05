
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Company } from '../../types/company';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CompanyResponsibles } from './CompanyResponsibles';
import { CompanyActions } from './CompanyActions';

interface CompanyCardProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

export const CompanyCard = ({ company, onEdit, onDelete }: CompanyCardProps) => {
  const { user } = useAuth();

  const canEdit = user?.role === 'root' || user?.role === 'manager';

  const getComplexityTranslation = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'Baixa';
      case 'Medium': return 'Média';
      case 'High': return 'Alta';
      default: return complexity;
    }
  };

  const getClientClassTranslation = (clientClass: string) => {
    switch (clientClass) {
      case 'Executive': return 'Executivo';
      case 'VIP': return 'VIP';
      case 'Diamond': return 'Diamante';
      default: return clientClass;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
              <p className="text-gray-600">CNPJ: {company.taxId}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{company.taxRegime}</Badge>
              {(user?.role === 'root' || user?.role === 'manager') && company.complexityLevel && (
                <Badge className={
                  company.complexityLevel === 'High' ? 'bg-red-100 text-red-800' :
                  company.complexityLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }>
                  {getComplexityTranslation(company.complexityLevel)}
                </Badge>
              )}
              {(user?.role === 'root' || user?.role === 'manager') && company.clientClass && (
                <Badge className={
                  company.clientClass === 'Diamond' ? 'bg-purple-100 text-purple-800' :
                  company.clientClass === 'VIP' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {getClientClassTranslation(company.clientClass)}
                </Badge>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100">
              <CompanyResponsibles 
                sectorResponsibles={company.sectorResponsibles}
                companyName={company.name}
              />
            </div>
          </div>

          {canEdit && (
            <CompanyActions 
              company={company}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
