module.exports = (sequelize, DataTypes) => {
    const Responsavel = sequelize.define('Responsavel', {
        id_responsavel: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pessoa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Pessoa', // Referência ao modelo Pessoa
                key: 'id_pessoa',
            },
        },
    }, {
        tableName: 'responsavel',
        schema: 'rotas',
        timestamps: false,
    });

    // Definindo as associações manualmente
    Responsavel.associate = (models) => {
        Responsavel.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa', as: 'pessoa' });
        Responsavel.hasMany(models.Aluno, { foreignKey: 'id_responsavel', as: 'alunos' });

        // Se houver outras associações, adicione-as aqui
    };

    return Responsavel;
};
