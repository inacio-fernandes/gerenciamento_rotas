CREATE DATABASE gerenciamento_rotas;
USE gerenciamento_rotas;

-- Drop tables if they exist
CREATE TABLE pessoa (
    id_pessoa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    cpf VARCHAR(11) NOT NULL,
    data_nascimento DATE,
    status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE veiculo (
    id_veiculo INT PRIMARY KEY AUTO_INCREMENT,
    placa VARCHAR(10) UNIQUE NOT NULL,
    capacidade INT NOT NULL,
    tipo ENUM('van', 'carro', 'ônibus') NOT NULL,
    status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo'
);

CREATE TABLE motorista (
    id_motorista INT PRIMARY KEY AUTO_INCREMENT,
    id_pessoa INT NOT NULL,
    cnh VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE CASCADE
);

CREATE TABLE monitor (
    id_monitor INT PRIMARY KEY AUTO_INCREMENT,
    id_pessoa INT NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE CASCADE
);

CREATE TABLE escola (
    id_escola INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    email VARCHAR(255)
);

CREATE TABLE responsavel (
    id_responsavel INT PRIMARY KEY AUTO_INCREMENT,
    id_pessoa INT NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE CASCADE
);

CREATE TABLE aluno (
    id_aluno INT PRIMARY KEY AUTO_INCREMENT,
    id_pessoa INT NOT NULL,
    id_responsavel INT,
    url_documento VARCHAR(255),  
    status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE CASCADE,
    FOREIGN KEY (id_responsavel) REFERENCES responsavel(id_responsavel) ON DELETE SET NULL
);

CREATE TABLE parada (
    id_parada INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    id_escola INT,  
    FOREIGN KEY (id_escola) REFERENCES escola(id_escola) ON DELETE SET NULL
);

CREATE TABLE rota (
    id_rota INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    id_veiculo INT,
    id_motorista INT,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    dias_semana ENUM('segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo') NOT NULL,
    status ENUM('ativa', 'inativa') NOT NULL DEFAULT 'ativa',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id_veiculo) ON DELETE SET NULL,
    FOREIGN KEY (id_motorista) REFERENCES motorista(id_motorista) ON DELETE SET NULL
);

CREATE TABLE parada_rota (
    id_parada_rota INT PRIMARY KEY AUTO_INCREMENT,
    id_rota INT NOT NULL,
    id_parada INT NOT NULL,
    horario TIME NOT NULL,
    ordem INT NOT NULL,  
    FOREIGN KEY (id_rota) REFERENCES rota(id_rota) ON DELETE CASCADE,
    FOREIGN KEY (id_parada) REFERENCES parada(id_parada) ON DELETE CASCADE
);

CREATE TABLE aluno_escola (
    id_aluno INT NOT NULL,
    id_escola INT NOT NULL,
    matricula VARCHAR(20) NOT NULL,
    status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    curso VARCHAR(255) NOT NULL,
    periodo ENUM('manhã', 'tarde', 'noite') NOT NULL,
    PRIMARY KEY (id_aluno, id_escola),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) ON DELETE CASCADE,
    FOREIGN KEY (id_escola) REFERENCES escola(id_escola) ON DELETE CASCADE
);

CREATE TABLE aluno_rota (
    id_aluno INT NOT NULL,
    id_rota INT NOT NULL,
    local_embarque INT NOT NULL,  
    local_desembarque INT NOT NULL,
    frequencia ENUM('segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo') NOT NULL,
    PRIMARY KEY (id_aluno, id_rota),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) ON DELETE CASCADE,
    FOREIGN KEY (id_rota) REFERENCES rota(id_rota) ON DELETE CASCADE,
    FOREIGN KEY (local_embarque) REFERENCES parada_rota(id_parada_rota) ON DELETE CASCADE,
    FOREIGN KEY (local_desembarque) REFERENCES parada_rota(id_parada_rota) ON DELETE CASCADE
);

