const express = require('express');
const router = express.Router();

const worklogController = require('../controllers/work-log.controller');

router.post('/worklogs', worklogController.create);

router.get('/worklogs', worklogController.findAll);

router.get('/worklogs/:id', worklogController.findById);

router.put('/worklogs/:id', worklogController.update);

router.delete('/worklogs/:id', worklogController.delete);

module.exports = router;