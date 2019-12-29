


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    nome: {type: String, required: true, maxlength: 20},
    cargo: {type: String, required: true, maxlength: 20},
    codigo: {type: String, required: true, maxlength: 20},
    senha: {type: String, required: true, maxlength: 20 } 
},{
  timestamps: true,
  collection: 'Users'
});

module.exports = mongoose.model('User', userSchema);