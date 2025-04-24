module.exports = (sequelize, DataTypes) => {
    const AlunoRota = sequelize.define("AlunoRota", {
        id_aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Aluno",
                key: "id_aluno",
            },
            onDelete: "CASCADE",
            primaryKey: true,
        },
        id_rota: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Rota",
                key: "id_rota",
            },
            onDelete: "CASCADE",
            primaryKey: true,
        },
        local_embarque: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "ParadaRota",
                key: "id_parada_rota",
            },
            onDelete: "CASCADE",
        },
        local_desembarque: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "ParadaRota",
                key: "id_parada_rota",
            },
            onDelete: "CASCADE",
        },
        frequencia: {
            type: DataTypes.ENUM("segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"),
            allowNull: false,
        },
    }, {
        tableName: "aluno_rota",
        schema: "rotas",
        timestamps: false,
    });

    AlunoRota.associate = (models) => {
        // Definindo associações N:N
        AlunoRota.belongsTo(models.Aluno, {
            foreignKey: "id_aluno",
            as: "aluno",
        });

        AlunoRota.belongsTo(models.Rota, {
            foreignKey: "id_rota",
            as: "rota",
        });

        AlunoRota.belongsTo(models.ParadaRota, {
            foreignKey: "local_embarque",
            as: "paradaEmbarque",
        });

        AlunoRota.belongsTo(models.ParadaRota, {
            foreignKey: "local_desembarque",
            as: "paradaDesembarque",
        });
    };

    return AlunoRota;
};
