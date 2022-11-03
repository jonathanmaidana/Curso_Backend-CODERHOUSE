import { Router } from 'express'
import ApiProductosMock from '../../api/productos.js'

const routerApiProductos = Router()
const apiProductos = new ApiProductosMock

routerApiProductos.get('/api/productos-test', async (req, res, next) => {
    try{
        const fakerProducto =  await apiProductos.popular(req.query.cant)
        console.log(fakerProducto)
        res.json({
            listaProductos: fakerProducto
        })
    }catch(err){
        next(err)
    }
})

export default routerApiProductos