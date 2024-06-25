$(document).ready(function() {
    
    $('#seguimientoForm').submit(function(event) {
        event.preventDefault(); 

        var nombreTramite = $('#nombre_tramite').val();
        var numeroSeguimiento = $('#numero_seguimiento').val();

        console.log('Nombre del trámite:', nombreTramite);
        console.log('Número de seguimiento:', numeroSeguimiento);

        alert('Búsqueda de trámite exitosa: ' + nombreTramite);
    });
});
