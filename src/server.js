const express = require("express");
const { handleError } = require("../src/middlewares/errorHandler");
const app = express();
const port = 3000;
const alunoRoutes = require("./routes/alunoRoutes");

app.get("/", (req, res) => {
    res.send("Olá, Express!");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

//rota para buscar todos os usuários
app.use("/alunos", alunoRoutes);


    