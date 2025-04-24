const express = require('express');
const motoristaController = require('../controllers/motoristaController');


const router = express.Router();

// List all motoristas
router.get('/', motoristaController.listarMotoristas);

// Get a single motorista by ID
router.get('/:id', motoristaController.obterMotorista);

// Create a new motorista
router.post('/', motoristaController.criarMotorista);

// Update an existing motorista
router.put('/:id', motoristaController.atualizarMotorista);

// Delete a motorista
router.delete('/:id', motoristaController.excluirMotorista);

module.exports = router;