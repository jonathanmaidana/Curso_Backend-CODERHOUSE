const  Router  = require('express')
const  webAuth  = require('../../middlewares/isLogin.js')

const ApiProductosMock = require('../../api/productos.js')
const apiProductos = new ApiProductosMock()

const path = require ('path')

const homeWebRouter = new Router()

homeWebRouter.get('/home', webAuth, (req, res, next) => {
    try{
        if(!req.usuario){
            res.status(404).json({
                success: false,
                msg: 'You are not authorized'
            })
        }else{
            const email = req.usuario.email
            const getAll = apiProductos.listarAll()
            res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { listaProductos: getAll, email: email })
        }

        
    }catch(err){
        next(err)
    }
})

module.exports = homeWebRouter