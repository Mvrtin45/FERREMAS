$(document).ready(function() {

    function cargarTramitesPerfil() {

        var tramitesGuardados = JSON.parse(localStorage.getItem('tramites')) || [];

        var $listaTramitesPerfil = $('#tramites-list');

        $listaTramitesPerfil.empty();

        $.each(tramitesGuardados, function(index, tramite) {
            var li = $('<li>').text(tramite.nombre + ' ' + tramite.apellido + ' - ' + tramite.pais + ' (' + tramite.motivo + ')');
            $listaTramitesPerfil.append(li);
        });
    }

    cargarTramitesPerfil();
});

