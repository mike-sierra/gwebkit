var app = new Function();

app.init = function() {
    app.elements = document.querySelectorAll('.items > div');
    app.navs = document.querySelectorAll('nav > div');

    // elements
    for ( var i = 0, ln = app.elements.length ; i < ln ; i++ ) {
        app.elements[i].className = 'row' + (i + 1);
        app.elements[i].addEventListener('click', app.remove);
    }

    // navigation
    for ( var i = 0, ln = app.navs.length ; i < ln ; i++ ) {
        app.navs[i].addEventListener('click', app.filter );
    }
};

app.filter = function(event) {
    var type = event.target.className;

    var hiddenCount = 0;

    if (! type ) {
        app.init();
        return false;
    }

    for ( var i = 0, ln = app.elements.length ; i < ln ; i++ ) {
        if ( app.elements[i].title == type ) {
            app.elements[i].className = 'row' + ((i + 1) - hiddenCount);
        }
        else {
            app.elements[i].className = 'hide';
            hiddenCount++;
        }
    }
};

app.remove = function() {
    event.currentTarget.className = 'hide';
    app.rearrange();
};

app.rearrange = function() {
    var hiddenCount = 0;
    for ( var i = 0, ln = app.elements.length ; i < ln ; i++ ) {
        if ( app.elements[i].className.match(/hide/) ) {
            hiddenCount++;
        }
        else {
            app.elements[i].className = 'row' + ((i + 1) - hiddenCount);
        }
    }
};

window.onload = function() { app.init() };

