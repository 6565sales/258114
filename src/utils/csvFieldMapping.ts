
import { ComplexityLevel, ClientClass, CompanyGroup, CompanyClassification, CompanyMunicipality, NewTaxRegime, CompanySituation, CompanySector, CompanySegment } from '../types/company';

export const fieldVariations = {
  name: ['Empresas', 'Nome', 'name', 'EMPRESAS', 'NOME', 'RAZ�O SOCIAL', 'RAZÃO SOCIAL', 'RAZAO SOCIAL'],
  cnpj: ['CNPJ', 'taxId', 'cnpj', 'TAX_ID'],
  cpf: ['CPF', 'cpf'],
  group: ['GRUPO', 'Grupo', 'group'],
  classification: ['CLASSIFICAÇÃO', 'CLASSIFICACAO', 'Classificação', 'classification', 'CLASSIFICA��O', 'CLASSIFICA��O '],
  municipality: ['MUNICÍPIO', 'MUNICIPIO', 'Município', 'municipality', 'MUNIC�PIO'],
  newTaxRegime: ['REGIME TRIBUTÁRIO', 'REGIME TRIBUTARIO', 'Regime Tributário', 'newTaxRegime', 'REGIME TRIBUT�RIO'],
  situation: ['SITUAÇÃO', 'SITUACAO', 'Situação', 'situation', 'SITUA��O'],
  complexityLevel: ['NÍVEL COMPLEXIDADE', 'NIVEL COMPLEXIDADE', 'Nível de Complexidade', 'complexityLevel'],
  honoraryValue: ['VALOR HONORÁRIO', 'VALOR HONORARIO', 'Valor Honorário', 'honoraryValue', 'VALOR HONOR�RIO'],
  companySector: ['SETOR', 'Setor', 'companySector'],
  segment: ['SEGMENTO', 'Segmento', 'segment'],
  fiscal: ['Fiscal', 'FISCAL', 'fiscal', 'Responsável Fiscal', 'RESPONSÁVEL FISCAL'],
  pessoal: ['Pessoal', 'PESSOAL', 'pessoal', 'Responsável Pessoal', 'RESPONSÁVEL PESSOAL'],
  contabil: ['Contábil', 'CONTÁBIL', 'contabil', 'Contabil', 'CONTABIL', 'Responsável Contábil', 'RESPONSÁVEL CONTÁBIL'],
  // Manter o campo responsável genérico para compatibilidade
  responsible: ['Responsável', 'Responsavel', 'responsible', 'RESPONSÁVEL']
};

export const findFieldValue = (item: any, variations: string[]): string => {
  for (const variation of variations) {
    if (item[variation] && String(item[variation]).trim() !== '') {
      return String(item[variation]).trim();
    }
  }
  return '';
};

export const parseOptionalValue = (value: any): string | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  const stringValue = String(value).trim();
  return stringValue === '' ? undefined : stringValue;
};

export const parseOptionalNumber = (value: any): number | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  let stringValue = String(value).trim();
  
  // Remover formatação brasileira de moeda
  if (stringValue.includes('R$')) {
    stringValue = stringValue.replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.');
  }
  
  if (stringValue === '') {
    return undefined;
  }
  const numValue = parseFloat(stringValue);
  return isNaN(numValue) ? undefined : numValue;
};

export const validateComplexityLevel = (value: any): ComplexityLevel | undefined => {
  const stringValue = parseOptionalValue(value);
  if (!stringValue) return undefined;
  
  const normalized = stringValue.toLowerCase();
  if (normalized === 'low' || normalized === 'baixo' || normalized === 'baixa') return 'Low';
  if (normalized === 'medium' || normalized === 'médio' || normalized === 'media' || normalized === 'medio') return 'Medium';
  if (normalized === 'high' || normalized === 'alto' || normalized === 'alta') return 'High';
  
  return undefined;
};

// Mapear valores de classificação com caracteres especiais
export const mapClassification = (value: any): CompanyClassification | undefined => {
  const stringValue = parseOptionalValue(value);
  if (!stringValue) return undefined;
  
  const normalized = stringValue.toLowerCase();
  if (normalized === 'básico' || normalized === 'basico' || normalized === 'b�sico') return 'BÁSICO';
  if (normalized === 'essencial') return 'ESSENCIAL';
  if (normalized === 'avançado' || normalized === 'avancado' || normalized === 'avan�ado') return 'AVANÇADO';
  if (normalized === 'executivo' || normalized === 'execultivo') return 'EXECULTIVO';
  if (normalized === 'master') return 'MASTER';
  
  return stringValue.toUpperCase() as CompanyClassification;
};

