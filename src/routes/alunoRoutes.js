const express = require("express");
const router = express.Router();
const {
    listarAlunos,
    listarAlunoPorId,
    inserirAluno,
    atualizarAluno,
    excluirAluno
} = require("../controllers/alunoController");

router.get("/", listarAlunos);             // Listar todos os alunos
router.get("/:id", listarAlunoPorId);    // Buscar aluno por CPF
router.post("/", inserirAluno);            // Criar um novo aluno
router.put("/:id", atualizarAluno);        // Atualizar um aluno existente
router.delete("/:id", excluirAluno);       // Excluir um aluno

module.exports = router;
