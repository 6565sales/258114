
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useExcelExport } from '../../../hooks/useExcelExport';

interface ColumnConfig {
  key: string;
  label: string;
  render?: (value: any) => string;
}

interface FinancialChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any>[];
  columns: ColumnConfig[];
}

export const FinancialChartModal = ({ isOpen, onClose, title, data, columns }: FinancialChartModalProps) => {
  const { exportToExcel, isExporting } = useExcelExport();

  const handleExportExcel = () => {
    const exportData = data.map(item => {
      const exportItem: Record<string, any> = {};
      columns.forEach(column => {
        const value = item[column.key];
        exportItem[column.label] = column.render ? column.render(value) : value;
      });
      return exportItem;
    });

    const filename = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    exportToExcel(exportData, `relatorio-${filename}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {title}
            <Button
              onClick={handleExportExcel}
              disabled={isExporting}
              size="sm"
              variant="outline"
              className="ml-2"
            >
              <Download className="h-4 w-4 mr-1" />
              {isExporting ? 'Exportando...' : 'Excel'}
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className={column.key === 'name' ? '' : 'text-right'}>
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => {
                    const value = item[column.key];
                    const displayValue = column.render ? column.render(value) : value;
                    return (
                      <TableCell 
                        key={column.key} 
                        className={`${column.key === 'name' ? 'font-medium' : 'text-right'}`}
                      >
                        {displayValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
