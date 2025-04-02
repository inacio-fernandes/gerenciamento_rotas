const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Escola = sequelize.define('Escola', {
    id_escola: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'escola',
    timestamps: false, 
});

module.exports = Escola;