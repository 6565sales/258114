
import { fieldVariations, findFieldValue } from './csvFieldMapping';

export const validateRowData = (data: any[]): any[] => {
  console.log('Iniciando validação de dados com nova estrutura:', data);
  
  if (!data || data.length === 0) {
    console.log('Nenhum dado para processar');
    return [];
  }

  // Log das primeiras linhas para debug
  console.log('Primeiras 3 linhas do arquivo:', data.slice(0, 3));
  
  // Log das chaves disponíveis na primeira linha
  if (data.length > 0) {
    console.log('Colunas disponíveis no arquivo:', Object.keys(data[0]));
  }

  // Filtrar linhas válidas com campos obrigatórios - APENAS NOME É OBRIGATÓRIO
  const validData = data.filter((item, index) => {
    console.log(`Analisando linha ${index + 1}:`, item);
    
    const name = findFieldValue(item, fieldVariations.name);
    const taxId = findFieldValue(item, fieldVariations.cnpj);
    
    if (name) {
      console.log(`Nome encontrado: "${name}"`);
    }
    if (taxId) {
      console.log(`CNPJ encontrado: "${taxId}"`);
    }
    
    // Apenas o nome é obrigatório agora
    const isValid = name !== '';
    console.log(`Linha ${index + 1} válida: ${isValid} (nome: '${name}', cnpj: '${taxId || 'não informado'}')`);
    
    return isValid;
  });

  console.log(`Total de linhas válidas para processar: ${validData.length} de ${data.length}`);

  if (validData.length === 0) {
    console.log('Nenhuma linha válida encontrada. Verificando estrutura...');
    console.log('Coluna obrigatória: Empresas/Nome');
    console.log('Colunas encontradas:', data[0] ? Object.keys(data[0]) : 'Nenhuma');
  }

  return validData;
};

export const extractBasicFields = (item: any) => {
  const name = findFieldValue(item, fieldVariations.name);
  const taxId = findFieldValue(item, fieldVariations.cnpj);
  const taxRegime = findFieldValue(item, fieldVariations.newTaxRegime) || 'Simples Nacional';
  
  console.log('Campos básicos extraídos:', { name, taxId: taxId || 'não informado', taxRegime });
  
  return { name, taxId: taxId || '', taxRegime };
};
