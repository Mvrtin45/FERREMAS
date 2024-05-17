// Obtener los trámites del localStorage
var tramites = JSON.parse(localStorage.getItem('tramites')) || [];

// Obtener el elemento UL donde se mostrarán los trámites
var listaTramites = document.getElementById('tramites-list');

// Mostrar los trámites en la lista
tramites.forEach(function(tramite) {
    var li = document.createElement('li');
    li.textContent = tramite;
    listaTramites.appendChild(li);
});
