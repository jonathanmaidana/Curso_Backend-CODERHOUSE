const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./productos.txt');
const express = require('express');

const app = express();

//Devuelve el array
app
    .get('/productos', async (req, res) => {
        const getAll = contenedor.getAll()
        res.send( await getAll
            .then(res => (res)))
    })

//Devuelve un producto random
// app
//     .get('/productoRandom',async (req, res) => {
//         const randomObj = contenedor.getRandomObj()
//         res.send( await randomObj
//             .then((res) => (res)))
//     })

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando servidor ${PORT}`)
})
server.on('error', error=>console.log(`ERROR EN EL SERVIDOR ${error}`))