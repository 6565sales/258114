
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCompanies } from '../../contexts/CompanyContext';
import { SectorResponsibles } from '../../types/company';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BasicCompanyInfo } from './form/BasicCompanyInfo';
import { ClassificationFields } from './form/ClassificationFields';
import { FinancialFields } from './form/FinancialFields';
import { SectorResponsiblesFields } from './form/SectorResponsiblesFields';
import { SegmentField } from './form/SegmentField';

interface CompanyFormProps {
  company?: any;
  onClose: () => void;
}

export const CompanyForm = ({ company, onClose }: CompanyFormProps) => {
  const { user } = useAuth();
  const { addCompany, updateCompany } = useCompanies();
  
  const [formData, setFormData] = useState({
    name: company?.name || '',
    taxId: company?.taxId || '',
    complexityLevel: company?.complexityLevel || '',
    clientClass: company?.clientClass || '',
    taxRegime: company?.taxRegime || '',
    segment: company?.segment || '',
    collaboratorIds: company?.collaboratorIds || []
  });

  const [sectorResponsibles, setSectorResponsibles] = useState<SectorResponsibles>(
    company?.sectorResponsibles || {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      sectorResponsibles
    };
    
    if (company) {
      updateCompany(company.id, submitData);
    } else {
      addCompany(submitData);
    }
    
    onClose();
  };

  const canEditTaxRegime = user?.role === 'root';
  const canEditComplexityAndClass = user?.role === 'root' || user?.role === 'manager';
  const canEditFinancialFields = user?.role === 'root' || (user?.role === 'manager' && user?.sector === 'financeiro');

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onClose} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">
          {company ? 'Editar Empresa' : 'Adicionar Nova Empresa'}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <BasicCompanyInfo
              formData={formData}
              setFormData={setFormData}
              canEditTaxRegime={canEditTaxRegime}
            />

            <SegmentField
              formData={formData}
              setFormData={setFormData}
            />

            <ClassificationFields
              formData={formData}
              setFormData={setFormData}
              canEditComplexityAndClass={canEditComplexityAndClass}
            />

            <SectorResponsiblesFields
              sectorResponsibles={sectorResponsibles}
              setSectorResponsibles={setSectorResponsibles}
            />

            <FinancialFields
              formData={formData}
              setFormData={setFormData}
              billingGroups={[]}
              canEditFinancialFields={canEditFinancialFields}
            />

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">
                {company ? 'Atualizar Empresa' : 'Criar Empresa'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
