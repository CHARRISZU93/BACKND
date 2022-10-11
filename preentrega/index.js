const express = require('express');
const apiRoutes = require('./routers/app.routes.js');
const Contenedor = require('../manejo_de_archivos/contenedor')

const app = express();

const PORT = process.env.PORT || 8080;

const admin = false

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use( (req, res, next) => {
  req.headers["isAdmin"] = admin
  next()
})


// Routes
app.use('/api', apiRoutes);

// Server
const connectedServer = app.listen(PORT, ()=> {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', error => console.log(`Server error: ${error}`));
