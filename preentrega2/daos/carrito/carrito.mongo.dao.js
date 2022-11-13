const Mongocntr = require("../../containers/mongo.cntr");
const mongoose = require('mongoose')
const { Schema } = mongoose

const collection = "carrito";
const carritoSchema = new Schema({
    timestamp: { type: Date, default: Date.now},
    productos: [{type: String}]
});

class carritoMongoDao extends Mongocntr {
    
    constructor(){
        super(collection, carritoSchema)
    }
}

module.exports = carritoMongoDao