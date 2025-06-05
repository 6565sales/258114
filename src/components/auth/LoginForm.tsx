
import React, { useState } from 'react';
import { MacOSCardAnimated } from '@/components/ui/macos-card-animated';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveButton } from '@/components/ui/interactive-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { useConfig } from '../../contexts/ConfigContext';
import { Building2 } from 'lucide-react';
import { MacOSFade, MacOSSpring } from '@/components/ui/macos-animations';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { config } = useConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    if (!success) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <MacOSFade>
      <div className="min-h-screen flex items-center justify-center p-4">
        <MacOSCardAnimated 
          interactive 
          glassEffect 
          className="w-full max-w-md shadow-xl"
        >
          <CardHeader className="text-center space-y-4">
            <MacOSSpring scale lift className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
              {config.logo ? (
                <img 
                  src={config.logo} 
                  alt={config.name} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="w-8 h-8 text-white" />
              )}
            </MacOSSpring>
            <CardTitle className="text-2xl font-bold">
              {config.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}
              <InteractiveButton 
                type="submit" 
                variant="macos"
                className="w-full"
                withSpring={true}
              >
                Entrar
              </InteractiveButton>
            </form>
          </CardContent>
        </MacOSCardAnimated>
      </div>
    </MacOSFade>
  );
};
