import express from 'express'
import { Router } from 'express'
// const { Router } = require('express')

import { productosDao as productosApi } from './src/daos/index.js'

// import productosDao from './src/daos/index.js'
// const productosApi = productosDao

/* -------------------------------- PRODUCTOS ------------------------------- */
// const ProductosDaoArchivo = require('./src/daos/productos/ProductosDaoArchivo')
// const productosDaoArchivo = new ProductosDaoArchivo();

// const ProductosDaoFirebase = require('./src/daos/productos/ProductosDaoFirebase')
// const productosDaoFirebase = new ProductosDaoFirebase();

// const ProductosDaoMongoDB = require('./src/daos/productos/ProductosDaoMongoDB')
// const productosDaoMongoDB = new ProductosDaoMongoDB();

// const ProductosDaoMariaDB = require('./src/daos/productos/ProductosDaoMariaDB')
// const productosDaoMariaDB = new ProductosDaoMariaDB();

// const ProductosDaoSQLite3 = require('./src/daos/productos/ProductosDaoSQLite3')
// const productosDaoSQLite3 = new ProductosDaoSQLite3();

// /* --------------------------------- CARRITO -------------------------------- */
// const CarritoDaoArchivo = require('./src/daos/carrito/CarritoDaoArchivo')
// const carritoDaoArchivo = new CarritoDaoArchivo();

// const CarritoDaoFirebase = require('./src/daos/carrito/CarritoDaoFirebase')
// const carritoDaoFirebase = new CarritoDaoFirebase();

// const CarritoDaoMongoDB = require('./src/daos/carrito/CarritoDaoMongoDB')
// const carritoDaoMongoDB = new CarritoDaoMongoDB();

// const CarritoDaoMariaDB = require('./src/daos/carrito/CarritoDaoMariaDB')
// const carritoDaoMariaDB = new CarritoDaoMariaDB();

// const CarritoDaoSQLite3 = require('./src/daos/carrito/CarritoDaoSQLite3')
// const carritoDaoSQLite3 = new CarritoDaoSQLite3();



const routerProductos = Router()
const routerCarrito = Router()

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* -------------------------------------------------------------------------- */
/*                                  PRODUCTOS                                 */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA SQLite3                             */
/* -------------------------------------------------------------------------- */
// routerProductos.get('/crearTabla', async (req, res) => {
//     const createTable = await productosApi.createTable()
//     res.send(createTable)
// })

// routerProductos.get('/', async (req, res) => {
//     const getAll = await productosApi.selectAll()
//     res.json({ products: getAll })
// })

// routerProductos.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await productosApi.insertItem(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// routerProductos.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const newObj = req.body
//     const updateById = await productosApi.updateItem({id, ...newObj})
//     res.json({ update: updateById })
// })

// routerProductos.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const deleteObj = await productosApi.deleteItem(id)
//     res.json(deleteObj)
// })


/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA MARIADB                           */
/* -------------------------------------------------------------------------- */
// routerProductos.get('/crearTabla', async (req, res) => {
//     const createTable = await productosDaoMariaDB.createTable()
//     res.send(createTable)
// })

// routerProductos.get('/', async (req, res) => {
//     const getAll = await productosDaoMariaDB.selectAll()
//     res.json({ products: getAll })
// })

// routerProductos.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await productosDaoMariaDB.insertItem(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// routerProductos.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const newObj = req.body
//     const updateById = await productosDaoMariaDB.updateItem({id, ...newObj})
//     res.json({ update: updateById })
// })

// routerProductos.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const deleteObj = await productosDaoMariaDB.deleteItem(id)
//     res.json(deleteObj)
// })



/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA MONGODB                             */
/* -------------------------------------------------------------------------- */
// routerProductos.get('/', async (req, res) => {
//     const getAll = await productosDaoMongoDB.getAll()
//     res.json({ products: getAll })
// })

// routerProductos.get('/:id', async (req, res) => {
//     const { id } = req.params
//     const getById = await productosDaoMongoDB.getById(id)
//     res.send(getById)
// })

// routerProductos.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const newObj = req.body
//     const updateById = await productosDaoMongoDB.updateById({id, ...newObj})
//     res.json({ update: updateById })
// })

// routerProductos.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await productosDaoMongoDB.newObj(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// routerProductos.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const deleteObj = await productosDaoMongoDB.deleteById(id)
//     res.json(deleteObj)
// })

/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA FIREBASE                            */
/* -------------------------------------------------------------------------- */
// routerProductos.get('/', async (req, res) => {
//     const getAll = await productosDaoFirebase.getAll()
//     res.json({ productos: getAll })
// })

// routerProductos.get('/:id', async (req, res) => {
//     const { id } = req.params
//     const getById = await productosDaoFirebase.getById(id)
//     res.send(getById)
// })

// routerProductos.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const newObj = req.body
//     const updateById = await productosDaoFirebase.updateById({id, ...newObj})
//     res.json({ update: updateById })
// })

// routerProductos.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await productosDaoFirebase.newObj(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// routerProductos.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const deleteObj = await productosDaoFirebase.deleteById(id)
//     res.json(deleteObj)
// })

/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA ARCHIVO                             */
/* -------------------------------------------------------------------------- */
//Devuelve el array de objetos
routerProductos.get('/', async (req, res) => {
    const productos = await productosApi.getAll()
    res.json(productos)
})




app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)


const PORT = 4000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
