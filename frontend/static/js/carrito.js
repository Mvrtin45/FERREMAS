document.addEventListener("DOMContentLoaded", function () {
    const carritoContainer = document.getElementById("carrito-container");
    const totalElement = document.getElementById("total");
    const vaciarBtn = document.getElementById("vaciar-carrito");
    const mensajeVacio = document.getElementById("carrito-vacio");
    const opcionesEntrega = document.getElementById("opciones-entrega");
    const confirmarBtn = document.getElementById("confirmar-entrega");
    const opciones = document.querySelectorAll(".opcion");
    let seleccion = null;

    function cargarCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoContainer.innerHTML = "";

        if (carrito.length === 0) {
            mensajeVacio.style.display = "block";
            totalElement.textContent = "0";
            opcionesEntrega.style.display = "none";  // Ocultamos las opciones de entrega
            return;
        } else {
            mensajeVacio.style.display = "none";
            opcionesEntrega.style.display = "block";  // Mostramos las opciones de entrega
        }

        let total = 0;
        const cartItems = document.createElement("div");
        cartItems.classList.add("cart-items");

        carrito.forEach(producto => {
            const item = document.createElement("div");
            item.classList.add("cart-item");

            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="cart-item-details">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio.toLocaleString()}</p>
                    <div class="cantidad-control">
                        <button class="disminuir" data-id="${producto.id}">-</button>
                        <span>${producto.cantidad}</span>
                        <button class="aumentar" data-id="${producto.id}">+</button>
                    </div>
                </div>
                <div class="cart-item-price">$${(producto.precio * producto.cantidad).toLocaleString()}</div>
                <button class="cart-item-remove btn btn-sm btn-outline-danger mt-2" data-id="${producto.id}">Eliminar</button>
            `;

            cartItems.appendChild(item);
            total += producto.precio * producto.cantidad;
        });

        carritoContainer.appendChild(cartItems);
        totalElement.textContent = total.toLocaleString();

        agregarEventos();
    }

    function agregarEventos() {
        document.querySelectorAll(".cart-item-remove").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                eliminarProducto(id);
            });
        });

        document.querySelectorAll(".aumentar").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                actualizarCantidad(id, 1);
            });
        });

        document.querySelectorAll(".disminuir").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                actualizarCantidad(id, -1);
            });
        });

        // Eventos para las opciones de entrega
        opciones.forEach(opcion => {
            opcion.addEventListener("click", function () {
                opciones.forEach(op => op.classList.remove("seleccionada"));
                this.classList.add("seleccionada");
                seleccion = this.id;
                confirmarBtn.disabled = false;
            });
        });

        confirmarBtn.addEventListener("click", function () {
            if (seleccion === "opcion-despacho") {
                window.location.href = "/frontend/indexs/confirmar_despacho.html";
            } else if (seleccion === "opcion-retiro") {
                window.location.href = "/frontend/indexs/confirmar_retiro.html";
            }
        });
    }

    function eliminarProducto(id) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito = carrito.filter(p => p.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }

    function actualizarCantidad(id, cambio) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito = carrito.map(producto => {
            if (producto.id === id) {
                producto.cantidad += cambio;
                if (producto.cantidad < 1) producto.cantidad = 1;
            }
            return producto;
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }

    vaciarBtn.addEventListener("click", function () {
        localStorage.removeItem("carrito");
        cargarCarrito();
    });

    cargarCarrito();
});
