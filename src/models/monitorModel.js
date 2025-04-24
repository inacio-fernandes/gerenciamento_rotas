module.exports = (sequelize, DataTypes) => {
    const Monitor = sequelize.define('Monitor', {
        id_monitor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pessoa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Pessoa', // Definindo a referência correta à tabela Pessoa
                key: 'id_pessoa',
            },
        },
    }, {
        tableName: 'monitor',
        schema: 'rotas',
        timestamps: false, // Desativado, pois você já define manualmente o controle de datas
    });

    Monitor.associate = (models) => {
        // Associação de um monitor com uma pessoa
        Monitor.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa' });

        // Associação de muitos para muitos entre Monitor e Rota
        Monitor.belongsToMany(models.Rota, {
            through: models.MonitorRota, // Tabela intermediária
            foreignKey: 'id_monitor',
            otherKey: 'id_rota',
            as: 'rotas', // Alias para facilitar o uso em consultas
        });
    };

    return Monitor;
};
