var app = new Function();

app.list = document.querySelector('ul');

app.dumpEvent = function(e) {
    app.list.innerHTML += ('<li>' + e.type + '</li>');
}

window.onload = function() {
    var app.cache = window.applicationCache;
    app.cache.addEventListener('cached', app.dumpEvent);
    app.cache.addEventListener('checking', app.dumpEvent);
    app.cache.addEventListener('downloading', app.dumpEvent);
    app.cache.addEventListener('error', app.dumpEvent);
    app.cache.addEventListener('noupdate', app.dumpEvent);
    app.cache.addEventListener('obsolete', app.dumpEvent);
    app.cache.addEventListener('progress', app.dumpEvent);
    app.cache.addEventListener('updateready', app.dumpEvent);
};

