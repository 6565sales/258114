
import { Sector } from '../contexts/AuthContext';

export type ComplexityLevel = 'Low' | 'Medium' | 'High';
export type ClientClass = 'Executive' | 'VIP' | 'Diamond';
export type TaxRegime = 'Simples Nacional' | 'Lucro Presumido' | 'Lucro Real';

// Novos tipos para os campos adicionados
export type CompanyGroup = 
  | 'GRUPO ADEGA'
  | 'GRUPO AGRICOLA GROENER'
  | 'GRUPO ARI'
  | 'GRUPO BRUNA'
  | 'GRUPO BRUNO'
  | 'GRUPO CARLOS ALBERTO'
  | 'GRUPO CARMO'
  | 'GRUPO FELICIANO'
  | 'GRUPO FRANCO CONSTRUÇÕES'
  | 'GRUPO GONÇALVES'
  | 'GRUPO ISOLDINO'
  | 'GRUPO JUNIOR DO POSTO'
  | 'GRUPO KOLLING'
  | 'GRUPO LAURIUCH'
  | 'GRUPO MEI (AMARANTE)'
  | 'GRUPO RAIMUNDO'
  | 'GRUPO RAMOS'
  | 'GRUPO REIS PANIFICADORA'
  | 'GRUPO SHEILA'
  | 'GRUPO SOARES'
  | 'GRUPO TRENTINE'
  | 'GRUPO TRUCKAUTO'
  | 'GRUPO VALDOMIRO';

export type CompanyClassification = 
  | 'AVANÇADO'
  | 'BÁSICO'
  | 'ESSENCIAL'
  | 'EXECULTIVO'
  | 'MASTER';

export type CompanyMunicipality = 
  | 'AMARANTE DO MARANHÃO'
  | 'ARAME'
  | 'BARRA DO CORDA'
  | 'BURITIRANA'
  | 'FERNANDO FALÇÃO'
  | 'FORMOSA DA SERRA NEGRA'
  | 'GRAJAÚ'
  | 'IMPERATRIZ'
  | 'REDENÇÃO'
  | 'SITIO NOVO';

export type NewTaxRegime = 
  | 'LUCRO PRESUMIDO'
  | 'LUCRO REAL'
  | 'MEI'
  | 'PF'
  | 'SIMPLES NACIONAL'
  | 'TERCEIRO SETOR';

export type CompanySituation = 'SEM MOVIMENTO' | 'COM MOVIMENTO';

export type CompanySector = 
  | 'COMÉRCIO'
  | 'INDÚSTRIA'
  | 'PRODUTOR RURAL'
  | 'SERVIÇOS'
  | 'TERCEIRO SETOR';

export type CompanySegment = 
  | 'ENSINO ESPORTIVO'
  | 'MATERIAIS DE CONSTRUÇÃO'
  | 'FARMÁCIA'
  | 'CLÍNICA MÉDICA'
  | 'SUPERMERCADO'
  | 'SOJA'
  | 'PECUÁRIA'
  | 'CONFECÇÕES'
  | 'DOMÉSTICA'
  | 'CARTÓRIO'
  | 'TRANSPORTADORA'
  | 'COMBUSTÍVEIS'
  | 'CARVOARIA'
  | 'SERRALHERIA'
  | 'ELETRÔNICOS'
  | 'INFORMÁTICA'
  | 'ASSOCIAÇÃO'
  | 'PAPELARIA'
  | 'MATERIAIS HOSPITALARES'
  | 'LOCAÇÃO'
  | 'AUTOPEÇAS'
  | 'VARIEDADES'
  | 'RESTAURANTE'
  | 'ENSINO FUNDAMENTAL'
  | 'MÓVEIS'
  | 'CONSULTÓRIO ODONTOLÓGIO'
  | 'FUNERÁRIA'
  | 'GESSO'
  | 'PNEUMÁTICOS'
  | 'IGREJA'
  | 'HOTELARIA'
  | 'VETERINÁRIO'
  | 'HOLDING'
  | 'ARQUITETURA'
  | 'MANUTENÇÃO AR CONDICIONADO'
  | 'APOIO ADMINISTRATIVO'
  | 'ALUGUEL DE MÁQUINAS'
  | 'LOTÉRICA'
  | 'LANCHONETE'
  | 'COMUNICAÇÃO VISUAL'
  | 'CONSULTORIA'
  | 'ENGENHARIA'
  | 'PROMOÇÃO DE VENDAS'
  | 'EVENTOS'
  | 'RECREAÇÕES'
  | 'ELETRODOMÉSTICOS'
  | 'CORRETORA'
  | 'SINDICATO'
  | 'SALÃO'
  | 'PADARIA'
  | string; // Permite segmentos personalizados

export interface SectorResponsibles {
  fiscal?: string;
  pessoal?: string;
  contabil?: string;
  financeiro?: string;
}

export interface Company {
  id: string;
  name: string;
  taxId: string;
  complexityLevel?: ComplexityLevel;
  clientClass?: ClientClass;
  taxRegime: TaxRegime;
  segment?: CompanySegment;
  collaboratorIds: string[];
  sectorResponsibles?: SectorResponsibles;
  cpf?: string;
  
  // Novos campos
  group?: CompanyGroup;
  classification?: CompanyClassification;
  municipality?: CompanyMunicipality;
  newTaxRegime?: NewTaxRegime;
  situation?: CompanySituation;
  honoraryValue?: number;
  companySector?: CompanySector;
}
