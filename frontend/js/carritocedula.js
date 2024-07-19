$(document).ready(function() {
    let carrito = JSON.parse(localStorage.getItem('carritoCedula')) || [];

    function actualizarCarrito() {
        const carritoBody = $('#carrito-body');
        carritoBody.empty();
        let total = 0;

        carrito.forEach(item => {
            const row = $('<tr></tr>');

            const nombre = $('<td></td>').text(item.nombreC);
            const apellido = $('<td></td>').text(item.apellidoC);
            const tramite = $('<td></td>').text('Solicitud de Cédula de Identidad');
            const precio = $('<td></td>').text('$4000');

            const acciones = $('<td></td>');
            const eliminarBtn = $('<button></button>')
                .addClass('btn btn-danger eliminar-btn')
                .text('Eliminar')
                .data('id', item.id); // Asegúrate de que el ID esté correctamente asignado
            acciones.append(eliminarBtn);

            row.append(nombre, apellido, tramite, precio, acciones);
            carritoBody.append(row);

            total += 4000;
        });

        $('#total-carrito').text(`$${total}`);
        $('#carritoCantidad').text(carrito.length);
    }

    function eliminarDelCarrito(id) {
        if (id) { // Verifica que el ID no sea undefined o null
            $.ajax({
                url: `http://127.0.0.1:8000/api/tramitecedula/${id}/`,
                type: 'DELETE',
                success: function(response) {
                    alert('Trámite de cédula eliminado correctamente');
                    // Actualiza el carrito en el localStorage y en la interfaz de usuario
                    carrito = carrito.filter(item => item.id !== id);
                    localStorage.setItem('carritoCedula', JSON.stringify(carrito));
                    actualizarCarrito();
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    alert('Error al eliminar el trámite de cédula');
                }
            });
        } else {
            alert('ID del trámite no definido');
        }
    }

    // Manejo del clic en el botón de eliminar
    $('#carrito-body').on('click', '.eliminar-btn', function() {
        const tramiteId = $(this).data('id'); // Recupera el ID del botón

        if (confirm('¿Estás seguro de que deseas eliminar este trámite de cédula?')) {
            eliminarDelCarrito(tramiteId);
        }
    });

    actualizarCarrito();
});


