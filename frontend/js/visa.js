const form = document.getElementById('visaForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
});

$(document).ready(function() {
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
            // Aquí manejas el envío del formulario con AJAX
            var data = {
                nombreV: $("#nombreV").val(),
                apellidoV: $("#apellidoV").val(),
                paisV: $("#paisV").val(),
                motivodeV: $("#motivodeV").val() // Asegúrate de que el ID coincida aquí
            };
            console.log(data); // Verifica los datos que estás enviando

            $.ajax({
                url: "http://127.0.0.1:8000/api/tramitevisa/",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(response) {
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
