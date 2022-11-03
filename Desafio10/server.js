import * as dotenv from 'dotenv'
dotenv.config()

import express, { json } from 'express' //hago destructurinig con json para no poner express.json()
import cors from 'cors'
import session from 'express-session'

import MongoStore from 'connect-mongo'
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }

import addProductosHandlers from './src/routers/ws/productos.js'
import addMensajesHandlers from './src/routers/ws/mensajes.js'

import homeWebRouter from './src/routers/auth/home.js'
import authWebRouter from './src/routers/auth/auth.js'
import routerApiProductos from './src/routers/api/productos.js'


/* -------------------------------- Websocket ------------------------------- */
import { createServer } from "http";
import { Server } from "socket.io";
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

app.set('view engine', 'ejs')

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

app.use(session({
    // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
    store: MongoStore.create({ 
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.dsepao7.mongodb.net/test`,
        mongoOptions: advancedOptions 
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 100000
    }
}))

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