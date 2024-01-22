const express = require('express');

const app = express();

app.get('/agregar/:nombre', function(request, response){

    let nombreASumar = request.params.nombre;
    let estudiantes = ['Jose', 'Carlos' , 'Santiago', 'Mildry', 'Ester', 'Nuria'];
    estudiantes.push(nombreASumar)
    response.send(`Se ha agregado ${nombreASumar} a la lista de ${estudiantes.join(', ')}`);
})

app.listen(process.env.PORT || 3000);