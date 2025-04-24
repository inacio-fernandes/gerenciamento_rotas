module.exports = (sequelize, DataTypes) => {
    const MonitorRota = sequelize.define('MonitorRota', {
        id_monitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Monitor', // Refere-se à tabela Monitor
                key: 'id_monitor',
            },
            onDelete: 'CASCADE',
            primaryKey: true,
        },
        id_rota: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Rota', // Refere-se à tabela Rota
                key: 'id_rota',
            },
            onDelete: 'CASCADE',
            primaryKey: true,
        },
    }, {
        tableName: 'monitor_rota',
        schema: 'rotas',
        timestamps: false, // Sem campos automáticos de criação e atualização
    });

    // Associações de muitos para muitos
    MonitorRota.associate = (models) => {
        MonitorRota.belongsTo(models.Monitor, { foreignKey: 'id_monitor', as: 'monitor' });
        MonitorRota.belongsTo(models.Rota, { foreignKey: 'id_rota', as: 'rota' });
    };

    return MonitorRota;
};
