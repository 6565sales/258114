
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Company } from '../../../../types/company';
import { FilterState } from '../TableFilters';

interface FilterPanelProps {
  filters: FilterState;
  companies: Company[];
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export const FilterPanel = ({ filters, companies, onFilterChange }: FilterPanelProps) => {
  const getUniqueValues = (field: keyof Company): string[] => {
    return [...new Set(
      companies
        .map(company => {
          const value = company[field];
          return typeof value === 'string' ? value : null;
        })
        .filter((value): value is string => value !== null && value !== '')
    )].sort();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
        <Select value={filters.companySector} onValueChange={(value) => onFilterChange('companySector', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os setores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os setores</SelectItem>
            {getUniqueValues('companySector').map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Regime Tributário</label>
        <Select value={filters.newTaxRegime} onValueChange={(value) => onFilterChange('newTaxRegime', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os regimes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os regimes</SelectItem>
            {getUniqueValues('newTaxRegime').map((regime) => (
              <SelectItem key={regime} value={regime}>
                {regime}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Município</label>
        <Select value={filters.municipality} onValueChange={(value) => onFilterChange('municipality', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os municípios" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os municípios</SelectItem>
            {getUniqueValues('municipality').map((municipality) => (
              <SelectItem key={municipality} value={municipality}>
                {municipality}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Situação</label>
        <Select value={filters.situation} onValueChange={(value) => onFilterChange('situation', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as situações" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as situações</SelectItem>
            {getUniqueValues('situation').map((situation) => (
              <SelectItem key={situation} value={situation}>
                {situation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Complexidade</label>
        <Select value={filters.complexityLevel} onValueChange={(value) => onFilterChange('complexityLevel', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as complexidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as complexidades</SelectItem>
            {getUniqueValues('complexityLevel').map((complexity) => (
              <SelectItem key={complexity} value={complexity}>
                {complexity === 'Low' ? 'Baixa' : complexity === 'Medium' ? 'Média' : 'Alta'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Classificação</label>
        <Select value={filters.classification} onValueChange={(value) => onFilterChange('classification', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as classificações" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as classificações</SelectItem>
            {getUniqueValues('classification').map((classification) => (
              <SelectItem key={classification} value={classification}>
                {classification}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
