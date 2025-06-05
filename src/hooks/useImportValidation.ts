
import { Company, TaxRegime } from '../types/company';
import { ImportOptions, ImportResult } from '../types/importData';
import { validateRowData, extractBasicFields } from '../utils/csvDataValidation';
import { prepareCompanyData } from '../utils/csvFieldMapping';

export const useImportValidation = (
  companies: Company[], 
  addCompany: (company: Omit<Company, 'id'>) => void,
  updateCompany?: (id: string, updates: Partial<Company>) => void
) => {
  const validateAndImportData = (
    data: any[], 
    options: ImportOptions = { updateExisting: false }
  ): ImportResult => {
    console.log('Opções de importação:', options);
    
    let importedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    let errors: string[] = [];

    const validData = validateRowData(data);

    if (validData.length === 0) {
      errors.push('Nenhuma linha válida encontrada. Verifique se o arquivo contém a coluna "Nome"/"Empresas".');
      return { importedCount, updatedCount, skippedCount, errors };
    }

    validData.forEach((item: any, index: number) => {
      const originalIndex = data.indexOf(item) + 1;
      console.log(`Processando linha ${originalIndex}:`, item);
      
      try {
        const { name, taxId, taxRegime } = extractBasicFields(item);
        
        console.log(`Linha ${originalIndex} - Campos mapeados:`, { name, taxId, taxRegime });
        
        // Validar apenas nome obrigatório
        if (!name) {
          const error = `Linha ${originalIndex}: Nome da empresa é obrigatório`;
          console.log(error);
          errors.push(error);
          return;
        }

        // Verificar se a empresa já existe (por CNPJ se informado, senão por nome)
        let existingCompany;
        if (taxId) {
          existingCompany = companies.find(c => c.taxId === taxId);
        } else {
          existingCompany = companies.find(c => c.name.toLowerCase() === name.toLowerCase());
        }
        
        if (existingCompany) {
          if (options.updateExisting && updateCompany) {
            const identifier = taxId || name;
            console.log(`Linha ${originalIndex}: Atualizando empresa existente (${identifier})`);
            
            const updatedData = prepareCompanyData(item);
            updateCompany(existingCompany.id, updatedData);
            updatedCount++;
            console.log(`Empresa atualizada com sucesso. Total atualizadas: ${updatedCount}`);
          } else {
            const identifier = taxId || name;
            console.log(`Linha ${originalIndex}: Pulando empresa (${identifier}) - já existe`);
            skippedCount++;
          }
          return;
        }

        // Criar nova empresa
        const newCompanyData = prepareCompanyData(item);
        const newCompany: Omit<Company, 'id'> = {
          name,
          taxId: taxId || '', // CNPJ pode estar vazio agora
          taxRegime: (taxRegime as TaxRegime) || 'Simples Nacional',
          ...newCompanyData,
          collaboratorIds: []
        };

        console.log(`Linha ${originalIndex} - Nova empresa criada:`, newCompany);
        addCompany(newCompany);
        importedCount++;
        console.log(`Empresa importada com sucesso. Total: ${importedCount}`);
        
      } catch (error) {
        const errorMsg = `Linha ${originalIndex}: Erro ao processar dados - ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    });

    console.log('Validação concluída:', { importedCount, updatedCount, skippedCount, errors });
    return { importedCount, updatedCount, skippedCount, errors };
  };

  return { validateAndImportData };
};
