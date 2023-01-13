const Router = require ('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt')

const passport = require('passport')

const UsuariosMongoDB = require('../../models/usuarios')
const data = new UsuariosMongoDB()

const path = require ('path')
const webAuth = require('../../middlewares/isLogin')

const authWebRouter = new Router()


/* ---------------------------------- UTILS --------------------------------- */
const generateToken = (user) => {
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
    return token
}

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password)
}

const createHash = (password) => {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null)
}

/* --------------------------------- SIGNUP --------------------------------- */
authWebRouter.get('/signup', (req, res) => {
    try{
        res.render('signup')
    }catch(err){console.log(err)}
})

authWebRouter.post('/signup', async (req, res) =>{
    try{
        const { username, password, email } = req.body
        const yaExiste = await data.getByUsername(username)

        if(yaExiste){
            return res.redirect('/failSignup')
        }else{
            const usuario = {
                username,
                password,
                email
                }

            const newUser = {
                username: username,
                password: createHash(password),
                email: email
            }

            data.newUser(newUser)

            const access_token = generateToken(usuario)

            res.status(401).render('signup', {
                msg: 'usuario creado',
                access_token: access_token
            })

            console.log(access_token)
        }
    }catch(error){
        console.log(error)
    }
})


/* ---------------------------------- LOGIN --------------------------------- */
authWebRouter.post('/login', async (req, res) => {

    const { username, password } = req.body

    try{
        let user = await data.getByUsername(username)

        if(!user || !isValidPassword(user, password)){
            res.redirect('/failLogin')
        }else{
            const access_token = generateToken(user)
            const opcionesCookie ={
                expires:new Date(
                    Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                ),
                httpOnly:true
            }

            res.cookie('login',access_token,opcionesCookie)
            return res.status(200).redirect('/home')
        }
    }catch(err){
        console.log(err)
    }
})


/* ------------------------ SERIALIZAR Y DESERIALIZAR ----------------------- */
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    const user = usuarios.getById(id);
    done(null, user)
});


/* ----------------------------- RUTAS DEFINIDAS ---------------------------- */
authWebRouter.get('/login', (req, res) => {
    try{
        res.render('login')
    }catch(err){console.log(err)}
})

authWebRouter.post('/login',
    passport.authenticate('login', { 
        successRedirect: '/home', 
        failureRedirect: '/failLogin'
    }
))

/* ------------------------- CREDENCIALES INVALIDAS ------------------------- */
authWebRouter.get('/failLogin', (req, res) => {
    try{
        res.render('failLogin')
    }catch(err){console.log(err)}
})

authWebRouter.get('/failSignup', (req, res) => {
    try{
        res.render('failSignup')
    }catch(err){console.log(err)}
})


/* --------------------------------- LOGOUT --------------------------------- */
authWebRouter.get('/logout', webAuth, (req, res, next) => {
    const usuario = req.usuario

    try{
        req.logout((err) => {
            if(err) { return next(err) }
            res.cookie('login','',{maxAge:1})
            res.status(200).render('pages/logout.ejs', { email: usuario.email})
        })
    }catch(err){console.log(err)}
})

module.exports = authWebRouter