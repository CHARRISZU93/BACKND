const mongoose = require('mongoose')

const { Schema } = mongoose

const productosCollection = "productos";

const productosSchema = new Schema({
    timestamp: { type: Date, default: Date.now},
    name: {type: String},
    descrp: {type: String},
    cod: {type: Number},
    img: {type: String},
    price: {type: Number},
    stock: {type: Number}
});

const ProductosModel = mongoose.model(productosCollection, productosSchema);

module.exports= ProductosModel



