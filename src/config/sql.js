const { Sequelize } = require('sequelize');
//handle error
const { handleError } = require('../middlewares/errorHandler');
const dotenv = require('dotenv');
// Configuração da conexão com o banco de dados
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: process.env.DB_LOGGING === 'true', 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, 
        },
    },
});

// Testando a conexão
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        handleError('Não foi possível conectar ao banco de dados:', error);
    }
})();

module.exports = sequelize;