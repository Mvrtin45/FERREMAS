document.addEventListener("DOMContentLoaded", () => {
  const ordenesPendientes = [
      { id: 1, cliente: "Juan Pérez", productos: ["Martillo", "Clavos"], estado: "Pendiente" },
      { id: 2, cliente: "Ana Díaz", productos: ["Destornillador", "Tornillos"], estado: "Pendiente" }
  ];

  const ordenesEnPreparacion = [];
  const ordenesListas = [];

  const tabla = document.getElementById("tablaPedidos");

  const renderTabla = () => {
      tabla.innerHTML = "";

      const renderFila = (orden, accionesHTML) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${orden.id}</td>
              <td>${orden.cliente}</td>
              <td>${orden.productos.join(", ")}</td>
              <td>${orden.estado}</td>
              <td>${accionesHTML}</td>
          `;
          tabla.appendChild(tr);
      };

      ordenesPendientes.forEach(orden => {
          renderFila(
              orden,
              `<button class="btn btn-sm btn-warning" onclick="aceptarOrden(${orden.id})">Aceptar y Preparar</button>`
          );
      });

      ordenesEnPreparacion.forEach(orden => {
          renderFila(
              orden,
              `<button class="btn btn-sm btn-success" onclick="marcarComoLista(${orden.id})">Marcar como Lista</button>`
          );
      });

      ordenesListas.forEach(orden => {
          renderFila(
              orden,
              `<span class="badge bg-secondary">Listo para entrega</span>`
          );
      });
  };

  window.aceptarOrden = (id) => {
      const index = ordenesPendientes.findIndex(o => o.id === id);
      if (index !== -1) {
          const orden = ordenesPendientes.splice(index, 1)[0];
          orden.estado = "En preparación";
          ordenesEnPreparacion.push(orden);
          renderTabla();
      }
  };

  window.marcarComoLista = (id) => {
      const index = ordenesEnPreparacion.findIndex(o => o.id === id);
      if (index !== -1) {
          const orden = ordenesEnPreparacion.splice(index, 1)[0];
          orden.estado = "Lista para entrega";
          ordenesListas.push(orden);
          renderTabla();
      }
  };

  renderTabla();
});
