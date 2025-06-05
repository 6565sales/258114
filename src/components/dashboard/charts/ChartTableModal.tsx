
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useExcelExport } from '../../../hooks/useExcelExport';

interface ChartTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: { name: string; count: number }[];
}

export const ChartTableModal = ({ isOpen, onClose, title, data }: ChartTableModalProps) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const { exportToExcel, isExporting } = useExcelExport();

  const handleExportExcel = () => {
    const exportData = data.map(item => ({
      'Item': item.name,
      'Quantidade': item.count,
      'Percentual': total > 0 ? `${((item.count / total) * 100).toFixed(1)}%` : '0.0%'
    }));

    // Adicionar linha de total
    exportData.push({
      'Item': 'TOTAL',
      'Quantidade': total,
      'Percentual': '100%'
    });

    const filename = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    exportToExcel(exportData as any, `relatorio-${filename}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
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
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Percentual</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => {
                const percentage = total > 0 ? ((item.count / total) * 100).toFixed(1) : '0.0';
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">{item.count}</TableCell>
                    <TableCell className="text-right">{percentage}%</TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="border-t-2 font-semibold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">{total}</TableCell>
                <TableCell className="text-right">100%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
