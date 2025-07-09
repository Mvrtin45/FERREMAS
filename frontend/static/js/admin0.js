// PEDIDOS
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

        const coincideTexto = !textoFiltro || idPedido.includes(textoFiltro) || cliente.includes(textoFiltro);
        const coincideEstado = !estadoFiltro || estado === estadoFiltro;

        const mostrar = coincideTexto && coincideEstado;

        filaPrincipal.style.display = mostrar ? '' : 'none';
        if (filaFormulario) filaFormulario.style.display = mostrar ? '' : 'none';
    }
}
function mostrarDetallePedido(pedidoId) {
  const contenido = document.getElementById('contenidoDetallePedido');
  contenido.innerHTML = '<p>Cargando detalles...</p>';

  fetch(`/api/pedidos/${pedidoId}/detalle/`)  // Asegúrate que esta URL exista y devuelva JSON con detalle
    .then(response => response.json())
    .then(data => {
      if (data.detalles && data.detalles.length > 0) {
        let html = `<p><strong>Cliente:</strong> ${data.cliente}</p>`;
        html += `<p><strong>Dirección:</strong> ${data.direccion || 'No especificada'}</p>`;
        html += `<p><strong>Estado:</strong> ${data.estado}</p>`;
        html += `<table class="table table-sm">
                    <thead>
                      <tr>
                        <th>Herramienta</th>
                        <th>Cantidad</th>
                        <th>Precio unitario</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>`;
        data.detalles.forEach(item => {
          html += `<tr>
                    <td>${item.herramienta}</td>
                    <td>${item.cantidad}</td>
                    <td>$${item.precio}</td>
                    <td>$${item.total}</td>
                  </tr>`;
        });
        html += `</tbody></table>`;
        contenido.innerHTML = html;
      } else {
        contenido.innerHTML = '<p>No se encontraron detalles para este pedido.</p>';
      }
    })
    .catch(err => {
      contenido.innerHTML = `<p>Error al cargar detalles: ${err}</p>`;
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