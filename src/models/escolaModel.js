const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

const Eescola = sequelize.define('Escola', {
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
    timestamps: false, // Set to true if you have createdAt/updatedAt columns
});

module.exports = Parada;