
import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Dashboard } from '../components/dashboard/Dashboard';
import { useAuth } from '../contexts/AuthContext';

const AppContent = () => {
  const { user, isAuthenticated } = useAuth();

  console.log('AppContent - isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen macos-light dark:macos-dark">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen macos-light dark:macos-dark">
      <Dashboard />
    </div>
  );
};

const Index = () => {
  return <AppContent />;
};

export default Index;