// Mapear valores de setor com caracteres especiais
export const mapSector = (value: any): CompanySector | undefined => {
  const stringValue = parseOptionalValue(value);
  if (!stringValue) return undefined;
  
  const normalized = stringValue.toLowerCase();
  if (normalized === 'comércio' || normalized === 'comercio' || normalized === 'com�rcio') return 'COMÉRCIO';
  if (normalized === 'serviços' || normalized === 'servicos' || normalized === 'servi�os') return 'SERVIÇOS';
  if (normalized === 'indústria' || normalized === 'industria' || normalized === 'ind�stria') return 'INDÚSTRIA';
  if (normalized === 'produtor rural' || normalized === 'produtor rural ') return 'PRODUTOR RURAL';
  if (normalized === 'terceiro setor') return 'TERCEIRO SETOR';
  
  return stringValue.toUpperCase() as CompanySector;
};

// Mapear valores de segmento com caracteres especiais
export const mapSegment = (value: any): CompanySegment | undefined => {
  const stringValue = parseOptionalValue(value);
  if (!stringValue) return undefined;
  
  const normalized = stringValue.toLowerCase();
  if (normalized === 'materiais de construção' || normalized === 'materiais de constru��o') return 'MATERIAIS DE CONSTRUÇÃO';
  if (normalized === 'farmácia' || normalized === 'farm�cia') return 'FARMÁCIA';
  if (normalized === 'clínica médica' || normalized === 'cl�nica m�dica' || normalized === 'clínica médica ') return 'CLÍNICA MÉDICA';
  if (normalized === 'pecuária' || normalized === 'pecu�ria') return 'PECUÁRIA';
  if (normalized === 'confecções' || normalized === 'confec��es') return 'CONFECÇÕES';
  
  return stringValue;
};

// Mapear valores de município com caracteres especiais  
export const mapMunicipality = (value: any): CompanyMunicipality | undefined => {
  const stringValue = parseOptionalValue(value);
  if (!stringValue) return undefined;
  
  const normalized = stringValue.toLowerCase();
  if (normalized === 'grajaú' || normalized === 'graja�') return 'GRAJAÚ';
  if (normalized === 'amarante do maranhão' || normalized === 'amarante do maranh�o') return 'AMARANTE DO MARANHÃO';
  if (normalized === 'formosa da serra negra') return 'FORMOSA DA SERRA NEGRA';
  
  return stringValue.toUpperCase() as CompanyMunicipality;
};

export const prepareCompanyData = (item: any) => {
  console.log('Preparando dados da empresa:', item);
  
  // Mapear todos os novos campos
  const cpf = parseOptionalValue(findFieldValue(item, fieldVariations.cpf));
  const group = parseOptionalValue(findFieldValue(item, fieldVariations.group)) as CompanyGroup | undefined;
  const classification = mapClassification(findFieldValue(item, fieldVariations.classification));
  const municipality = mapMunicipality(findFieldValue(item, fieldVariations.municipality));
  const newTaxRegime = parseOptionalValue(findFieldValue(item, fieldVariations.newTaxRegime)) as NewTaxRegime | undefined;
  const situation = parseOptionalValue(findFieldValue(item, fieldVariations.situation)) as CompanySituation | undefined;
  const honoraryValue = parseOptionalNumber(findFieldValue(item, fieldVariations.honoraryValue));
  const companySector = mapSector(findFieldValue(item, fieldVariations.companySector));
  const segment = mapSegment(findFieldValue(item, fieldVariations.segment));
  const complexityLevel = validateComplexityLevel(findFieldValue(item, fieldVariations.complexityLevel));
  
  // Responsáveis específicos por área
  const fiscalResponsible = parseOptionalValue(findFieldValue(item, fieldVariations.fiscal));
  const pessoalResponsible = parseOptionalValue(findFieldValue(item, fieldVariations.pessoal));
  const contabilResponsible = parseOptionalValue(findFieldValue(item, fieldVariations.contabil));
  
  // Responsável genérico (para compatibilidade com versões anteriores)
  const responsibleValue = parseOptionalValue(findFieldValue(item, fieldVariations.responsible));

  console.log('Dados mapeados:', {
    cpf,
    group,
    classification,
    municipality,
    newTaxRegime,
    situation,
    honoraryValue,
    companySector,
    segment,
    complexityLevel,
    fiscal: fiscalResponsible,
    pessoal: pessoalResponsible,
    contabil: contabilResponsible,
    responsible: responsibleValue
  });

  // Construir o objeto de responsáveis por setor
  const sectorResponsibles: any = {};
  
  if (fiscalResponsible) sectorResponsibles.fiscal = fiscalResponsible;
  if (pessoalResponsible) sectorResponsibles.pessoal = pessoalResponsible;
  if (contabilResponsible) sectorResponsibles.contabil = contabilResponsible;
  
  // Se não há responsáveis específicos mas há um responsável genérico, usar para fiscal
  if (!fiscalResponsible && !pessoalResponsible && !contabilResponsible && responsibleValue) {
    sectorResponsibles.fiscal = responsibleValue;
  }

  return {
    cpf,
    group,
    classification,
    municipality,
    newTaxRegime,
    situation,
    honoraryValue,
    companySector,
    segment,
    complexityLevel,
    sectorResponsibles: Object.keys(sectorResponsibles).length > 0 ? sectorResponsibles : undefined
  };
};
