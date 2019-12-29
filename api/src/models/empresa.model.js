
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const empresaSchema = new Schema({

    nome: {type: String, required: true, maxlength: 20},
    codigo: {type: String, required: true, maxlength: 20},

},{
  timestamps: true,
  collection: 'Empresas'
});

module.exports = mongoose.model('Empresa', empresaSchema);