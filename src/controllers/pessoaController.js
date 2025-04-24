const express = require('express');
const { Pessoa } = require('../models/index.js');
const { Op } = require('sequelize'); // Importando o operador Op do Sequelize

// Controller para listar todas as pessoas
const listarPessoas = async (req, res) => {

    try {
        const pessoas = await Pessoa.findAll(); // Busca todas as pessoas no banco de dados
        res.status(200).json(pessoas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar pessoas', erro: error.message });
    }
};

// Controller para listar pessoas com base em uma busca por nome ou CPF
const listarPessoasNome = async (req, res) => {
    const { search } = req.body; // Captura o parâmetro de pesquisa da query string
    console.log(search); // Log para verificar o valor de search
    try {
        const pessoas = await Pessoa.findAll({
            where: {
                [Op.or]: [
                    { nome: { [Op.like]: `%${search}%` } }, // Busca por nome
                    { cpf: { [Op.like]: `%${search}%` } }, // Busca por CPF
                ],
            },
        });
        res.status(200).json(pessoas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar pessoas', erro: error.message });
    }
};

// Exporta as funções de controlador
module.exports = { listarPessoas, listarPessoasNome };
