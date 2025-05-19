// Obtener cookie CSRF (para Django)
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

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id");

    if (!idProducto) {
        document.getElementById("detalle-producto").innerHTML = "<p>Producto no especificado.</p>";
        return;
    }

    fetch(`/api/herramienta/${idProducto}/`)
        .then(response => {
            if (!response.ok) throw new Error("Producto no encontrado");
            return response.json();
        })
        .then(producto => {
            const contenedor = document.getElementById("detalle-producto");
            let precio = parseFloat(producto.precio) || 0;

            contenedor.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <p><strong>Precio:</strong> $${precio.toLocaleString()}</p>
                        <button class="agregar-carrito btn btn-success"
                            data-id="${producto.id}">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            `;

            // Agregar evento al botón después de insertarlo
            const boton = contenedor.querySelector(".agregar-carrito");
            boton.addEventListener("click", function () {
                const productoId = this.getAttribute("data-id");

                fetch("/api/agregar-carrito/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    body: JSON.stringify({ producto_id: productoId }),
                })
                    .then(response => {
                        if (!response.ok) throw new Error("Error al agregar al carrito");
                        return response.json();
                    })
                    .then(data => {
                        alert(data.mensaje || "Producto agregado al carrito");
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("Error al agregar al carrito");
                    });
            });
        })
        .catch(error => {
            document.getElementById("detalle-producto").innerHTML = "<p>Producto no encontrado.</p>";
            console.error(error);
        });
});
