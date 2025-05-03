document.addEventListener("DOMContentLoaded", function () {
    const carritoContainer = document.getElementById("carrito-container");
    const totalElement = document.getElementById("total");
    const vaciarBtn = document.getElementById("vaciar-carrito");

    function cargarCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoContainer.innerHTML = "";

        if (carrito.length === 0) {
            carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
            totalElement.textContent = "0";
            return;
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
                    <p>Cantidad: ${producto.cantidad}</p>
                </div>
                <div class="cart-item-price">$${(producto.precio * producto.cantidad).toLocaleString()}</div>
                <button class="cart-item-remove" data-id="${producto.id}">Eliminar</button>
            `;

            cartItems.appendChild(item);
            total += producto.precio * producto.cantidad;
        });

        carritoContainer.appendChild(cartItems);
        totalElement.textContent = total.toLocaleString();

        agregarEventosEliminar();
    }

    function agregarEventosEliminar() {
        const botonesEliminar = document.querySelectorAll(".cart-item-remove");
        botonesEliminar.forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                eliminarProducto(id);
            });
        });
    }

    function eliminarProducto(id) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito = carrito.filter(p => p.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }

    vaciarBtn.addEventListener("click", function () {
        localStorage.removeItem("carrito");
        cargarCarrito();
    });

    cargarCarrito();
});