CREATE TABLE monitor_rota (
    id_monitor INT NOT NULL,
    id_rota INT NOT NULL,
    PRIMARY KEY (id_monitor, id_rota),
    FOREIGN KEY (id_monitor) REFERENCES monitor(id_monitor) ON DELETE CASCADE,
    FOREIGN KEY (id_rota) REFERENCES rota(id_rota) ON DELETE CASCADE
);


---------------------------------------

INSERT INTO pessoa (nome, telefone, endereco, cpf, data_nascimento, status) VALUES
('João Motorista', '11999990000', 'Rua A, 123', '12345678901', '1980-05-10', 'ativo'),
('Maria Motorista', '11999990001', 'Rua B, 456', '12345678902', '1982-07-15', 'ativo'),
('Carlos Monitor', '11999990002', 'Rua C, 789', '12345678903', '1990-11-20', 'ativo'),
('Ana Monitor', '11999990003', 'Rua D, 321', '12345678904', '1995-02-25', 'ativo'),
('Pablo Aluno Escola1', '11999990004', 'Rua E, 654', '12345678905', '2010-06-30', 'ativo'),
('Lucas Aluno Escola1', '11999990005', 'Rua F, 987', '12345678906', '2011-08-21', 'ativo'),
('Mariana Aluno Escola2', '11999990006', 'Rua G, 111', '12345678907', '2009-12-12', 'ativo'),
('Fernanda Aluno Escola2', '11999990007', 'Rua H, 222', '12345678908', '2012-04-18', 'ativo'),
('Ricardo Responsável', '11999990008', 'Rua I, 333', '12345678909', '1985-09-05', 'ativo'),
('Beatriz Responsável', '11999990009', 'Rua J, 444', '12345678910', '1987-03-15', 'ativo');

INSERT INTO escola (nome, endereco, telefone, email) VALUES
('Escola Alpha', 'Av. Principal, 100', '11988887777', 'contato@escolaalpha.com.br'),
('Escola Beta', 'Av. Central, 200', '11988886666', 'contato@escolabeta.com.br');

INSERT INTO veiculo (placa, capacidade, tipo, status) VALUES
('ABC1D23', 15, 'van', 'ativo'),
('XYZ4F56', 30, 'ônibus', 'ativo');

INSERT INTO motorista (id_pessoa, cnh) VALUES
(1, '12345678900'),
(2, '12345678901');

INSERT INTO monitor (id_pessoa) VALUES
(3),
(4);

INSERT INTO responsavel (id_pessoa) VALUES
(9),
(10);

SELECT * FROM responsavel ;


INSERT INTO aluno (id_pessoa, id_responsavel, url_documento, status) VALUES
(5, 1, 'https://s3.amazonaws.com/bucket/docs/pablo.pdf', 'ativo'),
(6, null, 'https://s3.amazonaws.com/bucket/docs/lucas.pdf', 'ativo'),
(7, null, 'https://s3.amazonaws.com/bucket/docs/mariana.pdf', 'ativo'),
(8, 2, 'https://s3.amazonaws.com/bucket/docs/fernanda.pdf', 'ativo');

INSERT INTO rota (nome, id_veiculo, id_motorista, hora_inicio, hora_fim, dias_semana, status) VALUES
('Rota 1', 1, 1, '07:00:00', '08:00:00', 'segunda', 'ativa'),
('Rota 2', 1, 1, '07:30:00', '08:30:00', 'terça', 'ativa'),
('Rota 3', 2, 2, '06:45:00', '07:45:00', 'quarta', 'ativa'),
('Rota 4', 2, 2, '07:15:00', '08:15:00', 'quinta', 'ativa');
-- Inserindo Paradas
INSERT INTO parada (descricao, endereco, latitude, longitude, id_escola) VALUES
('Parada 1 - Escola A', 'Rua A, 123', -23.5505, -46.6333, 1),
('Parada 2 - Escola A', 'Rua B, 456', -23.5510, -46.6340, 1),
('Parada 3 - Escola B', 'Rua C, 789', -23.5525, -46.6355, 2),
('Parada 4 - Escola B', 'Rua D, 101', -23.5530, -46.6360, 2),
('Parada 5 - Geral', 'Av. Central, 500', -23.5545, -46.6375, NULL),
('Parada 6 - Geral', 'Av. Secundária, 600', -23.5550, -46.6380, NULL);
SELECT * FROM parada;


