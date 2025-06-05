
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CompanySegment } from '../../../types/company';

interface SegmentFieldProps {
  formData: any;
  setFormData: (data: any) => void;
}

const COMPANY_SEGMENTS: CompanySegment[] = [
  'ENSINO ESPORTIVO',
  'MATERIAIS DE CONSTRUÇÃO',
  'FARMÁCIA',
  'CLÍNICA MÉDICA',
  'SUPERMERCADO',
  'SOJA',
  'PECUÁRIA',
  'CONFECÇÕES',
  'DOMÉSTICA',
  'CARTÓRIO',
  'TRANSPORTADORA',
  'COMBUSTÍVEIS',
  'CARVOARIA',
  'SERRALHERIA',
  'ELETRÔNICOS',
  'INFORMÁTICA',
  'ASSOCIAÇÃO',
  'PAPELARIA',
  'MATERIAIS HOSPITALARES',
  'LOCAÇÃO',
  'AUTOPEÇAS',
  'VARIEDADES',
  'RESTAURANTE',
  'ENSINO FUNDAMENTAL',
  'MÓVEIS',
  'CONSULTÓRIO ODONTOLÓGIO',
  'FUNERÁRIA',
  'GESSO',
  'PNEUMÁTICOS',
  'IGREJA',
  'HOTELARIA',
  'VETERINÁRIO',
  'HOLDING',
  'ARQUITETURA',
  'MANUTENÇÃO AR CONDICIONADO',
  'APOIO ADMINISTRATIVO',
  'ALUGUEL DE MÁQUINAS',
  'LOTÉRICA',
  'LANCHONETE',
  'COMUNICAÇÃO VISUAL',
  'CONSULTORIA',
  'ENGENHARIA',
  'PROMOÇÃO DE VENDAS',
  'EVENTOS',
  'RECREAÇÕES',
  'ELETRODOMÉSTICOS',
  'CORRETORA',
  'SINDICATO',
  'SALÃO'
];

export const SegmentField = ({ formData, setFormData }: SegmentFieldProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customSegment, setCustomSegment] = useState('');

  // Inicializar o estado baseado no valor existente do formData
  useEffect(() => {
    const currentSegment = formData.segment;
    if (currentSegment && !COMPANY_SEGMENTS.includes(currentSegment)) {
      setShowCustomInput(true);
      setCustomSegment(currentSegment);
    }
  }, [formData.segment]);

  const handleSegmentChange = (value: string) => {
    console.log('Segment changed to:', value);
    if (value === 'CUSTOM') {
      setShowCustomInput(true);
      setCustomSegment('');
      setFormData({ ...formData, segment: '' });
    } else {
      setShowCustomInput(false);
      setCustomSegment('');
      setFormData({ ...formData, segment: value });
    }
  };

  const handleCustomSegmentChange = (value: string) => {
    const upperValue = value.toUpperCase();
    console.log('Custom segment changed to:', upperValue);
    setCustomSegment(upperValue);
    setFormData({ ...formData, segment: upperValue });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="segment">Segmento</Label>
      
      {!showCustomInput ? (
        <Select 
          value={formData.segment || ''} 
          onValueChange={handleSegmentChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o segmento da empresa" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
            {COMPANY_SEGMENTS.map((segment) => (
              <SelectItem key={segment} value={segment}>
                {segment}
              </SelectItem>
            ))}
            <SelectItem value="CUSTOM" className="font-semibold text-blue-600">
              + Adicionar novo segmento
            </SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Digite o novo segmento"
            value={customSegment}
            onChange={(e) => handleCustomSegmentChange(e.target.value)}
            className="w-full"
          />
          <button
            type="button"
            onClick={() => {
              setShowCustomInput(false);
              setCustomSegment('');
              setFormData({ ...formData, segment: '' });
            }}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Voltar para lista predefinida
          </button>
        </div>
      )}
    </div>
  );
};
