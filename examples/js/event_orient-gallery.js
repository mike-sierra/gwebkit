var app = new Function();

app.init = function() {
    app.getOrient();
    app.land = new Array();
    app.port = new Array();
    app.landProg = document.querySelector("progress.land");
    app.portProg = document.querySelector("progress.port");
    var img;

    var divs = document.querySelectorAll("section.gallery > div");

    for (var i = 0, l = divs.length ; i < l ; i++ ) {
        img = divs[i].querySelector("img");
        if ( img.height > img.width ) {
            divs[i].className = "qr port";
            app.port.push(divs[i]);
        }
        else {
            divs[i].className = "qr land";
            app.land.push(divs[i]);
        }
    }
    app.land[0].className = "selected land";
    app.port[0].className = "selected port";
    app.landProg.max = app.land.length - 1;
    app.portProg.max = app.port.length - 1;
    app.landProg.value =    app.portProg.value = 0;
    app.landProg.addEventListener("click", app.navigate);
    app.portProg.addEventListener("click", app.navigate);
};

app.getOrient = function(){
    app.isUpright = !!( window.innerWidth < window.innerHeight );
};

window.onorientationchange = function() {
    app.getOrient();
}

app.navigate = function(event){
    var click = event.clientX;
    var width = window.innerWidth;
    var progress = event.target;
    var ix = progress.value;
    var max = progress.max;
    var type = progress.className;
    var alongBar = click / width;
    var alongSeries = ix / max;
    // alert(alongBar +" "+alongSeries);
    if ( alongBar < alongSeries ) {
        ix--;
    }
    else {
        ix++;
    }
    if (ix < 0) return false;
    if (ix > max) return false;

    if (ix == 0) {
        if (type == "port") {
            app.port[ix].className = "selected port";
            app.port[ix+1].className = "qr port";
        }
        else {
            app.land[ix].className = "selected land";
            app.land[ix+1].className = "qr land";
        }
    }
    else if (ix == max) {
        if (type == "port") {
            app.port[ix].className = "selected port";
            app.port[ix-1].className = "ql port";
        }
        else {
            app.land[ix].className = "selected land";
            app.land[ix-1].className = "ql land";
        }
    }
    else {
        if (type == "port") {
            app.port[ix-1].className = "ql port";
            app.port[ix].className = "selected port";
            app.port[ix+1].className = "qr port";
        }
        else {
            app.land[ix-1].className = "ql land";
            app.land[ix].className = "selected land";
            app.land[ix+1].className = "qr land";
        }
    }
    progress.value = ix;
};

window.onload = function() {
    app.init();
};