-- Associando Paradas às Rotas (ordem e horário)
INSERT INTO parada_rota (id_rota, id_parada, horario, ordem) VALUES
(1, 7, '07:00:00', 1),
(1, 8, '07:10:00', 2),
(2, 9, '07:15:00', 1),
(2, 10, '07:25:00', 2),
(3, 11, '07:30:00', 1),
(3, 12, '07:40:00', 2),
(4, 8, '07:50:00', 1),
(4, 10, '08:00:00', 2);


-- Associando Monitores às Rotas
INSERT INTO monitor_rota (id_monitor, id_rota) VALUES
(1, 1),
(2, 2),
(2, 3),
(1, 4);


INSERT INTO aluno_rota (id_aluno, id_rota, local_embarque, local_desembarque, frequencia) VALUES
(13, 1, 17, 18, 'segunda'),
(13, 2, 17, 18, 'terça'),
(14, 3, 19, 20, 'quarta'),
(14, 4, 21, 22, 'quinta');


----------------------------


SELECT m.id_motorista, p.nome, p.telefone, p.cpf, m.cnh 
FROM motorista m
JOIN pessoa p ON m.id_pessoa = p.id_pessoa;

SELECT a.id_aluno, p.nome AS aluno, r.id_responsavel, pr.nome AS responsavel 
FROM aluno a
LEFT JOIN pessoa p ON a.id_pessoa = p.id_pessoa
LEFT JOIN responsavel r ON a.id_responsavel = r.id_responsavel
LEFT JOIN pessoa pr ON r.id_pessoa = pr.id_pessoa;

SELECT e.nome AS escola, p.nome AS aluno, ae.matricula, ae.curso, ae.periodo
FROM aluno_escola ae
JOIN escola e ON ae.id_escola = e.id_escola
JOIN aluno a ON ae.id_aluno = a.id_aluno
JOIN pessoa p ON a.id_pessoa = p.id_pessoa;

SELECT r.id_rota, r.nome AS rota, v.placa, v.tipo AS tipo_veiculo, p.nome AS motorista, r.hora_inicio, r.hora_fim, r.dias_semana
FROM rota r
LEFT JOIN veiculo v ON r.id_veiculo = v.id_veiculo
LEFT JOIN motorista m ON r.id_motorista = m.id_motorista
LEFT JOIN pessoa p ON m.id_pessoa = p.id_pessoa;

SELECT r.nome AS rota, pr.ordem, pa.descricao AS parada, pa.endereco, pr.horario
FROM parada_rota pr
JOIN parada pa ON pr.id_parada = pa.id_parada
JOIN rota r ON pr.id_rota = r.id_rota
ORDER BY r.nome, pr.ordem;

SELECT p.nome AS aluno, r.nome AS rota, pe.descricao AS embarque, pd.descricao AS desembarque, ar.frequencia
FROM aluno_rota ar
JOIN aluno a ON ar.id_aluno = a.id_aluno
JOIN pessoa p ON a.id_pessoa = p.id_pessoa
JOIN rota r ON ar.id_rota = r.id_rota
JOIN parada pe ON ar.local_embarque = pe.id_parada
JOIN parada pd ON ar.local_desembarque = pd.id_parada;

SELECT * FROM aluno_rota;
SELECT * FROM parada;


SELECT 
    p.nome AS aluno, 
    r.nome AS rota, 
    pe.descricao AS embarque, 
    pd.descricao AS desembarque, 
    ar.frequencia
FROM aluno_rota ar
JOIN aluno a ON ar.id_aluno = a.id_aluno
JOIN pessoa p ON a.id_pessoa = p.id_pessoa
JOIN rota r ON ar.id_rota = r.id_rota
JOIN parada_rota pre ON ar.local_embarque = pre.id_parada_rota
JOIN parada pe ON pre.id_parada = pe.id_parada
JOIN parada_rota prd ON ar.local_desembarque = prd.id_parada_rota
JOIN parada pd ON prd.id_parada = pd.id_parada;

