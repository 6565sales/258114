
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

interface FilterButtonProps {
  showFilters: boolean;
  activeFiltersCount: number;
  onToggleFilters: () => void;
  onClearFilters: () => void;
}

export const FilterButton = ({ 
  showFilters, 
  activeFiltersCount, 
  onToggleFilters, 
  onClearFilters 
}: FilterButtonProps) => {
  return (
    <>
      <Button
        variant="outline"
        onClick={onToggleFilters}
        className="flex items-center space-x-2"
      >
        <Filter className="w-4 h-4" />
        <span>Filtros</span>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFiltersCount}
          </Badge>
        )}
      </Button>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          onClick={onClearFilters}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700"
        >
          <X className="w-4 h-4" />
          <span>Limpar</span>
        </Button>
      )}
    </>
  );
};
