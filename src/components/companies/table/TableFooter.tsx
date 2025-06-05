
import React from 'react';
import { TableFooter, TableRow, TableCell } from '@/components/ui/table';
import { Company } from '../../../types/company';
import { Column } from './utils/columnConfig';

interface TableFooterComponentProps {
  companies: Company[];
  columns: Column[];
  canEdit: boolean;
}

export const TableFooterComponent = ({ companies, columns, canEdit }: TableFooterComponentProps) => {
  const calculateColumnTotal = (column: Column) => {
    console.log(`Calculando total para coluna: ${column.key}`, companies);
    
    switch (column.key) {
      case 'honoraryValue':
        const validValues = companies
          .map(company => company.honoraryValue)
          .filter(value => value != null && !isNaN(Number(value)));
        
        console.log('Valores válidos para soma:', validValues);
        
        const total = validValues.reduce((sum, value) => {
          return sum + Number(value);
        }, 0);
        
        console.log('Total calculado:', total);
        return `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
      
      case 'name':
        return `${companies.length} empresa${companies.length !== 1 ? 's' : ''}`;
      
      case 'companySector':
      case 'segment':
      case 'newTaxRegime':
      case 'municipality':
      case 'situation':
      case 'complexityLevel':
      case 'classification':
      case 'group':
        const uniqueValues = new Set(
          companies
            .map(company => {
              switch (column.key) {
                case 'companySector': return company.companySector;
                case 'segment': return company.segment;
                case 'newTaxRegime': return company.newTaxRegime;
                case 'municipality': return company.municipality;
                case 'situation': return company.situation;
                case 'complexityLevel': return company.complexityLevel;
                case 'classification': return company.classification;
                case 'group': return company.group;
                default: return null;
              }
            })
            .filter(value => value != null && value !== '')
        );
        return `${uniqueValues.size} único${uniqueValues.size !== 1 ? 's' : ''}`;
      
      case 'responsibleFiscal':
      case 'responsiblePessoal':
      case 'responsibleContabil':
        const responsibleCount = companies.filter(company => {
          const responsibles = company.sectorResponsibles;
          if (!responsibles) return false;
          
          switch (column.key) {
            case 'responsibleFiscal': return responsibles.fiscal && responsibles.fiscal.trim() !== '';
            case 'responsiblePessoal': return responsibles.pessoal && responsibles.pessoal.trim() !== '';
            case 'responsibleContabil': return responsibles.contabil && responsibles.contabil.trim() !== '';
            default: return false;
          }
        }).length;
        return `${responsibleCount} atribuído${responsibleCount !== 1 ? 's' : ''}`;
      
      case 'taxId':
      case 'cpf':
        const filledCount = companies.filter(company => {
          const value = column.key === 'taxId' ? company.taxId : company.cpf;
          return value && value.trim() !== '';
        }).length;
        return `${filledCount} preenchido${filledCount !== 1 ? 's' : ''}`;
      
      default:
        return '';
    }
  };

  return (
    <TableFooter>
      <TableRow className="bg-gray-100 font-medium">
        {columns.map((column) => (
          <TableCell
            key={`total-${column.key}`}
            className="border-r border-gray-200 last:border-r-0 text-sm"
            style={{ width: column.width, minWidth: column.width }}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700">
                {calculateColumnTotal(column)}
              </span>
            </div>
          </TableCell>
        ))}
        {canEdit && (
          <TableCell className="text-center text-sm text-gray-500">
            Totais
          </TableCell>
        )}
      </TableRow>
    </TableFooter>
  );
};
