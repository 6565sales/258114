
# Backend Python - Sistema de Gestão de Empresas

## Instalação e Configuração

### 1. Instalar dependências
```bash
pip install -r requirements.txt
```

### 2. Executar o backend
```bash
python backend.py
```

O backend será iniciado em `http://localhost:5000`

## Estrutura da API

### Endpoints disponíveis:

- `GET /api/health` - Verificar se o backend está funcionando
- `GET /api/companies` - Listar todas as empresas
- `POST /api/companies` - Criar nova empresa
- `PUT /api/companies/<id>` - Atualizar empresa
- `DELETE /api/companies/<id>` - Excluir empresa

### Exemplo de dados da empresa:

```json
{
  "name": "Empresa Exemplo LTDA",
  "taxId": "12.345.678/0001-90",
  "taxRegime": "SIMPLES NACIONAL",
  "newTaxRegime": "SIMPLES NACIONAL",
  "complexityLevel": "Medium",
  "clientClass": "Executive",
  "segment": "COMÉRCIO",
  "companySector": "VAREJO",
  "classification": "BÁSICO",
  "municipality": "São Paulo",
  "situation": "ATIVO",
  "group": "GRUPO A",
  "honoraryValue": 1500.0,
  "collaboratorIds": [],
  "sectorResponsibles": {}
}
```

## Banco de Dados

O sistema usa SQLite com o arquivo `companies.db` que será criado automaticamente.

## Como usar

1. Execute o backend: `python backend.py`
2. Execute o frontend Lovable
3. O sistema funcionará integrado com persistência de dados

## Troubleshooting

- Certifique-se de que a porta 5000 está livre
- Verifique se todas as dependências estão instaladas
- O frontend deve estar configurado para `http://localhost:5000/api`
