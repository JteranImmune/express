const express = require('express');

const app = express();

let personas = ['Manuel' , 'Pedro' , 'Juan' , 'Raul' , 'Jesus']

app.get('/personas', function(request, response){
    response.send(personas); 
})

app.get('/personas/:persona', function(request, response){

    let persona = request.params.persona;
    
    if(!personas.includes(persona)){
        return response.status(404).send(`La persona ${persona} no existe en la lista de personas`);
        }else{
            response.send(`La persona ${persona} si existe en la lista de personas`);
        }
    });

app.listen(process.env.PORT || 3000);
