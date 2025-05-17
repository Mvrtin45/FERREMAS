document.addEventListener("DOMContentLoaded", function () {
    const productos = [
        {
            id: 1,
            nombre: "Taladro Eléctrico",
            precio: 25990,
            imagen: "/frontend/img/Herramientas/taladro.png"
        },
        {
            id: 2,
            nombre: "Martillo de Acero",
            precio: 11990,
            imagen: "/frontend/img/Herramientas/martilloacero.png"
        },
        {
            id: 3,
            nombre: "Juego de Destornilladores",
            precio: 9990,
            imagen: "/frontend/img/Herramientas/setdestornilladores.png"
        },
        {
            id: 4,
            nombre: "Sierra Circular Eléctrica",
            precio: 35990,
            imagen: "/frontend/img/Herramientas/sierraelectrica.png"
        },
        {
            id: 5,
            nombre: "Llave Inglesa",
            precio: 8990,
            imagen: "/frontend/img/Herramientas/llaveinglesa.png"
        },
        {
            id: 6,
            nombre: "Cinta Métrica",
            precio: 5990,
            imagen: "/frontend/img/Herramientas/cintametrica.png"
        },
        {
            id: 7,
            nombre: "Taladro Percutor",
            precio: 29990,
            imagen: "/frontend/img/Herramientas/taladropercutor.png"
        },
        {
            id: 8,
            nombre: "Caja de Herramientas",
            precio: 19990,
            imagen: "/frontend/img/Herramientas/cajaherramientas.png"
        },
        {
            id: 9,
            nombre: "Esmeril Angular",
            precio: 39990,
            imagen: "/frontend/img/Herramientas/esmerilangular.png"
        },
        {
            id: 10,
            nombre: "Pintura Exterior",
            precio: 22990,
            imagen: "/frontend/img/Herramientas/pinturaexterior.png"
        }
    ];

    const productosContainer = document.getElementById("productos-container");

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h6 class="card-title">${producto.nombre}</h6>
                    <p class="card-text">$${producto.precio.toLocaleString()}</p>
                    <a href="/frontend/indexs/detalle.html?id=${producto.id}" class="btn btn-primary btn-sm">Ver Detalles</a>
                    <button class="btn btn-success btn-sm agregar-carrito"
                        data-id="${producto.id}"
                        data-nombre="${producto.nombre}"
                        data-precio="${producto.precio}"
                        data-imagen="${producto.imagen}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        productosContainer.appendChild(card);
    });

    // Agregar al carrito
    productosContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("agregar-carrito")) {
            const button = e.target;
            const producto = {
                id: parseInt(button.getAttribute("data-id")),
                nombre: button.getAttribute("data-nombre"),
                precio: parseInt(button.getAttribute("data-precio")),
                imagen: button.getAttribute("data-imagen")
            };
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

