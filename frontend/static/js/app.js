document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaPedidos");
  const API_URL = 'http://http://127.0.0.1/:8000/api/pedidos/';

  // Función para cargar pedidos desde el backend
  async function cargarPedidos() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al obtener pedidos');
      const pedidos = await res.json();
      renderTabla(pedidos);
    } catch (error) {
      console.error(error);
      tabla.innerHTML = `<tr><td colspan="5" class="text-center text-danger">No se pudo cargar la información</td></tr>`;
    }
  }

  // Función para actualizar el estado de un pedido en backend
  async function actualizarEstado(pedidoId, nuevoEstado) {
    try {
      const res = await fetch(`${API_URL}${pedidoId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      if (!res.ok) throw new Error('Error al actualizar estado');
      await cargarPedidos(); // recarga la tabla actualizada
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el estado del pedido.');
    }
  }

  // Función para crear las filas de la tabla según estado
  function renderTabla(pedidos) {
    tabla.innerHTML = '';

    pedidos.forEach(pedido => {
      // Construir lista de productos
      const productos = pedido.detalles.map(d => `${d.herramienta_nombre} (x${d.cantidad})`).join(', ');

      // Definir botones según estado
      let accionesHTML = '';
      if (pedido.estado === 'Pendiente') {
        accionesHTML = `<button class="btn btn-sm btn-warning" onclick="aceptarOrden('${pedido.id}')">Aceptar y Preparar</button>`;
      } else if (pedido.estado === 'En preparación') {
        accionesHTML = `<button class="btn btn-sm btn-success" onclick="marcarComoLista('${pedido.id}')">Marcar como Lista</button>`;
      } else if (pedido.estado === 'Lista para entrega') {
        accionesHTML = `<span class="badge bg-secondary">Listo para entrega</span>`;
      } else {
        accionesHTML = `<span>${pedido.estado}</span>`;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${pedido.id}</td>
        <td>Cliente X</td> <!-- Ajusta para mostrar cliente real si tienes -->
        <td>${productos}</td>
        <td>${pedido.estado}</td>
        <td>${accionesHTML}</td>
      `;

      tabla.appendChild(tr);
    });
  }

  // Exponer funciones para botones globalmente para que onclick funcione
  window.aceptarOrden = function(id) {
    actualizarEstado(id, 'En preparación');
  };

  window.marcarComoLista = function(id) {
    actualizarEstado(id, 'Lista para entrega');
  };

  // Carga inicial
  cargarPedidos();
});
