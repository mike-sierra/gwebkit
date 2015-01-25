var app = new Function();

app.init = function() {

    // default values
    app.latFallback = 42.362373;
    app.lonFallback = -71.084386;
    app.zoomLevel = 15;
    app.minZoom = 0;
    app.maxZoom = 20;

    // error reporting
    app.err = document.querySelector('#err');
    app.err.addEventListener('click', function(){ window.history.back() }, false);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(app.locSuccess, app.locErr);
    }
    else {
        app.geoErr();
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
    // render map
    app.map = new ovi.mapsapi.map.Display(document.getElementById('map'), {
        'zoomLevel': app.zoomLevel,     // zoom level for the map
        'center': [app.lat, app.lon],   // center coordinates
        components : [
         new ovi.mapsapi.map.component.Behavior(), // drag-pan
         // new ovi.mapsapi.map.component.TypeSelector(),
         // new ovi.mapsapi.map.component.ZoomBar(),
         // new ovi.mapsapi.map.component.Overview(),
         // new ovi.mapsapi.map.component.ScaleBar()
         ]
    });

    // place marker:
    app.marker = new ovi.mapsapi.map.StandardMarker( [app.lat, app.lon] );
    //                                { icon: "img/icon_geo_pin.gif" } );
    app.map.objects.add(app.marker);
};

app.locErr = function(err) {
    if (err.PERMISSION_DENIED) {
        // User does not consent to sharing location.
        app.locSuccess(); // debug
        // app.displayErr("You appear to have denied permission.");
    }
    else {
        // indicates problem beyond user's direct control
        app.locSuccess(); // debug
        // app.displayErr("Sorry, problem connecting.")
    }
};

app.geoErr = function() {
    app.displayErr('Sorry, your browser does not support location services.')
};

app.displayErr = function(str) {
    app.err.innerHTML = str + ' Go back.';
    app.err.className = 'show';
};

app.zoom = function(n) {
    (n < 0) ? (app.zoomLevel--) : (app.zoomLevel++ );
    // constrain values
    if (app.zoomLevel < app.minZoom  ) {
        app.zoomLevel = app.minZoom;
        return false;
    }
    if (app.zoomLevel > app.maxZoom  ) {
        app.zoomLevel = app.maxZoom;
        return false;
    }
    app.map.setZoomLevel( app.zoomLevel );
};

window.onload = function() {
    app.init();
};
