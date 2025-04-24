const { Aluno, Pessoa, Responsavel } = require("../models");
const { Op } = require("sequelize");
const { handleError } = require("../middlewares/errorHandler");

/**
 * Lista todos os alunos cadastrados
 */
const listarAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.findAll({
            include: [
                {
                    model: Pessoa,
                    as: "pessoa"
                },
                {
                    model: Responsavel,
                    as: "responsavel",
                    include: [
                        {
                            model: Pessoa,
                            as: "pessoa" // <-- usa o alias certo
                        }
                    ]
                }
            ],
        });
        res.json(alunos);
    } catch (error) {
        console.error("Erro ao listar alunos:", error);
        res.status(500).json({ error: "Erro ao listar alunos", detalhes: error.message });
    }
};


/**
 * Busca um aluno pelo CPF da pessoa associada
 */
const listarAlunoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca a pessoa pelo CPF
        const pessoa = await Pessoa.findOne({ where: { id } });
        if (!pessoa) {
            return res.status(404).json({ error: "Nenhum aluno encontrado com este CPF" });
        }
        // Busca o aluno associado a essa pessoa
        const aluno = await Aluno.findOne({
            where: { id_pessoa: pessoa.id_pessoa },
            include: [
                { model: Pessoa, as: "pessoa" },
                { model: Pessoa, as: "responsavel_pessoa" },
            ],
        });
        

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }

        res.json(aluno);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar aluno por CPF", detalhes: error.message });
    }
};

/**
 * Cria um novo aluno
 */
const inserirAluno = async (req, res) => {
    try {
        const { cpf, nome, email, telefone, cpf_responsavel, url_documento, status } = req.body;

        // Buscar ou criar a pessoa pelo CPF
        let pessoa = await Pessoa.findOne({ where: { cpf } });

        if (!pessoa) {
            pessoa = await Pessoa.create({ cpf, nome, email, telefone });
        }

        let id_responsavel = null;
        if (cpf_responsavel) {
            let responsavel = await Pessoa.findOne({ where: { cpf: cpf_responsavel } });

            if (!responsavel) {
                return res.status(400).json({ error: "Responsável não encontrado para este CPF" });
            }

            id_responsavel = responsavel.id_pessoa;
        }

        // Criar aluno associado à pessoa
        const novoAluno = await Aluno.create({
            id_pessoa: pessoa.id_pessoa,
            id_responsavel,
            url_documento,
            status: status || "ativo",
        });

        res.status(201).json({ message: "Aluno cadastrado com sucesso", aluno: novoAluno });
    } catch (error) {
        res.status(500).json({ error: "Erro ao inserir aluno", detalhes: error.message });
    }
};


/**
 * Atualiza um aluno existente
 */
const atualizarAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_responsavel, url_documento, status } = req.body;

        // Busca o aluno pelo ID
        const aluno = await Aluno.findByPk(id);
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }

        // Se houver responsável, verifica se ele existe
        if (id_responsavel) {
            const responsavel = await Pessoa.findByPk(id_responsavel);
            if (!responsavel) {
                return res.status(400).json({ error: "Responsável não encontrado" });
            }
        }

        // Atualiza o aluno
        await aluno.update({
            id_responsavel: id_responsavel || aluno.id_responsavel,
            url_documento: url_documento || aluno.url_documento,
            status: status || aluno.status,
        });

        res.json({ message: "Aluno atualizado com sucesso", aluno });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar aluno", detalhes: error.message });
    }
};

/**
 * Exclui um aluno pelo ID
 */
const excluirAluno = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca o aluno pelo ID
        const aluno = await Aluno.findByPk(id);
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }

        // Exclui o aluno
        await aluno.destroy();

        res.json({ message: "Aluno excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir aluno", detalhes: error.message });
    }
};

module.exports = { listarAlunos, listarAlunoPorId, inserirAluno, atualizarAluno, excluirAluno };
