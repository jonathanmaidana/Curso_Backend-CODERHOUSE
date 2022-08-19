const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.sendFile('/index.html', { root: __dirname })
})

let productos = [
    { id: 1, nombre: 'producto1'},
    { id: 2, nombre: 'producto2'},
    { id: 3, nombre: 'producto3'}
]

io.on('connection', (socket) => {
    // console.log('Usuario conectado')
    const mensaje = {
        mensaje: 'ok',
        productos
    }

    socket.emit('mensaje-server', mensaje)


    socket.on('disconnect', () =>{
        console.log('Usuario desconectado')
    })
})

const PORT = 3000
httpServer.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})
