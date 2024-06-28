$(document).ready(function() {
    // Generar un número aleatorio entre 21 y 100
    const numeroAleatorio = Math.floor(Math.random() * (40 - 30 + 1)) + 30;

    // Mostrar el número generado en el elemento con id 'numeroDeAtencion'
    $('#numeroDeAtencion').text(numeroAleatorio);
});