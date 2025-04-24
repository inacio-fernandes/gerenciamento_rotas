CREATE DATABASE gerenciamento_rotas;


-- Criando ENUMs necessários
CREATE TYPE tipo_veiculo AS ENUM ('VAN', 'CARRO', 'ONIBUS');
CREATE TYPE status_enum AS ENUM ('ATIVO', 'INATIVO');
CREATE TYPE status_rota_enum AS ENUM ('ATIVA', 'INATIVA');
CREATE TYPE dias_semana AS ENUM ('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO');
CREATE TYPE periodo_enum AS ENUM ('MANHA', 'TARDE', 'NOITE');

-- Tabela Pessoa
CREATE TABLE pessoa (
    id_pessoa SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE,
    status status_enum NOT NULL DEFAULT 'ATIVO',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Veículo
CREATE TABLE veiculo (
    id_veiculo SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    placa VARCHAR(10) UNIQUE NOT NULL,
    capacidade INT NOT NULL,
    tipo tipo_veiculo NOT NULL,
    status status_enum NOT NULL DEFAULT 'ATIVO'
);

-- Tabelas Motorista e Monitor
CREATE TABLE motorista (
    id_motorista SERIAL PRIMARY KEY,
    id_pessoa INT NOT NULL,
    cnh VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE CASCADE
);

CREATE TABLE monitor (
    id_monitor SERIAL PRIMARY KEY,
    id_pessoa INT NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE CASCADE
);

-- Tabela Escola
CREATE TABLE escola (
    id_escola SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    email VARCHAR(255)
);

-- Tabela Responsável
CREATE TABLE responsavel (
    id_responsavel SERIAL PRIMARY KEY,
    id_pessoa INT NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE CASCADE
);

-- Tabela Aluno
CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    id_pessoa INT NOT NULL,
    id_responsavel INT,
    url_documento text,
    observacao TEXT,
    status status_enum NOT NULL DEFAULT 'ATIVO',
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE CASCADE,
    FOREIGN KEY (id_responsavel) REFERENCES responsavel(id_responsavel) ON DELETE SET NULL
);

-- Tabela Parada
CREATE TABLE parada (
    id_parada SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    id_escola INT,
    FOREIGN KEY (id_escola) REFERENCES escola(id_escola) ON DELETE SET NULL
);

-- Tabela Rota
CREATE TABLE rota (
    id_rota SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    id_veiculo INT,
    id_motorista INT,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    dia_semana dias_semana NOT NULL,
    status status_rota_enum NOT NULL DEFAULT 'ATIVA',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id_veiculo) ON DELETE SET NULL,
    FOREIGN KEY (id_motorista) REFERENCES motorista(id_motorista) ON DELETE SET NULL
);

-- Tabela Parada_Rota
CREATE TABLE parada_rota (
    id_parada_rota SERIAL PRIMARY KEY,
    id_rota INT NOT NULL,
    id_parada INT NOT NULL,
    horario TIME NOT NULL,
    ordem INT NOT NULL,
    FOREIGN KEY (id_rota) REFERENCES rota(id_rota) ON DELETE CASCADE,
    FOREIGN KEY (id_parada) REFERENCES parada(id_parada) ON DELETE CASCADE
);

-- Tabela Aluno_Escola
CREATE TABLE aluno_escola (
    id_aluno INT NOT NULL,
    id_escola INT NOT NULL,
    matricula VARCHAR(20) NOT NULL,
    status status_enum NOT NULL DEFAULT 'ATIVO',
    curso VARCHAR(255) NOT NULL,
    periodo periodo_enum NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_aluno, id_escola),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) ON DELETE CASCADE,
    FOREIGN KEY (id_escola) REFERENCES escola(id_escola) ON DELETE CASCADE
);

-- Tabela Aluno_Rota
CREATE TABLE aluno_rota (
    id_aluno INT NOT NULL,
    id_rota INT NOT NULL,
    local_embarque INT NOT NULL,
    local_desembarque INT NOT NULL,
    PRIMARY KEY (id_aluno, id_rota),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) ON DELETE CASCADE,
    FOREIGN KEY (id_rota) REFERENCES rota(id_rota) ON DELETE CASCADE,
    FOREIGN KEY (local_embarque) REFERENCES parada_rota(id_parada_rota) ON DELETE CASCADE,
    FOREIGN KEY (local_desembarque) REFERENCES parada_rota(id_parada_rota) ON DELETE CASCADE
);

-- Tabela Monitor_Rota
CREATE TABLE monitor_rota (
    id_monitor INT NOT NULL,
    id_rota INT NOT NULL,
    PRIMARY KEY (id_monitor, id_rota),
    FOREIGN KEY (id_monitor) REFERENCES monitor(id_monitor) ON DELETE CASCADE,
    FOREIGN KEY (id_rota) REFERENCES rota(id_rota) ON DELETE CASCADE
);

CREATE TABLE ocorrencia (
    id_ocorrencia SERIAL PRIMARY KEY,
    id_rota INT NOT NULL,
    id_aluno INT,
    id_monitor INT,
    id_motorista INT,
    descricao TEXT NOT NULL,
    data_ocorrencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(50), -- Ex: 'FALTA', 'COMPORTAMENTO', 'ATRASO', 'OUTRO'
    
    FOREIGN KEY (id_rota) REFERENCES rota(id_rota) ON DELETE CASCADE,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) ON DELETE SET NULL,
    FOREIGN KEY (id_monitor) REFERENCES monitor(id_monitor) ON DELETE SET NULL,
    FOREIGN KEY (id_motorista) REFERENCES motorista(id_motorista) ON DELETE SET NULL
);

CREATE TABLE users (
    id_usuario SERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) CHECK (TIPO IN ('ADMIN', 'MOTORISTA', 'MONITOR', 'RESPONSAVEL', 'ALUNO', 'ESCOLA')) NOT NULL,
    referencia_id INT, -- referência ao id_pessoa(adm) ou id_motorista ou id_monitor ou id_responsavel ou id_aluno ou id escola
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

