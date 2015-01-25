var app = new Function();

app.init = function() {
    var divs = document.querySelectorAll('section > div');
    if ( divs.length < 2 ) return false;
    for (var i = 0, l = divs.length ; i < l ; i++ ) {
        if (i > 1) divs[i].className = 'hideR';
        divs[i].addEventListener('click', app.navigate );
    }
    divs[0].className = 'selected';
    divs[1].className = 'queueR';
};

app.navigate = function(event) {
    var el, n1, n2, p1, p2;
    el = event.currentTarget;
    n1 = el.nextSibling;
    if (n1) n2 = el.nextSibling.nextSibling;
    p1 = el.previousSibling;
    if (p1) p2 = el.previousSibling.previousSibling;
    if ( el.className == 'selected' ) {
        if ( el.id == 'reveal') {
            el.id = '';
        }
        else {
            el.id = 'reveal';
        }
        return false;
    }
    if (n1) { n1.className = 'queueR'; n1.id = ''}
    if (n2) { n2.className = 'hideR'; n2.id = '' }
    if (p1) { p1.className = 'queueL'; p1.id = '' }
    if (p2) { p2.className = 'hideL'; p2.id = '' }
    el.className = 'selected';
};

window.onload = function() {
    // alert(app.init);
     app.init();
};
