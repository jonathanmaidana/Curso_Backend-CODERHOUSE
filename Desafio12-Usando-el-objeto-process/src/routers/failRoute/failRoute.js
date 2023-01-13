const Router = require('express')
const failRouter = Router()

failRouter.get('*', (req, res, next) => {
    try{
        res.status(404).json({
        success: false,
        message: 'Error 404'
        })
    }catch(err){console.log(err)}
    next()
})

module.exports = failRouter