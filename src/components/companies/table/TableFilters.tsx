import React, { useState } from 'react';
import { Company } from '../../../types/company';
import { SearchInput } from './filters/SearchInput';
import { FilterButton } from './filters/FilterButton';
import { FilterPanel } from './filters/FilterPanel';
import { ExportButton } from './ExportButton';

interface TableFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  companies: Company[];
  filteredCompanies: Company[];
}

export interface FilterState {
  search: string;
  companyName: string;
  companySector: string;
  newTaxRegime: string;
  municipality: string;
  situation: string;
  complexityLevel: string;
  classification: string;
}

export const TableFilters = ({ onFiltersChange, companies, filteredCompanies }: TableFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    companyName: '',
    companySector: '',
    newTaxRegime: '',
    municipality: '',
    situation: '',
    complexityLevel: '',
    classification: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      search: '',
      companyName: '',
      companySector: '',
      newTaxRegime: '',
      municipality: '',
      situation: '',
      complexityLevel: '',
      classification: ''
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <SearchInput 
            value={filters.search}
            onChange={(value) => updateFilter('search', value)}
          />
          
          <FilterButton
            showFilters={showFilters}
            activeFiltersCount={activeFiltersCount}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onClearFilters={clearAllFilters}
          />
        </div>
        
        <ExportButton companies={filteredCompanies} />
      </div>

      {showFilters && (
        <FilterPanel
          filters={filters}
          companies={companies}
          onFilterChange={updateFilter}
        />
      )}
    </div>
  );
};
