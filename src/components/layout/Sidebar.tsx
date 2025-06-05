
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useConfig } from '../../contexts/ConfigContext';
import { Building2, BarChart3, Users, LogOut, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: 'dashboard' | 'companies' | 'users' | 'settings') => void;
  onClose?: () => void;
}

export const Sidebar = ({ activeTab, setActiveTab, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const { config } = useConfig();

  const getRoleTranslation = (role: string) => {
    switch (role) {
      case 'root': return 'Administrador';
      case 'manager': return 'Gerente';
      case 'collaborator': return 'Colaborador';
      default: return role;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Painel', icon: BarChart3, allowed: ['root', 'manager', 'collaborator'] },
    { id: 'companies', label: 'Empresas', icon: Building2, allowed: ['root', 'manager', 'collaborator'] },
    { id: 'users', label: 'Usuários', icon: Users, allowed: ['root'] },
    { id: 'settings', label: 'Configurações', icon: Settings, allowed: ['root'] },
  ];

  return (
    <div className="w-64 bg-white/80 shadow-lg border-r h-full backdrop-blur-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
              {config.logo ? (
                <img 
                  src={config.logo} 
                  alt={config.name} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-gray-900">{config.name}</h2>
              <p className="text-sm text-gray-600">{getRoleTranslation(user?.role || '')}</p>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          if (!item.allowed.includes(user?.role || '')) return null;
          
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                onClose?.();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border'
                  : 'text-gray-600 hover:bg-blue-50/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          onClick={logout}
          variant="outline"
          className="w-full flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );
};
