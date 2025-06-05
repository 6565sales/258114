
export const getTaxRegimeColor = (regime?: string) => {
  switch (regime) {
    case 'SIMPLES NACIONAL': return 'bg-green-100 text-green-800';
    case 'LUCRO PRESUMIDO': return 'bg-yellow-100 text-yellow-800';
    case 'LUCRO REAL': return 'bg-red-100 text-red-800';
    case 'MEI': return 'bg-blue-100 text-blue-800';
    case 'PF': return 'bg-purple-100 text-purple-800';
    case 'TERCEIRO SETOR': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getSituationColor = (situation?: string) => {
  switch (situation) {
    case 'COM MOVIMENTO': return 'bg-green-100 text-green-800';
    case 'SEM MOVIMENTO': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getClassificationColor = (classification?: string) => {
  switch (classification) {
    case 'MASTER': return 'bg-purple-100 text-purple-800';
    case 'EXECULTIVO': return 'bg-blue-100 text-blue-800';
    case 'AVANÇADO': return 'bg-green-100 text-green-800';
    case 'ESSENCIAL': return 'bg-yellow-100 text-yellow-800';
    case 'BÁSICO': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getComplexityColor = (complexity?: string) => {
  switch (complexity) {
    case 'High': return 'bg-red-100 text-red-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
