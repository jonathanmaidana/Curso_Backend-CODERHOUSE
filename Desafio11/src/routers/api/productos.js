const Router = require('express')
const ApiProductosMock  = require('../../api/productos.js')

const routerApiProductos = Router()
const apiProductos = new ApiProductosMock

routerApiProductos.get('/api/productos-test', (req, res, next) => {
    try{
        const fakerProducto =  apiProductos.popular(req.query.cant)
        console.log(fakerProducto)
        res.json({listaProductos: fakerProducto})
    }catch(err){
        next(err)
    }
})

module.exports = routerApiProductos