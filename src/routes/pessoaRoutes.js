const express = require('express');
const pessoaController = require('../controllers/pessoaController');

const router = express.Router();

// Rota para listar todas as pessoas
router.get('/', pessoaController.listarPessoas);
router.post('/listarPessoasNome', pessoaController.listarPessoasNome);


module.exports = router;