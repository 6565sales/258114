
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Lock } from 'lucide-react';
import { UserForm } from './UserForm';
import { ChangePasswordForm } from './ChangePasswordForm';

export const UserManagement = () => {
  const { users, deleteUser, user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const getRoleTranslation = (role: string) => {
    switch (role) {
      case 'root': return 'ADMINISTRADOR';
      case 'manager': return 'GERENTE';
      case 'collaborator': return 'COLABORADOR';
      default: return role.toUpperCase();
    }
  };

  const canCreateUsers = () => {
    if (user?.role === 'root') return true;
    if (user?.role === 'manager' && user?.canCreateUsers) return true;
    return false;
  };

  const handleEdit = (userToEdit: any) => {
    setEditingUser(userToEdit);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      deleteUser(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (showPasswordForm) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => setShowPasswordForm(false)} 
            className="flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
          >
            <span>← Voltar</span>
          </Button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Alterar Senha</h2>
        </div>
        <ChangePasswordForm />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="animate-fade-in">
        <UserForm
          user={editingUser}
          onClose={handleCloseForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Usuários</h2>
        <div className="flex space-x-2">
          {user?.role === 'root' && (
            <Button 
              onClick={() => setShowPasswordForm(true)} 
              variant="outline"
              className="flex items-center space-x-2 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <Lock className="w-4 h-4" />
              <span>Alterar Senha</span>
            </Button>
          )}
          {canCreateUsers() && (
            <Button 
              onClick={() => setShowForm(true)} 
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white border-0 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Usuário</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {users.map((userItem, index) => (
          <div
            key={userItem.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{userItem.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">@{userItem.username}</p>
                    </div>
                    
                    <div className="flex space-x-2 flex-wrap">
                      <Badge className={
                        userItem.role === 'root' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        userItem.role === 'manager' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }>
                        {getRoleTranslation(userItem.role)}
                      </Badge>
                      {userItem.sector && (
                        <Badge variant="outline" className="text-gray-800 dark:text-gray-200">{userItem.sector.toUpperCase()}</Badge>
                      )}
                      {userItem.role === 'manager' && userItem.canCreateUsers && (
                        <Badge variant="outline" className="text-green-800 dark:text-green-200 border-green-300">PODE CRIAR USUÁRIOS</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {canCreateUsers() && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(userItem)}
                        className="flex items-center space-x-1 text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Editar</span>
                      </Button>
                    )}
                    {canCreateUsers() && userItem.role !== 'root' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(userItem.id)}
                        className="flex items-center space-x-1 text-white bg-red-600 hover:bg-red-700 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Excluir</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
