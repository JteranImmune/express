const express = require('express');

const app = express();

app.get('/numero/:numero', function(request, response){
    
    let numero = request.params.numero;
    let ramdomNumber = Math.floor(Math.random() * (numero - 1 + 1) + 1);

    response.send('Numero aleatorio es' + ' ' + ramdomNumber);
})

app.listen(process.env.PORT || 3000);