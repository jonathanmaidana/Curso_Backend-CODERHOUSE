import express, { json } from 'express' //hago destructurinig con json para no poner express.json()
import cors from 'cors'




import ApiProductosMock from './api/productos.js'
const apiProductos = new ApiProductosMock()
import MensajesMongoDB from './models/mensajes.js'
const apiMensajes = new MensajesMongoDB()

/* --------------------------------- ROUTER --------------------------------- */
import { Router } from 'express'
const routerProductos = Router()




routerProductos.post('/productos-test', async (req, res, next) => {
    try{
        res.json(await apiProductos.popular(req.query.cant))
    }catch(err){
        next(err)
    }
})

routerProductos.get('/', async (req, res, next) => {
    try{
        const getAll = await apiProductos.listarAll()
            res.render( 
                'index',
                {
                listaProductos: getAll}
            )
    }catch(err){
        next(err)
    }
})

/* -------------------------------- Websocket ------------------------------- */
import { createServer } from "http";
import { Server } from "socket.io";
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set('view engine', 'ejs')
app.set('views', './public')

let messages = [
    { email: "Juan", mensaje: "¡Hola! ¿Que tal?" },
    { email: "Pedro", mensaje: "¡Muy bien! ¿Y vos?" },
    { email: "Ana", mensaje: "¡Genial!" }
]; 


io.on('connection', async (socket) => {
    console.log('El usuario se ha conectado');
    socket.on('disconnect', () => {
        console.log('El usuario se ha desconectado')  
    })
    const getAll = await apiProductos.listarAll()
    const msjAll = await apiMensajes.getAll()


    socket.emit('message', msjAll);
    // console.log(msjAll);
    socket.emit('product', getAll);

    socket.on('new-message', (data) => {
        apiMensajes.newObj(data);
        io.sockets.emit('message', msjAll);
    })

    socket.on('new-product', (data) =>{
        apiProductos.guardar(data)
        io.sockets.emit('product', getAll)
    }) 
})

/* -------------------------------- Normalizr ------------------------------- */
// import normalizr from 'normalizr';
// import { normalize, denormalize, schema } from 'normalizr';
// import util from 'util'

// const print = (obj) => {
//     console.log(util.inspect(obj,false,12,true))
// }

// const msjAll = await apiMensajes.getAll()

// const userSchema = new schema.Entity('users',{idAttribute: 'id'})

// const textSchema = new schema.Entity('text', {
//     commenter: userSchema
// })

// const articleSchema = new schema.Entity('articles', {
//     author: userSchema,
//     text: [textSchema]
// })

// const postsSchema = new schema.Entity('posts', {
//     posts: [articleSchema] 
// })

// console.log('---------------objeto original---------------')
// print(msjAll)
// console.log(JSON.stringify(msjAll).length)

// console.log('---------------objeto normalizado---------------')
// const normalizedData = normalize(msjAll, postsSchema)
// print(normalizedData)
// console.log(JSON.stringify(normalizedData).length)

// console.log('---------------objeto denormalizado---------------')
// const denormalizedData = denormalize(normalizedData.result, postsSchema, normalizedData.entities)
// print(denormalizedData)
// console.log(JSON.stringify(denormalizedData).length)




app.use('/api', routerProductos)

const PORT = 4000
const server = httpServer.listen(PORT, () => {
   console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', error => console.log(`Error en servidor: ${error}`))