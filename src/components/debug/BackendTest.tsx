
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiService } from '../../services/apiService';
import { CheckCircle, XCircle, Clock, Play, Server, RefreshCw } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  duration?: number;
}

interface ConnectionStatus {
  connected: boolean;
  message: string;
  latency?: number;
}

export const BackendTest = () => {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const updateTest = (name: string, status: TestResult['status'], message: string, duration?: number) => {
    setTests(prev => {
      const existing = prev.find(t => t.name === name);
      if (existing) {
        return prev.map(t => t.name === name ? { ...t, status, message, duration } : t);
      }
      return [...prev, { name, status, message, duration }];
    });
  };

  const runTest = async (name: string, testFn: () => Promise<any>) => {
    const startTime = Date.now();
    updateTest(name, 'pending', 'Executando...');
    
    try {
      const result = await testFn();
      const duration = Date.now() - startTime;
      const resultMessage = typeof result === 'object' ? JSON.stringify(result).slice(0, 100) + '...' : String(result);
      updateTest(name, 'success', `Sucesso: ${resultMessage}`, duration);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      updateTest(name, 'error', `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, duration);
      throw error;
    }
  };

  const checkConnection = async () => {
    try {
      const status = await apiService.testConnection();
      setConnectionStatus(status);
      setLastCheck(new Date());
    } catch (error) {
      setConnectionStatus({
        connected: false,
        message: `Erro na verificação: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      });
      setLastCheck(new Date());
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTests([]);

    try {
      // Test 1: Connection Check
      await runTest('Teste de Conectividade', async () => {
        const result = await apiService.testConnection();
        return result.connected ? `Conectado (${result.latency}ms)` : result.message;
      });

      // Test 2: Health Check
      await runTest('Health Check', async () => {
        const result = await apiService.healthCheck();
        if (result.error) throw new Error(result.error);
        return result.data;
      });

      // Test 3: Get Companies
      await runTest('Buscar Empresas', async () => {
        const result = await apiService.getCompanies();
        if (result.error) throw new Error(result.error);
        return `${result.data?.length || 0} empresas encontradas`;
      });

      // Test 4: Create Company
      const testCompany = {
        name: `Empresa Teste ${Date.now()}`,
        taxId: '12.345.678/0001-99',
        taxRegime: 'SIMPLES NACIONAL',
        situation: 'ATIVO'
      };

      let createdCompanyId: string | null = null;

      await runTest('Criar Empresa', async () => {
        const result = await apiService.createCompany(testCompany);
        if (result.error) throw new Error(result.error);
        createdCompanyId = result.data?.id;
        return `Empresa criada com ID: ${createdCompanyId}`;
      });

      // Test 5: Update Company (only if creation succeeded)
      if (createdCompanyId && !createdCompanyId.startsWith('mock-')) {
        await runTest('Atualizar Empresa', async () => {
          const updates = { name: `${testCompany.name} - ATUALIZADA` };
          const result = await apiService.updateCompany(createdCompanyId!, updates);
          if (result.error) throw new Error(result.error);
          return 'Empresa atualizada com sucesso';
        });

        // Test 6: Delete Company
        await runTest('Deletar Empresa', async () => {
          const result = await apiService.deleteCompany(createdCompanyId!);
          if (result.error) throw new Error(result.error);
          return 'Empresa deletada com sucesso';
        });
      } else if (createdCompanyId?.startsWith('mock-')) {
        updateTest('Info', 'success', 'Testes de atualização/deleção pulados - backend em modo mock', 0);
      }

    } catch (error) {
      console.error('Erro durante os testes:', error);
    } finally {
      setIsRunning(false);
      await checkConnection(); // Atualizar status da conexão
    }
  };

  // Verificar conexão automaticamente ao carregar
  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return <Badge className="bg-green-100 text-green-800">Sucesso</Badge>;
      case 'error': return <Badge className="bg-red-100 text-red-800">Erro</Badge>;
      case 'pending': return <Badge className="bg-blue-100 text-blue-800">Executando</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Server className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Teste do Backend</h2>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={checkConnection} 
            disabled={isRunning}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Verificar Conexão</span>
          </Button>
          <Button 
            onClick={runAllTests} 
            disabled={isRunning}
            className="flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Executando...' : 'Executar Todos os Testes'}</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status da Conexão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span><strong>URL do Backend:</strong> http://localhost:5000/api</span>
              {connectionStatus && (
                <Badge className={connectionStatus.connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {connectionStatus.connected ? 'Online' : 'Offline'}
                </Badge>
              )}
            </div>
            {connectionStatus && (
              <>
                <p><strong>Status:</strong> {connectionStatus.message}</p>
                {connectionStatus.latency && (
                  <p><strong>Latência:</strong> {connectionStatus.latency}ms</p>
                )}
              </>
            )}
            <p><strong>Última verificação:</strong> {lastCheck ? lastCheck.toLocaleString() : 'Nunca'}</p>
          </div>
        </CardContent>
      </Card>

      {tests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados dos Testes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tests.map((test, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  {getStatusIcon(test.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{test.name}</h4>
                      <div className="flex items-center space-x-2">
                        {test.duration !== undefined && (
                          <span className="text-sm text-gray-500">{test.duration}ms</span>
                        )}
                        {getStatusBadge(test.status)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{test.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Instruções para Executar o Backend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">1. Instalar dependências:</h4>
              <code className="bg-gray-100 dark:bg-gray-800 p-2 rounded block font-mono text-sm">
                pip install -r requirements.txt
              </code>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Executar o backend:</h4>
              <code className="bg-gray-100 dark:bg-gray-800 p-2 rounded block font-mono text-sm">
                python backend.py
              </code>
            </div>
            <div>
              <h4 className="font-medium mb-2">3. Verificar se está rodando:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                O backend deve estar acessível em http://localhost:5000
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-200">💡 Modo Mock:</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Se o backend não estiver rodando, o sistema funcionará em modo mock com dados simulados. 
                Para usar dados reais e persistentes, execute o backend Python.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
