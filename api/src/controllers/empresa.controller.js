const Empresa = require('../models/empresa.model');


exports.create = async (req, res) => {
    const novaEmpresa = new Empresa(req.body);
    const empresa = await novaEmpresa.save();
    res.status(201).send({ message: 'Empresa criada com sucesso!', empresa });
  };
  
 
  exports.findAll = async (req, res) => {
    const empresas = await Empresa.find({});
    res.status(200).send(empresas);
  };
  
 
  exports.findById = async (req, res) => {
    const empresa = await Empresa.findById(req.params.id);
    res.status(200).send(empresa);
  };
  
 
  exports.update = async (req, res) => {

    if (!req.body.nome || !req.body.codigo ) {
      return res.status(400).send({ message: 'Os campos não podem ser vazios.' });
    }
  
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send({ message: 'Empresa atualizada com sucesso'});
  };
  

  exports.delete = async (req, res) => {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: 'Empresa excluída com sucesso!', empresa });
  };
