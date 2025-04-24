const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/sql'); // sua configuração do Sequelize
const basename = path.basename(__filename);

const db = {};
const sequelize = config; // já deve exportar a instância no sql.js

// Lê todos os arquivos da pasta models e importa
fs
    .readdirSync(__dirname)
    .filter(file =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js'
    )
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        const modelInstance = model(sequelize, Sequelize.DataTypes);
        db[modelInstance.name] = modelInstance;
    });

// Associa os modelos
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db); // Aqui que os models "enxergam" os outros
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
