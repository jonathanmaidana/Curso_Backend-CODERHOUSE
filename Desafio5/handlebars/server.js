const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./prod.txt')

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static('public'))

app.get('/', async (req, res) => {
    const getAll = await contenedor.getAll()
    res.render('main', {
      listaProductos: getAll
    })
  })
  
  app.get('/productos', async (req, res) => {
    const getAll = await contenedor.getAll()
    res.render('main', {
      listaProductos: getAll
    })
  })
  
  app.post('/productos', async (req, res) => {
    const obj = req.body
    contenedor.newObj(obj)
    res.redirect('/productos')
  })

// app.get('/', (req, res) => {
//     res.render('main', { 
//         products: productos, 
//         listExist: true 
//     })
// })

// app.post('/productos', (req, res) => {
//     const { titulo, precio } = req.body
//     const newObj = {
//         titulo,
//         precio
//     }
//     console.log(req.body)
//     productos.push(newObj)
//     res.render('main', {
//         products: productos,
//         listExist: true
//     })
// })

const PORT = 3000
app.listen(PORT, err => {
    if(err) throw new Error (`Error on server listen: ${err}`)
    console.log(`Server running on port ${PORT}`)
    })