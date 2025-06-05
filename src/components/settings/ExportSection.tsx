
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Company } from '../../types/company';
import Papa from 'papaparse';

interface ExportSectionProps {
  companies: Company[];
}

export const ExportSection = ({ companies }: ExportSectionProps) => {
  const { toast } = useToast();

  const handleExportCSV = () => {
    const exportData = companies.map(company => ({
      Nome: company.name,
      CNPJ: company.taxId,
      "Regime Tributário": company.taxRegime,
      "Nível de Complexidade": company.complexityLevel || '',
      "Classe do Cliente": company.clientClass || '',
      "Responsável Fiscal": company.sectorResponsibles?.fiscal || '',
      "Responsável Pessoal": company.sectorResponsibles?.pessoal || '',
      "Responsável Contábil": company.sectorResponsibles?.contabil || '',
      "Responsável Financeiro": company.sectorResponsibles?.financeiro || ''
    }));

    const csv = Papa.unparse(exportData, {
      header: true,
      delimiter: ';', // Usar ponto e vírgula para compatibilidade com Excel brasileiro
      encoding: 'utf-8'
    });

    // Adicionar BOM para suporte a caracteres especiais
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `empresas_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Dados exportados em CSV",
      description: `${companies.length} empresas foram exportadas com sucesso.`,
    });
  };

  return (
    <Card className="macos-card macos-spring-hover">
      <CardHeader>
        <CardTitle className="macos-text-primary">Exportar Dados</CardTitle>
        <CardDescription className="macos-text-secondary">
          Faça o download dos dados das empresas cadastradas no sistema em formato CSV.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg macos-glass macos-spring-hover macos-spring-tap">
          <div>
            <h4 className="font-medium macos-text-primary">Exportar todas as empresas</h4>
            <p className="text-sm macos-text-secondary">
              Baixar dados de {companies.length} empresas cadastradas em CSV
            </p>
          </div>
          <Button 
            onClick={handleExportCSV} 
            disabled={companies.length === 0}
            className="macos-button-interactive macos-spring-hover macos-spring-tap"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
