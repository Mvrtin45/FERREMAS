$(document).ready(function() {
    $("#formulario").validate({
        rules: {
            numeroTarjeta: {
                required: true, 
            },
            nombreTitular: {
                required: true
            },
            fechaExpiracion: {
                required: true,
                date: true  // Validación de fecha
            },
            codigoSeguridad: {
                required: true,
                digits: true,  // Solo números
                minlength: 3,  // Longitud mínima
                maxlength: 4   // Longitud máxima
            }
        },
        messages: {
            numeroTarjeta: {
                required: "Por favor ingresa el número de tarjeta",
            },
            nombreTitular: {
                required: "Por favor ingresa el nombre del titular de la tarjeta"
            },
            fechaExpiracion: {
                required: "Por favor ingresa la fecha de expiración",
                date: "Por favor ingresa una fecha válida"
            },
            codigoSeguridad: {
                required: "Por favor ingresa el código de seguridad",
                digits: "Por favor ingresa solo números para el CVV",
                minlength: "El CVV debe tener al menos 3 caracteres",
                maxlength: "El CVV no debe tener más de 4 caracteres"
            }
        },
        submitHandler: function(form) {
            localStorage.setItem('numeroTarjeta', $('#numeroTarjeta').val());
            localStorage.setItem('nombreTitular', $('#nombreTitular').val());
            localStorage.setItem('fechaExpiracion', $('#fechaExpiracion').val());
            localStorage.setItem('codigoSeguridad', $('#codigoSeguridad').val());
            alert("¡Compra Exitosa!. Redirigiendo...");
            // Redirigir a la página de número de atención
            window.location.href = '/frontend/indexs/numerodeatencion.html';
        }
    });
});
