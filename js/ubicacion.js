function initMap() {
    
    var location = {lat: -33.3709988, lng: -70.6833801};
    
    var mapOptions = {
        zoom: 15, 
        center: location 
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Sucursal Plaza Norte - Duoc UC'
    });
}