
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
import { Company } from '../types/company';
import { useImportValidation } from './useImportValidation';

interface UseImportCSVProps {
  companies: Company[];
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany?: (id: string, updates: Partial<Company>) => void;
}

export const useImportCSV = ({ companies, addCompany, updateCompany }: UseImportCSVProps) => {
  const { toast } = useToast();
  const [importing, setImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [updateExisting, setUpdateExisting] = useState(false);
  const { validateAndImportData } = useImportValidation(companies, addCompany, updateCompany);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('Arquivo selecionado:', file);
    setSelectedFile(file || null);
  };

  const tryParseWithEncoding = (file: File, encoding: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        delimiter: ';',
        encoding: encoding,
        complete: (results) => {
          console.log(`Parse com encoding ${encoding}:`, results);
          if (results.errors.length > 0) {
            console.log(`Erros com encoding ${encoding}:`, results.errors);
          }
          resolve(results.data as any[]);
        },
        error: (error) => {
          console.error(`Erro com encoding ${encoding}:`, error);
          reject(error);
        }
      });
    });
  };

  const handleImportCSV = async () => {
    console.log('Iniciando importação...');
    console.log('Arquivo selecionado:', selectedFile);
    console.log('Atualizar existentes:', updateExisting);

    if (!selectedFile) {
      console.log('Nenhum arquivo selecionado');
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo CSV para importar.",
        variant: "destructive",
      });
      return;
    }

    setImporting(true);
    console.log('Processando arquivo com Papa.parse...');

    try {
      // Tentar diferentes codificações
      const encodings = ['utf-8', 'iso-8859-1', 'windows-1252'];
      let data: any[] = [];
      let successfulEncoding = '';

      for (const encoding of encodings) {
        try {
          console.log(`Tentando parsing com encoding: ${encoding}`);
          data = await tryParseWithEncoding(selectedFile, encoding);
          
          // Verificar se os dados foram parseados corretamente
          if (data.length > 0) {
            const firstRow = data[0];
            const keys = Object.keys(firstRow);
            console.log(`Colunas encontradas com ${encoding}:`, keys);
            
            // Verificar se encontrou pelo menos uma coluna de nome válida
            const hasValidNameColumn = keys.some(key => 
              key.includes('RAZÃO') || key.includes('RAZ') || key.includes('Empresas') || key.includes('Nome')
            );
            
            if (hasValidNameColumn) {
              successfulEncoding = encoding;
              console.log(`Encoding ${encoding} funcionou! Colunas:`, keys);
              break;
            }
          }
        } catch (error) {
          console.log(`Falha com encoding ${encoding}:`, error);
          continue;
        }
      }

      if (!successfulEncoding) {
        throw new Error('Não foi possível processar o arquivo com nenhuma codificação testada');
      }

      console.log(`Usando dados parseados com encoding: ${successfulEncoding}`);
      console.log('Dados parseados:', data);
      
      const { importedCount, updatedCount, skippedCount, errors } = validateAndImportData(data, { updateExisting });
      
      console.log('Resultado da validação:', { importedCount, updatedCount, skippedCount, errors });

      // Construir mensagem de sucesso
      let successMessage = '';
      if (importedCount > 0) {
        successMessage += `${importedCount} empresas importadas`;
      }
      if (updatedCount > 0) {
        if (successMessage) successMessage += ', ';
        successMessage += `${updatedCount} empresas atualizadas`;
      }
      if (skippedCount > 0) {
        if (successMessage) successMessage += ', ';
        successMessage += `${skippedCount} empresas puladas (já existentes)`;
      }

      if (importedCount > 0 || updatedCount > 0) {
        toast({
          title: "Importação CSV concluída",
          description: successMessage || "Processamento concluído.",
        });
      }

      if (errors.length > 0) {
        toast({
          title: "Avisos de importação",
          description: `${errors.length} registros apresentaram problemas. Verifique o console para detalhes.`,
          variant: "destructive",
        });
        console.log('Erros de importação:', errors);
      }

      if (importedCount === 0 && updatedCount === 0 && skippedCount > 0) {
        toast({
          title: "Nenhuma empresa foi importada",
          description: `${skippedCount} empresas já existem no sistema. Marque "Atualizar empresas existentes" para substituir os dados.`,
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Erro durante a importação:', error);
      toast({
        title: "Erro na importação",
        description: "Arquivo inválido ou formato incorreto. Verifique se o arquivo está em formato CSV com separador ponto e vírgula (;).",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
      setSelectedFile(null);
      // Limpar o input
      const fileInput = document.getElementById('import-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  return {
    importing,
    selectedFile,
    updateExisting,
    setUpdateExisting,
    handleFileSelect,
    handleImportCSV
  };
};
