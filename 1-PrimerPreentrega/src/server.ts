const express = require('express');
import Contenedor from "./contenedor";
import Carrito from "./carrito";
const { Router } = express;

const contenedor: Contenedor = new Contenedor('./prod.txt')
const carrito: Carrito = new Carrito('./carrito.txt')
const administrador = true;


const app = express();
const routerProductos = Router();
const routerCarrito = Router();

const timestamp = Date.now();

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set('view engine', 'ejs')
app.set('views', './public')


/* -------------------------- Rutas para productos ------------------------- */
routerProductos.get('/', async (req, res) => {
    const getAll = await contenedor.getAll();
        res.render( 
            'productos',{ 
            root: __dirname,
            listaProductos: getAll
        })
    })

routerProductos.get('/:id', async (req, res) => {
    const { id } = req.params
    const getById = await contenedor.getById(Number(id))
    res.send(getById)
})

routerProductos.post('/', async (req, res) => {
    const newObj = req.query
    const saveObj = await contenedor.newObj(newObj)
    
      res.json({
        msg: 'Producto agregado',
        saveObj,
        object: newObj,
        timestamp: timestamp
      })
})

routerProductos.put('/:id', async (req, res) => {
    const { id } = req.params
    const objProducto = req.query    
    const updateById = await contenedor.updateById({id: Number(id), ...objProducto})
    res.json(
        {
        update: updateById,
        }
    )
})

routerProductos.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deleteObj = await contenedor.deleteById(Number (id))
    res.json(deleteObj)
})


/* -------------------------- Rutas para el carrito ------------------------- */
routerCarrito.post('/', async (req,res) => {
  const newObj = req.query
  const id = await carrito.createCart(newObj)
  res.json({
    msg: 'Producto agregado',
    timestamp: timestamp,
    id,
    object: newObj
  })
})

routerCarrito.delete('/:id', async (req, res) => {
  const deleteAll = await carrito.deleteAll()
  res.json(deleteAll)
})


routerCarrito.get('/:id/productos', async (req,res) => {
  const getAll = await carrito.getAll()
  res.render( 
    'carrito',{ 
      root: __dirname,
      listaCarrito: getAll
    })
  })

  routerCarrito.post('/:id/productos', async (req,res) => {
    const { id } = req.params  
    const updateById = await carrito.getById(Number (id))
    res.json({
      msg: 'Producto agregado',
      timestamp: timestamp,
      id,
      object: updateById
    })
  })
  
  routerCarrito.delete('/:id/productos/:id_prod', async (req,res) => {
    const { id } = req.params
    const deleteObj = await carrito.deleteById(Number (id))
    res.json(deleteObj)
  })

    app.use('/api/productos', routerProductos)
    app.use('/api/carrito', routerCarrito)

const PORT = 8080;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})