document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get("id"));

    // Lista de productos
    const productos = [
        { id: 1, nombre: "Taladro Eléctrico", descripcion: "Potente taladro para trabajos de construcción.", precio: 25990, imagen: "/frontend/img/Herramientas/taladro.png" },
        { id: 2, nombre: "Martillo de Acero", descripcion: "Resistente y ergonómico.", precio: 11990, imagen: "/frontend/img/Herramientas/martilloacero.png" },
        { id: 3, nombre: "Juego de Destornilladores", descripcion: "Set completo para todo tipo de reparaciones.", precio: 9990, imagen: "/frontend/img/Herramientas/setdestornilladores.png" },
        { id: 4, nombre: "Sierra Circular Eléctrica", descripcion: "Cortes precisos en madera y metal.", precio: 35990, imagen: "/frontend/img/Herramientas/sierraelectrica.png" },
        { id: 5, nombre: "Llave Inglesa", descripcion: "Ajustable para tuercas y pernos.", precio: 8990, imagen: "/frontend/img/Herramientas/llaveinglesa.png" },
        { id: 6, nombre: "Cinta Métrica", descripcion: "Mediciones exactas para tus proyectos.", precio: 5990, imagen: "/frontend/img/Herramientas/cintametrica.png" },
        { id: 7, nombre: "Taladro Percutor", descripcion: "Ideal para concreto y ladrillo.", precio: 29990, imagen: "/frontend/img/Herramientas/taladropercutor.png" },
        { id: 8, nombre: "Caja de Herramientas", descripcion: "Organización para todas tus herramientas.", precio: 19990, imagen: "/frontend/img/Herramientas/cajaherramientas.png" },
        { id: 9, nombre: "Esmeril Angular", descripcion: "Corte y pulido de metal y piedra.", precio: 23990, imagen: "/frontend/img/Herramientas/esmerilangular.png" },
        { id: 10, nombre: "Pintura Exterior", descripcion: "Colores duraderos para exteriores.", precio: 22990, imagen: "/frontend/img/Herramientas/pinturaexterior.png" },
        { id: 11, nombre: "Pintura Interior", descripcion: "Amplia gama de colores duraderos y de fácil aplicación.", precio: 22990, imagen: "/frontend/img/Herramientas/pinturainterior.png" },
    ];

    // Encontrar el producto con el ID correspondiente
    const producto = productos.find(p => p.id === idProducto);

    if (producto) {
        // Mostrar la información del producto en la página
        const detalleContainer = document.getElementById("detalle-producto");
        detalleContainer.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
                </div>
                <div class="col-md-6">
                    <h2>${producto.nombre}</h2>
                    <p>${producto.descripcion}</p>
                    <p><strong>Precio:</strong> $${producto.precio.toLocaleString()}</p>
                    <button class="btn btn-success" id="agregar-carrito" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
    } else {
        // Si no se encuentra el producto, mostrar un mensaje de error
        const detalleContainer = document.getElementById("detalle-producto");
        detalleContainer.innerHTML = "<p>Producto no encontrado.</p>";
    }
});