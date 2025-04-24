module.exports = (sequelize, DataTypes) => {
    const Motorista = sequelize.define("Motorista", {
        id_motorista: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_pessoa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Pessoa',  // Refere-se à tabela Pessoa
                key: 'id_pessoa',
            },
        },
        cnh: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        tableName: "motorista",
        schema: 'rotas', // Assuming you have a schema named 'rotas'
        timestamps: false,
    });

    // Associações
    Motorista.associate = (models) => {
        Motorista.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa' });
        Motorista.hasMany(models.Rota, { foreignKey: 'id_motorista' });
    };

    return Motorista;
};
