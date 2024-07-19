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
            const eliminarBtn = $('<button></button>').addClass('btn btn-danger').text('Eliminar').on('click', () => eliminarDelCarrito(item.id));
            acciones.append(eliminarBtn);

            row.append(nombre, apellido, tramite, precio, acciones);
            carritoBody.append(row);

            total += 4000;
        });

        $('#total-carrito').text(`$${total}`);
        $('#carritoCantidad').text(carrito.length);
    }

    function eliminarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carritoCedula', JSON.stringify(carrito));
        actualizarCarrito();
    }

    $('#pagarBtn').on('click', function() {
        window.location.href = 'comprarnumero.html';
    });

    actualizarCarrito();
});
