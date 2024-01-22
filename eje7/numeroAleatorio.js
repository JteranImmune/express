function numeroAleatorio() {

    let numero = Math.floor(Math.random() * (10 - 0));
    return numero;
}

module.exports = numeroAleatorio;