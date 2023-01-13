const Router = require('express')

const infoWebRouter = Router()

infoWebRouter.get('/info', (req, res) => {
    res.status(201).render('pages/info', {
        argumentos: req.path,
        so: process.platform,
        version: process.version,
        memoria: process.memoryUsage().heapTotal,
        path: process.execPath,
        id: process.pid,
        carpeta: process.cwd()
    })
})



module.exports = infoWebRouter