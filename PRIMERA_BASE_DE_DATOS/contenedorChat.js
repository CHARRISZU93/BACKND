const knex = require("knex");

class Contenedor {
  constructor(config) {
    this.knex = knex(config);
  }

  async addProduct(producto) {
    try {
      await this.knex("chat").insert(producto);
    } catch (error) {
      console.log(error);
    } finally {
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
      await this.knex("chat").insert(producto);
      let indexSelected = await this.knex.from("chat").select("id");
      let ultimoId = indexSelected[indexSelected.length - 1].id;
      let chatId = ultimoId;

      return chatId;
    } catch (error) {
    } finally {
    }
  }

  async saveMessage(info) {
    try {
      await this.knex("chat").insert(info);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async getById(id) {
    try {
      let data = await this.knex
        .from("chat")
        .select("id", "autor", "fyh","texto");
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
    }
  }

  async getAll() {
    try {
      let data = await this.knex("chat").select(
        "id",
        "autor",
        "fyh",
        "texto"
      );
      return data;
    } catch (error) {
      console.log("error::::::::", error);
    } finally {
    }
  }

  async deleteById(id) {
    try {
      let data = await this.knex
        .from("chat")
        .select("id", "autor", "fyh","texto");
      let contenidoFiltrado;
      data.forEach((chat) => {
        if (chat.id == id) {
          contenidoFiltrado = chat;
        }
      });
      await this.knex.from("chat").where("id", "=", id).del();
      console.log("elemento eliminado");
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async deleteAll() {
    try {
      await this.knex.from("chat").del();
    } catch (error) {
      console.log(error);
    } finally {
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
