const fs = require('fs');

class Contenedor {

    constructor(nombre) {
        this.nombre = nombre;
    }

    async addProduct(producto) {
        try {
            producto.id = await this.getNextId()
            let contenido = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            contenidoJson.push(producto);
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(contenidoJson));
        } catch (error) {
            console.log(error);
        }
    }

    async getNextId() {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let ultimoId = contenidoJson[contenidoJson.length - 1].id;
            return ultimoId + 1;
        } catch (error) {
            console.log(error);
        }
    }

    async save(info) {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let lastIndex = contenidoJson.length - 1;
            let lastId = contenidoJson[lastIndex].id;
            info.id = lastId + 1;
            let id = info.id;
            contenidoJson.push(info);
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(contenidoJson));

            return id;

        }
        catch (error) { }

        return id
    }

    async saveMessage(info) {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            contenidoJson.push(info);
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(contenidoJson));

            return contenidoJson;

        }
        catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let contenidoFiltrado
            contenidoJson.forEach(element => {
                if (element.id == id) {
                    contenidoFiltrado = element;
                }
            });
            return contenidoFiltrado;
        }
        catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            return contenidoJson;
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            let contenidoFiltrado
            contenidoJson.forEach(element => {
                if (element.id == id) {
                    contenidoFiltrado = element;
                }
            });
            contenidoJson.splice(contenidoJson.indexOf(contenidoFiltrado), 1);
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(contenidoJson));
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let contenidoJson = JSON.parse(contenido);
            contenidoJson = [];
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(contenidoJson));

        }
        catch (error) {
            console.log(error);
        }
    }
}

// let contenedor = new Contenedor('./productos.json');

/* let contenidoNuevo = {
    "id": 4,
    "nombre": 'comedor',
    "precio": 1000
} */

// contenedor.addProduct().then(() => console.log('producto agregado'));   

/* contenedor.save().then(rtapromise => {
    console.log(rtapromise);
})  */

/* contenedor.getById(1).then( result => {
    console.log(result);
}
) */

// contenedor.getAll().then(result => result).then(result => console.log(result));


/* contenedor.deleteById(2).then( result => {
    console.log(result);
}) */

/* contenedor.deleteAll().then( result => {
    console.log(result);
}
) */

module.exports = Contenedor;


