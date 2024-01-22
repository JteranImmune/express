const express = require('express');

const app = express();

app.get('/', function(request, response){

    response.send('<h1>Hola Mundo</h1><br><h2>desde express</h2>');
})

app.listen(process.env.PORT || 3000);