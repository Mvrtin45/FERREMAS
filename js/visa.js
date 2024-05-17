function generarNumeroSerie() {
    // Generar un número aleatorio de 8 dígitos
    var numeroAleatorio = Math.floor(10000000 + Math.random() * 90000000);
    return 'TF' + numeroAleatorio; // Prefijo 'TF' seguido del número aleatorio
}

function enviarFormularioVisa() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var pais = document.getElementById('pais').value;
    var motivo = document.getElementById('motivo').value;
    
    var numeroSerie = generarNumeroSerie();
    
    var solicitudVisa = {
        numeroSerie: numeroSerie,
        nombre: nombre,
        apellido: apellido,
        pais: pais,
        motivo: motivo
    };

    localStorage.setItem('solicitudVisa', JSON.stringify(solicitudVisa));
    
    alert('Su solicitud de visa ha sido enviada con éxito. Número de serie: ' + numeroSerie);
    // Redirigir al usuario a otra página después de enviar el formulario
    window.location.href = '/indexs/perfil.html';
}

document.getElementById('visa-form').addEventListener('submit', function(event) {
    event.preventDefault();
    enviarFormularioVisa();
});


