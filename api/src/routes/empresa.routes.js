const express = require('express');
const router = express.Router();

const empresaController = require('../controllers/empresa.controller');

router.post('/empresas', empresaController.create);

router.get('/empresas', empresaController.findAll);

router.get('/empresas/:id', empresaController.findById);

router.put('/empresas/:id', empresaController.update);

router.delete('/empresas/:id', empresaController.delete);

module.exports = router;