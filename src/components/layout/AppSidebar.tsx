
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useConfig } from '../../contexts/ConfigContext';
import { Building2, BarChart3, Users, LogOut, Settings, DollarSign } from 'lucide-react';
import { InteractiveButton } from '@/components/ui/interactive-button';
import { MacOSFade, MacOSStagger } from '@/components/ui/macos-animations';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: 'dashboard' | 'companies' | 'users' | 'settings' | 'financial') => void;
}

export const AppSidebar = ({ activeTab, setActiveTab }: AppSidebarProps) => {
  const { user, logout } = useAuth();
  const { config } = useConfig();

  const getRoleTranslation = (role: string) => {
    switch (role) {
      case 'root': return 'Admin';
      case 'manager': return 'Gerente';
      case 'collaborator': return 'Colab.';
      default: return role;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Painel', icon: BarChart3, allowed: ['root', 'manager', 'collaborator'] },
    { id: 'companies', label: 'Empresas', icon: Building2, allowed: ['root', 'manager', 'collaborator'] },
    { id: 'financial', label: 'Financeiro', icon: DollarSign, allowed: ['root', 'manager'] },
    { id: 'users', label: 'Usuários', icon: Users, allowed: ['root'] },
    { id: 'settings', label: 'Config', icon: Settings, allowed: ['root'] },
  ];

  const allowedItems = menuItems.filter(item => item.allowed.includes(user?.role || ''));

  return (
    <Sidebar collapsible="icon" className="border-r w-12 group-data-[state=expanded]:w-48">
      <MacOSFade>
        <SidebarHeader className="p-2 border-b">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
              {config.logo ? (
                <img 
                  src={config.logo} 
                  alt={config.name} 
                  className="w-full h-full object-contain rounded-md"
                />
              ) : (
                <Building2 className="w-3 h-3 text-white" />
              )}
            </div>
            <div className="group-data-[collapsible=icon]:hidden min-w-0">
              <h2 className="font-semibold text-xs truncate">{config.name}</h2>
              <p className="text-xs text-muted-foreground truncate">{getRoleTranslation(user?.role || '')}</p>
            </div>
          </div>
        </SidebarHeader>
      </MacOSFade>
      
      <SidebarContent>
        <MacOSFade delay={100}>
          <SidebarGroup className="p-1">
            <SidebarGroupLabel className="px-2 py-1 text-xs font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                <MacOSStagger delay={50}>
                  {allowedItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveTab(item.id as any)}
                          isActive={isActive}
                          tooltip={item.label}
                          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs h-8 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5"
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:sr-only truncate">
                            {item.label}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </MacOSStagger>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </MacOSFade>
      </SidebarContent>
      
      <MacOSFade delay={200}>
        <SidebarFooter className="p-1 border-t">
          <InteractiveButton
            onClick={logout}
            variant="outline"
            size="sm"
            withRipple={true}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs h-7 transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5"
          >
            <LogOut className="w-3 h-3" />
            <span className="group-data-[collapsible=icon]:sr-only">Sair</span>
          </InteractiveButton>
        </SidebarFooter>
      </MacOSFade>
    </Sidebar>
  );
};
