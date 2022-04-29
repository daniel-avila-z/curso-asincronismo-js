/**
 * Aqui la promesa se ejecuta al cargar el archivo
*/
const someThingWillHappen = () => {
    //retornar una promesa con dos argumentos (resolve=si se ejecuta, reject=si se rechaza)
    return new Promise((resolve, reject) => {
        if (true) {//si es verdadero, vamos a devolver:
           resolve('Siuuuuヾ(⌐■_■)ノ♪')
       } else {//si no entonces devolvemos:
           reject('No funcionò Papu(˘･_･˘)')
       };
        
    });
};

/**
 *Aqui la promesa no se ejecuta hasta que se llame a la funcion
*///ejecutamos la funcion
someThingWillHappen()
    //si estamos obteniendo un resolve
    .then(response => console.log(response))
    //si obtenemos un reject
    .catch(error => console.log(error));

//Crear segunda funcion
const someThingWillHappen2 = () => {// retornamos la promesa
    return new Promise((resolve, reject) => {
        if (true) {// Si es verdadero, devolvemos True en 3 segundos
            setTimeout(() => {
                resolve('True');
            }, 3000)
        } else {// Si no entonces devolvemos el error
            // De esta forma "new Error" podemos debbugear mejor
            const error = new Error('No funcionò Papu(˘･_･˘)')
            reject(error);
        };
    });
};
//ejecutamos la Funcion 2
someThingWillHappen2()//Si obtenemos un resolve
    .then(response => console.log(response))
    .catch(error => console.log(error));//si obtenemos un reject
//ejecutamos todas las promesas
Promise.all([someThingWillHappen(), someThingWillHappen2()])
    .then(response => {//Si obtenemos un resolve
        console.log('Array of results:', response);
    })
    .catch(error => {//Si obtenemos un reject
        console.error(error);
    });
