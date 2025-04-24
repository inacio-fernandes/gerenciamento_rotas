module.exports = (sequelize, DataTypes) => {
    const Rota = sequelize.define("Rota", {
        id_rota: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        id_veiculo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Veiculo',  // Certifique-se de que o modelo "Veiculo" está sendo importado
                key: 'id_veiculo',
            },
            onDelete: "SET NULL",
        },
        id_motorista: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Motorista',  // Certifique-se de que o modelo "Motorista" está sendo importado
                key: 'id_motorista',
            },
            onDelete: "SET NULL",
        },
        hora_inicio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        hora_fim: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        dia_semana: {
            type: DataTypes.ENUM("segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("ativa", "inativa"),
            allowNull: false,
            defaultValue: "ativa",
        },
        data_criacao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        data_atualizacao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: "rota",
        schema: 'rotas', // Nome do schema
        timestamps: false,
    });

    Rota.associate = (models) => {
        Rota.belongsTo(models.Veiculo, { foreignKey: 'id_veiculo' });
        Rota.belongsTo(models.Motorista, { foreignKey: 'id_motorista' });

        Rota.belongsToMany(models.Parada, {
            through: models.ParadaRota,
            foreignKey: 'id_rota',
            otherKey: 'id_parada'
        });

        Rota.belongsToMany(models.Aluno, {
            through: models.AlunoRota,
            foreignKey: 'id_rota',
            otherKey: 'id_aluno'
        });

        Rota.belongsToMany(models.Monitor, {
            through: models.MonitorRota,
            foreignKey: 'id_rota',
            otherKey: 'id_monitor'
        });
    };

    return Rota;
};
