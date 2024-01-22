const express = require('express');
const almacen = require('./almacen');

const app = express();

let cesta = [];

// app.get('/departamento/licores', function(request, response){

//     let table = '';
//     for (let i= 0; i < almacen[0].productos.length; i++){

//         let producto = almacen[0].productos[i];

//         if(almacen[0].nombre === 'licores'){
//             table += `<tr>
//                         <td>${producto.nombre}</td>
//                         <td>$${parseFloat(producto.precio).toFixed(2)}</td>
//                         <td>${producto.stock}</td>
//                     </tr>`
//                 }
//             };

//     response.send(`
//         <h2>${almacen[0].nombre}</h2>
//         <table style="width: 25%;" border="2" cellpadding="5">
//             <thead>
//                 <tr>
//                     <td><b>Nombre<b></td>
//                     <td><b>Precio<b></td>
//                     <td><b>Stock<b></td>
//                 </tr>
//             <thead>
//             <tbody>
//                 ${table}
//             </tbody>
//         </table>`);
// });

app.get('/departamento/:departamento', function(request, response){

    response.send(showStock(request.params.departamento));

});

app.get('/comprar/departamento/:departamento/producto/:producto/cantidad/:cantidad', function(request, response){

    const {producto, cantidad, departamento} = request.params;

    let indice = almacen.findIndex(d => d.nombre === departamento);

    let iProducto = almacen[indice].productos.findIndex(p => p.nombre === producto);

    if(indice < 0){
        response.send('El departamento ' + departamento + ' no existe')
        return;
    }

    if(iProducto < 0){
        response.send('El producto ' + producto + ' no existe')
        return;
    }

    if(almacen[indice].productos[iProducto].stock < cantidad){
        response.send('El producto ' + producto + ' no tiene stock disponible')
        return;
    }
    
    let importe = cantidad * almacen[indice].productos[iProducto].precio;

    cesta.push({
        departamento, producto, cantidad, importe
    })
    almacen[indice].productos[iProducto].stock -= cantidad;


    response.send(cesta);
});

app.get('/cesta', function(request, response){
    response.send(cesta);
});

app.get('/checkout', function(request, response){

    let compraTotal = 0;
    cesta.forEach(p => compraTotal += p.importe);

    cesta = [];
     
    request.send('Se realizó la compra');
});


let showStock = (departamento) => {

    let table = '';

    let indice = almacen.findIndex( e => e.nombre === departamento);

    if(almacen[0].nombre === departamento){
        for (let i= 0; i < almacen[indice].productos.length; i++){
            let producto = almacen[indice].productos[i];
                table += `<tr>
                        <td>${producto.nombre}</td>
                        <td>$${parseFloat(producto.precio).toFixed(2)}</td>
                        <td>${producto.stock}</td>
                    </tr>`;
                }
                return `
                <h2>${almacen[indice].nombre}</h2>
                <table style="width: 25%;" border="2" cellpadding="5">
                    <thead>
                        <tr>
                            <td><b>Nombre<b></td>
                            <td><b>Precio<b></td>
                            <td><b>Stock<b></td>
                        </tr>
                    <thead>
                    <tbody>
                        ${table}
                    </tbody>
                </table>
                `        
    } else {
        return `El departamento ${departamento} no existe`
    }
                
}


app.listen(process.env.PORT || 3000, (e) =>{
    e
    ? console.log(`Error en servidor: ${e}`)
    : console.log("Servidor andando!");
});