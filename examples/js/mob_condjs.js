window.onload = function() {
    guess_device();
    window.onresize = guess_device;
};

function guess_device() {
    var msg = 'JavaScript thinks you are viewing this page with a ';
    if ( isDesign('desktop') ) {
        msg += 'desktop browser';
    }
    else if ( isDesign('tablet') ) {
        msg += 'tablet browser';
    }
    else if ( isDesign('touch') ) {
        msg += 'touch-based mobile browser';
    }
    else if ( isDesign('mobile') ) {
        msg += 'non-touch mobile browser';
    }
    else {
        msg = window.styleMedia.matchMedium;
    }
    document.getElementById('js').innerHTML = msg;
}

function isDesign(str) {
    var design;
    if (matchesMedia('only screen and (max-width: 320px)')) {
        design = 'touch';
    }
    else if (matchesMedia('only screen and (max-width: 1024px)')) {
        design = 'tablet';
    }
    else if (matchesMedia('only screen')) {
        design = 'desktop';
    }
    else if (matchesMedia('handheld')) {
        design = 'mobile';
    }
    return str == design;
}

function matchesMedia(query) {
    if (!!window.matchMedia)
        return window.matchMedia(query).matches;
    if (!!window.styleMedia && !!window.styleMedia.matchMedium)
        return window.styleMedia.matchMedium(query);
    if (!!window.media && window.media.matchMedium)
        return window.media.matchMedium(query);
    return false;
}
