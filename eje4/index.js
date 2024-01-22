const express = require('express');
const saludarEnExpress = require('./saludar.js');

const app = express();

app.get('/saludo', function(request, response){
    response.send(saludarEnExpress());
})

app.listen(process.env.PORT || 3000);