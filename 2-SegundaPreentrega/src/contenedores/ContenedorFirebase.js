const admin = require("firebase-admin");
const config = require('../../config')


admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContenedorFirebase {
    constructor(collectionName){
        this.collection = db.collection(collectionName)
    }
    
    /* ------------------ Devuelve todos los objetos del array ------------------ */
    async getAll(){
        try{
            const querySnapshot = await this.collection.get()
            let docs = querySnapshot.docs;

            const response = docs.map((doc) => ({
                id: doc.id, ...doc.data()
                }))
            return response
        }catch(error){
            console.log(error)
        }
    }

    /* --------------------- Devuelve el objeto según el id --------------------- */
    async getById(id){
        try{
            const doc = this.collection.doc(id)
            const item = await doc.get()
            const itemId = item.data()
            console.log(itemId)
            if(itemId){
                return itemId
            }else{
                return console.log('No se encontró el producto')
            }
        }catch(error){
            console.log(error)
        }
    }

    /* ---------------- Recibe un objeto del array y lo modifica ---------------- */
    async updateById(obj){
        try {
            const querySnapshot = await this.collection.get()
            const docs = querySnapshot.docs;
            const doc = await this.collection.doc(`${obj.id}`)
            const itemIndex = docs.findIndex(prod => prod.id === obj.id)
            if(itemIndex !== -1){
                await doc.update({
                    title: obj.title,
                    price: obj.price,
                    thumbnail: obj.thumbnail
                })
                console.log(docs[itemIndex])
                return {msg: `El producto con el id ${obj.id} fue actualizado`}
            }else{
                return {error: 'El producto no existe'}
            }
        }catch(error){
            console.log(error)
        }
    }

    /* ---------------- Recibe y agrega un nuevo objeto al array --------------- */
    async newObj(obj) {
        console.log(obj)
        try{
            const querySnapshot = await this.collection.get()
            let docs = querySnapshot.docs;
            const id = docs.length + 1
            const doc = this.collection.doc(`${id}`)
            // const newItem = await doc.create(obj)
            if(docs.length){
                await doc.create(obj)
            }
            return docs.length + 1
        }catch(error){
            console.log(error)
        }
    }

    /* ----------------- Elimina un objeto del array según su id ---------------- */
    async deleteById(id){
        try{
            const querySnapshot = await this.collection.get()
            const docs = querySnapshot.docs;
            const doc = this.collection.doc(`${id}`)
            const item = docs.find((item) => item.id === id)
            console.log(item)
            if(item){
                await doc.delete()
                return {msg: `El producto con el id ${id} se elimino`} 
            }else{
                return {err: 'Producto no encontrado'}
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = { ContenedorFirebase };