import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import ApiProductosMock from '../../api/productos.js'
const apiProductos = new ApiProductosMock()

import path from 'path'

const homeWebRouter = new Router()

homeWebRouter.get('/home', webAuth, async (req, res, next) => {
    try{
        const getAll = await apiProductos.listarAll()
        res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre, listaProductos: getAll })
    }catch(err){
        next(err)
    }
})

export default homeWebRouter