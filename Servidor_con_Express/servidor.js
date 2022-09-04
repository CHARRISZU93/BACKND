const express = require('express');
const fs =  require('fs');
const contenedor = require('../manejo_de_archivos/contenedor.js');

const PORT = process.env.PORT || 8080;

const app = express();

const newContenedor = new contenedor('../manejo_de_archivos/productos.json');

app.get('/producto', async (req, res) => {
    const productos = await newContenedor.getAll().then(
        (productos) => {
            res.send(productos);
        }
    );
});

app.get('/productoRandom', async (req, res) => {
    const productos = await newContenedor.getAll().then(
        (productos) => {
            const random = Math.floor(Math.random() * productos.length);
            const productoRandom = productos[random];
            res.send(productoRandom);
        }
    );
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
