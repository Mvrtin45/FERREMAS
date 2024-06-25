$(document).ready(function () {
    $("#visaForm").submitHandler(alert('Hola!'));
    $("#visaForm").validate({
        submitHandler: function (form) {
            var data = {
                nombreV: $("#nombreV").val(),
                apellidoV: $("#apellidoV").val(),
                paisV: $("#paisV").val(),
                motivodeV: $("#motivodeV").val()
            };
            console.log(data    );
            $.ajax({
                url: "http://127.0.0.1:8000/api/tramitevisa/",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (response) {
                    localStorage.setItem("Completado", response.access);
                    alert("Tramite successful!");
                },
                error: function (response) {
                    alert("Tramite failed!");
                }
            });
        }
    });
});






