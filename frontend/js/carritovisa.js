$(document).ready(function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function actualizarCarrito() {
        const carritoBody = $('#carrito-body');
        carritoBody.empty();
        let total = 0;

        carrito.forEach(item => {
            const row = $('<tr></tr>');

            // Mostrar nombre, apellido, tipo de trámite y precio
            const nombre = $('<td></td>').text(item.nombreV);
            const apellido = $('<td></td>').text(item.apellidoV);
            const tramite = $('<td></td>').text('Solicitud de Visa');
            const precio = $('<td></td>').text('$4000');

            // Crear la columna de acciones y agregar el botón de eliminar
            const acciones = $('<td></td>');
            const eliminarBtn = $('<button></button>').addClass('btn btn-danger').text('Eliminar').on('click', () => eliminarDelCarrito(item.id));
            acciones.append(eliminarBtn);

            row.append(nombre, apellido, tramite, precio, acciones); // Agregar todas las columnas
            carritoBody.append(row);

            total += 4000; // Sumar el precio del ítem al total
        });

        $('#total-carrito').text(`$${total}`);
        $('#carritoCantidad').text(carrito.length);
    }

    function eliminarDelCarrito(id) {
        console.log(`Eliminando tramite con ID: ${id}`);
        $.ajax({
            url: `http://127.0.0.1:8000/api/tramitevisa/${id}/`, // Asegúrate de que esta URL es correcta
            type: 'DELETE',
            success: function(result) {
                console.log('Trámite eliminado');
                // Actualiza el carrito después de la eliminación
            },
            error: function(xhr, status, error) {
                console.error(`Error al eliminar el trámite: ${xhr.responseText}`);
            }
        });
    }
    
    $(document).on('click', '.eliminar-btn', function() {
        var id = $(this).data('id');
        eliminarDelCarrito(id);
    });

    actualizarCarrito();
});
