
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Company } from '../../types/company';
import { ExcelSampleDownload } from './import/ExcelSampleDownload';
import { ImportOptions } from './import/ImportOptions';
import { ImportFileSelector } from './import/ImportFileSelector';
import { ImportFieldsInfo } from './import/ImportFieldsInfo';
import { useImportCSV } from '../../hooks/useImportCSV';

interface ImportSectionProps {
  companies: Company[];
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany?: (id: string, updates: Partial<Company>) => void;
}

export const ImportSection = ({ companies, addCompany, updateCompany }: ImportSectionProps) => {
  const {
    importing,
    selectedFile,
    updateExisting,
    setUpdateExisting,
    handleFileSelect,
    handleImportCSV
  } = useImportCSV({ companies, addCompany, updateCompany });

  return (
    <Card className="macos-card macos-spring-hover">
      <CardHeader>
        <CardTitle className="macos-text-primary">Importar Dados</CardTitle>
        <CardDescription className="macos-text-secondary">
          Importe dados de empresas através de um arquivo CSV com o novo formato da tabela.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="macos-spring-hover">
            <ExcelSampleDownload />
          </div>

          <div className="space-y-3">
            <div className="macos-spring-hover">
              <ImportOptions 
                updateExisting={updateExisting}
                onUpdateExistingChange={setUpdateExisting}
              />
            </div>
            
            <div className="macos-spring-hover">
              <ImportFileSelector
                selectedFile={selectedFile}
                importing={importing}
                onFileSelect={handleFileSelect}
                onImport={handleImportCSV}
              />
            </div>
          </div>
        </div>

        <div className="macos-spring-hover">
          <ImportFieldsInfo />
        </div>
      </CardContent>
    </Card>
  );
};
