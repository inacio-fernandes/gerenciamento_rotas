const express = require("express");
const { handleError } = require("../src/middlewares/errorHandler");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const alunoRoutes = require("./routes/alunoRoutes");
const loginRoutes = require("./routes/loginRoutes");
const pessoaRoutes = require("./routes/pessoaRoutes");
const motoristaRoutes = require("./routes/motoristaRoutes");
const responsavelRoutes = require("./routes/responsavelRoutes");

app.use(express.json()); // <- necessário pra ler req.body

app.get("/", (req, res) => {
    res.send("Olá, Express!");
});

app.use("/login", loginRoutes);
app.use("/alunos", alunoRoutes);
app.use("/pessoas", pessoaRoutes);
app.use("/motoristas", motoristaRoutes);


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

    