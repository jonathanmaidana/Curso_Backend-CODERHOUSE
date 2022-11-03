const express = require('express')
require('dotenv').config()

const passport = require('passport')

const json = require('express') //hago destructurinig con json para no poner express.json()
const cors = require('cors')
const session = require('express-session')

const MongoStore = require('connect-mongo')
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }

const addProductosHandlers = require('./src/routers/ws/productos.js')
const addMensajesHandlers = require('./src/routers/ws/mensajes.js')

const homeWebRouter = require('./src/routers/auth/home.js')
const authWebRouter = require('./src/routers/auth/auth.js')
const routerApiProductos = require('./src/routers/api/productos.js')


/* -------------------------------- Websocket ------------------------------- */
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require("socket.io");
const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer);

app.use(session({
    store: MongoStore.create({ 
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dsepao7.mongodb.net/test`,
        mongoOptions: advancedOptions 
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 100000
    }
}))

app.use(passport.initialize())
app.use(passport.session())




io.on('connection', async (socket) => {
    console.log('El usuario se ha conectado');
    socket.on('disconnect', () => {
        console.log('El usuario se ha desconectado')  
    })
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
})

/* -------------------------- Configuro el servidor ------------------------- */
app.use(json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set('view engine', 'ejs')

/* ------------------------------ Ruta api rest ----------------------------- */
app.use(routerApiProductos)

/* --------------------------- Rutas del servidor web --------------------------- */
app.use(authWebRouter)
app.use(homeWebRouter)


/* --------------------------- Inicio el servidor --------------------------- */
const PORT = 4000
const server = httpServer.listen(PORT, () => {
   console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', error => console.log(`Error en servidor: ${error}`))