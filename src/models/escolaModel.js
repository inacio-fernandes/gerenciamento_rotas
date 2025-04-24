module.exports = (sequelize, DataTypes) => {
    const Escola = sequelize.define('Escola', {
        id_escola: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true, // Garante que o nome não seja vazio
            },
        },
        endereco: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true, // Garante que o endereço não seja vazio
            },
        },
        telefone: {
            type: DataTypes.STRING(20), // Ajuste no comprimento do telefone
            allowNull: false,
            validate: {
                notEmpty: true, // Garante que o telefone não seja vazio
                is: /^\(?\d{2}\)?\s?9?\d{4}-\d{4}$/, // Exemplo de regex para telefone (ajuste conforme necessário)
            },
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true, // Garante que seja um email válido
            },
        },
        status: {
            type: DataTypes.ENUM('ATIVO', 'INATIVO'),
            defaultValue: 'ATIVO',
        },
    }, {
        tableName: 'escola',
        schema: 'rotas',
        timestamps: true, // Para manter as datas de criação e atualização
        createdAt: 'data_criacao', // Usar nomes customizados para timestamps
        updatedAt: 'data_atualizacao',
    });

    // Definindo associações (caso haja a necessidade de associar escolas a alunos, por exemplo)
    Escola.associate = (models) => {
        // Uma escola tem várias paradas
        Escola.hasMany(models.Parada, { foreignKey: 'id_escola' });

        // Definindo a associação de muitos para muitos entre Aluno e Escola
        Escola.belongsToMany(models.Aluno, {
            through: models.AlunoEscola,
            foreignKey: 'id_escola',
            otherKey: 'id_aluno',
            as: 'alunos', // Alias para uso nas consultas
        });
    };

    return Escola;
};
