
const API_BASE_URL = 'http://localhost:5000/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    console.log(`🔄 API Request iniciada:`, {
      url: fullUrl,
      method: options?.method || 'GET',
      headers: options?.headers,
      body: options?.body ? JSON.parse(options.body as string) : null
    });

    try {
      const startTime = performance.now();
      
      const response = await fetch(fullUrl, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      console.log(`📊 Response recebido em ${duration}ms:`, {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ HTTP Error ${response.status}:`, {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText
        });
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log(`✅ API Response success:`, {
        dataType: typeof data,
        dataLength: Array.isArray(data) ? data.length : 'N/A',
        data: data
      });
      
      return { data };
    } catch (error) {
      console.error(`🔥 API Error para ${endpoint}:`, {
        error: error,
        errorName: error instanceof Error ? error.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        endpoint: endpoint,
        options: options
      });

      // Verificar se é erro de conexão (backend offline)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn(`⚠️ Backend offline detectado para ${endpoint}, ativando modo mock`);
        return this.handleOfflineMode<T>(endpoint, options);
      }
      
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private handleOfflineMode<T>(endpoint: string, options?: RequestInit): ApiResponse<T> {
    console.log(`🔧 Modo offline ativado para ${endpoint}`);
    
    // Simular dados quando o backend não estiver disponível
    if (endpoint === '/companies' && (!options?.method || options?.method === 'GET')) {
      console.log('📦 Retornando array vazio para GET /companies');
      return { data: [] as T };
    }
    
    if (endpoint === '/companies' && options?.method === 'POST') {
      const mockCompany = {
        id: `mock-${Date.now()}`,
        ...JSON.parse(options.body as string),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      console.log('📦 Retornando empresa mock para POST /companies:', mockCompany);
      return { data: mockCompany as T };
    }

    if (endpoint.startsWith('/companies/') && options?.method === 'PUT') {
      console.log('📦 Retornando sucesso mock para PUT /companies');
      return { data: { success: true } as T };
    }

    if (endpoint.startsWith('/companies/') && options?.method === 'DELETE') {
      console.log('📦 Retornando sucesso mock para DELETE /companies');
      return { data: { success: true } as T };
    }

    if (endpoint === '/health') {
      console.log('📦 Retornando health check mock');
      return { 
        data: { 
          status: 'offline', 
          message: 'Backend não disponível - modo mock ativo' 
        } as T 
      };
    }

    console.log('📦 Retornando null para endpoint não mapeado:', endpoint);
    return { data: null as T };
  }

  async getCompanies() {
    console.log('🏢 Iniciando busca de empresas...');
    return this.request<any[]>('/companies');
  }

  async createCompany(company: any) {
    console.log('➕ Criando nova empresa:', company);
    return this.request<any>('/companies', {
      method: 'POST',
      body: JSON.stringify(company),
    });
  }

  async updateCompany(id: string, updates: any) {
    console.log('✏️ Atualizando empresa:', { id, updates });
    return this.request<any>(`/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteCompany(id: string) {
    console.log('🗑️ Deletando empresa:', id);
    return this.request<void>(`/companies/${id}`, {
      method: 'DELETE',
    });
  }

  async healthCheck() {
    console.log('🏥 Verificando saúde do backend...');
    return this.request<{ status: string; message: string }>('/health');
  }

  // Método para testar conectividade básica
  async testConnection(): Promise<{ connected: boolean; message: string; latency?: number }> {
    console.log('🔗 Testando conectividade básica...');
    const startTime = performance.now();
    
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000) // timeout de 5 segundos
      });
      
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      
      if (response.ok) {
        return {
          connected: true,
          message: 'Backend conectado com sucesso',
          latency
        };
      } else {
        return {
          connected: false,
          message: `Backend retornou status ${response.status}`
        };
      }
    } catch (error) {
      return {
        connected: false,
        message: `Falha na conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      };
    }
  }
}

export const apiService = new ApiService();
