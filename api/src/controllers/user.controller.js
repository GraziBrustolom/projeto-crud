const User = require('../models/user.model');




exports.create = async (req, res) => {
    const novoUser = new User(req.body);
    const user = await novoUser.save();
    res.status(201).send({ message: 'Usuário criado com sucesso!', user });
  };
  
 
  exports.findAll = async (req, res) => {
    const users = await User.find({});
    res.status(200).send(users);
  };
  
 
  exports.findById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  };
  
 
  exports.update = async (req, res) => {

    if (!req.body.nome || !req.body.cargo || !req.body.codigo || !req.body.senha) {
      return res.status(400).send({ message: 'Os campos não podem ser vazios.' });
    }
  
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send({ message: 'Usuário atualizado com sucesso', user });
  };
  

  exports.delete = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: 'Funcionário(a) excluído com sucesso!', user });
  };


