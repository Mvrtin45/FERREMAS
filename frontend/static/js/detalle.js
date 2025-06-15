// Obtener CSRF para cuando hagamos operaciones de POST, etc.
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
    const idProducto = new URLSearchParams(window.location.search).get("id"); 

    if (!idProducto) {
        document.getElementById("detalle-producto").innerHTML = "<p>Producto no especificado.</p>";
        return;
    }

    fetch(`/api/Herramienta/${idProducto}/`)
        .then(response => {
            if (!response.ok) throw new Error("Producto no encontrado.");
            return response.json();
        })
        .then(producto => {
            const contenedor = document.getElementById("detalle-producto");

            contenedor.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <h2>${producto.nombre_herramienta}</h2>
                        <p><strong>Precio:</strong> $${producto.precio.toLocaleString()}</p>
                        <p>Stock disponible: ${producto.stock}</p>
                        <button class="agregar-carrito btn btn-success" id="agregar" data-id="${producto.id}">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            `;


            document.getElementById('agregar').addEventListener('click', function () {
                const id = this.dataset.id;

                fetch('/api/agregar-carrito/', {
                    method:'POST',
                    headers:{ 
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    body: JSON.stringify({producto_id: id}),
                })
                .then(r=>{
                    if (!r.ok) throw new Error("Error al añadir al carrito.");
                    return r.json();
                })
                .then(data=>{
                    alert(data.mensaje);
                })
                .catch(err=>{
                    console.error(err);
                    alert("Error.");
                })
            });

        })
        .catch(error => {
            document.getElementById("detalle-producto").innerHTML = "<p>Producto no encontrado.</p>";
            console.error(error);
        });
});
