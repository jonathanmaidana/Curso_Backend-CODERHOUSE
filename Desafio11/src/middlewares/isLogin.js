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

// const webAuth = (req, res, next) => {
//     const authHeader = req.headers.authorization
    

//     if(!authHeader) {
//         return res.status(401).json({
//             error: 'not authenticated'
//         })
//     }

//     const token = authHeader.split('Bearer ')[1]

//     jwt.verify(token, PRIVATE_KEY, (err, decoded) =>{
//         if (err) {
//             return res.status(401).json({
//                 error: 'not authorized'
//             })
//         }

//         req.user = decoded.data
//         next()
//     })
// }

module.exports = webAuth