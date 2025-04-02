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
            model: Pessoa, 
            key: "id_pessoa",
        },
    },
    id_responsavel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Pessoa, 
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
Aluno.belongsTo(Pessoa, { as: "pessoa", foreignKey: "id_pessoa" });

// Associação: Aluno pertence a uma Pessoa (Responsável)
Aluno.belongsTo(Pessoa, { as: "responsavel", foreignKey: "id_responsavel" });

module.exports = Aluno;
