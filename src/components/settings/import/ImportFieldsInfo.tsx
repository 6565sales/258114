
import React from 'react';

export const ImportFieldsInfo = () => {
  return (
    <div className="macos-card p-4 border-blue-500 border-2 macos-spring-hover">
      <h5 className="font-medium macos-text-primary mb-3">Estrutura atualizada para importação:</h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm macos-text-secondary">
        <div>
          <p className="font-medium mb-2 macos-text-primary">Campo obrigatório:</p>
          <ul className="space-y-1">
            <li>• <strong>Empresas</strong> (nome da empresa)</li>
          </ul>
          <p className="font-medium mb-2 mt-3 macos-text-primary">Campos opcionais:</p>
          <ul className="space-y-1">
            <li>• <strong>CNPJ</strong> (identificação fiscal)</li>
            <li>• <strong>CPF</strong> (pessoa física)</li>
          </ul>
        </div>
        
        <div>
          <p className="font-medium mb-2 macos-text-primary">Informações complementares:</p>
          <ul className="space-y-1">
            <li>• <strong>GRUPO</strong> (23 grupos disponíveis)</li>
            <li>• <strong>CLASSIFICAÇÃO</strong> (5 níveis)</li>
            <li>• <strong>MUNICÍPIO</strong> (10 municípios)</li>
            <li>• <strong>REGIME TRIBUTÁRIO</strong> (6 regimes)</li>
            <li>• <strong>SITUAÇÃO</strong> (com/sem movimento)</li>
          </ul>
        </div>

        <div>
          <p className="font-medium mb-2 macos-text-primary">Dados adicionais:</p>
          <ul className="space-y-1">
            <li>• <strong>NÍVEL COMPLEXIDADE</strong> (Low/Medium/High)</li>
            <li>• <strong>VALOR HONORÁRIO</strong> (valor numérico)</li>
            <li>• <strong>SETOR</strong> (5 setores principais)</li>
            <li>• <strong>SEGMENTO</strong> (50+ segmentos)</li>
            <li>• <strong>Fiscal</strong> (responsável fiscal)</li>
            <li>• <strong>Pessoal</strong> (responsável pessoal)</li>
            <li>• <strong>Contábil</strong> (responsável contábil)</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 p-3 macos-card border-blue-400 border rounded macos-spring-hover macos-spring-tap">
        <p className="text-sm macos-text-primary">
          <strong>📋 Instruções de uso:</strong>
        </p>
        <ol className="text-xs macos-text-secondary mt-2 space-y-1">
          <li>1. Baixe o modelo Excel atualizado acima</li>
          <li>2. Preencha os dados seguindo os exemplos fornecidos</li>
          <li>3. <strong>Apenas o nome da empresa é obrigatório</strong></li>
          <li>4. <strong>Novos campos de responsáveis:</strong> Fiscal, Pessoal e Contábil</li>
          <li>5. Salve como CSV com separador ponto e vírgula (;)</li>
          <li>6. Faça upload do arquivo CSV no campo abaixo</li>
          <li>7. Marque "Atualizar empresas existentes" se necessário</li>
        </ol>
      </div>
    </div>
  );
};
