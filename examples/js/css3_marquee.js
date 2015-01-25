window.onload = function() {
    var err = "Sorry, your browser does not support 3D transforms. Try Apple Safari.";
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

