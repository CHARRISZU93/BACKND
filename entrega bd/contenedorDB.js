const dbConfig = require("./db/config");
const knex = require("knex")(dbConfig.mariaDB);

class Contenedor {
  constructor(config) {
    this.dbConfig = dbConfig;
  }

  async addProduct(producto) {
    try {
      await knex("chat").insert(producto);
    } catch (error) {
      console.log(error);
    } finally {
      knex.destroy();
    }
  }

  /* async getNextId() {
        try {
            let contenido = await knex('chat').select(id)
            let contenidoJson = JSON.parse(contenido);
            let ultimoId = contenidoJson[contenidoJson.length - 1].id;
            return ultimoId + 1;
        } catch (error) {
            console.log(error);
        } finally{
            knex.destroy();
        }
    } */

  async save(producto) {
    try {
      await knex("chat").insert(producto);
      let indexSelected = await knex.from("chat").select("id");
      let ultimoId = indexSelected[indexSelected.length - 1].id;
      let chatId = ultimoId;

      return chatId;
    } catch (error) {
    } finally {
      knex.destroy();
    }
  }

  async saveMessage(info) {
    try {
      await knex("chat").insert(info);
    } catch (error) {
      console.log(error);
    } finally {
      knex.destroy();
    }
  }

  async getById(id) {
    try {
      let data = await knex
        .from("chat")
        .select("id", "username", "inputMessage");
      let contenidoFiltrado;
      data.forEach((chat) => {
        if (chat.id == id) {
          contenidoFiltrado = chat;
        }
      });
      return contenidoFiltrado;
    } catch (error) {
      console.log(error);
    } finally {
      knex.destroy();
    }
  }

  async getAll() {
    try {
      let data = await knex
        .from("chat")
        .select("id", "username", "inputMessage");
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      knex.destroy();
    }
  }

  async deleteById(id) {
    try {
      let data = await knex
        .from("chat")
        .select("id", "username", "inputMessage");
      let contenidoFiltrado;
      data.forEach((chat) => {
        if (chat.id == id) {
          contenidoFiltrado = chat;
        }
      });
      await knex.from("chat").where("id", "=", id).del();
      console.log("elemento eliminado");
    } catch (error) {
      console.log(error);
    } finally {
      /* knex.destroy(); */
    }
  }

  async deleteAll() {
    try {
      await knex.from("chat").del();
    } catch (error) {
      console.log(error);
    } finally {
      knex.destroy();
    }
  }
}

/* let contenedor = new Contenedor("./productos.json");

let contenidoNuevo = {
  username: "comedor",
  inputMessage: "hola",
};

contenedor.addProduct().then(() => console.log('producto agregado'));

contenedor.save().then((rtapromise) => {
  console.log(rtapromise);
});

contenedor.getById(70).then((result) => {
  console.log(result);
});

contenedor.getAll().then(result => result).then(result => console.log(result));

contenedor.deleteById().then( result => {
    console.log(result);
})

contenedor.deleteAll().then((result) => {
  console.log(result);
}); */

module.exports = Contenedor;
