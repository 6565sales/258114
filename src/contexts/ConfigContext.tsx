
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SystemConfig {
  name: string;
  logo?: string;
}

interface ConfigContextType {
  config: SystemConfig;
  updateConfig: (updates: Partial<SystemConfig>) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
};

const DEFAULT_CONFIG: SystemConfig = {
  name: 'Plataforma de Gestão Empresarial',
  logo: '/lovable-uploads/78f879fb-d73b-44cb-b5e4-2f667bac32ab.png'
};

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<SystemConfig>(DEFAULT_CONFIG);

  // Carregar configurações do localStorage ao inicializar
  useEffect(() => {
    const savedConfig = localStorage.getItem('systemConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...DEFAULT_CONFIG, ...parsedConfig });
        console.log('Configuração carregada do localStorage:', parsedConfig);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        setConfig(DEFAULT_CONFIG);
      }
    }
  }, []);

  const updateConfig = (updates: Partial<SystemConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    // Salvar no localStorage
    localStorage.setItem('systemConfig', JSON.stringify(newConfig));
    console.log('Configuração atualizada:', newConfig);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
