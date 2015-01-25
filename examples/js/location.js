var app = new Function();

app.zoomLevel = 15;

window.onload = function() {
    app.button = document.querySelector('span');
    app.button.addEventListener('click', app.showMap);
};

window.addEventListener('offline', function(e){
    document.getElementById('map').classList.remove('active');
});

window.addEventListener('online', function(e){
    document.getElementById('map').classList.add('active');
});

app.successCallback = function(position) {

    if (! navigator.onLine) {
        alert('Sorry, no network connection. Cannot show map. Try again later?');
        return(false);
    }

    app.lat = position.coords.latitude;
    app.lon = position.coords.longitude;

    // slide in map:
    var m = document.getElementById('map');
    m.classList.add('active');

    // draw map:
    app.map = new ovi.mapsapi.map.Display(m, {
 	    'zoomLevel': app.zoomLevel,
	    'center': [app.lat, app.lon],
	    components : [ new ovi.mapsapi.map.component.Behavior() ]
	});
    // place marker:
    app.marker = new ovi.mapsapi.map.StandardMarker( [app.lat, app.lon] );
    app.map.objects.add(app.marker);
};

app.errorFallback = function(err) {

    alert(navigator.onLine);
    if (err.PERMISSION_DENIED) {
	// User does not consent to sharing location.
        app.consent = confirm('Do you ever want to learn about items near you?');
    } else {
	// indicates a problem beyond the user's direct control
    }
};

app.showMap = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(app.successCallback, app.errorFallback);
    } else {
        alert('Sorry, your browser does not support location services');
    }
}


