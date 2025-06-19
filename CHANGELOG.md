# 📝 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-01-XX

### 🎉 Lançamento Inicial

#### ✨ Adicionado

- **Sistema de Autenticação**

    - Login com JWT
    - Controle de acesso por perfis
    - Middleware de autenticação
    - Refresh tokens

- **Gestão de Alunos**

    - CRUD completo de alunos
    - Validação de dados
    - Relacionamento com responsáveis
    - Matrículas em escolas

- **Gestão de Escolas**

    - Cadastro de instituições
    - Informações de contato
    - Relacionamento com alunos

- **Gestão de Rotas**

    - Criação e edição de rotas
    - Associação com motoristas e veículos
    - Controle de horários
    - Status de rotas

- **Gestão de Motoristas**

    - Cadastro de motoristas
    - Validação de documentos
    - Associação com rotas

- **Gestão de Veículos**

    - Cadastro da frota
    - Informações técnicas
    - Status de operação

- **Gestão de Monitores**

    - Cadastro de monitores
    - Associação com rotas
    - Controle de presença

- **Gestão de Paradas**

    - Cadastro de pontos de parada
    - Coordenadas geográficas
    - Horários de parada

- **API RESTful**

    - Endpoints padronizados
    - Respostas JSON estruturadas
    - Tratamento de erros
    - Validação de entrada

- **Banco de Dados**

    - Modelo relacional completo
    - Migrações automáticas
    - Relacionamentos entre entidades
    - Índices otimizados

- **Segurança**

    - Hash de senhas com bcrypt
    - Proteção contra SQL injection
    - Validação de entrada
    - Headers de segurança

- **Infraestrutura**
    - Configuração de ambiente
    - Logs estruturados
    - Tratamento de erros
    - Middleware de validação

#### 🛠️ Tecnologias

- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL, Sequelize ORM
- **Autenticação**: JWT, bcrypt
- **Validação**: Express-validator
- **Logs**: Winston
- **Desenvolvimento**: Nodemon, Husky, Commitlint

#### 📋 Funcionalidades Principais

- Sistema completo de gerenciamento de rotas escolares
- Interface administrativa via API
- Controle de acesso por perfis
- Relatórios e dashboards
- Integração com serviços externos (AWS S3, Email)

#### 🔧 Configuração

- Arquivo de configuração de ambiente
- Scripts de instalação
- Documentação completa
- Exemplos de uso

---

## [0.9.0] - 2024-01-XX

### 🚧 Versão Beta

#### ✨ Adicionado

- Estrutura inicial do projeto
- Configuração básica do Express
- Primeiros endpoints de teste
- Configuração do banco de dados

#### 🔧 Melhorado

- Estrutura de pastas organizada
- Configuração de desenvolvimento

#### 🐛 Corrigido

- Problemas de configuração inicial

---

## [0.8.0] - 2024-01-XX

### 🚧 Versão Alpha

#### ✨ Adicionado

- Conceito inicial do projeto
- Levantamento de requisitos
- Modelagem de dados básica

---

## Tipos de Mudanças

- **✨ Adicionado** para novas funcionalidades
- **🔧 Melhorado** para mudanças em funcionalidades existentes
- **🐛 Corrigido** para correções de bugs
- **🚀 Performance** para melhorias de performance
- **🔒 Segurança** para correções de segurança
- **📚 Documentação** para mudanças na documentação
- **🧪 Testes** para adição ou correção de testes
- **⚙️ Configuração** para mudanças de configuração
- **🗑️ Removido** para funcionalidades removidas

---

## Como Contribuir

1. Faça suas mudanças em uma branch separada
2. Use commits semânticos (feat:, fix:, docs:, etc.)
3. Atualize este changelog com suas mudanças
4. Abra um Pull Request

### Exemplo de Commit

```
feat: adiciona sistema de notificações por email

- Implementa envio de emails para responsáveis
- Adiciona templates de email
- Configura serviço SMTP

Closes #123
```

---

## Links Úteis

- [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
- [Versionamento Semântico](https://semver.org/lang/pt-BR/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

_Este changelog é mantido pela equipe BRAOTI1 - IFSP Bragança Paulista_
