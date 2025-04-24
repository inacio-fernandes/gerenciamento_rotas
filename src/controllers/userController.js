const User = require("../models/User");

// Controller para gerenciar usuários
const userController = {
    // Listar todos os usuários
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuários." });
        }
    },

    // Buscar um usuário por ID
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuário." });
        }
    },

    // Criar um novo usuário
    async createUser(req, res) {
        try {
            const { usuario, senha, tipo, referencia_id } = req.body;

            const newUser = await User.create({
                usuario,
                senha,
                tipo,
                referencia_id,
            });

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar usuário." });
        }
    },

    // Atualizar um usuário existente
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { usuario, senha, tipo, referencia_id } = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            await user.update({ usuario, senha, tipo, referencia_id });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar usuário." });
        }
    },

    // Deletar um usuário
    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            await user.destroy();
            res.status(200).json({ message: "Usuário deletado com sucesso." });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar usuário." });
        }
    },

    
};

module.exports = userController;