
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');

const { User, Aluno, Responsavel, Escola, Motorista, Monitor } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET || 'teste';


exports.login = async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const user = await User.findOne({ where: { usuario } });
        if (!user) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        const senhaValida = senha == user.senha;
        if (!senhaValida) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        // Gera o token JWT com o usuário
        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                usuario: user.usuario,
                tipo: user.tipo
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Envia o token em um cookie httpOnly
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 dia
        });

        return res.status(200).json({ message: 'Login realizado com sucesso.', user });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};


exports.signup = async (req, res) => {
    const { usuario, senha } = req.body;
    let { tipo } = req.body;

    tipo = tipo ? tipo.toUpperCase() : '';

    try {
        const userExists = await User.findOne({ where: { usuario } });
        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        let id_referencia = null;

        if (['ALUNO', 'RESPONSAVEL', 'MOTORISTA', 'MONITOR'].includes(tipo)) {
            const pessoa = await require('../models').Pessoa.findOne({ where: { cpf: usuario } });
            if (pessoa) {
                if (tipo === 'ALUNO') {
                    const aluno = await Aluno.findOne({ where: { id_pessoa: pessoa.id_pessoa } });
                    if (aluno) id_referencia = aluno.id_aluno;
                } else if (tipo === 'RESPONSAVEL') {
                    const responsavel = await Responsavel.findOne({ where: { id_pessoa: pessoa.id_pessoa } });
                    if (responsavel) id_referencia = responsavel.id_responsavel;
                } else if (tipo === 'MOTORISTA') {
                    const motorista = await Motorista.findOne({ where: { id_pessoa: pessoa.id_pessoa } });
                    if (motorista) id_referencia = motorista.id_motorista;
                } else if (tipo === 'MONITOR') {
                    const monitor = await Monitor.findOne({ where: { id_pessoa: pessoa.id_pessoa } });
                    if (monitor) id_referencia = monitor.id_monitor;
                }
            }
        } else if (tipo === 'ESCOLA') {
            const escola = await Escola.findOne({ where: { cnpj: usuario } });
            if (escola) id_referencia = escola.id_escola;
        }

        if (!id_referencia) {
            return res.status(400).json({ message: 'Referência não encontrada para o tipo informado.' });
        }

        const newUser = await User.create({
            usuario,
            senha: senha,
            tipo,
            id_referencia
        });

        const token = jwt.sign(
            { id_usuario: newUser.id_usuario, usuario: newUser.usuario, tipo: newUser.tipo },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(201).json({ message: 'Usuário criado com sucesso.', user: newUser, token });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
};
