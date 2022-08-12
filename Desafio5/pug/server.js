const express = require('express')
const app = express()
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./prod.txt')

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set('view engine', 'pug')
app.set('views', './views')


app.get('/', async (req, res) => {
    const getAll = await contenedor.getAll()
    res.render('index', {
      listaProductos: getAll
    })
  })
  
  app.get('/productos', async (req, res) => {
    const getAll = await contenedor.getAll()
    res.render('index', {
      listaProductos: getAll
    })
  })
  
  app.post('/productos', async (req, res) => {
    const obj = req.body
    contenedor.newObj(obj)
    res.redirect('/productos')
  })

// app.get('/', (req, res) => {
//     res.render('index', { 
//         mensaje: 'Formulario',
//         productos: productos,
//     })
// })

// app.post('/productos', (req, res) => {
//     const {titulo, precio} = (req.body)
//     const newObj = {
//         titulo,
//         precio
//     }
//     productos.psuh(newObj)
//     console.log(obj)
//     res.render('index', { 
//         productos
//     })
//     res.redirect('/')
// })

// app.get('/', (req, res) => {
//     res.render('pages/index', { 
//         mensaje: 'Hola mundo',
//         productos: productos
//     })
// })

// app.post('/productos', (req, res) => {
//     const obj = (req.body)
//     productos.push(obj)
//     res.render('pages/index', {
//         mensaje: 'Producto enviado',
//         productos
//     })
// })

const PORT = 3000
app.listen(PORT, err => {
    if(err) throw new Error (`Error on server listen: ${err}`)
    console.log(`Server running on port ${PORT}`)
    })