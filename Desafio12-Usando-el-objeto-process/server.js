const express = require('express')
require('dotenv').config()
const config = require('./config')

const passport = require('passport')

const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const homeWebRouter = require('./src/routers/auth/home.js')
const authWebRouter = require('./src/routers/auth/auth.js')
const routerApiProductos = require('./src/routers/api/productos.js')
const infoWebRouter = require('./src/routers/info/infoRoute')
const randomRouter = require('./src/routers/randoms/randomRoute.js')
const failRouter = require('./src/routers/failRoute/failRoute')

const addProductosHandlers = require('./src/routers/ws/productos.js')
const addMensajesHandlers = require('./src/routers/ws/mensajes.js')


const app = express()

const MongoStore = require('connect-mongo')
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }

/* -------------------------- Configuro el servidor ------------------------- */
app.set('view engine', 'ejs')

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('secret'))
app.use(cors());
app.use(session({
    store: MongoStore.create({ 
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dsepao7.mongodb.net/test`,
        mongoOptions: advancedOptions 
    }),
    secret: process.env.MONGO_SECRET,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.MONGO_EXPIRES)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


/* -------------------------------- Websocket ------------------------------- */
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require("socket.io");

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer);



/* -------------------------------- Websocket ------------------------------- */
io.on('connection', (socket) => {
    console.log('El usuario se ha conectado');
    socket.on('disconnect', () => {
        console.log('El usuario se ha desconectado')  
    })
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
})


/* ------------------------------ Ruta api rest ----------------------------- */
app.use(routerApiProductos)

/* --------------------------- Rutas del servidor web --------------------------- */
app.use(authWebRouter)
app.use(homeWebRouter)
app.use(infoWebRouter)
app.use(randomRouter)
app.use(failRouter)



/* --------------------------- Inicio el servidor --------------------------- */
const server = httpServer.listen(config.PORT, config.HOST, () => {
   console.log(`Servidor escuchando en el puerto http://${config.HOST}:${config.PORT}`)
})
server.on('error', error => console.log(`Error en servidor: ${error}`))