const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('./prod.txt')

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
    const getAll = await contenedor.getAll()
    console.log(getAll)
        res.render( 
            'index',
            { root: __dirname,
            listaProductos: getAll}
        )
    })

io.on('connection', async (socket) => {
    /* Logging to the console that the client has connected. */
    console.log('El usuario se ha conectado');
    socket.on('disconnect', () => {
        console.log('El usuario se ha desconectado')  
    })
    const getAll = await contenedor.getAll()
    /* Sending the messages array to the client. */
    socket.emit('message', messages);
    socket.emit('product', getAll);
    /* Listening for a new message from the client and then pushing it to the messages array and then
    emitting the new message to all the clients. */
    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('message', messages);
    })
    /* Listening for a new product from the client and then pushing it to the product array and then
        emitting the new product to all the clients. */
    socket.on('new-product', (data) =>{
        contenedor.newObj(data)
        io.sockets.emit('product', getAll)
    }) 
})

const PORT = 3000;
httpServer.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
