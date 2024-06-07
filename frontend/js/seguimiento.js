$(document).ready(function() {
    // Función para manejar la búsqueda de trámites
    $('#seguimientoForm').submit(function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los datos del formulario
        var nombreTramite = $('#nombre_tramite').val();
        var numeroSeguimiento = $('#numero_seguimiento').val();

        // Aquí puedes agregar la lógica para buscar los trámites según los datos proporcionados
        // Por ejemplo, puedes hacer una solicitud AJAX al servidor para buscar los trámites

        // Por ahora, solo imprimo los datos en la consola para verificar
        console.log('Nombre del trámite:', nombreTramite);
        console.log('Número de seguimiento:', numeroSeguimiento);

        // Mostrar mensaje de búsqueda exitosa (puedes reemplazar esto con tu lógica real)
        alert('Búsqueda de trámite exitosa: ' + nombreTramite);
    });
});
