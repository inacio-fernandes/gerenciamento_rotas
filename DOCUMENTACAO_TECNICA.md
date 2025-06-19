# 📚 Documentação Técnica

## Sistema de Gerenciamento de Rotas Escolares

### Índice

1. [Arquitetura do Sistema](#arquitetura-do-sistema)
2. [Modelo de Dados](#modelo-de-dados)
3. [API Reference](#api-reference)
4. [Configuração de Ambiente](#configuração-de-ambiente)
5. [Deploy](#deploy)
6. [Segurança](#segurança)
7. [Testes](#testes)
8. [Manutenção](#manutenção)

---

## 🏗️ Arquitetura do Sistema

### Visão Geral

O sistema segue uma arquitetura em camadas (Layered Architecture) com separação clara de responsabilidades:

```
┌─────────────────────────────────────┐
│           Frontend (React)          │
├─────────────────────────────────────┤
│         API REST (Express)          │
├─────────────────────────────────────┤
│        Controllers Layer            │
├─────────────────────────────────────┤
│         Services Layer              │
├─────────────────────────────────────┤
│         Models Layer                │
├─────────────────────────────────────┤
│        Database (PostgreSQL)        │
└─────────────────────────────────────┘
```

### Componentes Principais

#### 1. **Camada de Apresentação (Routes)**

- Define os endpoints da API
- Validação básica de entrada
- Roteamento de requisições

#### 2. **Camada de Controle (Controllers)**

- Lógica de negócio
- Processamento de requisições
- Respostas padronizadas

#### 3. **Camada de Modelos (Models)**

- Definição de entidades
- Relacionamentos
- Validações de dados

#### 4. **Camada de Middleware**

- Autenticação e autorização
- Tratamento de erros
- Logging e monitoramento

---

## 🗄️ Modelo de Dados

### Entidades Principais

#### **Pessoa** (Tabela Base)

```sql
CREATE TABLE pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(255),
    telefone VARCHAR(20),
    endereco TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Aluno**

```sql
CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    pessoa_id INTEGER REFERENCES pessoas(id),
    matricula VARCHAR(50) UNIQUE NOT NULL,
    responsavel_id INTEGER REFERENCES responsaveis(id),
    status VARCHAR(20) DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Escola**

```sql
CREATE TABLE escolas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(255),
    diretor VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Rota**

```sql
CREATE TABLE rotas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    motorista_id INTEGER REFERENCES motoristas(id),
    veiculo_id INTEGER REFERENCES veiculos(id),
    escola_id INTEGER REFERENCES escolas(id),
    horario_saida TIME NOT NULL,
    horario_chegada TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'ativa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Parada**

```sql
CREATE TABLE paradas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    horario TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Relacionamentos

```mermaid
erDiagram
    PESSOAS ||--o{ ALUNOS : "tem"
    PESSOAS ||--o{ MOTORISTAS : "é"
    PESSOAS ||--o{ MONITORES : "é"
    PESSOAS ||--o{ RESPONSAVEIS : "é"

    ALUNOS ||--o{ ALUNO_ESCOLA : "matriculado"
    ESCOLAS ||--o{ ALUNO_ESCOLA : "recebe"

    ROTAS ||--o{ PARADA_ROTA : "contém"
    PARADAS ||--o{ PARADA_ROTA : "pertence"

    ROTAS ||--o{ ALUNO_ROTA : "transporta"
    ALUNOS ||--o{ ALUNO_ROTA : "usa"

    ROTAS ||--o{ MONITOR_ROTA : "monitorada"
    MONITORES ||--o{ MONITOR_ROTA : "monitora"

    VEICULOS ||--o{ ROTAS : "atende"
    MOTORISTAS ||--o{ ROTAS : "dirige"
```

---

## 🔌 API Reference

### Autenticação

#### POST /login

**Descrição**: Autentica um usuário no sistema

**Request Body**:

```json
{
	"email": "usuario@exemplo.com",
	"senha": "senha123"
}
```

**Response (200)**:

```json
{
	"success": true,
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"user": {
			"id": 1,
			"nome": "João Silva",
			"email": "joao@exemplo.com",
			"perfil": "admin"
		}
	}
}
```

### Alunos

#### GET /alunos

**Descrição**: Lista todos os alunos

**Headers**:

```
Authorization: Bearer <token>
```

**Query Parameters**:

- `page`: Número da página (default: 1)
- `limit`: Itens por página (default: 10)
- `search`: Termo de busca
- `status`: Filtro por status

**Response (200)**:

```json
{
	"success": true,
	"data": {
		"alunos": [
			{
				"id": 1,
				"nome": "Maria Silva",
				"matricula": "2024001",
				"escola": "Escola Municipal",
				"status": "ativo"
			}
		],
		"pagination": {
			"page": 1,
			"limit": 10,
			"total": 100,
			"pages": 10
		}
	}
}
```

#### POST /alunos

**Descrição**: Cria um novo aluno

**Request Body**:

```json
{
	"nome": "João Silva",
	"cpf": "123.456.789-00",
	"data_nascimento": "2010-05-15",
	"matricula": "2024001",
	"escola_id": 1,
	"responsavel_id": 1
}
```

### Rotas

#### GET /rotas

**Descrição**: Lista todas as rotas

**Response (200)**:

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"nome": "Rota Centro",
			"motorista": "João Motorista",
			"veiculo": "Ônibus 001",
			"escola": "Escola Municipal",
			"horario_saida": "07:00",
			"horario_chegada": "07:30",
			"status": "ativa"
		}
	]
}
```

---

## ⚙️ Configuração de Ambiente

### Variáveis de Ambiente

```bash
# Servidor
PORT=3000
NODE_ENV=production

# Banco de Dados
DATABASE_URL=postgresql://user:pass@localhost:5432/school_routes
DATABASE_SSL=true
DB_LOGGING=false

# JWT
JWT_SECRET=sua_chave_super_secreta_aqui
JWT_EXPIRES_IN=24h

# AWS S3
AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=seu_bucket

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_app

# Logs
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

### Configuração de Produção

#### 1. **PM2 Configuration**

```javascript
// ecosystem.config.js
module.exports = {
	apps: [
		{
			name: "school-routes-api",
			script: "src/server.js",
			instances: "max",
			exec_mode: "cluster",
			env: {
				NODE_ENV: "production",
				PORT: 3000,
			},
			error_file: "logs/err.log",
			out_file: "logs/out.log",
			log_file: "logs/combined.log",
			time: true,
		},
	],
};
```

#### 2. **Nginx Configuration**

```nginx
server {
    listen 80;
    server_name api.schoolroutes.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🚀 Deploy

### Deploy Manual

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/school_route_manager_api.git
cd school_route_manager_api

# 2. Instale dependências
npm install --production

# 3. Configure variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Configure o banco de dados
npm run db:migrate

# 5. Inicie o servidor
npm start
```

### Deploy com Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

#### docker-compose.yml

```yaml
version: "3.8"

services:
    api:
        build: .
        ports:
            - "3000:3000"
        environment:
            - NODE_ENV=production
            - DATABASE_URL=postgresql://user:pass@db:5432/school_routes
        depends_on:
            - db
        volumes:
            - ./logs:/app/logs

    db:
        image: postgres:13
        environment:
            - POSTGRES_DB=school_routes
            - POSTGRES_USER=user
            - POSTGRES_PASSWORD=pass
        volumes:
            - postgres_data:/var/lib/postgresql/data

volumes:
    postgres_data:
```

---

## 🔒 Segurança

### Medidas Implementadas

#### 1. **Autenticação JWT**

- Tokens com expiração configurável
- Refresh tokens para renovação automática
- Blacklist de tokens revogados

#### 2. **Validação de Dados**

- Sanitização de inputs
- Validação de tipos e formatos
- Proteção contra SQL Injection

#### 3. **Rate Limiting**

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 100, // limite de 100 requisições por IP
	message: "Muitas requisições deste IP",
});

app.use("/api/", limiter);
```

#### 4. **CORS Configuration**

```javascript
const cors = require("cors");

app.use(
	cors({
		origin: ["https://schoolroutes.com", "https://admin.schoolroutes.com"],
		credentials: true,
	})
);
```

#### 5. **Helmet.js**

```javascript
const helmet = require("helmet");

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				styleSrc: ["'self'", "'unsafe-inline'"],
				scriptSrc: ["'self'"],
			},
		},
	})
);
```

### Checklist de Segurança

- [ ] HTTPS habilitado em produção
- [ ] Senhas hasheadas com bcrypt
- [ ] Validação de entrada em todos os endpoints
- [ ] Rate limiting configurado
- [ ] CORS configurado adequadamente
- [ ] Headers de segurança configurados
- [ ] Logs de auditoria implementados
- [ ] Backup automático do banco de dados

---

## 🧪 Testes

### Estrutura de Testes

```
tests/
├── unit/
│   ├── controllers/
│   ├── models/
│   └── utils/
├── integration/
│   ├── api/
│   └── database/
└── e2e/
    └── scenarios/
```

### Exemplo de Teste Unitário

```javascript
// tests/unit/controllers/alunoController.test.js
const request = require("supertest");
const app = require("../../src/server");

describe("Aluno Controller", () => {
	describe("GET /alunos", () => {
		it("should return list of alunos", async () => {
			const response = await request(app)
				.get("/alunos")
				.set("Authorization", `Bearer ${validToken}`)
				.expect(200);

			expect(response.body.success).toBe(true);
			expect(Array.isArray(response.body.data)).toBe(true);
		});
	});
});
```

### Comandos de Teste

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:watch

# Executar testes de integração
npm run test:integration
```

---

## 🔧 Manutenção

### Logs e Monitoramento

#### 1. **Estrutura de Logs**

```javascript
const winston = require("winston");

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({
			filename: "logs/error.log",
			level: "error",
		}),
		new winston.transports.File({ filename: "logs/combined.log" }),
	],
});
```

#### 2. **Health Check**

```javascript
app.get("/health", (req, res) => {
	res.json({
		status: "OK",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
		memory: process.memoryUsage(),
		database: sequelize.authenticate() ? "connected" : "disconnected",
	});
});
```

### Backup e Recuperação

#### 1. **Backup Automático**

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="school_routes"

pg_dump $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Manter apenas os últimos 7 backups
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

#### 2. **Cron Job**

```bash
# Adicionar ao crontab
0 2 * * * /path/to/backup.sh
```

### Atualizações

#### 1. **Script de Deploy**

```bash
#!/bin/bash
# deploy.sh

echo "Iniciando deploy..."

# Backup do banco
./backup.sh

# Pull das alterações
git pull origin main

# Instalar dependências
npm install --production

# Executar migrações
npm run db:migrate

# Reiniciar aplicação
pm2 restart school-routes-api

echo "Deploy concluído!"
```

---

## 📊 Métricas e Monitoramento

### Métricas Importantes

- **Performance**: Tempo de resposta da API
- **Disponibilidade**: Uptime do sistema
- **Erros**: Taxa de erro por endpoint
- **Usuários**: Número de usuários ativos
- **Banco de Dados**: Conexões ativas, queries lentas

### Ferramentas Recomendadas

- **APM**: New Relic, DataDog
- **Logs**: ELK Stack, Papertrail
- **Monitoramento**: UptimeRobot, Pingdom
- **Métricas**: Prometheus + Grafana

---

## 🆘 Suporte

### Contatos de Emergência

- **Suporte Técnico**:

    - arthur.faria@aluno.ifsp.edu.br
    - inacio.fernandes@aluno.ifsp.edu.br
    - paulo.costa1@aluno.ifsp.edu.br
    - j.lybio@aluno.ifsp.edu.br

- **Endereço**: Av. Maj. Fernando Valle, 2013 - São Miguel, Bragança Paulista - SP, 12903-000

- **Instituição**: Instituto Federal de Educação, Ciência e Tecnologia de São Paulo - Campus Bragança Paulista

### Troubleshooting Comum

#### 1. **Erro de Conexão com Banco**

```bash
# Verificar se o PostgreSQL está rodando
sudo systemctl status postgresql

# Verificar conexão
psql -h localhost -U user -d school_routes
```

#### 2. **Erro de Memória**

```bash
# Verificar uso de memória
free -h

# Reiniciar aplicação
pm2 restart school-routes-api
```

#### 3. **Logs de Erro**

```bash
# Ver logs da aplicação
pm2 logs school-routes-api

# Ver logs do sistema
journalctl -u school-routes-api -f
```

---

_Documentação atualizada em: Janeiro 2024_
_Versão: 1.0.0_
