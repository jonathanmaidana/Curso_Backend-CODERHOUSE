const Router = require('express')
const randomRouter = Router()
const { fork } = require('child_process')

let visitas = 0

randomRouter.get('/api/random', (req, res) => {
    const computo = fork('./src/routers/api/computo.js')
    let {cant} = req.query
    if(Number(cant)){
        computo.send(cant)
    }else{
        computo.send('start')
    }
        // computo.send(cant)
        computo.on('message', mensaje => {
            console.log(mensaje)
            res.end(mensaje)
        })
})

randomRouter.get('/', (req, res) => {
    res.end(`Ok ${++visitas}`)
})

// randomRouter.get('*', (req, res, next) => {
//     let { url } = req
//     if(url == '/api/random'){
//         const computo = fork('./src/routers/api/computo.js')
//         computo.send('start')
//         computo.on('message', mensaje => {
//             console.log(mensaje)
//             res.end(mensaje)
//         })
//     }else if(url == '/'){
//         const {cant} = req.query
//         console.log(cant)
//         res.end(`Ok ${++visitas}`)
//     }
// })


module.exports = randomRouter