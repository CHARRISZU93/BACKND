const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

class Mongocntr {
  constructor(collection, schema) {
    this.model = mongoose(collection, schema);
  }

  static async connect() {
    await mongoose.connect(dbConfig.mongodb.URI);
  }

  static async disconnect() {
    await mongoose.disconnect();
  }

  async getAll() {
    const productos = await this.model.find().lean();
    return productos;
  }

  async getById(id) {
    const productosId = await this.model.findOne({ _id: id });
    if (!productosId) {
      const mensaje = "id no existe";
      throw console.log(mensaje);
    }
    return productosId;
  }

  async save(item) {
    const nuevoProducto = new this.model(item);
    return await nuevoProducto.save();
  }

  async update(id, item) {
    const updateProducto = await this.model.updateOne(
      { _id: id },
      { $set: { ...item } }
    );
    if (!updateProducto.matchedCount) {
      const mensaje = "id no existe";
      throw console.log(mensaje);
    }
  }

  async delete(id) {
    return await this.model.deleteOne({ _id });
  }
}

module.exports = Mongocntr;