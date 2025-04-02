const mongoose = require('mongoose');

const VeiculoSchema = new mongoose.Schema({
    id_veiculo: {
        type: Number,
        unique: true,
        required: true,
    },
    placa: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10,
    },
    capacidade: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        enum: ['van', 'carro', 'ônibus'],
        required: true,
    },
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        default: 'ativo',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Veiculo', VeiculoSchema);