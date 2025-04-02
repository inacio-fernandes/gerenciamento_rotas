const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Parada = sequelize.define('Parada', {
    id_parada: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
    },
    id_escola: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'escola', 
            key: 'id_escola',
        },
        onDelete: 'SET NULL',
    },
}, {
    tableName: 'parada',
    timestamps: false, 
});

module.exports = Parada;