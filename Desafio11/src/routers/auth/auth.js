const Router = require ('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const PRIVATE_KEY = "myprivatekey"
const bcrypt = require('bcrypt')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const UsuariosMongoDB = require('../../models/usuarios')
const usuarios = new UsuariosMongoDB()

const path = require ('path')

const authWebRouter = new Router()


/* ---------------------------------- UTILS --------------------------------- */
const generateToken = (user) => {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}


/* ---------------------------------- LOGIN --------------------------------- */
passport.use('login', new LocalStrategy({
    usernameField:'username',
    passwordField:'password'
},
    async (username, password, done) => {
        try{
            let user = await usuarios.getByUsername(username)

            if(!user){
                console.log(`No existe el usuario ${username}`)
                return done(null, false, { message: 'User not found'})
            }
    
            if(!isValidPassword(user, password)){
                console.log('Password Incorrect')
                return done(null, false, { message: 'Password not found'})
            }

            done(null, user)
            
        }catch(err){
            console.log(err)
        }
    }
))


/* --------------------------------- SIGNUP --------------------------------- */
authWebRouter.get('/signup',  (req, res) => {
    res.render(path.join(process.cwd(), '/views/signup'))
})

authWebRouter.post('/signup', async (req, res) => {
    try{
        const { username, password, email } = req.body
        const yaExiste = await usuarios.getByUsername(username)

        if(yaExiste){
            return res.render('failSignup')
        }

        const newUser = {username, password: createHash(password), email}
        usuarios.newUser(newUser)

        const access_token = generateToken(newUser)

        res.json({ access_token })

    }catch(error){
        console.log(error)
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
    res.render('login')
})

authWebRouter.get('/login', (req, res) => {
    try{
        if(req.isAuthenticated()) {
            const { user } = req.user
            console.log(`Usuario logeado`)
            res.redirect('/home')
        }else{
            console.log(`Usuario no esta logeado`)
            res.render('login')
        }
        res.render('login')
    }catch(err){console.log(err)}
})

authWebRouter.post('/login', passport.authenticate('login',{
    successRedirect: '/home',
    failureRedirect: '/failLogin'
}))

authWebRouter.get('/failLogin', (req, res) => {
    try{
        console.log('El usuario no existe')
        res.render('failLogin')
    }catch(err){console.log(err)}
})


/* --------------------------------- LOGOUT --------------------------------- */
authWebRouter.get('/logout', (req, res, next) => {
    try{
        req.logout((err) => {
            if(err) { return next(err) }
            res.render(path.join(process.cwd(), '/views/pages/logout.ejs'))
        })
    }catch(err){console.log(err)}
})


/* ------------------------------- FAIL ROUTE ------------------------------- */
// authWebRouter.get('*', (req, res) => {
//     try{
//         res.status(404).json({
//             success: false,
//             message: 'Error 404'
//         })
//     }catch(err){console.log(err)}
// })


module.exports = authWebRouter