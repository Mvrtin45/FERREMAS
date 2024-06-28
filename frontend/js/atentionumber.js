$(document).ready(function() {
    // Generar un número aleatorio entre 21 y 100
    var numeroAleatorio = Math.floor(Math.random() * (100 - 21 + 1)) + 21;

    // Mostrar el número generado en el elemento con id 'numeroDeAtencion'
    $('#numeroDeAtencion').text(numeroAleatorio);
});