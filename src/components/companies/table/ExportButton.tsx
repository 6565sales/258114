
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Company } from '../../../types/company';
import { useExcelExport } from '../../../hooks/useExcelExport';

interface ExportButtonProps {
  companies: Company[];
}

export const ExportButton = ({ companies }: ExportButtonProps) => {
  const { exportToExcel, isExporting } = useExcelExport();

  const handleExport = () => {
    exportToExcel(companies, 'empresas');
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting || companies.length === 0}
      variant="outline"
      className="flex items-center space-x-2"
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      <span>{isExporting ? 'Exportando...' : 'Exportar Excel'}</span>
    </Button>
  );
};
