const { DataTypes } = require("sequelize");
const sequelize = require("../config/sql");
const Pessoa = require("./pessoaModel");

const Motorista = sequelize.define("Motorista", {
    id_motorista: {
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
    cnh: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: "motorista",
    timestamps: false,
});

// Associação: Aluno pertence a uma Pessoa (Dados do aluno)
Motorista.belongsTo(Pessoa, { as: "dadosMotorista", foreignKey: "id_pessoa" });


module.exports = Motorista;
