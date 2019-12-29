const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

const cosmosDB = require('./config/databaseCosmosDb');

mongoose.Promise = global.Promise;


mongoose.connect(cosmosDB.cosmosdb.url, { useNewUrlParser: true }).then(() =>{

    console.log("Base conectada com sucesso.");
}, (err) =>{

    console.log(`Erro ao conectar com a base de dados.. : ${err}`);
    process.exit();
});


const userRoute = require('./routes/user.routes');

const empresaRoute = require('./routes/empresa.routes');

const worklogRoute = require('./routes/work-log.routes');

const indexRoute = require('./routes/index');


app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+josn' }));
app.use(morgan('dev'));
app.use(cors());


app.use('/api/', userRoute);

app.use('/api/', empresaRoute);

app.use('/api/', worklogRoute);

app.use('/api/', indexRoute);

module.exports = app;