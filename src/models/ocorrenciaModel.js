module.exports = (sequelize, DataTypes) => {
    const Ocorrencia = sequelize.define('Ocorrencia', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'ocorrencias',
        schema: 'rotas', // Ajuste o nome do schema se necessário
        timestamps: true, // Habilita os campos createdAt e updatedAt
    });

    // Definindo as associações
    Ocorrencia.associate = (models) => {
        Ocorrencia.belongsTo(models.Rota, { foreignKey: 'id_rota' });
        Ocorrencia.belongsTo(models.Aluno, { foreignKey: 'id_aluno' });
        Ocorrencia.belongsTo(models.Monitor, { foreignKey: 'id_monitor' });
        Ocorrencia.belongsTo(models.Motorista, { foreignKey: 'id_motorista' });
    };

    return Ocorrencia;
};
