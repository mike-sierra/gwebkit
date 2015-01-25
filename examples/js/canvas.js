var app = new Function();

window.onload = function() {
    app.v = new Function();
    app.cv = document.querySelector('#cv');
    app.cx = app.cv.getContext('2d');
    app.rgb = document.querySelector('#rgb');
    app.tx = new Array();
    app.ty = new Array();

//     app.drawing = 1;;
//     app.stroke = 0;;
//     app.h = window.history;;

    app.cv.addEventListener('mousedown', app.touchstartHandler);
    app.cv.addEventListener('mousemove', app.touchmoveHandler);
    app.cv.addEventListener('mouseup', app.touchendHandler);
    document.querySelector('#tab4').addEventListener('click', app.save);
    app.panel = document.querySelector('#panel4');

    app.panels = document.querySelectorAll('nav ~ div, #panel0');
    app.tabs = document.querySelectorAll('nav');
    for (var i = 0, l = app.tabs.length; i < l; i++) {
        app.tabs[i].addEventListener('click', app.showPanel);
    }
    app.inputs = document.querySelectorAll('input[type=range]');
    for (var i = 0, l = app.inputs.length; i < l; i++) {
        app.v[ app.inputs[i].id ] = app.inputs[i].value;
        app.inputs[i].addEventListener('change', app.changeHandler);
    }
    app.renderPenPreview();
//    window.addEventListener('popstate', app.revert);;
};

app.showPanel = function(e) {
    for (var i = 0, l = app.tabs.length; i < l; i++) {
        app.tabs[i].classList.remove('sel');
    }
    e.target.classList.add('sel');
    for (var i = 0, l = app.panels.length; i < l; i++) {
        app.panels[i].hidden = true;
    }
    document.querySelector(e.target.dataset.tgt).hidden = false;
}

app.touchstartHandler = function(e) {
    app.cx.lineCap = 'round';
    app.cx.lineWidth = app.v.w;
    app.cx.strokeStyle = 'rgba(' + app.v.r + '%, ' + app.v.g + '%, ' + app.v.b + '%, 0.05)'
    app.cx.beginPath();
    app.isTouching = true;
};

app.touchmoveHandler = function(e) {
    if (!app.isTouching) return(false);
    app.cx.lineTo(e.offsetX, e.offsetY);
    app.cx.stroke();
    app.tx.push(e.offsetX);
    app.ty.push(e.offsetY);
};

app.touchendHandler = function(e) {
    app.cx.stroke();
    app.cx.closePath();
    app.isTouching = false;
    app.stroke++;
//     app.h.pushState( { image_data : app.cv.toDataURL() }, (app.drawing + "/" + app.stroke), ('?d=' + app.drawing + '&s=' + app.stroke) );;
};

app.changeHandler = function(e) {
    app.v[e.target.id] = parseInt(e.target.value);
    app.renderPenPreview();
};

app.renderPenPreview = function() {
    app.rgb.style.backgroundColor = 'rgb(' + app.v.r + '%, ' + app.v.g + '%, ' + app.v.b + '%)';
    app.rgb.style.width = app.v.w + 'px';
    app.rgb.style.height = app.v.w + 'px';
    app.rgb.style.borderRadius = Math.floor(app.v.w/2) + 'px';
};

app.save = function() {

    var allX = app.tx.sort(app.sortNumeric);
    var allY = app.ty.sort(app.sortNumeric);
    var minX = allX[0] - (app.v.w/1);
    var minY = allY[0] - (app.v.w/1);
    var maxX = allX[allX.length-1] + (app.v.w/1);
    var maxY = allY[allY.length-1] + (app.v.w/1);
    var w = maxX - minX;
    var h = maxY - minY;
    var img = new Image();
    var data = app.cx.getImageData(minX, minY, w, h);

    app.cv.width = w;
    app.cv.height = h;
    app.cx.putImageData(data, 0, 0);
    img.src = app.cv.toDataURL();
    (app.panel.firstChild)
        ? (app.panel.insertBefore(img, app.panel.firstChild))
        : (app.panel.appendChild(img));
    app.cv.width = 270;
    app.cv.height = 420;
    app.tx = new Array();
    app.ty = new Array();
//    app.drawing++;;
//    app.stroke = 0;;
};

app.sortNumeric = function(a,b) { return a - b;}

app.revert = function(e) {
    if (! e.state) return false;
    var img = new Image();
    img.src = e.state.image_data;
    app.cx.clearRect(0, 0, app.cv.width, app.cv.height);
    app.cx.drawImage(img, 0, 0);
}
