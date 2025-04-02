const { DataTypes } = require("sequelize");
const sequelize = require("../config/sql");
const Pessoa = require("./pessoaModel");

const Monitor = sequelize.define("Monitor", {
    id_monitor: {
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
    }
}, {
    tableName: "monitor",
    timestamps: false,
});

// Associação: Aluno pertence a uma Pessoa (Dados do aluno)
Monitor.belongsTo(Pessoa, { as: "dadosMonitor", foreignKey: "id_pessoa" });


module.exports = Monitor;
