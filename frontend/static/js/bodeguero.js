document.addEventListener("DOMContentLoaded", () => { 
  const tabla = document.getElementById("tablaPedidos");
  const API_OBTENER = 'http://127.0.0.1:8000/api/ordenes/';
  const API_ACTUALIZAR = 'http://127.0.0.1:8000/api/ordenes/actualizar/';

  // Cargar las órdenes desde el backend
  async function cargarOrdenes() {
    try {
      const res = await fetch(API_OBTENER);
      if (!res.ok) throw new Error('Error al obtener órdenes');
      const data = await res.json();
      renderTabla(data.ordenes);
    } catch (error) {
      console.error(error);
      tabla.innerHTML = `<tr><td colspan="5" class="text-center text-danger">No se pudo cargar la información</td></tr>`;
    }
  }

  // Actualizar estado de una orden
  async function actualizarEstadoOrden(id, nuevoEstado) {
    try {
      const res = await fetch(API_ACTUALIZAR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado: nuevoEstado })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.mensaje || 'Error al actualizar');
      await cargarOrdenes();
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el estado de la orden.');
    }
  }

  // Renderizar la tabla de órdenes
  function renderTabla(ordenes) {
    tabla.innerHTML = '';

    if (ordenes.length === 0) {
      tabla.innerHTML = `<tr><td colspan="5" class="text-center">No hay órdenes disponibles</td></tr>`;
      return;
    }

    ordenes.forEach(orden => {
      const productos = orden.productos.map(p => `${p.nombre} (x${p.cantidad})`).join(', ');

      let acciones = '';
      switch (orden.estado) {
        case 'pendiente':
          acciones = `<button class="btn btn-sm btn-warning" onclick="prepararOrden(${orden.id})">Aceptar y Preparar</button>`;
          break;
        case 'preparando':
          acciones = `<button class="btn btn-sm btn-success" onclick="entregarOrden(${orden.id})">Marcar como Entregada</button>`;
          break;
        case 'entregado':
          acciones = `<span class="badge bg-secondary">Entregada</span>`;
          break;
        default:
          acciones = `<span>${orden.estado}</span>`;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${orden.id}</td>
        <td>${orden.cliente}</td>
        <td>${productos}</td>
        <td class="text-capitalize">${orden.estado}</td>
        <td>${acciones}</td>
      `;
      tabla.appendChild(tr);
    });
  }

  // Funciones globales para los botones
  window.prepararOrden = function (id) {
    actualizarEstadoOrden(id, 'preparando');
  };

  window.entregarOrden = function (id) {
    actualizarEstadoOrden(id, 'entregado');
  };

  // Carga inicial
  cargarOrdenes();
});