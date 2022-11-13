const { carritoDao } = require("../daos/app.daos");

const CarritoDao = new carritoDao

class carritoController {

    async getProducts(req, res, next){
        try{
            const productos = await CarritoDao.getAll()
            res.status().json(productos)
        }
        catch(error){
            next(error);
        }
    }

    async getProductsById(req, res, next){
        const {id} = req.params;
        try{
            const productosId = await CarritoDao.getById(id)
            res.status().json(productosId)
        }
        catch(error){
            next(error);
        }
    }

    async saveProducts(req, res, next){
        try{
            const productos = await CarritoDao.save(id)
            res.status().json(productos)
        }
        catch(error){
            next(error);
        }
    }

    async updateProducts(req, res, next){
        try{
            const productosUpt = await CarritoDao.update(id)
            res.status().json(productosUpt)
        }
        catch(error){
            next(error);
        }
    }

    async deleteProducts(req, res, next){
        const {id} = req.params;
        try{
            const productosDel = await CarritoDao.delete(id)
            res.status().json(productosDel)
        }
        catch(error){
            next(error);
        }
    }
}

module.exports = new carritoController()