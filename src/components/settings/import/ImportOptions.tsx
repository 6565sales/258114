
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface ImportOptionsProps {
  updateExisting: boolean;
  onUpdateExistingChange: (checked: boolean) => void;
}

export const ImportOptions = ({ updateExisting, onUpdateExistingChange }: ImportOptionsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3 macos-spring-hover macos-spring-tap">
        <Checkbox 
          id="update-existing"
          checked={updateExisting}
          onCheckedChange={(checked) => onUpdateExistingChange(checked as boolean)}
          className="macos-focus"
        />
        <Label htmlFor="update-existing" className="text-sm macos-text-primary">
          Atualizar empresas existentes (mesma CNPJ)
        </Label>
      </div>
      
      {updateExisting && (
        <div className="flex items-start space-x-2 p-3 macos-card border-amber-500 border-2 rounded-lg macos-spring-hover">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
          <p className="text-sm macos-text-secondary">
            <strong>Atenção:</strong> Empresas com CNPJ já cadastrado terão seus dados substituídos pelos dados do arquivo CSV.
          </p>
        </div>
      )}
    </div>
  );
};
