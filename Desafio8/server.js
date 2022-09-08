const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const Contenedor = require('./contenedor')
const contenedor = new Contenedor("./options/mariaDB")
const { options } = require ('./sqlite3/conexionDB')
const knex = require('knex')(options)


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set('view engine', 'ejs')
app.set('views', './public')

let messages = [
    { email: "Juan", mensaje: "¡Hola! ¿Que tal?" },
    { email: "Pedro", mensaje: "¡Muy bien! ¿Y vos?" },
    { email: "Ana", mensaje: "¡Genial!" }
]; 

app.get('/', async (req, res) => {
    const selectAll = await contenedor.selectAll()
        res.render( 
            'index',
            { root: __dirname,
                listaProductos: selectAll}
        )
    })

// contenedor.createTable('productos')
// contenedor.insertArray()
// contenedor.selectAll()
contenedor.insertItem({title: 'Fiat', price:50000});
// contenedor.deleteItem();
// contenedor.deleteTable();

const PORT = 3000;
httpServer.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})