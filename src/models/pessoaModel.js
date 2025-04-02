const { DataTypes } = require("sequelize");
const sequelize = require("../config/sql");

const Pessoa = sequelize.define("Pessoa", {
    id_pessoa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("ativo", "inativo"),
        allowNull: false,
        defaultValue: "ativo",
    },
    data_cadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "pessoa",
    timestamps: false,
});

module.exports = Pessoa;
