var app = new Function();

app.init = function(event) {
    if (app.zoomLevel) return; // already running?
    if (! window.navigator.onLine) {
        event.preventDefault();
        event.stopPropagation();
        window.location = '#';
        alert("Sorry, not online. Can't display location on map.");
        return false;
    }
    app.latFallback = 42.362373;
    app.lonFallback = -71.084386;
    app.zoomLevel = 15;
    app.minZoom = 0;
    app.maxZoom = 20;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(app.locSuccess, app.locErr);
    }
    else {
        window.location = '#';
        alert('Sorry, your browser does not support location services.');
    }
};

app.locSuccess = function(position) {
    if (position) {
        app.lat = position.coords.latitude;
        app.lon = position.coords.longitude;
    }
    else {
        app.lat = app.latFallback;
        app.lon = app.lonFallback;
    }
    app.map = new ovi.mapsapi.map.Display(document.getElementById('map'), {
            'zoomLevel': app.zoomLevel,
            'center': [app.lat, app.lon],
            components : [ new ovi.mapsapi.map.component.Behavior() ]
        });

    app.marker = new ovi.mapsapi.map.StandardMarker( [app.lat, app.lon] );
    app.map.objects.add(app.marker);
};

app.locErr = function(err) {
    if (err.PERMISSION_DENIED) {
        window.location = '#';
        alert("You appear to have denied permission.");
    }
    else {
        window.location = '#';
        alert("Sorry, problem connecting.")
    }
};

window.onload = function() {
    document.querySelector('#to_map').addEventListener('click', app.init, false);
    window.addEventListener('offline', function(){ window.location = '#' }, false);
    window.addEventListener('online', function(){
            var r = confirm("Now online. Would you like to see the map?");
            if (r == true) {
                window.location = '#map';
            }
        }, false);
};
