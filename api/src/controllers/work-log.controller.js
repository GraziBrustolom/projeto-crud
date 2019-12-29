const WorkLog = require('../models/work-log.model');


exports.create = async (req, res) => {
    const novoWorkLog = new WorkLog(req.body);
    const worklog = await novoWorkLog.save();
    res.status(201).send({ message: 'WorkLog criado com sucesso!', worklog });
  };
  
 
  exports.findAll = async (req, res) => {
    const worklogs = await WorkLog.find({});
    res.status(200).send(worklogs);
  };
  
 
  exports.findById = async (req, res) => {
    const worklog = await WorkLog.findById(req.params.id);
    res.status(200).send(worklog);
  };
  
 
  exports.update = async (req, res) => {

    if (!req.body.nome || !req.body.codigo || !req.body.empresa || !req.body.tempo ) {
      return res.status(400).send({ message: 'Os campos não podem ser vazios.' });
    }
  
    const worklog = await WorkLog.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send({ message: 'Worklog atualizado com sucesso'});
  };
  

  exports.delete = async (req, res) => {
    const worklog = await WorkLog.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: 'Worklog excluído com sucesso!', worklog });
  };
