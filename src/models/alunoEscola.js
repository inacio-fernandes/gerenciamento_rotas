const { DataTypes } = require("sequelize");
const sequelize = require("../config/sql");
const Aluno = require("./alunoModel");
const Escola = require("./escolaModel");

const AlunoEscola = sequelize.define("AlunoEscola", {
    id_aluno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aluno,
            key: "id_aluno",
        },
        onDelete: "CASCADE",
    },
    id_escola: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Escola,
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
}, {
    tableName: "aluno_escola",
    timestamps: false,
    primaryKey: false, 
});


AlunoEscola.removeAttribute("id"); 
AlunoEscola.primaryKeyAttributes = ["id_aluno", "id_escola"];

// Definição das associações
Aluno.belongsToMany(Escola, { through: AlunoEscola, foreignKey: "id_aluno", as: "escolas" });
Escola.belongsToMany(Aluno, { through: AlunoEscola, foreignKey: "id_escola", as: "alunos" });

module.exports = AlunoEscola;
