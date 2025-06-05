
import React, { createContext, useContext, ReactNode } from 'react';
import { Company } from '../types/company';
import { useCompanyActions } from '../hooks/useCompanyActions';

interface CompanyContextType {
  companies: Company[];
  loading: boolean;
  addCompany: (company: Omit<Company, 'id'>) => Promise<void>;
  updateCompany: (id: string, updates: Partial<Company>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  getCompaniesByCollaborator: (collaboratorId: string) => Company[];
  refreshCompanies: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanies must be used within CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const companyActions = useCompanyActions();

  // Mostrar loading enquanto não inicializar
  if (!companyActions) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Carregando Sistema...</h3>
          <p className="text-gray-600">Inicializando conexão com o banco de dados</p>
        </div>
      </div>
    );
  }

  const {
    companies,
    loading,
    addCompany,
    updateCompany,
    deleteCompany,
    getCompaniesByCollaborator,
    refreshCompanies
  } = companyActions;

  return (
    <CompanyContext.Provider value={{
      companies: companies || [],
      loading,
      addCompany,
      updateCompany,
      deleteCompany,
      getCompaniesByCollaborator,
      refreshCompanies
    }}>
      {children}
    </CompanyContext.Provider>
  );
};
