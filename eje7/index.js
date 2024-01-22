const express = require('express');
const numeros = require('./numeros');
const numeroAleatorio = require('./numeroAleatorio');

const app = express();

app.get('/sumar', function(request, response){

    let numeroA = numeroAleatorio();
    numeros[numeroA]++

    response.send(numeros);
})

app.get('/borrar/:indice' , function(request, response){
    
    if(request.params.indice === numeros.length){
        numeros[request.params.indice] = 0;
        response.send(numeros);
    } else {
        response.send(`El indice no está en el array`);
    }

});

app.listen(process.env.PORT || 3000, (e) =>{
    e
    ? console.log(`Error en servidor: ${e}`)
    : console.log("Servidor andando!");
});