$(document).ready(function() {
    // Función para manejar la solicitud de visa
    $('#visaForm').submit(function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los datos del formulario
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var pais = $('#pais').val();
        var motivo = $('#motivo').val();

        // Crear un objeto con los datos del formulario
        var solicitudVisa = {
            nombre: nombre,
            apellido: apellido,
            pais: pais,
            motivo: motivo
        };

        // Almacenar la solicitud de visa en el localStorage
        var solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
        solicitudes.push(solicitudVisa);
        localStorage.setItem('solicitudes', JSON.stringify(solicitudes));

        // Mostrar mensaje de confirmación
        alert('Solicitud de visa enviada correctamente.');

        // Limpiar el formulario
        $('#visaForm')[0].reset();
    });
});

$(document).ready(function() {
    $('#visaForm').submit(function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
r
        // Por ahora, simularemos un envío exitoso después de 2 segundos
        setTimeout(function() {
            // Mostrar mensaje de éxito y ocultar formulario
            $('#mensajeExito').show();
            $('#visaForm').hide();
        }, 2000);
    });
});





