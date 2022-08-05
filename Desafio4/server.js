const express = require('express');
const { Router } = express;
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./prod.txt')

const app = express();
const routerProductos = Router()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//Devuelve el array de objetos
routerProductos.get('/', async (req, res) => {
    const getAll = await contenedor.getAll()
    res.json({ productos: getAll})
})

//Devuelve el objeto según el id
routerProductos.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req)
    const getById = await contenedor.getById(Number(id))
    res.send(getById)
})

//Recibe y agregar un nuevo objeto al array
routerProductos.post('/', async (req, res) => {
    const newObj = req.body
    const saveObj = await contenedor.newObj(newObj)
    res.json({
        msg: 'Producto agregado',
        saveObj,
        object: newObj
    })
})

//Recibe y modifica un objeto del array
routerProductos.put('/:id', async (req, res) => {
    const { id } = req.params
    const objProducto = req.body    
    console.log(objProducto)
    const updateById = await contenedor.updateById({id: Number(id), ...objProducto})

    res.json(
        {
        update: updateById,
        }
    )
})

//Elimina un objeto del array según su id
routerProductos.delete('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params)
    const deleteObj = await contenedor.deleteById(Number (id))
    res.json(deleteObj)
})


app.use('/api/productos', routerProductos)


const PORT = 3030
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})
app.on('error', err => console.log(err))