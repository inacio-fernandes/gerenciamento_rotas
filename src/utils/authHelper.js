const Aluno = require('../models/alunoModel');
const Motorista = require('../models/motoristaModel');
const Monitor = require('../models/monitorModel');
const Responsavel = require('../models/responsavelModel');
const Escola = require('../models/escolaModel');
const Pessoa = require('../models/pessoaModel');

async function getDocumentoPorTipo(user) {
    switch (user.tipo) {
        case 'ALUNO':
            if (user.id_referencia) {

                const aluno = await Aluno.findByPk(user.id_referencia, {
                    include: { model: Pessoa, as: 'aluno' }  // Usando o alias correto 'aluno'
                });

                
                return aluno?.aluno?.cpf || null;  // Acessando a Pessoa através do alias 'aluno'
            }
            break;

        case 'MONITOR':
            if (user.id_monitor) {
                const monitor = await Monitor.findByPk(user.id_monitor, {
                    include: { model: Pessoa, as: 'pessoa' }
                });
                return monitor?.pessoa?.cpf || null;
            }
            break;

        case 'MOTORISTA':
            if (user.id_motorista) {
                const motorista = await Motorista.findByPk(user.id_motorista, {
                    include: { model: Pessoa, as: 'pessoa' }
                });
                return motorista?.pessoa?.cpf || null;
            }
            break;

        case 'RESPONSAVEL':
            if (user.id_responsavel) {
                const responsavel = await Responsavel.findByPk(user.id_responsavel, {
                    include: { model: Pessoa, as: 'pessoa' }
                });
                return responsavel?.pessoa?.cpf || null;
            }
            break;

        case 'ESCOLA':
            if (user.id_escola) {
                const escola = await Escola.findByPk(user.id_escola);
                return escola?.cnpj || null;
            }
            break;
    }

    return null;
}

module.exports = { getDocumentoPorTipo };
