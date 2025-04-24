module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM("ADMIN", "MOTORISTA", "MONITOR", "RESPONSAVEL", "ALUNO", "ESCOLA"),
            allowNull: false,
        },
        id_referencia: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        data_criacao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        data_atualizacao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        },
    }, {
        tableName: "users",
        schema: "rotas",
        timestamps: false,
    });

    User.associate = (models) => {
        // Dependendo do tipo de usuário, o id_referencia vai se referir a diferentes entidades
        User.belongsTo(models.Motorista, {
            foreignKey: "id_referencia",
            constraints: false, // Impede que o Sequelize crie chaves estrangeiras automáticas
            scope: {
                tipo: "MOTORISTA",
            },
            as: "motorista",
        });

        User.belongsTo(models.Monitor, {
            foreignKey: "id_referencia",
            constraints: false,
            scope: {
                tipo: "MONITOR",
            },
            as: "monitor",
        });

        User.belongsTo(models.Responsavel, {
            foreignKey: "id_referencia",
            constraints: false,
            scope: {
                tipo: "RESPONSAVEL",
            },
            as: "responsavel",
        });

        User.belongsTo(models.Aluno, {
            foreignKey: "id_referencia",
            constraints: false,
            scope: {
                tipo: "ALUNO",
            },
            as: "aluno",
        });

        User.belongsTo(models.Escola, {
            foreignKey: "id_referencia",
            constraints: false,
            scope: {
                tipo: "ESCOLA",
            },
            as: "escola",
        });
    };

    return User;
};
