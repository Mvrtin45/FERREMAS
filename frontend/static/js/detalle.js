document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id");

    fetch(`/api/herramienta/${idProducto}/`)
        .then(response => {
            if (!response.ok) throw new Error("Producto no encontrado");
            return response.json();
        })
        .then(producto => {
            const detalleContainer = document.getElementById("detalle-producto");
            detalleContainer.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <p><strong>Precio:</strong> $${producto.precio.toLocaleString()}</p>
                        <button class="btn btn-success" id="agregar-carrito"
                            data-id="${producto.id}"
                            data-nombre="${producto.nombre}"
                            data-precio="${producto.precio}"
                            data-imagen="${producto.imagen}">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            document.getElementById("detalle-producto").innerHTML = "<p>Producto no encontrado.</p>";
        });
});