function buscarTramite() {
    // Obtener los valores ingresados por el usuario
    var nombreTramite = document.getElementById('nombre_tramite').value;
    var numeroSeguimiento = document.getElementById('numero_seguimiento').value;

    // Comprobar si existe un trámite con el número de seguimiento dado
    var tramiteEncontrado = buscarTramiteEnLocalStorage(nombreTramite, numeroSeguimiento);

    // Mostrar el resultado de la búsqueda
    mostrarResultado(tramiteEncontrado);
}

function buscarTramiteEnLocalStorage(nombreTramite, numeroSeguimiento) {
    // Obtener los trámites almacenados en el localStorage
    var tramites = JSON.parse(localStorage.getItem('tramites')) || [];

    // Buscar el trámite por el número de seguimiento
    var tramiteEncontrado = tramites.find(function(tramite) {
        return tramite.nombre === nombreTramite && tramite.numero === numeroSeguimiento;
    });

    return tramiteEncontrado;
}

function mostrarResultado(tramiteEncontrado) {
    var resultadoDiv = document.getElementById('resultadoBusqueda');

    // Limpiar cualquier resultado previo
    resultadoDiv.innerHTML = '';

    if (tramiteEncontrado) {
        // Mostrar los detalles del trámite encontrado
        resultadoDiv.innerHTML = `
            <h3>Resultado de la búsqueda:</h3>
            <p>Nombre del trámite: ${tramiteEncontrado.nombre}</p>
            <p>Número de seguimiento: ${tramiteEncontrado.numero}</p>
            <!-- Agrega más detalles del trámite según tus necesidades -->
        `;
    } else {
        // Mostrar un mensaje de error si no se encontró ningún trámite
        resultadoDiv.innerHTML = '<p>No se encontró ningún trámite con los datos proporcionados.</p>';
    }
}

