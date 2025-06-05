
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';

export const useExcelSampleGenerator = () => {
  const { toast } = useToast();

  const generateExcelSample = () => {
    // Modelo com todos os novos campos da estrutura atualizada incluindo Fiscal, Pessoal e Contábil
    const sampleData = [
      {
        "Empresas": "Empresa Exemplo LTDA",
        "CNPJ": "12.345.678/0001-90",
        "CPF": "123.456.789-00",
        "GRUPO": "GRUPO ADEGA",
        "CLASSIFICAÇÃO": "AVANÇADO",
        "MUNICÍPIO": "AMARANTE DO MARANHÃO",
        "REGIME TRIBUTÁRIO": "SIMPLES NACIONAL",
        "SITUAÇÃO": "COM MOVIMENTO",
        "NÍVEL COMPLEXIDADE": "Medium",
        "VALOR HONORÁRIO": 1500.00,
        "SETOR": "COMÉRCIO",
        "SEGMENTO": "SUPERMERCADO",
        "Fiscal": "João Silva",
        "Pessoal": "Maria Santos",
        "Contábil": "Ana Oliveira"
      },
      {
        "Empresas": "Comércio ABC S/A",
        "CNPJ": "98.765.432/0001-10",
        "CPF": "",
        "GRUPO": "GRUPO BRUNO",
        "CLASSIFICAÇÃO": "EXECULTIVO",
        "MUNICÍPIO": "IMPERATRIZ",
        "REGIME TRIBUTÁRIO": "LUCRO PRESUMIDO",
        "SITUAÇÃO": "SEM MOVIMENTO",
        "NÍVEL COMPLEXIDADE": "High",
        "VALOR HONORÁRIO": 2800.00,
        "SETOR": "SERVIÇOS",
        "SEGMENTO": "CONSULTORIA",
        "Fiscal": "Carlos Alberto",
        "Pessoal": "Fernanda Costa",
        "Contábil": "Roberto Lima"
      },
      {
        "Empresas": "Indústria XYZ LTDA",
        "CNPJ": "11.222.333/0001-44",
        "CPF": "987.654.321-00",
        "GRUPO": "GRUPO CARMO",
        "CLASSIFICAÇÃO": "BÁSICO",
        "MUNICÍPIO": "BARRA DO CORDA",
        "REGIME TRIBUTÁRIO": "MEI",
        "SITUAÇÃO": "COM MOVIMENTO",
        "NÍVEL COMPLEXIDADE": "Low",
        "VALOR HONORÁRIO": 800.00,
        "SETOR": "INDÚSTRIA",
        "SEGMENTO": "MATERIAIS DE CONSTRUÇÃO",
        "Fiscal": "José Santos",
        "Pessoal": "Luciana Souza",
        "Contábil": "Paulo Ricardo"
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empresas");
    
    // Aplicar formatação às colunas de cabeçalho
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "E3F2FD" } }
        };
      }
    }

    // Ajustar largura das colunas
    const colWidths = [
      { wch: 25 }, // Empresas
      { wch: 18 }, // CNPJ
      { wch: 15 }, // CPF
      { wch: 20 }, // GRUPO
      { wch: 15 }, // CLASSIFICAÇÃO
      { wch: 20 }, // MUNICÍPIO
      { wch: 18 }, // REGIME TRIBUTÁRIO
      { wch: 15 }, // SITUAÇÃO
      { wch: 18 }, // NÍVEL COMPLEXIDADE
      { wch: 15 }, // VALOR HONORÁRIO
      { wch: 12 }, // SETOR
      { wch: 20 }, // SEGMENTO
      { wch: 18 }, // Fiscal
      { wch: 18 }, // Pessoal
      { wch: 18 }  // Contábil
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `modelo_importacao_empresas_${new Date().toISOString().split('T')[0]}.xlsx`);

    toast({
      title: "Modelo Excel atualizado baixado",
      description: "Arquivo de exemplo com nova estrutura (incluindo Fiscal, Pessoal e Contábil) foi baixado com sucesso.",
    });
  };

  return { generateExcelSample };
};
