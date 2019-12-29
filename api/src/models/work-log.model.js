
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const worklogSchema = new Schema({

    nome: {type: String, required: true, maxlength: 20},
    codigo: {type: String, required: true, maxlength: 20},
    empresa: {type: String, required: true, maxlength: 20},
    tempo: {type: String, required: true, maxlength: 50} 
},{
  timestamps: true,
  collection: 'Worklogs'
});

module.exports = mongoose.model('WorkLog', worklogSchema);