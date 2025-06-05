
import React from 'react';
import { useCompanies } from '../../contexts/CompanyContext';
import { ExportSection } from './ExportSection';
import { ImportSection } from './ImportSection';

export const DataManagement = () => {
  const { companies, addCompany, updateCompany } = useCompanies();

  return (
    <div className="space-y-6 macos-page-enter">
      <div className="macos-spring-hover">
        <ExportSection companies={companies} />
      </div>
      <div className="macos-spring-hover">
        <ImportSection companies={companies} addCompany={addCompany} updateCompany={updateCompany} />
      </div>
    </div>
  );
};
