var app = new Function();

window.onload = function() {
    if (! window.location.hash) window.location.href = "#img1";

    window.addEventListener('hashchange', app.adjustOrigin, false)
    app.index = 1;
    app.sect = document.querySelector('section');
};

app.test3D = function() {
    var err = "Sorry, your browser does not support 3D transforms. Try Apple Safari or Nokia Browser 8.5.";
    var supports_3d;
    var query = '(-webkit-transform-3d)';
    if (!!window.matchMedia) {
        supports_3d = window.matchMedia(query).matches;
    }
    else if (!!window.styleMedia && !!window.styleMedia.matchMedium) {
        supports_3d = window.styleMedia.matchMedium(query);
    }
    else if (!!window.media && !!window.media.matchMedium) {
        supports_3d = window.media.matchMedium(query);
    }
    if (! supports_3d ) alert(err);
}

app.adjustOrigin = function(event) {
    var h = location.hash;
    var n;
    if (!h) return(false);

    n = parseInt( h.replace(/\D+/, '') );

    // navigating to info panel
    if (h.match(/#info/)) {
        app.sect.className = 'c';
        app.index = n;
        return(0);
    }

    // navigating forwards
    if ( n > app.index ) {
        app.sect.className = 'f';
    }
    // navigating back
    else if ( n < app.index ) {
        app.sect.className = 'b';
    }
    // navigating from info panel
    else {
        app.sect.className = 'c';
    }

    app.index = n;

};

