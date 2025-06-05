
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '../../../contexts/AuthContext';
import { SectorResponsibles } from '../../../types/company';

interface SectorResponsiblesFieldsProps {
  sectorResponsibles: SectorResponsibles;
  setSectorResponsibles: (responsibles: SectorResponsibles) => void;
}

export const SectorResponsiblesFields = ({ 
  sectorResponsibles, 
  setSectorResponsibles 
}: SectorResponsiblesFieldsProps) => {
  const { users } = useAuth();
  const [activeTab, setActiveTab] = useState('fiscal');

  const getUsersBySector = (sector: string) => {
    return users.filter(user => {
      // Root pode ser responsável por qualquer setor
      if (user.role === 'root') return true;
      
      // Gerentes e colaboradores só podem ser responsáveis pelo seu próprio setor
      if ((user.role === 'manager' || user.role === 'collaborator') && user.sector === sector) {
        return true;
      }
      
      return false;
    });
  };

  const handleResponsibleChange = (sector: keyof SectorResponsibles, userId: string) => {
    if (userId === 'none') {
      setSectorResponsibles({
        ...sectorResponsibles,
        [sector]: undefined
      });
    } else {
      setSectorResponsibles({
        ...sectorResponsibles,
        [sector]: userId
      });
    }
  };

  const renderResponsibleSelect = (sectorKey: keyof SectorResponsibles, sectorName: string) => {
    const availableUsers = getUsersBySector(sectorKey);
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Responsável {sectorName}</h4>
          <p className="text-sm text-gray-600 mb-4">
            Selecione o usuário responsável pela área {sectorName.toLowerCase()}
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Label htmlFor={`responsible-${sectorKey}`} className="text-sm font-medium">
            Responsável {sectorName}
          </Label>
          <Select
            value={sectorResponsibles[sectorKey] || 'none'}
            onValueChange={(value) => handleResponsibleChange(sectorKey, value)}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder={`Selecione o responsável ${sectorName.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Nenhum responsável</SelectItem>
              {availableUsers.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-gray-500">
                      ({user.role === 'root' ? 'Administrador' : 
                        user.role === 'manager' ? 'Gerente' : 'Colaborador'} - {user.sector || 'Geral'})
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-medium text-gray-900">3 Responsável</h3>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
          <TabsTrigger value="pessoal">Pessoal</TabsTrigger>
          <TabsTrigger value="contabil">Contábil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fiscal" className="mt-6">
          {renderResponsibleSelect('fiscal', 'Fiscal')}
        </TabsContent>
        
        <TabsContent value="pessoal" className="mt-6">
          {renderResponsibleSelect('pessoal', 'Pessoal')}
        </TabsContent>
        
        <TabsContent value="contabil" className="mt-6">
          {renderResponsibleSelect('contabil', 'Contábil')}
        </TabsContent>
      </Tabs>
    </div>
  );
};
