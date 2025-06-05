
import React from 'react';
import { Company } from '../../types/company';
import { CompanyCard } from './CompanyCard';
import { EmptyCompanyState } from './EmptyCompanyState';

interface CompanyListProps {
  companies: Company[];
  canCreate: boolean;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
  onCreateCompany: () => void;
}

export const CompanyList = ({ 
  companies, 
  canCreate, 
  onEdit, 
  onDelete, 
  onCreateCompany 
}: CompanyListProps) => {
  if (companies.length === 0) {
    return (
      <EmptyCompanyState 
        canCreate={canCreate}
        onCreateCompany={onCreateCompany}
      />
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
