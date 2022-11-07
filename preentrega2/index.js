const express = require('express');
const apiRoutes = require('./routers/app.routes.js');
const mongoose = require('mongoose')
//const Contenedor = require('../manejo_de_archivos/contenedor')

const app = express();

// const PORT = process.env.PORT || 8080;

const DATABASE = "products";
const URI = `mongodb+srv://charriszu:Manuel003202@products.d8cydn4.mongodb.net/${DATABASE}`;


(async ()=>{
  try{
    await mongoose.connect(URI);
    console.log("conectado a la base de datos");
  }
  catch(error){
    console.log(error.message)
  }
})();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);

// Server
const connectedServer = app.listen(URI, ()=> {
  console.log(`Server is up and running on port ${URI}`);
});

connectedServer.on('error', error => console.log(`Server error: ${error}`));
