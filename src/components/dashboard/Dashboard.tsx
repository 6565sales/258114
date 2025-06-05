
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AppSidebar } from '../layout/AppSidebar';
import { Header } from '../layout/Header';
import { DashboardCharts } from './DashboardCharts';
import { CompanyFullScreen } from '../companies/CompanyFullScreen';
import { UserManagement } from '../users/UserManagement';
import { SystemSettings } from '../settings/SystemSettings';
import { FinancialReports } from '../financial/FinancialReports';
import { BackendTest } from '../debug/BackendTest';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

type ActiveTab = 'dashboard' | 'companies' | 'users' | 'settings' | 'financial' | 'backend-test';

export const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardCharts />;
      case 'companies':
        return <CompanyFullScreen onBackToDashboard={() => setActiveTab('dashboard')} />;
      case 'financial':
        return (user?.role === 'root' || user?.role === 'manager') ? 
          <FinancialReports /> : 
          <div className="flex items-center justify-center h-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">Acesso negado</div>;
      case 'users':
        return user?.role === 'root' ? <UserManagement /> : <div className="flex items-center justify-center h-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">Acesso negado</div>;
      case 'settings':
        return user?.role === 'root' ? <SystemSettings /> : <div className="flex items-center justify-center h-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">Acesso negado</div>;
      case 'backend-test':
        return user?.role === 'root' ? <BackendTest /> : <div className="flex items-center justify-center h-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">Acesso negado</div>;
      default:
        return <DashboardCharts />;
    }
  };

  const isCompaniesTab = activeTab === 'companies';

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <SidebarInset className="flex-1">
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 flex items-center gap-2 px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              <SidebarTrigger className="h-8 w-8" />
              <div className="flex-1">
                <Header />
              </div>
            </header>
            <main className={`flex-1 overflow-auto ${isCompaniesTab ? '' : 'p-4'}`}>
              <div className={isCompaniesTab ? 'h-full' : 'max-w-full'}>
                <div className="animate-fade-in h-full">
                  {renderContent()}
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
