# 🚌 Sistema de Gerenciamento de Rotas Escolares

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21+-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)](https://www.postgresql.org/)
[![License: Commercial](https://img.shields.io/badge/License-Commercial-red.svg)](LICENSE)

> **API RESTful** para gerenciamento completo de rotas escolares municipais, desenvolvida para a Prefeitura de Extrema - MG.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso da API](#uso-da-api)
- [Endpoints](#endpoints)
- [Autenticação](#autenticação)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Equipe](#equipe)

## 🎯 Sobre o Projeto

O **Sistema de Gerenciamento de Rotas Escolares** é uma solução completa desenvolvida para informatizar e otimizar o processo de gestão de transporte escolar municipal. O projeto foi desenvolvido como parte da disciplina **PROJETO DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO 1 (BRAOTI1)** do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo - Campus Bragança Paulista.

### 🏛️ Contexto Institucional

- **Instituição**: Instituto Federal de Educação, Ciência e Tecnologia de São Paulo
- **Campus**: Bragança Paulista
- **Curso**: Tecnologia em Análise e Desenvolvimento de Sistemas
- **Disciplina**: BRAOTI1 - Projeto de Tecnologia da Informação e Comunicação 1
- **Professor**: André Luis Maciel Leme

### 🎯 Objetivos

- Substituir o sistema manual baseado em planilhas eletrônicas
- Reduzir erros humanos no processo de gestão
- Otimizar o tempo dos funcionários da prefeitura
- Facilitar consultas e atualizações de dados
- Disponibilizar informações de forma automática para alunos e monitores
- Melhorar o controle por parte dos secretários municipais

## ✨ Funcionalidades

### 🔐 Autenticação e Autorização

- Sistema de login seguro com JWT
- Controle de acesso por perfis de usuário
- Proteção de rotas sensíveis

### 👥 Gestão de Pessoas

- **Alunos**: Cadastro completo com dados pessoais e escolares
- **Responsáveis**: Gestão de responsáveis legais
- **Motoristas**: Cadastro e controle de motoristas
- **Monitores**: Gestão de monitores de transporte
- **Funcionários**: Administração de usuários do sistema

### 🏫 Gestão Escolar

- **Escolas**: Cadastro de instituições de ensino
- **Matrículas**: Controle de matrículas aluno-escola
- **Paradas**: Gestão de pontos de parada

### 🚌 Gestão de Transporte

- **Veículos**: Cadastro e controle de frota
- **Rotas**: Criação e gerenciamento de rotas
- **Alocação**: Distribuição de alunos por rotas
- **Monitoramento**: Controle de monitores por rota

### 📊 Relatórios e Dashboards

- Estatísticas de alunos matriculados
- Relatórios de rotas ativas
- Indicadores de performance
- Dashboards administrativos

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para banco de dados
- **PostgreSQL** - Banco de dados principal
- **MySQL** - Banco de dados alternativo
- **JWT** - Autenticação e autorização
- **Nodemailer** - Envio de e-mails
- **Faker.js** - Geração de dados de teste

### Desenvolvimento

- **Nodemon** - Reinicialização automática em desenvolvimento
- **Husky** - Git hooks
- **Commitlint** - Padronização de commits
- **Prettier** - Formatação de código

### Infraestrutura

- **AWS S3** - Armazenamento de arquivos
- **Dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
school_route_manager_api/
├── src/
│   ├── config/           # Configurações do sistema
│   │   ├── s3.js        # Configuração AWS S3
│   │   └── sql.js       # Configuração banco de dados
│   ├── controllers/      # Controladores da aplicação
│   │   ├── alunoController.js
│   │   ├── escolaController.js
│   │   ├── loginController.js
│   │   ├── motoristaController.js
│   │   ├── monitorController.js
│   │   ├── rotaController.js
│   │   └── ...
│   ├── middlewares/      # Middlewares customizados
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/          # Modelos do banco de dados
│   │   ├── alunoModel.js
│   │   ├── escolaModel.js
│   │   ├── rotaModel.js
│   │   └── ...
│   ├── routes/          # Rotas da API
│   │   ├── alunoRoutes.js
│   │   ├── loginRoutes.js
│   │   ├── rotaRoutes.js
│   │   └── ...
│   ├── shared/          # Recursos compartilhados
│   │   └── constants/
│   ├── utils/           # Utilitários
│   │   ├── authHelper.js
│   │   ├── helpers.js
│   │   └── validation.js
│   └── server.js        # Arquivo principal do servidor
├── package.json
├── commitlint.config.js
└── README.md
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- PostgreSQL 13+ ou MySQL 8+
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/school_route_manager_api.git
cd school_route_manager_api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações do Banco de Dados
DATABASE_URL=postgresql://usuario:senha@localhost:5432/school_routes
DATABASE_SSL=false
DB_LOGGING=true

# Configurações JWT
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRES_IN=24h

# Configurações AWS S3 (opcional)
AWS_ACCESS_KEY_ID=sua_access_key
AWS_SECRET_ACCESS_KEY=sua_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=seu_bucket

# Configurações de E-mail (opcional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_app
```

### 4. Configure o banco de dados

```bash
# Para PostgreSQL
createdb school_routes

# Para MySQL
mysql -u root -p
CREATE DATABASE school_routes;
```

### 5. Execute as migrações

```bash
# As tabelas serão criadas automaticamente pelo Sequelize
npm start
```

### 6. Inicie o servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📡 Uso da API

### Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos, inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

### Exemplo de Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@prefeitura.extrema.mg.gov.br",
    "senha": "senha123"
  }'
```

## 🔗 Endpoints

### Autenticação

- `POST /login` - Login de usuário

### Alunos

- `GET /alunos` - Listar todos os alunos
- `GET /alunos/:id` - Buscar aluno por ID
- `POST /alunos` - Criar novo aluno
- `PUT /alunos/:id` - Atualizar aluno
- `DELETE /alunos/:id` - Remover aluno

### Escolas

- `GET /escolas` - Listar todas as escolas
- `POST /escolas` - Criar nova escola
- `PUT /escolas/:id` - Atualizar escola

### Rotas

- `GET /rotas` - Listar todas as rotas
- `POST /rotas` - Criar nova rota
- `PUT /rotas/:id` - Atualizar rota

### Motoristas

- `GET /motoristas` - Listar todos os motoristas
- `POST /motoristas` - Criar novo motorista

### Veículos

- `GET /veiculos` - Listar todos os veículos
- `POST /veiculos` - Criar novo veículo

### Monitores

- `GET /monitores` - Listar todos os monitores
- `POST /monitores` - Criar novo monitor

## 🔐 Autenticação

O sistema implementa autenticação baseada em JWT com os seguintes recursos:

- **Login**: Autenticação com email e senha
- **Autorização**: Controle de acesso por perfis de usuário
- **Middleware**: Proteção automática de rotas sensíveis
- **Refresh Token**: Renovação automática de tokens

### Perfis de Usuário

1. **Administrador**: Acesso total ao sistema
2. **Secretário**: Gestão de alunos, rotas e relatórios
3. **Monitor**: Visualização de rotas e alunos
4. **Aluno**: Acesso limitado às próprias informações

## 🤝 Contribuição

### Padrões de Commit

Este projeto utiliza [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona ou corrige testes
chore: tarefas de manutenção
```

### Processo de Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a **Licença Comercial Proprietária**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

**⚠️ Importante**: Este software é proprietário e comercial. A redistribuição, modificação ou uso comercial sem autorização expressa é proibida.

## 👥 Equipe

### Desenvolvedores

| Nome                              | Matrícula | Função                   | Email                              |
| --------------------------------- | --------- | ------------------------ | ---------------------------------- |
| **Arthur de Faria**               | BP3038289 | Desenvolvedor Backend    | arthur.faria@aluno.ifsp.edu.br     |
| **Inácio Fernandes Santana**      | BP3039307 | Desenvolvedor Full-Stack | inacio.fernandes@aluno.ifsp.edu.br |
| **João Paulo Pereira Costa**      | BP3039331 | Desenvolvedor Frontend   | paulo.costa1@aluno.ifsp.edu.br     |
| **Lybio Croton de Moraes Junior** | BP303934X | Desenvolvedor Backend    | j.lybio@aluno.ifsp.edu.br          |

### Orientação

- **Professor**: André Luis Maciel Leme
- **Instituição**: IFSP - Campus Bragança Paulista
- **Curso**: Tecnologia em Análise e Desenvolvimento de Sistemas
- **Endereço**: Av. Maj. Fernando Valle, 2013 - São Miguel, Bragança Paulista - SP, 12903-000

## 📞 Contato

Para questões acadêmicas ou técnicas:

- **Email da Equipe**:

    - arthur.faria@aluno.ifsp.edu.br
    - inacio.fernandes@aluno.ifsp.edu.br
    - paulo.costa1@aluno.ifsp.edu.br
    - j.lybio@aluno.ifsp.edu.br

- **Endereço**: Av. Maj. Fernando Valle, 2013 - São Miguel, Bragança Paulista - SP, 12903-000

- **Instituição**: Instituto Federal de Educação, Ciência e Tecnologia de São Paulo - Campus Bragança Paulista

---

**Desenvolvido com ❤️ pela equipe BRAOTI1 - IFSP Bragança Paulista**

_Este projeto foi desenvolvido como parte da disciplina BRAOTI1 do curso de Tecnologia em Análise e Desenvolvimento de Sistemas do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo - Campus Bragança Paulista._
