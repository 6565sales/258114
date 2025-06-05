
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Company, CompanySector, ComplexityLevel, CompanyGroup, CompanyClassification, CompanyMunicipality, NewTaxRegime, CompanySituation } from '../../../types/company';
import { useAuth } from '../../../contexts/AuthContext';
import { Column } from './utils/columnConfig';
import { getTaxRegimeColor, getSituationColor, getClassificationColor, getComplexityColor } from './utils/colorUtils';

interface CellRendererProps {
  company: Company;
  column: Column;
  isEditing: boolean;
  editData: Partial<Company>;
  setEditData: (data: Partial<Company>) => void;
}

export const CellRenderer = ({ company, column, isEditing, editData, setEditData }: CellRendererProps) => {
  const { users } = useAuth();

  const getResponsibleName = (responsibleId?: string) => {
    if (!responsibleId) return '';
    const user = users.find(u => u.id === responsibleId);
    return user?.name || '';
  };

  const handleHonoraryValueChange = (value: string) => {
    console.log('Alterando valor honorário:', value);
    const numericValue = value === '' ? undefined : parseFloat(value.replace(',', '.'));
    console.log('Valor numérico convertido:', numericValue);
    setEditData({ ...editData, honoraryValue: numericValue });
  };

  switch (column.key) {
    case 'name':
      return isEditing ? (
        <Input
          value={editData.name || ''}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          className="w-full h-8 text-sm"
        />
      ) : (
        <span className="font-medium">{company.name}</span>
      );

    case 'companySector':
      return isEditing ? (
        <Select
          value={editData.companySector || ''}
          onValueChange={(value) => setEditData({ ...editData, companySector: value as CompanySector })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMÉRCIO">COMÉRCIO</SelectItem>
            <SelectItem value="INDÚSTRIA">INDÚSTRIA</SelectItem>
            <SelectItem value="PRODUTOR RURAL">PRODUTOR RURAL</SelectItem>
            <SelectItem value="SERVIÇOS">SERVIÇOS</SelectItem>
            <SelectItem value="TERCEIRO SETOR">TERCEIRO SETOR</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <span className="text-sm">{company.companySector || '-'}</span>
      );

    case 'complexityLevel':
      return isEditing ? (
        <Select
          value={editData.complexityLevel || ''}
          onValueChange={(value) => setEditData({ ...editData, complexityLevel: value as ComplexityLevel })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Baixa</SelectItem>
            <SelectItem value="Medium">Média</SelectItem>
            <SelectItem value="High">Alta</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <Badge className={`text-xs ${getComplexityColor(company.complexityLevel)}`}>
          {company.complexityLevel === 'Low' ? 'Baixa' : 
           company.complexityLevel === 'Medium' ? 'Média' : 
           company.complexityLevel === 'High' ? 'Alta' : '-'}
        </Badge>
      );

    case 'segment':
      return isEditing ? (
        <Select
          value={editData.segment || ''}
          onValueChange={(value) => setEditData({ ...editData, segment: value })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            {/* Lista completa de segmentos */}
            <SelectItem value="ALUGUEL DE MÁQUINAS">ALUGUEL DE MÁQUINAS</SelectItem>
            <SelectItem value="APOIO ADMINISTRATIVO">APOIO ADMINISTRATIVO</SelectItem>
            <SelectItem value="ARQUITETURA">ARQUITETURA</SelectItem>
            <SelectItem value="ASSOCIAÇÃO">ASSOCIAÇÃO</SelectItem>
            <SelectItem value="AUTOPEÇAS">AUTOPEÇAS</SelectItem>
            <SelectItem value="CARTÓRIO">CARTÓRIO</SelectItem>
            <SelectItem value="CARVOARIA">CARVOARIA</SelectItem>
            <SelectItem value="CLÍNICA MÉDICA">CLÍNICA MÉDICA</SelectItem>
            <SelectItem value="COMBUSTÍVEIS">COMBUSTÍVEIS</SelectItem>
            <SelectItem value="COMUNICAÇÃO VISUAL">COMUNICAÇÃO VISUAL</SelectItem>
            <SelectItem value="CONFECÇÕES">CONFECÇÕES</SelectItem>
            <SelectItem value="CONSULTORIA">CONSULTORIA</SelectItem>
            <SelectItem value="CONSULTÓRIO ODONTOLÓGICO">CONSULTÓRIO ODONTOLÓGICO</SelectItem>
            <SelectItem value="CORRETORA">CORRETORA</SelectItem>
            <SelectItem value="DOMÉSTICA">DOMÉSTICA</SelectItem>
            <SelectItem value="ELETRODOMÉSTICOS">ELETRODOMÉSTICOS</SelectItem>
            <SelectItem value="ELETRÔNICOS">ELETRÔNICOS</SelectItem>
            <SelectItem value="ENGENHARIA">ENGENHARIA</SelectItem>
            <SelectItem value="ENSINO ESPORTIVO">ENSINO ESPORTIVO</SelectItem>
            <SelectItem value="ENSINO FUNDAMENTAL">ENSINO FUNDAMENTAL</SelectItem>
            <SelectItem value="EVENTOS">EVENTOS</SelectItem>
            <SelectItem value="FARMÁCIA">FARMÁCIA</SelectItem>
            <SelectItem value="FUNERÁRIA">FUNERÁRIA</SelectItem>
            <SelectItem value="GESSO">GESSO</SelectItem>
            <SelectItem value="HOLDING">HOLDING</SelectItem>
            <SelectItem value="HOTELARIA">HOTELARIA</SelectItem>
            <SelectItem value="IGREJA">IGREJA</SelectItem>
            <SelectItem value="INFORMÁTICA">INFORMÁTICA</SelectItem>
            <SelectItem value="LANCHONETE">LANCHONETE</SelectItem>
            <SelectItem value="LOCAÇÃO">LOCAÇÃO</SelectItem>
            <SelectItem value="LOTÉRICA">LOTÉRICA</SelectItem>
            <SelectItem value="MANUTENÇÃO AR CONDICIONADO">MANUTENÇÃO AR CONDICIONADO</SelectItem>
            <SelectItem value="MATERIAIS DE CONSTRUÇÃO">MATERIAIS DE CONSTRUÇÃO</SelectItem>
            <SelectItem value="MATERIAIS HOSPITALARES">MATERIAIS HOSPITALARES</SelectItem>
            <SelectItem value="MÓVEIS">MÓVEIS</SelectItem>
            <SelectItem value="PADARIA">PADARIA</SelectItem>
            <SelectItem value="PAPELARIA">PAPELARIA</SelectItem>
            <SelectItem value="PECUÁRIA">PECUÁRIA</SelectItem>
            <SelectItem value="PNEUMÁTICOS">PNEUMÁTICOS</SelectItem>
            <SelectItem value="PROMOÇÃO DE VENDAS">PROMOÇÃO DE VENDAS</SelectItem>
            <SelectItem value="RECREAÇÕES">RECREAÇÕES</SelectItem>
            <SelectItem value="RESTAURANTE">RESTAURANTE</SelectItem>
            <SelectItem value="SALÃO">SALÃO</SelectItem>
            <SelectItem value="SERRALHERIA">SERRALHERIA</SelectItem>
            <SelectItem value="SINDICATO">SINDICATO</SelectItem>
            <SelectItem value="SOJA">SOJA</SelectItem>
            <SelectItem value="SUPERMERCADO">SUPERMERCADO</SelectItem>
            <SelectItem value="TRANSPORTADORA">TRANSPORTADORA</SelectItem>
            <SelectItem value="VARIEDADES">VARIEDADES</SelectItem>
            <SelectItem value="VETERINÁRIO">VETERINÁRIO</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <span>{company.segment || '-'}</span>
      );

    case 'newTaxRegime':
      return isEditing ? (
        <Select
          value={editData.newTaxRegime || ''}
          onValueChange={(value) => setEditData({ ...editData, newTaxRegime: value as NewTaxRegime })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LUCRO PRESUMIDO">LUCRO PRESUMIDO</SelectItem>
            <SelectItem value="LUCRO REAL">LUCRO REAL</SelectItem>
            <SelectItem value="MEI">MEI</SelectItem>
            <SelectItem value="PF">PF</SelectItem>
            <SelectItem value="SIMPLES NACIONAL">SIMPLES NACIONAL</SelectItem>
            <SelectItem value="TERCEIRO SETOR">TERCEIRO SETOR</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <Badge className={`text-xs ${getTaxRegimeColor(company.newTaxRegime)}`}>
          {company.newTaxRegime || '-'}
        </Badge>
      );

    case 'municipality':
      return isEditing ? (
        <Select
          value={editData.municipality || ''}
          onValueChange={(value) => setEditData({ ...editData, municipality: value as CompanyMunicipality })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AMARANTE DO MARANHÃO">AMARANTE DO MARANHÃO</SelectItem>
            <SelectItem value="ARAME">ARAME</SelectItem>
            <SelectItem value="BARRA DO CORDA">BARRA DO CORDA</SelectItem>
            <SelectItem value="BURITIRANA">BURITIRANA</SelectItem>
            <SelectItem value="FERNANDO FALÇÃO">FERNANDO FALÇÃO</SelectItem>
            <SelectItem value="FORMOSA DA SERRA NEGRA">FORMOSA DA SERRA NEGRA</SelectItem>
            <SelectItem value="GRAJAÚ">GRAJAÚ</SelectItem>
            <SelectItem value="IMPERATRIZ">IMPERATRIZ</SelectItem>
            <SelectItem value="REDENÇÃO">REDENÇÃO</SelectItem>
            <SelectItem value="SITIO NOVO">SITIO NOVO</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <span className="text-sm">{company.municipality || '-'}</span>
      );

    case 'situation':
      return isEditing ? (
        <Select
          value={editData.situation || ''}
          onValueChange={(value) => setEditData({ ...editData, situation: value as CompanySituation })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SEM MOVIMENTO">SEM MOVIMENTO</SelectItem>
            <SelectItem value="COM MOVIMENTO">COM MOVIMENTO</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <Badge className={`text-xs ${getSituationColor(company.situation)}`}>
          {company.situation || '-'}
        </Badge>
      );

    case 'honoraryValue':
      return isEditing ? (
        <Input
          type="text"
          value={editData.honoraryValue?.toString() || ''}
          onChange={(e) => handleHonoraryValueChange(e.target.value)}
          className="w-full h-8 text-sm"
          placeholder="0.00"
          onBlur={(e) => {
            console.log('Valor final ao sair do campo:', e.target.value);
          }}
        />
      ) : (
        <span className="text-sm font-mono">
          {company.honoraryValue ? `R$ ${company.honoraryValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
        </span>
      );

    case 'classification':
      return isEditing ? (
        <Select
          value={editData.classification || ''}
          onValueChange={(value) => setEditData({ ...editData, classification: value as CompanyClassification })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AVANÇADO">AVANÇADO</SelectItem>
            <SelectItem value="BÁSICO">BÁSICO</SelectItem>
            <SelectItem value="ESSENCIAL">ESSENCIAL</SelectItem>
            <SelectItem value="EXECULTIVO">EXECULTIVO</SelectItem>
            <SelectItem value="MASTER">MASTER</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <Badge className={`text-xs ${getClassificationColor(company.classification)}`}>
          {company.classification || '-'}
        </Badge>
      );

    case 'group':
      return isEditing ? (
        <Select
          value={editData.group || ''}
          onValueChange={(value) => setEditData({ ...editData, group: value as CompanyGroup })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GRUPO ADEGA">GRUPO ADEGA</SelectItem>
            <SelectItem value="GRUPO AGRICOLA GROENER">GRUPO AGRICOLA GROENER</SelectItem>
            <SelectItem value="GRUPO ARI">GRUPO ARI</SelectItem>
            <SelectItem value="GRUPO BRUNA">GRUPO BRUNA</SelectItem>
            <SelectItem value="GRUPO BRUNO">GRUPO BRUNO</SelectItem>
            <SelectItem value="GRUPO CARLOS ALBERTO">GRUPO CARLOS ALBERTO</SelectItem>
            <SelectItem value="GRUPO CARMO">GRUPO CARMO</SelectItem>
            <SelectItem value="GRUPO FELICIANO">GRUPO FELICIANO</SelectItem>
            <SelectItem value="GRUPO FRANCO CONSTRUÇÕES">GRUPO FRANCO CONSTRUÇÕES</SelectItem>
            <SelectItem value="GRUPO GONÇALVES">GRUPO GONÇALVES</SelectItem>
            <SelectItem value="GRUPO ISOLDINO">GRUPO ISOLDINO</SelectItem>
            <SelectItem value="GRUPO JUNIOR DO POSTO">GRUPO JUNIOR DO POSTO</SelectItem>
            <SelectItem value="GRUPO KOLLING">GRUPO KOLLING</SelectItem>
            <SelectItem value="GRUPO LAURIUCH">GRUPO LAURIUCH</SelectItem>
            <SelectItem value="GRUPO MEI (AMARANTE)">GRUPO MEI (AMARANTE)</SelectItem>
            <SelectItem value="GRUPO RAIMUNDO">GRUPO RAIMUNDO</SelectItem>
            <SelectItem value="GRUPO RAMOS">GRUPO RAMOS</SelectItem>
            <SelectItem value="GRUPO REIS PANIFICADORA">GRUPO REIS PANIFICADORA</SelectItem>
            <SelectItem value="GRUPO SHEILA">GRUPO SHEILA</SelectItem>
            <SelectItem value="GRUPO SOARES">GRUPO SOARES</SelectItem>
            <SelectItem value="GRUPO TRENTINE">GRUPO TRENTINE</SelectItem>
            <SelectItem value="GRUPO TRUCKAUTO">GRUPO TRUCKAUTO</SelectItem>
            <SelectItem value="GRUPO VALDOMIRO">GRUPO VALDOMIRO</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <span className="text-sm">{company.group || '-'}</span>
      );

    case 'responsibleFiscal':
      return isEditing ? (
        <Select
          value={editData.sectorResponsibles?.fiscal || ''}
          onValueChange={(value) => setEditData({ 
            ...editData, 
            sectorResponsibles: { 
              ...editData.sectorResponsibles, 
              fiscal: value === 'none' ? undefined : value 
            } 
          })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhum</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name} ({user.role === 'root' ? 'Admin' : user.role === 'manager' ? 'Gerente' : 'Colaborador'})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <span className="text-sm">{getResponsibleName(company.sectorResponsibles?.fiscal) || '-'}</span>
      );

    case 'responsiblePessoal':
      return isEditing ? (
        <Select
          value={editData.sectorResponsibles?.pessoal || ''}
          onValueChange={(value) => setEditData({ 
            ...editData, 
            sectorResponsibles: { 
              ...editData.sectorResponsibles, 
              pessoal: value === 'none' ? undefined : value 
            } 
          })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhum</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name} ({user.role === 'root' ? 'Admin' : user.role === 'manager' ? 'Gerente' : 'Colaborador'})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <span className="text-sm">{getResponsibleName(company.sectorResponsibles?.pessoal) || '-'}</span>
      );

    case 'responsibleContabil':
      return isEditing ? (
        <Select
          value={editData.sectorResponsibles?.contabil || ''}
          onValueChange={(value) => setEditData({ 
            ...editData, 
            sectorResponsibles: { 
              ...editData.sectorResponsibles, 
              contabil: value === 'none' ? undefined : value 
            } 
          })}
        >
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhum</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name} ({user.role === 'root' ? 'Admin' : user.role === 'manager' ? 'Gerente' : 'Colaborador'})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <span className="text-sm">{getResponsibleName(company.sectorResponsibles?.contabil) || '-'}</span>
      );

    case 'taxId':
      return isEditing ? (
        <Input
          value={editData.taxId || ''}
          onChange={(e) => setEditData({ ...editData, taxId: e.target.value })}
          className="w-full h-8 text-sm"
          placeholder="00.000.000/0000-00"
        />
      ) : (
        <span className="text-sm font-mono">{company.taxId}</span>
      );

    case 'cpf':
      return isEditing ? (
        <Input
          value={editData.cpf || ''}
          onChange={(e) => setEditData({ ...editData, cpf: e.target.value })}
          className="w-full h-8 text-sm"
          placeholder="000.000.000-00"
        />
      ) : (
        <span className="text-sm font-mono">{(company as any).cpf || '-'}</span>
      );

    default:
      return null;
  }
};
