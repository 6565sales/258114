
import React from 'react';
import { InteractiveButton } from '@/components/ui/interactive-button';
import { GlassCard } from '@/components/ui/glass-card';
import { Plus, Users, Home } from 'lucide-react';

interface CompanyHeaderProps {
  canViewFinancialInfo: boolean;
  canCreate: boolean;
  onShowBillingGroups: () => void;
  onCreateCompany: () => void;
  onBackToDashboard?: () => void;
}

export const CompanyHeader = ({ 
  canViewFinancialInfo, 
  canCreate, 
  onShowBillingGroups, 
  onCreateCompany,
  onBackToDashboard
}: CompanyHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {onBackToDashboard && (
            <InteractiveButton
              variant="outline"
              onClick={onBackToDashboard}
              withRipple={true}
              className="flex items-center space-x-2 macos-glass-button"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </InteractiveButton>
          )}
          <div>
            <h1 className="text-3xl font-bold macos-text-primary">Empresas</h1>
            <p className="macos-text-secondary mt-1">
              Gerencie suas empresas cadastradas. Use a visualização em tabela para edição rápida.
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          {canCreate && (
            <InteractiveButton 
              onClick={onCreateCompany} 
              variant="macos"
              withRipple={true}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Empresa</span>
            </InteractiveButton>
          )}
          {canViewFinancialInfo && (
            <InteractiveButton 
              variant="outline" 
              onClick={onShowBillingGroups} 
              withRipple={true}
              className="flex items-center space-x-2 macos-glass-button"
            >
              <Users className="w-4 h-4" />
              <span>Grupos de Cobrança</span>
            </InteractiveButton>
          )}
        </div>
      </div>

      <GlassCard interactive={true} className="bg-blue-50/80 border-blue-200/50 p-4">
        <h3 className="font-medium text-blue-900 mb-2">💡 Dica de Uso</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Visualização Tabela:</strong> Clique em qualquer campo para editar diretamente</li>
          <li>• <strong>Importação CSV:</strong> Acesse as configurações do sistema para importar dados via CSV</li>
          <li>• <strong>Campos editáveis:</strong> Nome, CNPJ, Segmento, Responsável Fiscal, Regime Tributário, Honorários, Complexidade e Classe</li>
        </ul>
      </GlassCard>
    </div>
  );
};
