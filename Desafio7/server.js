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

let messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
]; 

app.get('/', async (req, res) => {
        res.sendFile( 
            'index.html',
            { root: __dirname}
        )
    })

io.on('connection', async (socket) => {

    /* Logging to the console that the client has connected. */
    console.log('El cliente se ha conectado');
    const getAll = await contenedor.getAll()
    /* Sending the messages array to the client. */
    socket.emit('message', messages);
    socket.emit('container', getAll);
    /* Listening for a new message from the client and then pushing it to the messages array and then
    emitting the new message to all the clients. */
    socket.on('new-message', (msj) => {
        messages.push(msj);
        io.sockets.emit('message', messages);
    }) 
    
    socket.on('new-product', (data) =>{
        contenedor.newObj(data)
        io.sockets.emit('container', getAll)
    } )
})

const PORT = 3000;
httpServer.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
