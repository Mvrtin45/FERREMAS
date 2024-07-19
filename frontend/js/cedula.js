$(document).ready(function() {
    $("#cedulaForm").validate({
        rules: {
            nombreC: {
                required: true
            },
            apellidoC: {
                required: true
            },
            rutC: {
                required: true,
            },
            fecha_nacimientoC: {
                required: true,
                date: true
            },
            direccionC: {
                required: true
            }
        },
        messages: {
            nombreC: {
                required: "Por favor ingresa tu nombre"
            },
            apellidoC: {
                required: "Por favor ingresa tu apellido"
            },
            rutC: {
                required: "Por favor ingresa tu RUT"
            },
            fecha_nacimientoC: {
                required: "Por favor ingresa tu fecha de nacimiento",
                date: "Por favor ingresa una fecha válida"
            },
            direccionC: {
                required: "Por favor ingresa tu dirección"
            }
        },
        submitHandler: function(form) {
            // Recolectar datos del formulario
            const datos = $(form).serializeArray();
            const item = {};
            datos.forEach(field => item[field.name] = field.value);

            // Guardar en el carrito
            let carrito = JSON.parse(localStorage.getItem('carritoCedula')) || [];
            carrito.push(item);
            localStorage.setItem('carritoCedula', JSON.stringify(carrito));

            // Enviar la solicitud AJAX
            const data = {
                nombreC: $("#nombreC").val(),
                apellidoC: $("#apellidoC").val(),
                rutC: $("#rutC").val(),
                fecha_nacimientoC: $("#fecha_nacimientoC").val(),
                direccionC: $("#direccionC").val()
            };

            $.ajax({
                url: "http://127.0.0.1:8000/api/tramitecedula/",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(response) {
                    alert("Trámite exitoso!");
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    alert("Error en el trámite");
                }
            });

            return false; // Evita que el formulario se envíe automáticamente
        }
    });
});
