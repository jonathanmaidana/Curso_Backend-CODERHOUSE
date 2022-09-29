const fs = require('fs')

class ContenedorArchivo {
    constructor(text){
        this.text = text
    }
    
    /* ------------------ Devuelve todos los objetos del array ------------------ */
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.text, 'utf-8')
            const dataParse =  await JSON.parse(data)
            console.log(dataParse)
            if(dataParse.length){
                return dataParse
            }
            else{
                return {error: 'No hay productos'}
            }
        }
        catch(err){
            console.log(err)
        }
    }
    
    /* --------------------- Devuelve el objeto según el id --------------------- */
    async getById(id){
        try{
            const data = await fs.promises.readFile(this.text, 'utf8')
            const dataIdParse = await JSON.parse(data)
            const producto = dataIdParse.find(producto => producto.id === id)
            if (producto){
                return producto
            }
            else{   
                return console.log('No se encontro el producto')
            }
        } 
        catch(err){
            console.log(err)
        }
    }

    /* ---------------- Recibe un objeto del array y lo modifica ---------------- */
    async updateById(obj){
        try{
            const data = await fs.promises.readFile(this.text, 'utf8')
            let dataParse = await JSON.parse(data)
            const objIndex = dataParse.findIndex(prod => prod.id === obj.id);
            if(objIndex !== -1){
                dataParse[objIndex] = obj
                await fs.promises.writeFile(this.text, JSON.stringify(dataParse, null, 2))
                return {msg: `El producto con el id ${obj.id} fue actualizado`}
            }
            else{
                return {error: 'El producto no existe'}
            }
        }catch(err){
            console.log(err)
        }
    }

    /* ---------------- Recibe y agrega un nuevo objeto al array --------------- */
    async newObj(obj){
        console.log(obj)
        try{
            const data = await fs.promises.readFile(this.text, 'utf8')
            const dataParse = JSON.parse(data)
            if(dataParse.length)
            {
                await fs.promises.writeFile(this.text, JSON.stringify([...dataParse, {...obj, id: dataParse.length + 1}], null, 2))
            }else{
                await fs.promises.writeFile(this.text, JSON.stringify([{...obj, id: dataParse.length + 1}], null, 2))
            }
                return dataParse.length + 1
        }catch(err){
            console.log(err)
        }
    }

    /* ----------------- Elimina un objeto del array según su id ---------------- */
    async deleteById(id){
        try {
            const data = await fs.promises.readFile(this.text, 'utf8')
            const dataParse = JSON.parse(data)
            const producto = dataParse.find((item) => item.id === id)

            if(producto){
                const productoBorrado = dataParse.filter((item) => item.id !== id)
                await fs.promises.writeFile(this.text, JSON.stringify(productoBorrado, null, 2), 'utf8')
                return {msg: `El producto con el id ${producto.id} se elimino`}   
            } else{
                return {err: 'Producto no encontrado'}
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = { ContenedorArchivo };