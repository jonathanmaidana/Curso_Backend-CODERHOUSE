const mongoose = require('mongoose')
const config = require('../../mongoDB/connection.js')

mongoose.connect(config.mongodb.conexionDB, config.mongodb.options)

class ContenedorUsuarios {
    constructor(collectionName, scheme) {
        this.collection = mongoose.model(collectionName, scheme)
    }

    async getAll(){
        const getAll = await this.collection.find({}, {_id: 0, __v: 0})
        try{    
            if(this.collection.length){
                return getAll
            }else{
                return {error: 'No hay usuarios'}
            }
        }catch(error){
            console.log(error)
        }
    }

    async getById(id){
        try{
            const getAll = await this.collection.find()
            const usuario = getAll.find(e => e.id === id)
            return usuario
        }catch(error){
            console.log(error)
        }
    }

    async getByUsername(username){
        console.log(username)
        try{
            const getAll = await this.collection.find()
            const usuario = getAll.find(e => e.username === username)
            if(!usuario) {
                console.log('el usuario no existe')
            }else{
                return usuario 
            }
        }catch(error){
            console.log(error)
        }
    }

    async getByUserAndPassword(username, password){
        try{
            const getAll = await this.collection.find()
            const usuario = getAll.find(e => e.username === username && e.password === password)
            if(!usuario) {
                console.log('el usuario no existe')
            }else{
                return usuario + 'usuario correcto'
            }
        }catch(error){
            console.log(error)
        }
    }


    async newUser(obj){
        console.log(obj)
        try{
            const newObj = new this.collection({
                username: obj.username,
                password: obj.password,
                email: obj.email
            }).save()
            return newObj
        }catch(error){
            console.log(error)
        }
    }

}

module.exports = ContenedorUsuarios