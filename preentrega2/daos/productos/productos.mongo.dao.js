const Mongocntr = require("../../containers/mongo.cntr");
const mongoose = require('mongoose')
const { Schema } = mongoose

const collection = "productos";
const productosSchema = new Schema({
    timestamp: { type: Date, default: Date.now},
    name: {type: String},
    descrp: {type: String},
    cod: {type: Number},
    img: {type: String},
    price: {type: Number},
    stock: {type: Number}
});

class productosMongoDao extends Mongocntr {
    
    constructor(){
        super(collection, productosSchema)
    }
}

module.exports = productosMongoDao