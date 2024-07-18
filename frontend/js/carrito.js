$(document).ready(function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function actualizarCarrito() {
        const carritoBody = $('#carrito-body');
        carritoBody.empty();
        let total = 0;

        carrito.forEach(item => {
            const row = $('<tr></tr>');

            const nombre = $('<td></td>').text(item.nombreV); // Cambiado de item.nombre a item.nombreV
            const precio = $('<td></td>').text('$0'); // Cambiar según tu lógica de precios
            const cantidad = $('<td></td>').text('1'); // Cambiar según tu lógica de cantidad
            const subtotal = $('<td></td>').text('$0'); // Cambiar según tu lógica de subtotal
            const acciones = $('<td></td>');
            const eliminarBtn = $('<button></button>').addClass('btn btn-danger').text('Eliminar').on('click', () => eliminarDelCarrito(item.id));

            acciones.append(eliminarBtn);
            row.append(nombre, precio, cantidad, subtotal, acciones);
            carritoBody.append(row);

            total += 0; // Cambiar según tu lógica de precios
        });

        $('#total-carrito').text(total);
        $('#carritoCantidad').text(carrito.length);
    }

    function eliminarDelCarrito(id) {
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    $('#pagarBtn').on('click', function() {
        window.location.href = 'comprarnumero.html';
    });

    actualizarCarrito();
});

