const mongoose = require('mongoose')
const ProductosModel = require('../../products/crud.productos')

const { Schema } = mongoose

const carritoCollection = "carrito";

const carritoSchema = new Schema({
    timestamp: { type: Date, default: Date.now},
    productos: [{ProductosModel: {type: String}}]
});

const CarritosModel = mongoose.model(carritoCollection, carritoSchema);

module.exports= CarritosModel



