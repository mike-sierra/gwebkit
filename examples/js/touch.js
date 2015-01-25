var app = new Function();

app.init = function() {
     // # of pixels for drag gesture to trigger navigation
     app.dragThreshold = 48;

     // first/last gallery item feature 'nudge' animations when you
     // try to swipe outside the range. Animation is activated by
     // nudge_left & nudge_right animation classes. This delay (in
     // milliseconds) controls when the class is subsequently removed.
     app.animationTimeout = 1000;

     // currently displaying canvas element
     app.selected = false;
     
     // rectangle used as cropping control
     app.rect = document.querySelector('#cropper');

     // app mode: are we offering to crop the image?
     app.rect.hidden = true;;
     // app.rect.classList.remove('hide');;

     // touch/mouse point at touchstart/mousedown
     app.origX = false;

     // touch/mouse point at touchend/mousemove
     app.currentX = false;

     // drag distance
     app.deltaX = false;

     // two sequential mouses, that don't move, initiate crop mode

     // app mode: is the crop box being defined? (i.e., is this the
     // 2nd non-moving click?)

     app.startRectX = false;

     // other touchpoints that define crop box:
     app.startRectY = false;
     app.stopRectX = false;
     app.stopRectY = false;

     // maps to CSS properties when placing rect on screen:
     app.rectWidth = false;
     app.rectHeight = false;
     app.rectTop = false;
     app.rectLeft = false;

     // attach handlers to crop tool
     app.rect.addEventListener('mousedown', app.rectHandler);
     app.rect.addEventListener('touchstart', app.rectHandler);

     // add handlers to images & initialize CSS
     var cvs = document.querySelectorAll('canvas');
     for (var i = 0, l = cvs.length ; i < l ; i++ ) {
         app.initImg(cvs[i]);
         cvs[i].addEventListener('touchstart', app.touchstartHandler);
         cvs[i].addEventListener('touchmove', app.touchmoveHandler);
         cvs[i].addEventListener('touchend', app.touchendHandler);
         cvs[i].addEventListener('mousedown', app.mousedownHandler);
         cvs[i].addEventListener('mousemove', app.mousemoveHandler);
         cvs[i].addEventListener('mouseup', app.mouseupHandler);
         cvs[i].classList.add('stage_right');
     }
     cvs[0].classList.remove('stage_right');
     cvs[0].classList.add('selected');
     app.selected = cvs[0];
};

app.initImg = function(cv) {

    // Fill canvas with each canvas's data-img file, centering if //
    // shorter/narrower; occurs on load & when navigating to an image,
    // removing any cropped version

    var cx = cv.getContext('2d');
    var img = new Image();
    var h;
    var w;
    var x = 320;
    var y = 480;
    var offset_x = 0;
    var offset_y = 0;
    img.src = cv.dataset.img;
    w = img.width;
    h = img.height;
    (w < x)&& ( offset_x = Math.floor((x-w)/2));
    (h < y) && ( offset_y = Math.floor((y-h)/2));
    (w > x) && ( offset_x = ( Math.floor((w-x)/2) ) * -1);
    (h > y) && ( offset_y = ( Math.floor((h-y)/2) ) * -1);
    cx.clearRect(0, 0, cv.width, cv.height);
    cx.drawImage(img, offset_x, offset_y);
};

app.rectHandler = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if ( confirm('Are you sure you want to crop the picture?') ) app.crop();
    app.rect.hidden = true;;
    // app.rect.classList.add('hide');;
    app.startRectX = false;
}

app.mousedownHandler = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (! app.rect.hidden) {
        app.rect.hidden = true;
        app.startRectX = false;
    }
    app.origX = e.pageX;
    app.currentX = e.pageX;
};

app.touchstartHandler = function(e) {
    // filter ambiguous touches:
    if ( e.touches.length > 2 ) return false;
    if ( e.touches.length != e.targetTouches.length ) return false;
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length == 1) {
        app.origX = e.touches[0].pageX;
        app.currentX = app.origX;
        app.rect.hidden = true;
    } else if (e.touches.length == 2) {
        app.startRectX = e.touches[0].pageX;
        app.startRectY = e.touches[0].pageY;
        app.stopRectX = e.touches[1].pageX;
        app.stopRectY = e.touches[1].pageY;
        app.placeRect();
    }
}

