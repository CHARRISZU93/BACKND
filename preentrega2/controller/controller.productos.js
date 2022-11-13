const { productosDao } = require("../daos/app.daos");

const ProductosDao = new productosDao

class productosController {

    async getProducts(req, res, next){
        try{
            const productos = await ProductosDao.getAll()
            res.status().json(productos)
        }
        catch(error){
            next(error);
        }
    }

    async getProductsById(req, res, next){
        const {id} = req.params;
        try{
            const productosId = await ProductosDao.getById(id)
            res.status().json(productosId)
        }
        catch(error){
            next(error);
        }
    }

    async saveProducts(req, res, next){
        try{
            const productos = await ProductosDao.save(id)
            res.status().json(productos)
        }
        catch(error){
            next(error);
        }
    }

    async updateProducts(req, res, next){
        try{
            const productosUpt = await ProductosDao.update(id)
            res.status().json(productosUpt)
        }
        catch(error){
            next(error);
        }
    }

    async deleteProducts(req, res, next){
        const {id} = req.params;
        try{
            const productosDel = await ProductosDao.delete(id)
            res.status().json(productosDel)
        }
        catch(error){
            next(error);
        }
    }
}

module.exports = new productosController()