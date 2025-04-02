const Aluno = require("../models/alunoModel");
const Pessoa = require("../models/pessoaModel");

const aluno_attributes = ["nome", "telefone", "cpf", "endereco", "data_nascimento", "status", "data_cadastro"]
const responsavel_attributes = ["nome", "telefone", "cpf", "endereco", "data_nascimento", "status", "data_cadastro"]

const pessoa = {
    include: [
        {
            model: Pessoa,
            as: "aluno", 
            attributes: aluno_attributes
        },
        {
            model: Pessoa,
            as: "dadosResponsavel", 
            attributes: responsavel_attributes
        }
    ]
}


const listarAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.findAll(pessoa);
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar alunos", detalhes: error.message });
    }
};

//listar aluno de cpf especifico
const listarAlunoPorCpf = async (req, res) => {
    const { cpf } = req.params;

    try {
        const aluno = await Aluno.findOne(banana);

        if (!aluno) {
            return res.status(404).json({ message: "Aluno não encontrado" });
        }

        res.json(aluno);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar aluno", detalhes: error.message });
    }
};

//inserir aluno
const inserirAluno = async (req, res) => {
    const { id_pessoa, id_responsavel, url_documento } = req.body;

    try {
        const novoAluno = await Aluno.create({
            id_pessoa,
            id_responsavel,
            url_documento
        });

        res.status(201).json(novoAluno);
    } catch (error) {
        res.status(500).json({ error: "Erro ao inserir aluno", detalhes: error.message });
    }
};

module.exports = { listarAlunos, listarAlunoPorCpf, inserirAluno };
