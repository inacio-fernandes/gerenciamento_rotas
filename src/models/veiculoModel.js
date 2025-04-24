module.exports = (sequelize, DataTypes) => {
    const Veiculo = sequelize.define('Veiculo', {
        id_veiculo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        placa: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        capacidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM('van', 'carro', 'ônibus'),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('ativo', 'inativo'),
            allowNull: false,
            defaultValue: 'ativo',
        },
    }, {
        timestamps: true,
        tableName: 'veiculo',
        schema: 'rotas', // Ajuste o nome do esquema conforme necessário
    });

    Veiculo.associate = (models) => {
        Veiculo.hasMany(models.Rota, { foreignKey: 'id_veiculo' });
    };

    return Veiculo;
};
