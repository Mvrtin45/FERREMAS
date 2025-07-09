// PEDIDOS
function validarYFiltrarPedidos() {
    const input = document.getElementById('busquedaPedido');

    // Limpiar todo lo que no sea letra, espacio o caracteres especiales comunes en español
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

    filtrarYBuscarPedidos();
}

function filtrarYBuscarPedidos() {
    const textoFiltro = document.getElementById('busquedaPedido').value.toLowerCase();
    const estadoFiltro = document.getElementById('filtroEstado').value.toLowerCase();

    const filas = document.querySelectorAll('#tablaPedidos tbody tr');

    for (let i = 0; i < filas.length; i += 2) {
        const filaPrincipal = filas[i];
        const filaFormulario = filas[i + 1];

        const idPedido = filaPrincipal.children[0].textContent.toLowerCase();
        const cliente = filaPrincipal.children[1].textContent.toLowerCase();
        const estado = filaPrincipal.children[2].textContent.toLowerCase();

        // Solo buscar texto en cliente, y evitar búsqueda por ID que puede tener números
        const coincideTexto = !textoFiltro || cliente.includes(textoFiltro);

        const coincideEstado = !estadoFiltro || estado === estadoFiltro;

        const mostrar = coincideTexto && coincideEstado;

        filaPrincipal.style.display = mostrar ? '' : 'none';
        if (filaFormulario) filaFormulario.style.display = mostrar ? '' : 'none';
    }
}
function mostrarDetallePedido(pedidoId) {
    fetch(`/api/api/detalle_pedido/${pedidoId}/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("detallePedidoId").textContent = data.id;
            document.getElementById("detalleCliente").textContent = data.cliente;
            document.getElementById("detalleEstado").textContent = data.estado;
            document.getElementById("detalleFecha").textContent = data.fecha;

            const contenedor = document.getElementById("contenedorHerramientas");
            contenedor.innerHTML = ""; // limpiar antes de insertar

            data.detalles.forEach(det => {
                const col = document.createElement("div");
                col.className = "col-md-6";

                col.innerHTML = `
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h6 class="card-title">${det.herramienta}</h6>
                            <p class="card-text">Cantidad: ${det.cantidad}</p>
                            <p class="card-text">Precio: $${det.precio}</p>
                            ${det.imagen ? `<img src="${det.imagen}" class="img-fluid rounded" alt="Imagen herramienta">` : '<p class="text-muted">Sin imagen</p>'}
                        </div>
                    </div>
                `;

                contenedor.appendChild(col);
            });

            const modal = new bootstrap.Modal(document.getElementById('modalDetallePedido'));
            modal.show();
        })
        .catch(error => {
            console.error("Error al cargar detalle del pedido:", error);
            alert("Error al cargar detalles.");
        });
}
// HERRAMIENTAS
function editarHerramienta(id) {
    window.location.href = `/editar_herramienta/${id}/`;
}
function eliminarHerramienta(id) {
    if (confirm("¿Estás seguro de eliminar esta herramienta?")) {
        fetch(`/eliminar_herramienta/${id}/`, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            }
        }).then(() => location.reload());
    }
}
function mostrarDetalle(id, nombre, categoria, precio, stock, imagenUrl) {
    document.getElementById('detalleId').innerText = id;
    document.getElementById('detalleNombre').innerText = nombre;
    document.getElementById('detalleCategoria').innerText = categoria;
    document.getElementById('detallePrecio').innerText = precio;
    document.getElementById('detalleStock').innerText = stock;

    const img = document.getElementById('detalleImagen');
    if (imagenUrl) {
        img.src = imagenUrl;
        img.alt = nombre;
        img.style.display = "block";
    } else {
        img.style.display = "none";
    }
}
function validarYFiltrarHerramientas() {
    const input = document.getElementById('filtroNombre');
    // Permite solo letras, espacios y caracteres especiales comunes en español
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');

    filtrarYBuscarHerramientas();
}
function filtrarYBuscarHerramientas() {
    const nombreFiltro = document.getElementById('filtroNombre').value.toLowerCase();
    const categoriaFiltro = document.getElementById('filtroCategoria').value.toLowerCase();

    const filas = document.querySelectorAll('#tablaProductos tbody tr');

    for (let i = 0; i < filas.length; i += 2) {
        const filaPrincipal = filas[i];
        const filaFormulario = filas[i + 1];

        const nombre = filaPrincipal.children[1].textContent.toLowerCase();
        const categoria = filaPrincipal.children[2].textContent.toLowerCase();

        const coincideNombre = !nombreFiltro || nombre.includes(nombreFiltro);
        const coincideCategoria = !categoriaFiltro || categoria.includes(categoriaFiltro);

        const mostrar = coincideNombre && coincideCategoria;

        filaPrincipal.style.display = mostrar ? '' : 'none';
        if (filaFormulario) filaFormulario.style.display = mostrar ? '' : 'none';
    }
}
// Obtener token CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}