const express = require('express');

const app = express();

const datos = {
    nombre: 'Juan',
    apellido: 'Hernandez',
    edad: 25
}

app.get('/nombre/:nombre', function(request, response){

    let nombre = request.params.nombre;
    datos.nombre = nombre
    response.send(datos);
})

app.get('/apellido/:apellido', function(request, response){

    let apellido = request.params.apellido;
    datos.apellido = apellido;
    response.send(datos);
})

app.get('/edad/:edad', function(request, response){

    let edad = request.params.edad;
    datos.edad = edad;
    response.send(datos);
})

app.listen(process.env.PORT || 3000);