const express = require('express');
const apiRoutes = require('./routers/app.routes.js');
//const Contenedor = require('../manejo_de_archivos/contenedor');
const envConfig = require('./env/config');
const Mongocntr = require('./containers/mongo.cntr');
const Firebasecntr = require('./containers/firebase.cntr')

const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);

const DATASOURCE_ENV ={
  mongo: Mongocntr,
  firebase: Firebasecntr
}

const DATASOURCE = DATASOURCE_ENV(envConfig.DATASOURCE)

// Server
const PORT = process.env.PORT || 8080;
const connectedServer = app.listen(PORT, ()=> {
  DATASOURCE.connectedServer().then(()=>{
    console.log(`Server is up and running on port ${PORT}`);
  })
});

connectedServer.on('error', error => console.log(`Server error: ${error}`));
