
import React, { useState } from 'react';
import { Company } from '../../types/company';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Download } from 'lucide-react';
import { useExcelExport } from '../../hooks/useExcelExport';

interface CompanyValueTableProps {
  companies: Company[];
}

export const CompanyValueTable = ({ companies }: CompanyValueTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { exportToExcel, isExporting } = useExcelExport();

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.taxId.includes(searchTerm) ||
    (company.group && company.group.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedCompanies = filteredCompanies.sort((a, b) => 
    (b.honoraryValue || 0) - (a.honoraryValue || 0)
  );

  const handleExportTable = () => {
    const exportData = sortedCompanies.map((company, index) => ({
      'Posição': index + 1,
      'Nome da Empresa': company.name,
      'CNPJ': company.taxId,
      'Valor Honorário': company.honoraryValue,
      'Grupo': company.group || 'Sem grupo',
      'Classificação': company.classification || 'Não informado',
      'Município': company.municipality || 'Não informado',
      'Situação': company.situation || 'Não informado'
    }));

    exportToExcel(exportData as any, 'tabela-honorarios');
  };

  const getClassificationColor = (classification?: string) => {
    switch (classification) {
      case 'MASTER': return 'bg-purple-100 text-purple-800';
      case 'EXECULTIVO': return 'bg-blue-100 text-blue-800';
      case 'AVANÇADO': return 'bg-green-100 text-green-800';
      case 'ESSENCIAL': return 'bg-yellow-100 text-yellow-800';
      case 'BÁSICO': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tabela Detalhada de Honorários</CardTitle>
          <Button
            onClick={handleExportTable}
            disabled={isExporting}
            size="sm"
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exportando...' : 'Exportar'}</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Município</TableHead>
                <TableHead className="text-right">Valor Honorário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCompanies.map((company, index) => (
                <TableRow key={company.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.taxId}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {company.group || 'Sem grupo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getClassificationColor(company.classification)}>
                      {company.classification || 'Não informado'}
                    </Badge>
                  </TableCell>
                  <TableCell>{company.municipality || 'Não informado'}</TableCell>
                  <TableCell className="text-right font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(company.honoraryValue || 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {sortedCompanies.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma empresa encontrada com os critérios de busca.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
