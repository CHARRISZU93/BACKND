const envConfig = require("../env/config");

let productosDao;
let carritoDao;

switch (envConfig.DATASOURCE) {
  case "mongo":
    productosDao = require("./productos/productos.mongo.dao");
    carritoDao = require("./carrito/carrito.mongo.dao");
    break;
  case "firebase":
    productosDao = require("./productos/productos.firebase.dao");
    carritoDao = require("./carrito/carrito.firebase.dao");
  default:
    throw new Error("no existe esta base");
}

module.exports = {
    productosDao,
    carritoDao,
}
