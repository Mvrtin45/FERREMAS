// Función para obtener cookie por nombre (para CSRF)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los botones con clase "btn-agregar-carrito"
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const productoId = boton.getAttribute('data-producto-id');
            if (!productoId) {
                alert('Error: no se encontró el ID del producto');
                return;
            }

            // Enviar POST para agregar producto al carrito
            fetch('/api/agregar-carrito/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'), // Si usas CSRF
                },
                body: JSON.stringify({ producto_id: productoId }),
            })
            .then(response => {
                if (!response.ok) throw new Error('Error al agregar al carrito');
                return response.json();
            })
            .then(data => {
                alert(data.mensaje || 'Producto agregado al carrito');
                // Opcional: actualizar contador carrito o UI
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al agregar al carrito');
            });
        });
    });
});
