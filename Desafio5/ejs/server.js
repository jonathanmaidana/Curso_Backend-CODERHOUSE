const express = require('express')
const app = express()
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./prod.txt')

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set('view engine', 'ejs')
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
//     res.render('pages/index', { 
//         productos: productos
//     })
// })

// app.post('/productos', (req, res) => {
//     const obj = req.body
//     productos.push(obj)
//     res.redirect('pages/index')
// })

const PORT = 3000
app.listen(PORT, err => {
    if(err) throw new Error (`Error on server listen: ${err}`)
    console.log(`Server running on port ${PORT}`)
    })