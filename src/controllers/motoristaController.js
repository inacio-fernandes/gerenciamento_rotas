const Motorista = require('../models/motoristaModel');
const Pessoa = require('../models/pessoaModel');



const listarMotoristas = async (_, res) => {
    try {
        const motoristas = await Motorista.findAll({
            include: {
                model: Pessoa,
                as: 'dadosMotorista',
                attributes: ['nome', 'cpf', 'data_nascimento'],
            },
        });
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar motoristas' });
    }
}

const obterMotorista = async (req, res) => {
    try {
        const motorista = await Motorista.findById(req.params.id);
        if (!motorista) {
            return res.status(404).json({ error: 'Motorista não encontrado' });
        }
        res.status(200).json(motorista);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter motorista' });
    }
};

const criarMotorista = async (req, res) => {
    try {
        const novoMotorista = new Motorista(req.body);
        const motorista = await novoMotorista.save();
        res.status(201).json(motorista);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar motorista' });
    }
};

const atualizarMotorista = async (req, res) => {
    try {
        const motorista = await Motorista.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!motorista) {
            return res.status(404).json({ error: 'Motorista não encontrado' });
        }
        res.status(200).json(motorista);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar motorista' });
    }
};

const excluirMotorista = async (req, res) => {
    try {
        const motorista = await Motorista.findByIdAndDelete(req.params.id);
        if (!motorista) {
            return res.status(404).json({ error: 'Motorista não encontrado' });
        }
        res.status(200).json({ message: 'Motorista excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir motorista' });
    }
};

module.exports = {
    listarMotoristas,
    obterMotorista,
    criarMotorista,
    atualizarMotorista,
    excluirMotorista,
};

// Removed redundant export block