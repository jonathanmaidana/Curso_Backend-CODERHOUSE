process.on('message', mensaje => {
    const calculo = () => {
        let suma = 0
        //Si trae un numero por argumento hace la operación con ese numero
        if(Number(mensaje)){
            for(let i=0; i < mensaje; i++){
                suma += i
            }
            return suma
        // Si no trae ningún numero por argumento devuelve un numero random
        }else{
            for(let i=0; i < 6e9; i++){
                suma += i
            }
            return suma
        }
    }
    process.send(`La suma es ${calculo()}`)
})
