$(document).ready(function () {
    function loadSubscriptions() {
        $.ajax({
            url: "api/",
            type: "POST",
            data: $(form).serializer(),
            success: function (response) {
                var tramiteList = $("#subscriptionList");
                tramiteList.empty();
                response.forEach(function (subscription) {
                    tramiteList.append(
                        "<tr><td>" +
                        subscription.nombre +
                        "</td><td>" +
                        subscription.apellido +
                        "</td><td>" +
                        subscription.tramite +
                        "</td><td>" 
                    );
                });
            },
            error: function (response) {
                if (response.status === 401 && response.responseJSON.code === "No se pudo cargar el Tramite") {
                    alert('Error al cargar los Tramites' + response.responseText);
                }
            }
        });
    }

    if (window.location.pathname.endsWith('perfiltramites.html')) {
        loadSubscriptions();
    }
});