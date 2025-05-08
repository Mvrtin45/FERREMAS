document.addEventListener("DOMContentLoaded", () => {
    const ordenesPendientes = [
      { id: 1, cliente: "Juan Pérez", productos: ["Martillo", "Clavos"] },
      { id: 2, cliente: "Ana Díaz", productos: ["Destornillador", "Tornillos"] }
    ];
  
    const ordenesEnPreparacion = [];
    const ordenesListas = [];
  
    const renderOrdenes = () => {
      const contenedorPendientes = document.getElementById("listaOrdenesPendientes");
      const contenedorPreparacion = document.getElementById("listaOrdenesPreparacion");
      const contenedorListas = document.getElementById("listaOrdenesListas");
  
      contenedorPendientes.innerHTML = "";
      contenedorPreparacion.innerHTML = "";
      contenedorListas.innerHTML = "";
  
      ordenesPendientes.forEach(orden => {
        const div = document.createElement("div");
        div.className = "orden";
        div.innerHTML = `
          <strong>Cliente:</strong> ${orden.cliente}<br>
          <strong>Productos:</strong> ${orden.productos.join(", ")}<br>
          <button onclick="aceptarOrden(${orden.id})">Aceptar y Preparar</button>
        `;
        contenedorPendientes.appendChild(div);
      });
  
      ordenesEnPreparacion.forEach(orden => {
        const div = document.createElement("div");
        div.className = "orden";
        div.innerHTML = `
          <strong>Cliente:</strong> ${orden.cliente}<br>
          <strong>Productos:</strong> ${orden.productos.join(", ")}<br>
          <button onclick="marcarComoLista(${orden.id})">Marcar como Lista</button>
        `;
        contenedorPreparacion.appendChild(div);
      });
  
      ordenesListas.forEach(orden => {
        const div = document.createElement("div");
        div.className = "orden";
        div.innerHTML = `
          <strong>Cliente:</strong> ${orden.cliente}<br>
          <strong>Productos:</strong> ${orden.productos.join(", ")}<br>
          <span>Listo para entrega</span>
        `;
        contenedorListas.appendChild(div);
      });
    };
  
    window.aceptarOrden = (id) => {
      const index = ordenesPendientes.findIndex(o => o.id === id);
      if (index !== -1) {
        const orden = ordenesPendientes.splice(index, 1)[0];
        ordenesEnPreparacion.push(orden);
        renderOrdenes();
      }
    };
  
    window.marcarComoLista = (id) => {
      const index = ordenesEnPreparacion.findIndex(o => o.id === id);
      if (index !== -1) {
        const orden = ordenesEnPreparacion.splice(index, 1)[0];
        ordenesListas.push(orden);
        renderOrdenes();
      }
    };
  
    renderOrdenes();
  });