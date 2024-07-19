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
        $.ajax({
            url: `http://127.0.0.1:8000/api/tramitevisa/${id}/`,
            type: 'DELETE',
            success: function(response) {
                alert('Trámite de visa eliminado correctamente');
                carrito = carrito.filter(item => item.id !== id);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                alert('Error al eliminar el trámite de visa');
            }
        });
    }
    
    $('#carrito-body').on('click', '.eliminar-btn', function() {
        const tramiteId = $(this).data('id');
    
        if (confirm('¿Estás seguro de que deseas eliminar este trámite de visa?')) {
            eliminarDelCarrito(tramiteId);
        }
    });

    actualizarCarrito();
});
