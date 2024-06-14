$(document).ready(function () {
    $("#visaForm").validate({
        submitHandler: function (form) {
            subscribe();
        }
    });

    function subscribe() {
        $.ajax({
            url: "http://127.0.0.1:8000/api/tramitevisa/",
            type: "POST",
            contentType: "application/json",
            headers: {
                Authorization: "Bearer ",
            },
            data: JSON.stringify({}),  // No se necesitan datos adicionales
            success: function (response) {
                alert("Tramite Aceptado Correctamente.");
                window.location.href = "MisTramites.html";
            },
            error: function (response) {
                if (response.status === 401) {
                    alert('Subscription failed! ' + response.responseText);
                }
            }
        });
    }
});





