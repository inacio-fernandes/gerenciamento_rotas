module.exports = (sequelize, DataTypes) => {
    const ParadaRota = sequelize.define("ParadaRota", {
        id_parada_rota: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_rota: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Rota', // Refere-se à tabela Rota
                key: 'id_rota',
            },
            onDelete: 'CASCADE',
        },
        id_parada: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Parada', // Refere-se à tabela Parada
                key: 'id_parada',
            },
            onDelete: 'CASCADE',
        },
        horario: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        ordem: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'parada_rota',
        schema: 'rotas',
        timestamps: false,
    });

    // Definindo as associações
    ParadaRota.associate = (models) => {
        ParadaRota.belongsTo(models.Rota, { foreignKey: 'id_rota', as: 'rota' });
        ParadaRota.belongsTo(models.Parada, { foreignKey: 'id_parada', as: 'parada' });
    };

    return ParadaRota;
};
