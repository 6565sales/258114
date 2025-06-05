
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid, Table } from 'lucide-react';

interface CompanyViewToggleProps {
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
}

export const CompanyViewToggle = ({ viewMode, onViewModeChange }: CompanyViewToggleProps) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('grid')}
        className="flex items-center space-x-2"
      >
        <Grid className="w-4 h-4" />
        <span>Cards</span>
      </Button>
      <Button
        variant={viewMode === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('table')}
        className="flex items-center space-x-2"
      >
        <Table className="w-4 h-4" />
        <span>Tabela</span>
      </Button>
    </div>
  );
};
