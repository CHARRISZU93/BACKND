const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const dbConfig = require("../config/db.config");

class Firebasecntr {
  constructor(collection) {
    const db = getFirestore();
    this.query = db.collection(collection);
  }

  static async connect() {
    admin.initializeApp({
      credential: admin.credential.cert(dbConfig.firebase.credentials),
    });
  }

  async getAll() {
    const refProductos = await this.query.get();
    const productos = refProductos.docs;
    return productos.map((producto) => {
      return {
        id: producto.id,
        ...producto.data(),
      };
    });
  }

  async getById(id) {
    const refProductos = this.query.get(id);
    if (!refProductos) {
      const mensaje = "id no existe";
      throw console.log(mensaje);
    }
    const productoSeleccionado = refProductos.get();
    return productoSeleccionado.data();
  }

  async save(item) {
    const refProductos = this.query.get(id);
    return await refProductos.set(item);
  }

  async update(id, item) {
    const refProductos = this.query.get(id);
    if (!refProductos) {
      const mensaje = "id no existe";
      throw console.log(mensaje);
    }
    return await refProductos.update(item);
  }

  async delete(id) {
    const refProductos = this.query.get(id);
    return await refProductos.delete;
  }
}

module.exports = Firebasecntr;
