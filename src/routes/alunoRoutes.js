const express = require("express");
const router = express.Router();
const { listarAlunos, listarAlunoPorCpf, inserirAluno } = require("../controllers/alunoController");

router.get("/", listarAlunos);
router.get("/:cpf", listarAlunoPorCpf);
router.get("/inserirAluno", inserirAluno);

module.exports = router;
