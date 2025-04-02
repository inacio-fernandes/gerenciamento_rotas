const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Pessoa = require("./pessoaModel");

const Responsavel = sequelize.define("Responsavel", {
    id_responsavel: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_pessoa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pessoa, 
            key: "id_pessoa",
        },
        onDelete: "CASCADE",
    },
}, {
    tableName: "responsavel",
    timestamps: false,
});

Responsavel.belongsTo(Pessoa, { foreignKey: "id_pessoa", as: "pessoa" });

Pessoa.hasOne(Responsavel, { foreignKey: "id_pessoa", as: "responsavel" }); 


module.exports = Responsavel;
