import { Router } from 'express'

import path from 'path'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    try{
        res.redirect('/home')
    }catch(err){console.log(err)}
})

authWebRouter.get('/login', (req, res) => {
    try{
        const nombre = req.session?.nombre
        if (nombre) {
            res.redirect('/')
        }else{
            res.sendFile(path.join(process.cwd(), '/views/login.html'))
        }
    }catch(err){console.log(err)}
})

authWebRouter.get('/logout', (req, res) => {
    try{
        const nombre = req.session?.nombre
        if (nombre) {
            req.session.destroy(err => {
                if (!err) {
                    res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { nombre })
                } else {
                    res.redirect('/')
                }
            })
        } else {
            res.redirect('/')
        }
    }catch(err){console.log(err)}
})


authWebRouter.post('/login', (req, res) => {
    try{
        req.session.nombre = req.body.nombre
        res.redirect('/home')
    }catch(err){console.log(err)}
})



export default authWebRouter