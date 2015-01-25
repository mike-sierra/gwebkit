var app = new Function();

window.onload = function() {
    app.d = document.querySelector('div');
    app.d.addEventListener('mousedown', app.share);
    window.addEventListener('copy', app.copyHandler);
    window.addEventListener('mousedown', app.placeDialog);
    app.half = window.innerHeight / 2;
    app.dialogOffset = 50;
};

app.placeDialog = function(e) {
    app.d.classList.remove('visible');
    app.y = e.screenY;
    if (app.y < app.half) {
        app.d.style.top = (app.y + app.dialogOffset) + 'px';
        app.d.innerHTML = app.y + " " + app.d.style.top;
    } else {
        app.d.style.top = (app.y - app.dialogOffset) + 'px';
        app.d.innerHTML = app.y + " " + app.d.style.top;
    }
}

app.share = function(e) {
    console.log('share text: ' + app.d.textContent);
}

app.copyHandler = function(e) {
    var url = 'http://tiny.cc/b2wdfw';
    app.d.innerHTML = window.getSelection() + " (" + url + ")";
    app.d.classList.add('visible');
};
