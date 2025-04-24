module.exports = (sequelize, DataTypes) => {
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
                model: 'Escola', // Refere-se à tabela Escola
                key: 'id_escola',
            },
            onDelete: 'SET NULL',
        },
    }, {
        tableName: 'parada',
        schema: 'rotas',
        timestamps: false,
    });

    // Definindo as associações
    Parada.associate = (models) => {
        Parada.belongsTo(models.Escola, { foreignKey: 'id_escola' });

        Parada.belongsToMany(models.Rota, {
            through: models.ParadaRota,
            foreignKey: 'id_parada',
            otherKey: 'id_rota'
        });
    };

    return Parada;
};
