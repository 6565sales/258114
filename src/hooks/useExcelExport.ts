
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Company } from '../types/company';

export const useExcelExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToExcel = (data: Company[] | any[], filename: string = 'dados') => {
    setIsExporting(true);
    
    try {
      let exportData;

      // Se os dados são empresas, usar o formato antigo
      if (data.length > 0 && 'name' in data[0] && 'taxId' in data[0]) {
        const companies = data as Company[];
        exportData = companies.map(company => ({
          'Nome da Empresa': company.name,
          'CNPJ': company.taxId,
          'CPF': company.cpf || '',
          'Segmento': company.segment || '',
          'Setor': company.companySector || '',
          'Regime Tributário': company.newTaxRegime || company.taxRegime,
          'Município': company.municipality || '',
          'Situação': company.situation || '',
          'Nível de Complexidade': company.complexityLevel || '',
          'Classificação': company.classification || '',
          'Valor Honorário': company.honoraryValue || '',
          'Grupo': company.group || '',
          'Responsável Fiscal': company.sectorResponsibles?.fiscal || '',
          'Responsável Pessoal': company.sectorResponsibles?.pessoal || '',
          'Responsável Contábil': company.sectorResponsibles?.contabil || ''
        }));
      } else {
        // Para outros tipos de dados (como dados de gráficos)
        exportData = data;
      }

      // Criar workbook
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Dados');

      // Ajustar largura das colunas automaticamente
      const colWidths = Object.keys(exportData[0] || {}).map(() => ({ wch: 20 }));
      ws['!cols'] = colWidths;

      // Fazer download
      const timestamp = new Date().toISOString().split('T')[0];
      XLSX.writeFile(wb, `${filename}_${timestamp}.xlsx`);
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportToExcel,
    isExporting
  };
};
