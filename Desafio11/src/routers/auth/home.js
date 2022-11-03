const  Router  = require('express')
const  {webAuth}  = require('../../auth/index.js')

const ApiProductosMock = require('../../api/productos.js')
const apiProductos = new ApiProductosMock()

const path = require ('path')

const homeWebRouter = new Router()

homeWebRouter.get('/home', webAuth, (req, res, next) => {
    try{
        const getAll = apiProductos.listarAll()
        const email = req.user.email
        res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { email: email, listaProductos: getAll })
    }catch(err){
        next(err)
    }
})

module.exports = homeWebRouter