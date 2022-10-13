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
  res.render('form',{
  listaProductos: getAll,
  })
})

app.get('/productos', async (req, res) => {
  const getAll = await contenedor.getAll()
  res.render('productos', {
    listaProductos: getAll,
  })
})

app.post('/productos', async (req, res) => {
  const obj = req.body
  console.log(obj)
  contenedor.newObj(obj)
  res.redirect('/productos')
})

const PORT = 3000
app.listen(PORT, err => {
    if(err) throw new Error (`Error on server listen: ${err}`)
    console.log(`Server running on port ${PORT}`)
    })