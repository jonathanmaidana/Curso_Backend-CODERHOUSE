const express = require('express')
const { Router } = require('express')

/* -------------------------------- PRODUCTOS ------------------------------- */
const ProductosDaoArchivo = require('./src/daos/productos/ProductosDaoArchivo')
const productosDaoArchivo = new ProductosDaoArchivo();

const ProductosDaoFirebase = require('./src/daos/productos/ProductosDaoFirebase')
const productosDaoFirebase = new ProductosDaoFirebase();

const ProductosDaoMongoDB = require('./src/daos/productos/ProductosDaoMongoDB')
const productosDaoMongoDB = new ProductosDaoMongoDB();

const ProductosDaoMariaDB = require('./src/daos/productos/ProductosDaoMariaDB')
const productosDaoMariaDB = new ProductosDaoMariaDB();

const ProductosDaoSQLite3 = require('./src/daos/productos/ProductosDaoSQLite3')
const productosDaoSQLite3 = new ProductosDaoSQLite3();

/* --------------------------------- CARRITO -------------------------------- */
const CarritoDaoArchivo = require('./src/daos/carrito/CarritoDaoArchivo')
const carritoDaoArchivo = new CarritoDaoArchivo();

const CarritoDaoFirebase = require('./src/daos/carrito/CarritoDaoFirebase')
const carritoDaoFirebase = new CarritoDaoFirebase();

const CarritoDaoMongoDB = require('./src/daos/carrito/CarritoDaoMongoDB')
const carritoDaoMongoDB = new CarritoDaoMongoDB();

const CarritoDaoMariaDB = require('./src/daos/carrito/CarritoDaoMariaDB')
const carritoDaoMariaDB = new CarritoDaoMariaDB();

const CarritoDaoSQLite3 = require('./src/daos/carrito/CarritoDaoSQLite3')
const carritoDaoSQLite3 = new CarritoDaoSQLite3();

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
routerProductos.get('/crearTabla', async (req, res) => {
    const createTable = await productosDaoSQLite3.createTable()
    res.send(createTable)
})

routerProductos.get('/', async (req, res) => {
    const getAll = await productosDaoSQLite3.selectAll()
    res.json({ products: getAll })
})

routerProductos.post('/', async (req, res) => {
    const newObj = req.body
    const saveObj = await productosDaoSQLite3.insertItem(newObj)
    res.json({
        msg: 'Producto agregado',
        saveObj,
        object: newObj
    })
})

routerProductos.put('/:id', async (req, res) => {
    const { id } = req.params
    const newObj = req.body
    const updateById = await productosDaoSQLite3.updateItem({id, ...newObj})
    res.json({ update: updateById })
})

routerProductos.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deleteObj = await productosDaoSQLite3.deleteItem(id)
    res.json(deleteObj)
})


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
// //Devuelve el array de objetos
// routerProductos.get('/', async (req, res) => {
//     const getAll = await productosDaoArchivo.getAll()
//     res.json({ productos: getAll})
// })

// //Devuelve el objeto según el id
// routerProductos.get('/:id', async (req, res) => {
//     const { id } = req.params
//     console.log(req)
//     const getById = await productosDaoArchivo.getById(Number(id))
//     res.send(getById)
// })

// //Recibe y modifica un objeto del array
// routerProductos.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const objProducto = req.body    
//     console.log(objProducto)
//     const updateById = await productosDaoArchivo.updateById({id: Number(id), ...objProducto})

//     res.json(
//         {
//         update: updateById,
//         }
//     )
// })

// //Recibe y agregar un nuevo objeto al array
// routerProductos.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await productosDaoArchivo.newObj(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// //Elimina un objeto del array según su id
// routerProductos.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     console.log(req.params)
//     const deleteObj = await productosDaoArchivo.deleteById(Number (id))
//     res.json(deleteObj)
// })



/* -------------------------------------------------------------------------- */
/*                                   CARRITO                                  */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA ARCHIVO                             */
/* -------------------------------------------------------------------------- */
// //Devuelve el array de objetos
// routerCarrito.get('/', async (req, res) => {
//     const getAll = await carritoDaoArchivo.getAll()
//     res.json({ productos: getAll})
// })

// //Devuelve el objeto según el id
// routerCarrito.get('/:id', async (req, res) => {
//     const { id } = req.params
//     console.log(req)
//     const getById = await carritoDaoArchivo.getById(Number(id))
//     res.send(getById)
// })

