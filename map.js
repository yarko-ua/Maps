
// Initialize and add the map
function initMap(target) {
    // The location of Uluru
    var city;
    let markerImg;
    let text;
    if (target == undefined) {
        city = { lat: 48.464718, lng: 35.046185 };
        text = `coordinates: lat ${city.lat}, lng ${city.lng}`;
    } else {
        city = { lat: +target.lat, lng: +target.lng };
        markerImg = target.marker;
        text = target.text;
    }
    // The map, centered at Uluru
    var myMap = new google.maps.Map(
        document.getElementById('map'), { zoom: 6, center: city });
    // The marker, positioned at Uluru 
    var marker = new google.maps.Marker({
        position: city, map: myMap, icon: {
            scaledSize: new google.maps.Size(36, 36),

        }
    });
    if (markerImg) {
        marker.setIcon(markerImg);
        // marker.icon.scaledSize = new google.maps.Size(36, 36);
    }

    marker.addListener('click', function () {
        infowindow.open(myMap, marker);

    });
    //infoWindow
    let infowindow = new google.maps.InfoWindow({
        content: text
    });
    // Autocomplete
    let inputStart = new google.maps.places.Autocomplete(document.getElementById('start'));
    let inputEnd = new google.maps.places.Autocomplete(document.getElementById('end'));

    // Draw Directions
    let dirServ = new google.maps.DirectionsService();
    let dirRender = new google.maps.DirectionsRenderer();
    dirRender.setMap(myMap);

    let select = document.getElementById('select');
    select.addEventListener('change', () => calcRoute(dirServ, dirRender));
}

function calcRoute(dirServ, dirRender) {
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    let mode = document.getElementById('select').value;
    let request = {
        origin: start,
        destination: end,
        travelMode: mode,
    }
    dirServ.route(request, (result, status) => {
        if (status == 'OK') {
            dirRender.setDirections(result)
        } else {
            alert("Operation haven't succed due to" + status);
        }
    })
}


class City {
    constructor(lat, lng, icon, text) {
        this.lat = lat;
        this.lng = lng;
        this.marker = icon;
        this.text = text;
    }
}

let Kyiv = new City(50.447731, 30.542721, 'https://image.flaticon.com/icons/png/512/1612/1612564.png', 'Купуємо цибулю по 50');
let IF = new City(48.922634, 24.711117, 'https://cdn1.iconfinder.com/data/icons/vegetables-1-flat/33/beetrot-512.png', 'Бурячки обєднаємось!!!');
let Odessa = new City(46.482525, 30.723309, 'https://www.pinclipart.com/picdir/middle/73-730178_derpy-batman-derp-batman-png-clipart.png', 'Шалом папалом')

for (let i = 0; i < document.querySelectorAll('button').length; i++) {
    document.querySelectorAll('button')[i].addEventListener('click', event => {
        if (event.target.id == 'Kyiv') {
            initMap(Kyiv);
        } else if (event.target.id == 'Odessa') {
            initMap(Odessa);
        } else {
            initMap(IF);
        }

    })
}
