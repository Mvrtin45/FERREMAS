$(document).ready(function() {
    // Inicializar carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Validación del formulario de pago
    $("#formulario").validate({
        rules: {
            numeroTarjeta: {
                required: true
            },
            nombreTitular: {
                required: true
            },
            fechaExpiracion: {
                required: true
            },
            codigoSeguridad: {
                required: true
            }
        },
        messages: {
            numeroTarjeta: {
                required: "Por favor ingresa el número de tarjeta"
            },
            nombreTitular: {
                required: "Por favor ingresa el nombre del titular de la tarjeta"
            },
            fechaExpiracion: {
                required: "Por favor ingresa la fecha de expiración"
            },
            codigoSeguridad: {
                required: "Por favor ingresa el código de seguridad"
            }
        },
        submitHandler: function(form) {
            const numeroTarjeta = $('#numeroTarjeta').val();
            const nombreTitular = $('#nombreTitular').val();
            const fechaExpiracion = $('#fechaExpiracion').val();
            const codigoSeguridad = $('#codigoSeguridad').val();

            // Aquí puedes agregar lógica para procesar el pago, si es necesario

            const tramite = {
                nombre: 'Trámite de Atención',
                precio: 5000,
                numeroAtencion: generarNumeroAtencion(),
                cantidad: 1
            };

            carrito.push(tramite);
            localStorage.setItem('carrito', JSON.stringify(carrito));

            mostrarAlerta();

            setTimeout(() => {
                window.location.href = 'numerodeatencion.html';
            }, 3000);
        }
    });

    function generarNumeroAtencion() {
        return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000; // Genera un número aleatorio entre 1000 y 10000
    }

    function mostrarAlerta() {
        alert('Pago exitoso');
    }

    $('#enviarSolicitud').on('click', function() {
        $("#formulario").submit();
    });
});

