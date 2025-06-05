
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCompanies } from '../../contexts/CompanyContext';
import { Company } from '../../types/company';
import { CompanyForm } from './CompanyForm';
import { BillingGroupManagement } from './BillingGroupManagement';
import { CompanyHeader } from './CompanyHeader';
import { ExcelTable } from './ExcelTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CompanyFullScreenProps {
  onBackToDashboard: () => void;
}

export const CompanyFullScreen = ({ onBackToDashboard }: CompanyFullScreenProps) => {
  const { user } = useAuth();
  const { companies, deleteCompany, getCompaniesByCollaborator } = useCompanies();
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [showBillingGroups, setShowBillingGroups] = useState(false);

  const getFilteredCompanies = () => {
    if (user?.role === 'root') return companies;
    
    if (user?.role === 'manager') {
      return companies.filter(company => {
        const sectorResponsibles = company.sectorResponsibles;
        if (!sectorResponsibles || !user.sector) return true;
        
        const responsibleForSector = sectorResponsibles[user.sector as keyof typeof sectorResponsibles];
        return responsibleForSector === user.id;
      });
    }
    
    if (user?.role === 'collaborator') {
      const companiesAsCollaborator = getCompaniesByCollaborator(user.id);
      const companiesAsResponsible = companies.filter(company => {
        const sectorResponsibles = company.sectorResponsibles;
        if (!sectorResponsibles || !user.sector) return false;
        
        const responsibleForSector = sectorResponsibles[user.sector as keyof typeof sectorResponsibles];
        return responsibleForSector === user.id;
      });
      
      const allCompanies = [...companiesAsCollaborator, ...companiesAsResponsible];
      return allCompanies.filter((company, index, self) => 
        index === self.findIndex(c => c.id === company.id)
      );
    }
    
    return [];
  };

  const canEdit = user?.role === 'root' || user?.role === 'manager';
  const canCreate = user?.role === 'root' || user?.role === 'manager';
  const canViewFinancialInfo = user?.role === 'root' || user?.role === 'manager';

  const filteredCompanies = getFilteredCompanies();

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteCompany(id);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCompany(null);
  };

  const handleCreateCompany = () => {
    setShowForm(true);
  };

  const handleShowBillingGroups = () => {
    setShowBillingGroups(true);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <Button
              variant="outline"
              onClick={handleCloseForm}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para Empresas</span>
            </Button>
          </div>
          <CompanyForm
            company={editingCompany}
            onClose={handleCloseForm}
          />
        </div>
      </div>
    );
  }

  if (showBillingGroups) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <Button
              variant="outline"
              onClick={() => setShowBillingGroups(false)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para Empresas</span>
            </Button>
          </div>
          <BillingGroupManagement onClose={() => setShowBillingGroups(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-3">
      <div className="w-full h-full space-y-4">
        <CompanyHeader
          canViewFinancialInfo={canViewFinancialInfo}
          canCreate={canCreate}
          onShowBillingGroups={handleShowBillingGroups}
          onCreateCompany={handleCreateCompany}
          onBackToDashboard={onBackToDashboard}
        />

        <ExcelTable
          companies={filteredCompanies}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
