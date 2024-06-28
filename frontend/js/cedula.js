const form = document.getElementById('cedulaForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
});

$(document).ready(function() {
    console.log("Documento listo. Iniciando validación...");
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
            console.log("Formulario validado. Enviando datos...");
            var data = {
                nombreC: $("#nombreC").val(),
                apellidoC: $("#apellidoC").val(),
                rutC: $("#rutC").val(),
                fecha_nacimientoC: $("#fecha_nacimientoC").val(),
                direccionC: $("#direccionC").val()
            };
            console.log("Datos a enviar:", data);
            $.ajax({
                url: "http://127.0.0.1:8000/api/tramitecedula/",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(response) {
                    alert("Trámite exitoso!");
                },
                error: function(response) {
                    alert("Error en el trámite");
                }
            });
            return false; // Evita que el formulario se envíe automáticamente
        }
    });
});
