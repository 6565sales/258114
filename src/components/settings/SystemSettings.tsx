
import React, { useState } from 'react';
import { useConfig } from '../../contexts/ConfigContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DataManagement } from './DataManagement';

export const SystemSettings = () => {
  const { config, updateConfig } = useConfig();
  const { toast } = useToast();
  const [systemName, setSystemName] = useState(config.name);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | undefined>(config.logo);

  const handleNameSubmit = () => {
    updateConfig({ name: systemName });
    toast({
      title: "Nome atualizado",
      description: "O nome do sistema foi alterado com sucesso.",
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoSubmit = () => {
    if (logoPreview) {
      updateConfig({ logo: logoPreview });
      toast({
        title: "Logo atualizada",
        description: "A logo do sistema foi alterada com sucesso.",
      });
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(undefined);
    updateConfig({ logo: undefined });
    toast({
      title: "Logo removida",
      description: "A logo do sistema foi removida com sucesso.",
    });
  };

  return (
    <div className="space-y-6 macos-page-enter">
      <div className="macos-spring-hover">
        <h2 className="text-2xl font-bold macos-text-primary mb-2">Configurações do Sistema</h2>
        <p className="macos-text-secondary">Personalize as configurações gerais do sistema.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 macos-glass">
          <TabsTrigger value="general" className="macos-tab macos-spring-hover macos-spring-tap">Geral</TabsTrigger>
          <TabsTrigger value="data" className="macos-tab macos-spring-hover macos-spring-tap">Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="macos-card macos-spring-hover">
            <CardHeader>
              <CardTitle className="macos-text-primary">Nome do Sistema</CardTitle>
              <CardDescription className="macos-text-secondary">
                Altere o nome que aparece no cabeçalho do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name" className="macos-text-primary">Nome atual: {config.name}</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="system-name"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                    placeholder="Nome do sistema"
                    className="flex-1 macos-input macos-focus"
                  />
                  <Button
                    onClick={handleNameSubmit}
                    disabled={!systemName.trim() || systemName === config.name}
                    size="sm"
                    className="macos-button-interactive macos-spring-hover macos-spring-tap"
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="macos-card macos-spring-hover">
            <CardHeader>
              <CardTitle className="macos-text-primary">Logo do Sistema</CardTitle>
              <CardDescription className="macos-text-secondary">
                Faça upload de uma logo para personalizar o sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {logoPreview && (
                <div className="flex items-center space-x-4 macos-spring-hover">
                  <div className="w-16 h-16 macos-card rounded-lg flex items-center justify-center overflow-hidden macos-spring-hover macos-spring-tap">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveLogo}
                    className="text-red-600 hover:text-red-700 macos-glass-button macos-spring-hover macos-spring-tap"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="logo-upload" className="block text-sm font-medium mb-2 macos-text-primary">
                    Selecionar arquivo
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="flex-1 macos-input macos-focus"
                    />
                    <Button
                      onClick={handleLogoSubmit}
                      disabled={!logoPreview}
                      size="sm"
                      className="macos-button-interactive macos-spring-hover macos-spring-tap"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Aplicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <div className="macos-page-enter">
            <DataManagement />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
