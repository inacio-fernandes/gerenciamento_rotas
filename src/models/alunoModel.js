module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define('Aluno', {
        id_aluno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pessoa: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_responsavel: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        url_documento: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("ATIVO", "INATIVO"),
            defaultValue: "ATIVO",
        },
    }, {
        tableName: 'aluno',
        schema: 'rotas',
        timestamps: false,
    });

    Aluno.associate = (models) => {
        Aluno.belongsTo(models.Pessoa, {
            foreignKey: 'id_pessoa',
            as: 'pessoa'
        });

        Aluno.belongsTo(models.Responsavel, {
            foreignKey: 'id_responsavel',
            as: 'responsavel'
        });

        Aluno.belongsToMany(models.Escola, {
            through: models.AlunoEscola,
            foreignKey: 'id_aluno',
            otherKey: 'id_escola',
            as: 'escolas'
        });

        Aluno.belongsToMany(models.Rota, {
            through: models.AlunoRota,
            foreignKey: 'id_aluno',
            otherKey: 'id_rota',
            as: 'rotas'
        });

        Aluno.hasMany(models.Ocorrencia, {
            foreignKey: 'id_aluno',
            as: 'ocorrencias'
        });
    };

    return Aluno;
};
