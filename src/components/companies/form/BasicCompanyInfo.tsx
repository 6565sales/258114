
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicCompanyInfoProps {
  formData: any;
  setFormData: (data: any) => void;
  canEditTaxRegime: boolean;
}

export const BasicCompanyInfo = ({ 
  formData, 
  setFormData, 
  canEditTaxRegime 
}: BasicCompanyInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Nome da Empresa</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taxId" className="text-sm font-medium">CNPJ</Label>
          <Input
            id="taxId"
            value={formData.taxId}
            onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
            placeholder="00.000.000/0000-00"
            required
            className="w-full"
          />
        </div>
      </div>

      {canEditTaxRegime && (
        <div className="space-y-2">
          <Label htmlFor="taxRegime" className="text-sm font-medium">Regime Tributário</Label>
          <Select 
            value={formData.taxRegime} 
            onValueChange={(value) => setFormData({ ...formData, taxRegime: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o regime tributário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Simples Nacional">Simples Nacional</SelectItem>
              <SelectItem value="Lucro Presumido">Lucro Presumido</SelectItem>
              <SelectItem value="Lucro Real">Lucro Real</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
