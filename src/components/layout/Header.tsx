
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useConfig } from '../../contexts/ConfigContext';
import { AnimatedBadge } from '@/components/ui/animated-badge';
import { ThemeSelector } from '../theme/ThemeSelector';

export const Header = () => {
  const { user } = useAuth();
  const { config } = useConfig();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'root': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'manager': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'collaborator': return 'bg-green-100 text-green-800 hover:bg-green-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getRoleTranslation = (role: string) => {
    switch (role) {
      case 'root': return 'ADMINISTRADOR';
      case 'manager': return 'GERENTE';
      case 'collaborator': return 'COLABORADOR';
      default: return role?.toUpperCase();
    }
  };

  return (
    <div className="flex items-center justify-between w-full macos-page-enter">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold macos-text-primary macos-spring-hover">
          Bem-vindo de volta, {user?.name}
        </h1>
        <p className="text-sm sm:text-base macos-text-secondary transition-all duration-300 hover:text-opacity-80">
          Gerencie suas empresas e visualize análises no {config.name}
        </p>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="macos-spring-hover">
          <ThemeSelector />
        </div>
        <AnimatedBadge 
          className={`${getRoleBadgeColor(user?.role || '')} macos-spring-tap`}
          hover={true}
          pulse={false}
        >
          {getRoleTranslation(user?.role || '')}
        </AnimatedBadge>
        {user?.sector && (
          <AnimatedBadge 
            variant="outline" 
            className="hidden sm:inline-flex macos-spring-tap"
            hover={true}
            pulse={false}
          >
            {user.sector}
          </AnimatedBadge>
        )}
      </div>
    </div>
  );
};
