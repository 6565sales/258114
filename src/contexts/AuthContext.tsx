
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'root' | 'manager' | 'collaborator';
export type Sector = 'fiscal' | 'pessoal' | 'contabil' | 'financeiro';

export interface User {
  id: string;
  name: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  sector?: Sector;
  canCreateUsers?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  users: User[];
  addUser: (user: Omit<User, 'id' | 'passwordHash'> & { password: string }) => void;
  updateUser: (id: string, updates: Partial<User> & { password?: string }) => void;
  deleteUser: (id: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

// Função simples para hash da senha (em produção, use bcrypt ou similar)
const hashPassword = (password: string): string => {
  return btoa(password + 'salt_key_secret'); // Base64 encoding com salt
};

const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { 
      id: '1', 
      name: 'Luciano - Administrador Root', 
      username: 'luciano', 
      passwordHash: hashPassword('37imperial2025'),
      role: 'root' 
    }
  ]);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Tentativa de login para:', username);
    const foundUser = users.find(u => u.username === username);
    if (foundUser && verifyPassword(password, foundUser.passwordHash)) {
      console.log('Login bem-sucedido');
      setUser(foundUser);
      return true;
    }
    console.log('Falha no login');
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addUser = (newUser: Omit<User, 'id' | 'passwordHash'> & { password: string }) => {
    const id = Date.now().toString();
    const { password, ...userData } = newUser;
    const passwordHash = hashPassword(password);
    setUsers(prev => [...prev, { ...userData, id, passwordHash }]);
  };

  const updateUser = (id: string, updates: Partial<User> & { password?: string }) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const { password, ...otherUpdates } = updates;
        const updatedUser = { ...u, ...otherUpdates };
        if (password) {
          updatedUser.passwordHash = hashPassword(password);
        }
        // Atualizar o usuário logado se for o mesmo que está sendo editado
        if (user && user.id === id) {
          setUser(updatedUser);
        }
        return updatedUser;
      }
      return u;
    }));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false;
    
    // Verificar se a senha atual está correta
    if (!verifyPassword(currentPassword, user.passwordHash)) {
      return false;
    }
    
    // Atualizar a senha
    updateUser(user.id, { password: newPassword });
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      users,
      addUser,
      updateUser,
      deleteUser,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
