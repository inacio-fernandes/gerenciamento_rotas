module.exports = (sequelize, DataTypes) => {
    const AlunoEscola = sequelize.define("AlunoEscola", {
        id_aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Aluno", // Sequelize se encarrega de mapear a relação
                key: "id_aluno",
            },
            onDelete: "CASCADE",
        },
        id_escola: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Escola",
                key: "id_escola",
            },
            onDelete: "CASCADE",
        },
        matricula: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("ativo", "inativo"),
            allowNull: false,
            defaultValue: "ativo",
        },
        curso: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        periodo: {
            type: DataTypes.ENUM("manhã", "tarde", "noite"),
            allowNull: false,
        },
        data_criacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        data_atualizacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: "aluno_escola",
        timestamps: false,
        primaryKey: false,
    });

    // Definindo chave primária composta
    AlunoEscola.removeAttribute("id");
    AlunoEscola.primaryKeyAttributes = ["id_aluno", "id_escola"];

    AlunoEscola.associate = (models) => {
        // Associações
        AlunoEscola.belongsTo(models.Aluno, {
            foreignKey: "id_aluno",
            as: "aluno",
        });

        AlunoEscola.belongsTo(models.Escola, {
            foreignKey: "id_escola",
            as: "escola",
        });
    };

    return AlunoEscola;
};
