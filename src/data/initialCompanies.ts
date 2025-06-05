
import { Company } from '../types/company';

export const initialCompanies: Company[] = [
  {
    id: '1',
    name: 'Tech Solutions Ltd',
    taxId: '12.345.678/0001-90',
    complexityLevel: 'High',
    clientClass: 'VIP',
    taxRegime: 'Lucro Real',
    segment: 'INFORMÁTICA',
    collaboratorIds: ['3'],
    sectorResponsibles: {
      fiscal: '2',
      pessoal: '3',
      contabil: '2',
      financeiro: '2'
    }
  },
  {
    id: '2',
    name: 'Marketing Pro',
    taxId: '98.765.432/0001-11',
    complexityLevel: 'Medium',
    clientClass: 'Executive',
    taxRegime: 'Simples Nacional',
    segment: 'CONSULTORIA',
    collaboratorIds: ['3'],
    sectorResponsibles: {
      fiscal: '2',
      pessoal: '3',
      contabil: '2',
      financeiro: '2'
    }
  },
  {
    id: '3',
    name: 'Financial Services',
    taxId: '11.222.333/0001-44',
    complexityLevel: 'Low',
    clientClass: 'Diamond',
    taxRegime: 'Lucro Presumido',
    segment: 'CORRETORA',
    collaboratorIds: [],
    sectorResponsibles: {
      fiscal: '2',
      contabil: '2',
      financeiro: '2'
    }
  }
];
