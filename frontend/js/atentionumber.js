$(document).ready(function() {
    // Generar un número aleatorio entre 30 y 40
    const numeroAleatorio = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
    $('#numeroAtencion').text(`Número de Atención: ${numeroAleatorio}`);

    // Mostrar la fecha y hora actual
    const now = new Date();
    const fechaHoy = now.toLocaleDateString('es-ES');
    const horaActual = now.toLocaleTimeString('es-ES');
    $('#fechaHoy').text(`Fecha: ${fechaHoy}`);
    $('#horaActual').text(`Hora: ${horaActual}`);
});