app.mouseupHandler = function(e) {
    e.preventDefault();
    e.stopPropagation();
    app.currentX = e.pageX;
    if ( app.near(app.currentX, app.origX) ) {
        app.origX = false;
        if (app.startRectX) {
            app.stopRectX = app.currentX;
            app.stopRectY = e.pageY;
            app.placeRect();
            app.startRectX = false;
        } else {
            app.startRectX = app.currentX;
            app.startRectY = e.pageY;
        }
    } else {
        app.rect.hidden = true;
        app.startRectX = false;
    }
    app.origX = false;
    app.currentX = false;
};

app.touchendHandler = function(e) {
    e.preventDefault();
    e.stopPropagation();
    app.origX = false;
    app.currentX = false;
}

app.mousemoveHandler = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (! app.origX) return(false);
    app.currentX = e.pageX;
    app.deltaX = app.currentX - app.origX;
    if (app.deltaX > app.dragThreshold) {
        app.navPrev(e.target);
    } else if (app.deltaX < (app.dragThreshold * -1) ) {
        app.navNext(e.target);
    }
};

app.touchmoveHandler = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (! app.origX) return(false);
    if (! e.touches.length > 1) return(false);
    app.currentX = e.touches[0].pageX;
    app.deltaX = app.currentX - app.origX;
    if (app.deltaX > app.dragThreshold) {
        app.navPrev(e.target);
    } else if (app.deltaX < (app.dragThreshold * -1) ) {
        app.navNext(e.target);
    }    
}

app.placeRect = function() {
    (app.startRectX < app.stopRectX) ?
        (app.rectLeft = app.startRectX) : 
        (app.rectLeft = app.stopRectX);

    (app.startRectY < app.stopRectY) ?
        (app.rectTop = app.startRectY) : 
        (app.rectTop = app.stopRectY);

    app.rectWidth = Math.abs( app.startRectX - app.stopRectX );
    app.rectHeight = Math.abs( app.startRectY - app.stopRectY );

    app.rect.style.left = app.rectLeft + 'px';
    app.rect.style.top = app.rectTop + 'px';
    app.rect.style.width = app.rectWidth+ 'px';
    app.rect.style.height = app.rectHeight + 'px';
    app.rect.hidden = false;
}

app.crop = function() {
    var cx = app.selected.getContext('2d');
    var data = cx.getImageData(app.rectLeft, app.rectTop, app.rectWidth, app.rectHeight);;
    cx.clearRect(0, 0, app.selected.width, app.selected.height);
    cx.putImageData(data, 0, 0);;
};

app.navNext = function(el) {
    var n = el.nextSibling;
    var p = el.previousSibling;
    if (!n) {
        app.nudgeLeft(el)
        return(false);
    }
    p && p.classList.remove('selected');
    n.classList.remove('selected');

    el.classList.remove('selected');
    el.classList.add('stage_left');
    n.classList.add('selected');    
    n.classList.remove('stage_right');    
    app.selected = n;
    app.initImg(n);
}

app.navPrev = function(el) {
    var p = el.previousSibling;
    var n = el.nextSibling;
    if (!p) {
        app.nudgeRight(el)
        return(false);
    }
    p.classList.remove('selected');
    n && n.classList.remove('selected');

    el.classList.remove('selected');
    el.classList.add('stage_right');
    p.classList.add('selected');    
    p.classList.remove('stage_left');
    app.selected = p;
    app.initImg(p);
}

app.nudgeLeft = function(el) {
    el.classList.add('nudge_left');
    setTimeout(function(){ el.classList.remove('nudge_left') }, app.animationTimeout);
}

app.nudgeRight = function(el) {
    el.classList.add('nudge_right');
    setTimeout(function(){ el.classList.remove('nudge_right') }, app.animationTimeout);
}

app.near = function(x1, x2) {
    return(Math.abs(x1 - x2) < (app.dragThreshold / 2));
}

app.d = function(s) {
    document.querySelector('#dbg').innerHTML += (s + ' ');
}

window.onload = function() {
    app.init();
};

