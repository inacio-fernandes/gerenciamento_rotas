module.exports = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define('Pessoa', {
        id_pessoa: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        endereco: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true,
        },
        data_nascimento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('ATIVO', 'INATIVO'),
            allowNull: false,
            defaultValue: 'ATIVO',
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
        tableName: 'pessoa',
        schema: 'rotas',
        timestamps: false, // Desativa os timestamps automáticos
    });

    // Associações
    Pessoa.associate = (models) => {
        // Supondo que as associações sejam de 1:1 entre Pessoa e as outras entidades
        Pessoa.hasOne(models.Aluno, { foreignKey: 'id_pessoa', as: 'aluno' });
        Pessoa.hasOne(models.Responsavel, { foreignKey: 'id_pessoa', as: 'responsavel' });
        Pessoa.hasOne(models.Monitor, { foreignKey: 'id_pessoa', as: 'monitor' });
        Pessoa.hasOne(models.Motorista, { foreignKey: 'id_pessoa', as: 'motorista' });
    };

    return Pessoa;
};
