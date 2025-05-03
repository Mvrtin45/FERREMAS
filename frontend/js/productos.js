document.addEventListener("DOMContentLoaded", function () {
    const productos = [
        {
            id: 1,
            nombre: "Taladro Eléctrico",
            precio: 25990,
            imagen: "/frontend/img/taladro.jpg"
        },
        {
            id: 2,
            nombre: "Caja de Herramientas",
            precio: 18990,
            imagen: "/frontend/img/caja_herramientas.jpg"
        },
        {
            id: 3,
            nombre: "Destornillador Eléctrico",
            precio: 14990,
            imagen: "/frontend/img/destornillador.jpg"
        },
        {
            id: 4,
            nombre: "Lijadora Orbital",
            precio: 21990,
            imagen: "/frontend/img/lijadora.jpg"
        },
        {
            id: 5,
            nombre: "Martillo Antivibración",
            precio: 8990,
            imagen: "/frontend/img/martillo.jpg"
        }
    ];

    const productosContainer = document.getElementById("productos-container");

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio.toLocaleString()}</p>
                    <button class="btn btn-primary mt-auto agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </div>
        `;
        productosContainer.appendChild(card);
    });

    // Evento para botones "Agregar al carrito"
    productosContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("agregar-carrito")) {
            const idProducto = parseInt(e.target.getAttribute("data-id"));
            const producto = productos.find(p => p.id === idProducto);
            agregarAlCarrito(producto);
        }
    });

    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const existe = carrito.find(p => p.id === producto.id);

        if (existe) {
            existe.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`Producto "${producto.nombre}" agregado al carrito`);
    }
});
