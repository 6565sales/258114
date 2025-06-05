
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { useExcelSampleGenerator } from '../ExcelSampleGenerator';

export const ExcelSampleDownload = () => {
  const { generateExcelSample } = useExcelSampleGenerator();

  return (
    <div className="macos-card p-4 border-green-500 border-2 macos-spring-hover macos-spring-tap">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium macos-text-primary mb-1">📊 Modelo Excel Atualizado</h4>
          <p className="text-sm macos-text-secondary">
            Baixe o modelo com a nova estrutura de campos para importação
          </p>
          <p className="text-xs macos-text-tertiary mt-1">
            ✅ Inclui todos os novos campos: GRUPO, CLASSIFICAÇÃO, MUNICÍPIO, etc.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={generateExcelSample}
          className="border-green-300 text-green-700 hover:bg-green-100 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-900 macos-spring-hover macos-spring-tap"
        >
          <Download className="w-4 h-4 mr-2" />
          Baixar Modelo
        </Button>
      </div>
    </div>
  );
};
