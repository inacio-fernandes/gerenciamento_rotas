const { Sequelize } = require('sequelize');
//handle error
const { handleError } = require('../middlewares/errorHandler');
const dotenv = require('dotenv');
// Configuração da conexão com o banco de dados
dotenv.config();

const databaseUrl = process.env.DATABASE_URL ;

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: process.env.DB_LOGGING === 'true', 
    dialectOptions: {
        ssl: process.env.DATABASE_SSL === 'true' ? {
            require: true,
            rejectUnauthorized: false, 
        } : false,
    },
});

// Testando a conexão
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);

    }
})();

module.exports = sequelize;