
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClassificationFieldsProps {
  formData: {
    complexityLevel: string;
    clientClass: string;
  };
  setFormData: (data: any) => void;
  canEditComplexityAndClass: boolean;
}

export const ClassificationFields = ({ 
  formData, 
  setFormData, 
  canEditComplexityAndClass 
}: ClassificationFieldsProps) => {
  if (!canEditComplexityAndClass) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-2">
        <Label htmlFor="complexityLevel" className="text-sm font-medium">Nível de Complexidade</Label>
        <Select
          value={formData.complexityLevel}
          onValueChange={(value) => setFormData({ ...formData, complexityLevel: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a complexidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Baixa</SelectItem>
            <SelectItem value="Medium">Média</SelectItem>
            <SelectItem value="High">Alta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientClass" className="text-sm font-medium">Classe do Cliente</Label>
        <Select
          value={formData.clientClass}
          onValueChange={(value) => setFormData({ ...formData, clientClass: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a classe do cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Executive">Executivo</SelectItem>
            <SelectItem value="VIP">VIP</SelectItem>
            <SelectItem value="Diamond">Diamante</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
