
import { useState, useEffect } from 'react';
import { Company } from '../types/company';
import { apiService } from '../services/apiService';
import { useToast } from '@/hooks/use-toast';

export const useCompanyActions = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Carregar empresas do backend
  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Carregando empresas...');
      
      const result = await apiService.getCompanies();
      
      if (result.data) {
        console.log('Empresas carregadas:', result.data);
        setCompanies(result.data);
        if (result.data.length === 0) {
          toast({
            title: "Sistema Inicializado",
            description: "Nenhuma empresa encontrada. Backend funcionando em modo mock.",
            variant: "default",
          });
        }
      } else if (result.error) {
        console.error('Erro ao carregar empresas:', result.error);
        setError(result.error);
        toast({
          title: "Backend Offline",
          description: "Conectando ao backend local em modo mock. Execute 'python backend.py' para usar dados reais.",
          variant: "default",
        });
        // Manter array vazio se não conseguir carregar
        setCompanies([]);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setError(errorMessage);
      setCompanies([]);
      toast({
        title: "Erro do Sistema",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const addCompany = async (newCompany: Omit<Company, 'id'>) => {
    try {
      console.log('Adicionando empresa:', newCompany);
      const result = await apiService.createCompany(newCompany);
      
      if (result.data) {
        setCompanies(prev => [...prev, result.data]);
        toast({
          title: "Empresa criada",
          description: "A empresa foi criada com sucesso!",
        });
        return result.data;
      } else {
        throw new Error(result.error || "Erro ao criar empresa");
      }
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: "Erro ao criar empresa",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCompany = async (id: string, updates: Partial<Company>) => {
    try {
      console.log('Atualizando empresa:', { id, updates });
      
      const result = await apiService.updateCompany(id, updates);
      
      if (result.data || !result.error) {
        setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
        toast({
          title: "Empresa atualizada",
          description: "As alterações foram salvas com sucesso!",
        });
        console.log('Empresa atualizada com sucesso');
      } else {
        throw new Error(result.error || "Erro ao atualizar empresa");
      }
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: "Erro ao atualizar empresa",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteCompany = async (id: string) => {
    try {
      console.log('Deletando empresa:', id);
      const result = await apiService.deleteCompany(id);
      
      if (!result.error) {
        setCompanies(prev => prev.filter(c => c.id !== id));
        toast({
          title: "Empresa excluída",
          description: "A empresa foi removida com sucesso!",
        });
      } else {
        throw new Error(result.error || "Erro ao excluir empresa");
      }
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: "Erro ao excluir empresa",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const getCompaniesByCollaborator = (collaboratorId: string) => {
    return companies.filter(c => c.collaboratorIds?.includes(collaboratorId));
  };

  // Só retorna os dados quando estiver inicializado
  if (!initialized) {
    return null;
  }

  return {
    companies: companies || [],
    loading,
    error,
    setCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
    getCompaniesByCollaborator,
    refreshCompanies: loadCompanies
  };
};
