
type ColumnKey = 'name' | 'segment' | 'responsibleFiscal' | 'responsiblePessoal' | 'responsibleContabil' | 'taxRegime' | 'taxId' | 'cpf' | 'group' | 'classification' | 'municipality' | 'newTaxRegime' | 'situation' | 'honoraryValue' | 'companySector' | 'complexityLevel';

export interface Column {
  key: ColumnKey;
  label: string;
  width?: string;
  restrictedRoles?: string[]; // Roles que NÃO podem ver esta coluna
}

export const DEFAULT_COLUMNS: Column[] = [
  { key: 'name', label: 'Empresas', width: '200px' },
  { key: 'companySector', label: 'SETOR', width: '150px' },
  { key: 'segment', label: 'SEGMENTO', width: '200px' },
  { key: 'newTaxRegime', label: 'REGIME TRIBUTÁRIO', width: '180px' },
  { key: 'municipality', label: 'MUNICÍPIO', width: '180px' },
  { key: 'situation', label: 'SITUAÇÃO', width: '150px' },
  { key: 'complexityLevel', label: 'NÍVEL COMPLEXIDADE', width: '180px', restrictedRoles: ['collaborator', 'manager'] },
  { key: 'honoraryValue', label: 'VALOR HONORÁRIO', width: '150px', restrictedRoles: ['collaborator', 'manager'] },
  { key: 'classification', label: 'CLASSIFICAÇÃO', width: '150px', restrictedRoles: ['collaborator', 'manager'] },
  { key: 'group', label: 'GRUPO', width: '200px', restrictedRoles: ['collaborator'] },
  { key: 'responsibleFiscal', label: 'RESPONSÁVEL FISCAL', width: '180px' },
  { key: 'responsiblePessoal', label: 'RESPONSÁVEL PESSOAL', width: '180px' },
  { key: 'responsibleContabil', label: 'RESPONSÁVEL CONTÁBIL', width: '180px' },
  { key: 'taxId', label: 'CNPJ', width: '150px' },
  { key: 'cpf', label: 'CPF', width: '120px' }
];

// Função para filtrar colunas baseado no papel do usuário e setor
export const getVisibleColumns = (userRole: string, userSector?: string): Column[] => {
  return DEFAULT_COLUMNS.filter(column => {
    // Se a coluna tem restrições e o papel do usuário está nas restrições, não mostrar
    if (column.restrictedRoles && column.restrictedRoles.includes(userRole)) {
      return false;
    }
    
    // Para colaboradores, mostrar apenas o responsável do seu setor
    if (userRole === 'collaborator' && userSector) {
      if (column.key === 'responsibleFiscal' && userSector !== 'fiscal') return false;
      if (column.key === 'responsiblePessoal' && userSector !== 'pessoal') return false;
      if (column.key === 'responsibleContabil' && userSector !== 'contabil') return false;
    }
    
    return true;
  });
};

export type { ColumnKey };
