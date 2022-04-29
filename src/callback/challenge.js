// Instanciando el request.
//Permite hacer peticiones a algun servidor en la nube
let XMLHttprequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback){//referencia al objeto XMLHttpRequest
    let xhttp = new XMLHttprequest();
     /* 
    A nuestra referencia xhttp le pasamos un LLAMADO 'open'
    donde: parametro1 = el metodo, parametro2 = la url,
    parametro3 = verificación si es asincrono o no, valor por defecto true
    */
    xhttp.open('GET', url_api, true);
    //Cuando el estado del objeto cambia, ejecutar la función:
    xhttp.onreadystatechange = function(event){
        if(xhttp.readyState === 4){
            if(xhttp.status === 200){
                callback(null, JSON.parse(xhttp.responseText)); 
            //como dice la misma respuesta xhttp.responseText,
            //te esta devolviendo un simple texto y el método JSON.parse() lo convierte en un objeto entendible por javascript
            }else{
                const error = new Error('Error ' + url_api);
                return callback(error, null);
            }
        }
    }
    xhttp.send();//Envio de la solicitud.
};

fetchData(API, function (error1, data1){
    if(error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function(error2, data2){
        if (error2) return console.error(error2);
        fetchData(data2.origin.url, function(error3, data3){
            if (error3) return console.error(error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        })
    })
})

/*
    los estados que puede tener son:
    estado 0: inicializado
    estado 1: cargando
    estado 2: ya se cargó
    estado 3: ya hay información
    estado 4: solicitud completa
    PD: recuerda estas trabajando con una API externa osea un servidor por lo que
    depende del servidor cuanto demore en cada estado haces un pedido por datos
    (request) y solo es aplicar lógica.
*/
//Verificar estado, aqui un resumen de los casos mas comunes:
/*
ESTADO 1xx (100 - 199): Indica que la petición esta siendo procesada.
ESTADO 2xx (200 - 299): Indica que la petición fue recibida, aceptada y procesada correctamente. Ha sido completada con éxito.
ESTADO 3xx (300 - 399): Indica que hay que tomar acciones adicionales para completar la solicitud. Por lo general indican redireccionamiento.
ESTADO 4xx (400 - 499): Errores del lado del cliente. Indica se hizo mal la solicitud de datos.
ESTADO 5xx (500 - 599): Errores del Servidor. Indica que fallo totalmente la ejecución.
*/