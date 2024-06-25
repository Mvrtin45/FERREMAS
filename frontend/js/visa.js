$(document).ready(function () {
    $("#visaForm").submit(function(event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        return false;
    });

    $("#visaForm").validate({
        rules: {
            nombre: {
                required: true
            },
            apellido: {
                required: true
            },
            pais: {
                required: true
            },
            motivodeV: {
                required: true
            }
        },
        messages: {
            nombre: {
                required: "Por favor ingresa tu nombre"
            },
            apellido: {
                required: "Por favor ingresa tu apellido"
            },
            pais: {
                required: "Por favor ingresa tu país de origen"
            },
            motivodeV: {
                required: "Por favor ingresa el motivo de la visa"
            }
        },
        submitHandler: function (form) {
            var data = {
                nombre: $("#nombreV").val(),
                apellido: $("#apellidoV").val(),
                pais: $("#paisV").val(),
                motivodeV: $("#motivo").val()
            };
            console.log(data);
            $.ajax({
                url: "http://127.0.0.1:8000/api/tramitevisa/",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (response) {
                    alert("Trámite exitoso!");
                },
                error: function (response) {
                    alert("Error en el trámite");
                }
            });
            return false; // Evita que el formulario se envíe automáticamente
        }
    });
});