// //Recibe y modifica un objeto del array
// routerCarrito.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const objProducto = req.body    
//     console.log(objProducto)
//     const updateById = await carritoDaoArchivo.updateById({id: Number(id), ...objProducto})

//     res.json(
//         {
//         update: updateById,
//         }
//     )
// })

// //Recibe y agregar un nuevo objeto al array
// routerCarrito.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await carritoDaoArchivo.newObj(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// //Elimina un objeto del array según su id
// routerCarrito.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     console.log(req.params)
//     const deleteObj = await carritoDaoArchivo.deleteById(Number (id))
//     res.json(deleteObj)
// })

/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA FIREBASE                            */
/* -------------------------------------------------------------------------- */
// routerCarrito.get('/', async (req, res) => {
//     const getAll = await carritoDaoFirebase.getAll()
//     res.json({ productos: getAll })
// })

// routerCarrito.get('/:id', async (req, res) => {
//     const { id } = req.params
//     const getById = await carritoDaoFirebase.getById(id)
//     res.send(getById)
// })

// routerCarrito.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const newObj = req.body
//     const updateById = await carritoDaoFirebase.updateById({id, ...newObj})
//     res.json({ update: updateById })
// })

// routerCarrito.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await carritoDaoFirebase.newObj(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// routerCarrito.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const deleteObj = await carritoDaoFirebase.deleteById(id)
//     res.json(deleteObj)
// })

/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA MONGODB                             */
/* -------------------------------------------------------------------------- */
// routerCarrito.get('/', async (req, res) => {
//     const getAll = await carritoDaoMongoDB.getAll()
//     res.json({ products: getAll })
// })

// routerCarrito.get('/:id', async (req, res) => {
//     const { id } = req.params
//     const getById = await carritoDaoMongoDB.getById(id)
//     res.send(getById)
// })

// routerCarrito.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const newObj = req.body
//     const updateById = await carritoDaoMongoDB.updateById({id, ...newObj})
//     res.json({ update: updateById })
// })

// routerCarrito.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await carritoDaoMongoDB.newObj(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// routerCarrito.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const deleteObj = await carritoDaoMongoDB.deleteById(id)
//     res.json(deleteObj)
// })

/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA MARIADB                           */
/* -------------------------------------------------------------------------- */
// routerCarrito.get('/crearTabla', async (req, res) => {
//     const createTable = await carritoDaoMariaDB.createTable()
//     res.send(createTable)
// })

// routerCarrito.get('/', async (req, res) => {
//     const getAll = await carritoDaoMariaDB.selectAll()
//     res.json({ products: getAll })
// })


// routerCarrito.get('/:id', async (req, res) => {
//     const { id } = req.params
//     const getById = await carritoDaoMariaDB.selectById(id)
//     res.send(getById)
// })

// routerCarrito.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await carritoDaoMariaDB.insertItem(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// routerCarrito.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const newObj = req.body
//     const updateById = await carritoDaoMariaDB.updateItem({id, ...newObj})
//     res.json({ update: updateById })
// })

// routerCarrito.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const deleteObj = await carritoDaoMariaDB.deleteItem(id)
//     res.json(deleteObj)
// })

/* -------------------------------------------------------------------------- */
/*                             RUTAS PARA SQLite3                             */
/* -------------------------------------------------------------------------- */
// routerCarrito.get('/crearTabla', async (req, res) => {
//     const createTable = await carritoDaoSQLite3.createTable()
//     res.send(createTable)
// })

// routerCarrito.get('/', async (req, res) => {
//     const getAll = await carritoDaoSQLite3.selectAll()
//     res.json({ products: getAll })
// })

// routerCarrito.get('/:id', async (req, res) => {
//     const { id } = req.params
//     const getById = await carritoDaoSQLite3.selectById(id)
//     res.send(getById)
// })

// routerCarrito.post('/', async (req, res) => {
//     const newObj = req.body
//     const saveObj = await carritoDaoSQLite3.insertItem(newObj)
//     res.json({
//         msg: 'Producto agregado',
//         saveObj,
//         object: newObj
//     })
// })

// routerCarrito.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const newObj = req.body
//     const updateById = await carritoDaoSQLite3.updateItem({id, ...newObj})
//     res.json({ update: updateById })
// })

// routerCarrito.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     const deleteObj = await carritoDaoSQLite3.deleteItem(id)
//     res.json(deleteObj)
// })


app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)


const PORT = 4000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})