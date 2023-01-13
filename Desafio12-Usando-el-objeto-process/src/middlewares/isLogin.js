const jwt = require('jsonwebtoken'); 
const {promisify} = require('util')


const webAuth = async (req, res, next) => {
    if(req.cookies.login){
        const decoded = await promisify(jwt.verify)(req.cookies.login, process.env.JWT_SECRET)
        
        const tokenParsed = JSON.parse(JSON.stringify(decoded))

        const tokenId = tokenParsed.data

        req.usuario=tokenId

        return next()
    }else{
        next()
    }
}

module.exports = webAuth