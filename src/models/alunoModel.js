const { DataTypes } = require("sequelize");
const sequelize = require("../config/sql");
const Pessoa = require("./pessoaModel");

const Aluno = sequelize.define("Aluno", {
    id_aluno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_pessoa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "pessoa",
            key: "id_pessoa",
        },
    },
    id_responsavel: {
        type: DataTypes.INTEGER,
        allowNull: true, // Pode ser nulo, caso o aluno não tenha responsável cadastrado
        references: {
            model: "pessoa", // Responsável também é uma pessoa
            key: "id_pessoa",
        },
    },
    url_documento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("ativo", "inativo"),
        defaultValue: "ativo",
    },
}, {
    tableName: "aluno",
    timestamps: false,
});

// Associação: Aluno pertence a uma Pessoa (Dados do aluno)
Aluno.belongsTo(Pessoa, { as: "dadosAluno", foreignKey: "id_pessoa" });

// Associação: Aluno pertence a uma Pessoa (Responsável)
Aluno.belongsTo(Pessoa, { as: "dadosResponsavel", foreignKey: "id_responsavel" });

module.exports = Aluno;
