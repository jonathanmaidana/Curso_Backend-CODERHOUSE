const express = require('express');
import Contenedor from "./contenedor";
const { Router } = express;


const contenedor: Contenedor = new Contenedor('./prod.txt')

const app = express();
const routerProductos = Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set('view engine', 'ejs')
app.set('views', './public')

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
      object: newObj
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
    console.log(req.params)
    const deleteObj = await contenedor.deleteById(Number (id))
    res.json(deleteObj)
})




    // io.on('connection', async (socket) => {
    //     /* Logging to the console that the client has connected. */
    //     console.log('El usuario se ha conectado');
    //     const getAll = await contenedor.getAll()
    //     socket.emit('product', getAll);
    //     /* Listening for a new product from the client and then pushing it to the product array and then
    //         emitting the new product to all the clients. */
    //     // socket.on('new-product', (data) =>{
    //     //     contenedor.newObj(data)
    //     //     io.sockets.emit('product', getAll)
    //     // }) 
    // }, [])


    app.use('/productos', routerProductos)

const PORT = 8080;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})