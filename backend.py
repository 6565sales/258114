from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv
import uuid
from datetime import datetime

# Carrega variáveis de ambiente
load_dotenv()

app = Flask(__name__)

# Configuração do CORS - Permitindo todas as origens em desenvolvimento
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///companies.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo da empresa
class Company(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(200), nullable=False)
    taxId = db.Column(db.String(50), nullable=True)
    taxRegime = db.Column(db.String(50), nullable=True)
    newTaxRegime = db.Column(db.String(50), nullable=True)
    complexityLevel = db.Column(db.String(20), nullable=True)
    clientClass = db.Column(db.String(20), nullable=True)
    segment = db.Column(db.String(100), nullable=True)
    companySector = db.Column(db.String(100), nullable=True)
    classification = db.Column(db.String(50), nullable=True)
    municipality = db.Column(db.String(100), nullable=True)
    situation = db.Column(db.String(50), nullable=True)
    group = db.Column(db.String(100), nullable=True)
    honoraryValue = db.Column(db.Float, nullable=True)
    collaboratorIds = db.Column(db.Text, nullable=True)  # JSON string
    sectorResponsibles = db.Column(db.Text, nullable=True)  # JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        import json
        return {
            'id': self.id,
            'name': self.name,
            'taxId': self.taxId,
            'taxRegime': self.taxRegime,
            'newTaxRegime': self.newTaxRegime,
            'complexityLevel': self.complexityLevel,
            'clientClass': self.clientClass,
            'segment': self.segment,
            'companySector': self.companySector,
            'classification': self.classification,
            'municipality': self.municipality,
            'situation': self.situation,
            'group': self.group,
            'honoraryValue': self.honoraryValue,
            'collaboratorIds': json.loads(self.collaboratorIds) if self.collaboratorIds else [],
            'sectorResponsibles': json.loads(self.sectorResponsibles) if self.sectorResponsibles else {},
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

# Rotas da API

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Backend está funcionando!'
    })

@app.route('/api/companies', methods=['GET'])
def get_companies():
    try:
        companies = Company.query.all()
        return jsonify([company.to_dict() for company in companies])
    except Exception as e:
        print(f"Erro ao buscar empresas: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/companies', methods=['POST'])
def create_company():
    try:
        import json
        data = request.get_json()
        
        if not data or not data.get('name'):
            return jsonify({'error': 'Nome da empresa é obrigatório'}), 400
        
        # Converter arrays/objects para JSON strings
        collaborator_ids = json.dumps(data.get('collaboratorIds', []))
        sector_responsibles = json.dumps(data.get('sectorResponsibles', {}))
        
        company = Company(
            name=data.get('name'),
            taxId=data.get('taxId', ''),
            taxRegime=data.get('taxRegime'),
            newTaxRegime=data.get('newTaxRegime'),
            complexityLevel=data.get('complexityLevel'),
            clientClass=data.get('clientClass'),
            segment=data.get('segment'),
            companySector=data.get('companySector'),
            classification=data.get('classification'),
            municipality=data.get('municipality'),
            situation=data.get('situation'),
            group=data.get('group'),
            honoraryValue=data.get('honoraryValue'),
            collaboratorIds=collaborator_ids,
            sectorResponsibles=sector_responsibles
        )
        
        db.session.add(company)
        db.session.commit()
        
        print(f"Empresa criada: {company.name} (ID: {company.id})")
        return jsonify(company.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao criar empresa: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/companies/<company_id>', methods=['PUT'])
def update_company(company_id):
    try:
        import json
        company = Company.query.get_or_404(company_id)
        data = request.get_json()
        
        # Atualizar campos
        for field in ['name', 'taxId', 'taxRegime', 'newTaxRegime', 'complexityLevel', 
                     'clientClass', 'segment', 'companySector', 'classification', 
                     'municipality', 'situation', 'group', 'honoraryValue']:
            if field in data:
                setattr(company, field, data[field])
        
        # Campos especiais que precisam ser convertidos para JSON
        if 'collaboratorIds' in data:
            company.collaboratorIds = json.dumps(data['collaboratorIds'])
        if 'sectorResponsibles' in data:
            company.sectorResponsibles = json.dumps(data['sectorResponsibles'])
        
        company.updated_at = datetime.utcnow()
        db.session.commit()
        
        print(f"Empresa atualizada: {company.name} (ID: {company.id})")
        return jsonify(company.to_dict())
    
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao atualizar empresa: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/companies/<company_id>', methods=['DELETE'])
def delete_company(company_id):
    try:
        company = Company.query.get_or_404(company_id)
        company_name = company.name
        
        db.session.delete(company)
        db.session.commit()
        
        print(f"Empresa excluída: {company_name} (ID: {company_id})")
        return jsonify({'message': f'Empresa {company_name} excluída com sucesso'})
    
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao excluir empresa: {str(e)}")
        return jsonify({'error': str(e)}), 500

def create_sample_data():
    """Criar dados de exemplo"""
    import json
    
    # Verificar se já existem empresas
    if Company.query.count() > 0:
        print("Dados já existem, pulando criação de exemplos")
        return
    
    sample_companies = [
        {
            'name': 'Empresa Exemplo LTDA',
            'taxId': '12.345.678/0001-90',
            'taxRegime': 'SIMPLES NACIONAL',
            'newTaxRegime': 'SIMPLES NACIONAL',
            'complexityLevel': 'Medium',
            'clientClass': 'Executive',
            'segment': 'COMÉRCIO',
            'companySector': 'VAREJO',
            'classification': 'BÁSICO',
            'municipality': 'São Paulo',
            'situation': 'ATIVO',
            'group': 'GRUPO A',
            'honoraryValue': 1500.0,
            'collaboratorIds': json.dumps([]),
            'sectorResponsibles': json.dumps({})
        }
    ]
    
    for company_data in sample_companies:
        company = Company(**company_data)
        db.session.add(company)
    
    try:
        db.session.commit()
        print(f"Criadas {len(sample_companies)} empresas de exemplo")
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao criar dados de exemplo: {str(e)}")

if __name__ == '__main__':
    with app.app_context():
        # Criar tabelas
        db.create_all()
        print("Tabelas criadas/verificadas")
        
        # Criar dados de exemplo
        create_sample_data()
    
    print("Backend iniciado em http://localhost:5000")
    print("Rotas disponíveis:")
    print("- GET /api/health")
    print("- GET /api/companies")
    print("- POST /api/companies")
    print("- PUT /api/companies/<id>")
    print("- DELETE /api/companies/<id>")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
