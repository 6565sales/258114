
export interface ImportData {
  name: string;
  taxId: string;
  taxRegime: string;
  complexityLevel?: string;
  clientClass?: string;
  sectorResponsibles?: {
    fiscal?: string;
    pessoal?: string;
    contabil?: string;
    financeiro?: string;
  };
  // Novos campos
  cpf?: string;
  group?: string;
  classification?: string;
  municipality?: string;
  newTaxRegime?: string;
  situation?: string;
  honoraryValue?: number;
  companySector?: string;
  segment?: string;
}

export interface ImportOptions {
  updateExisting: boolean;
}

export interface ImportResult {
  importedCount: number;
  updatedCount: number;
  skippedCount: number;
  errors: string[];
}
