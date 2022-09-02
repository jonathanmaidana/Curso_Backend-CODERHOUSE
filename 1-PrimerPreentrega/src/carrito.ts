const fs = require('fs')

const timestamp = Date.now();

export default class Carrito {
    public text: string;
    
    constructor(text: string){
        this.text = text;
    }
    
    async createCart(obj: object){
        try{
            await fs.promises.writeFile('./carrito.txt', JSON.stringify([{...obj, timestamp: timestamp , id: 1}], null, 2))
        } catch(err){
            console.log(err)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.text, JSON.stringify([]), 'utf8');
            console.log('Productos borrados')
            return {msg: 'Carrito vacio'}
        }
        catch(err){
            console.log(err)
        }
    }
    
    //Devuelve todos los objetos del array
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.text, 'utf-8')
            const dataParse = await JSON.parse(data)
            if(dataParse.length){
                return dataParse
            }
            else{
                console.log(`No hay productos`)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    //Devuelve el objeto según el id
    async getById(id: number){
        console.log(id)
        try{
            const data = await fs.promises.readFile('./prod.txt', 'utf8')
            const dataIdParse  = await JSON.parse(data)
            const producto = dataIdParse.find(producto => producto.id === id)
            const dataCart = await fs.promises.readFile(this.text)
            const dataCartParse = await JSON.parse(dataCart)
            console.log(producto)
            if (producto){
                await fs.promises.writeFile(this.text, JSON.stringify([...dataCartParse, producto], null, 2))
            }
            else{   
                return console.log('No se encontro el producto')
            }
        } 
        catch(err){
            console.log(err)
        }
    }

    //Elimina un objeto del array según su id
    async deleteById(id: number){
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