const fs = require('fs')

class Contenedor{
    constructor (txt){
        this.txt = txt
    }

    //Método que devuelve el array
    async getAll(){
        try{
            const data =  await fs.promises.readFile(this.txt, 'utf8')
            const dataParse = await JSON.parse(data)

            return dataParse
        }
        catch(err){
            console.log(err)
        }
    }

    //Método que devuelve un objeto random del array
    // async getRandomObj(){
    //     try{
    //         const data = await fs.promises.readFile(this.txt, 'utf8')
    //         const dataParse = await JSON.parse(data)

    //         const RandomObj = await dataParse[Math.floor(Math.random() * dataParse.length)]
    //         return RandomObj
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }
}

module.exports = Contenedor