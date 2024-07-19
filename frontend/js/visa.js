$(document).ready(function() {
    // Validación del formulario
    $("#visaForm").validate({
        rules: {
            nombreV: {
                required: true
            },
            apellidoV: {
                required: true
            },
            paisV: {
                required: true
            },
            motivodeV: {
                required: true
            }
        },
        messages: {
            nombreV: {
                required: "Por favor ingresa tu nombre"
            },
            apellidoV: {
                required: "Por favor ingresa tu apellido"
            },
            paisV: {
                required: "Por favor ingresa tu país de origen"
            },
            motivodeV: {
                required: "Por favor ingresa el motivo de la visa"
            }
        },
        submitHandler: function(form) {
            // Recolectar datos del formulario
            const datos = $(form).serializeArray();
            const item = {};
            datos.forEach(field => item[field.name] = field.value);

            // Enviar la solicitud AJAX
            const data = {
                nombreV: $("#nombreV").val(),
                apellidoV: $("#apellidoV").val(),
                paisV: $("#paisV").val(),
                motivodeV: $("#motivodeV").val()
            };
            console.log(data); // Verifica los datos que estás enviando

            $.ajax({
                url: "http://127.0.0.1:8000/api/tramitevisa/",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(response) {
                    // Guardar en el carrito solo si la solicitud es exitosa
                    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                    carrito.push(response); // Guarda la respuesta del servidor en lugar del objeto local
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    
                    // Confirmar el contenido del carrito en la consola
                    console.log('Contenido del carrito:', carrito);

                    alert("Trámite exitoso!");
                    console.log(response); // Muestra la respuesta del servidor en la consola 
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



