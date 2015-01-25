var ui = new Function();

ui.delay = 2000;
ui.offset = 0;
ui.localRE = /letmespellitoutforyou/;

ui.init = function() {
    ui.nav = document.getElementById('pane');
    // reposition navbar at bottom if full-screen:
    if (window.navigator.standalone) ui.nav.classList.add('standalone');
    window.addEventListener('scroll', ui.scrollNav);
    window.addEventListener('touchmove', ui.scrollNav);
    // initial fade-in is not delayed:
    ui.isScrolling = setTimeout( ui.defaultNav, 0 );
    ui.fixLinks();
};

ui.defaultNav = function() {
    // show navbar
    ui.nav.classList.remove('scrolling');
    ui.isScrolling = false;
};

ui.scrollNav = function() {
    // reposition nav layer:
    ui.nav.style.top = ( window.scrollY + ui.offset ) + 'px';
    // bail if already scrolling
    if ( ui.isScrolling ) return false;
    // hide navbar
    ui.nav.classList.add('scrolling');
    // delay showing navbar
    ui.isScrolling = setTimeout( ui.defaultNav, ui.delay );
}

window.onload = function() {
    ui.init() 
};

ui.fixLinks = function() {
    if (! window.navigator.standalone) return(false);
    var links = document.querySelectorAll('a[href]');
    for (var i = 0, l = links.length; i < l; i++) {
        if (! links[i].href.match(ui.localRE)) continue;
        links[i].addEventListener('click', function(e) {
	    e.preventDefault();
	    location.href = event.target.href;
        });
    }
}