const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database'); 

const Veiculo = sequelize.define('Veiculo', {
    id_veiculo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    placa: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('van', 'carro', 'ônibus'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'ativo',
    },
}, {
    timestamps: true,
    tableName: 'veiculo',
});

module.exports = Veiculo;
