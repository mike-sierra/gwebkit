var app = new Function();

app.dimAll = function() {
    for (var i = 0 , l = app.items.length ; i < l ; i++ ) {
        app.items[i].className = '';
    }
};

app.select = function(event) {
    event.stopPropagation();
    if (this.className == 'playing') {
        this.className = 'paused';
        app.p.pause();
    }
    else if (this.className == 'paused') {
        app.p.play();
        this.className = 'playing';
    }
    else {
        app.p.src = 'media/' + this.innerHTML + '.mp3';
        app.p.play();
        app.dimAll();
        this.className = 'playing';
    }
};

app.clear = function(event) {
    app.p.load();
    app.dimAll();
};

window.onload = function(){
    app.p = document.querySelector('#player');
    app.p.addEventListener('ended', app.dimAll, false);
    app.items = document.querySelectorAll('ul > li');
    for (var i = 0 , l = app.items.length ; i < l ; i++ ) {
        app.items[i].addEventListener('click', app.select, false);
    }
    document.querySelector('article').addEventListener('click', app.clear, false);
};
