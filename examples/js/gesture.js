var app = new Function();

app.gestureMode = 0;

app.orientationHandler = function(e) {
    if (! app.gestureMode) return(false);
    if (app.gestureMode < 0) return(false);

    document.querySelector('form').style.WebkitTransform = 'scale(0)';    

    var ex = Math.floor(e.beta);
    var ey = Math.floor(e.gamma);
    var x, y;
    var m = 200;
    app.panel.classList.add('gesture');
    app.panel.style.WebkitTransform = 'rotateY(' + ey + 'deg) ' + 'rotateX(' + (ex * -1) + 'deg)';

    x = app.cube.dataset.x * 1;
    y = app.cube.dataset.y * 1;
    x += ex;
    y += ey;
    app.cube.dataset.x = x;
    app.cube.dataset.y = y;

    app.cube.style.WebkitTransform =  'rotateY(' + y + 'deg) ' + 
                                      'rotateX(' + x + 'deg) ' +
                                      'rotateZ(' + (x + y)  + 'deg) ' +
                                      'translate3D(7em, 0, 200px)';

    app.orphan.style.WebkitTransform =  'translateX(' + (ex*m) + '%) ' + 'translatey(' + (ey*m) + '%)' + 
    'rotate3d(' + x + ', ' + y + ', ' + (x-y) + ', 60deg)';
    ;


};

app.changeHandler = function(e) {
    var x, y;
    var m = 200;
    app.gestureMode = -1;
    if (e.target.id == 'inputBeta') {
        app.manualX = Math.floor(e.target.value * -1);
    } else {
        app.manualY = Math.floor(e.target.value);
    }


    app.panel.classList.add('gesture');
    app.panel.style.WebkitTransform = 'rotateY(' + app.manualY + 'deg) ' + 'rotateX(' + app.manualX + 'deg)';

    x = app.cube.dataset.x * 1;
    y = app.cube.dataset.y * 1;
    x += app.manualX;
    y += app.manualY;
    app.cube.dataset.x = x;
    app.cube.dataset.y = y;

    app.cube.style.WebkitTransform =  'rotateY(' + y + 'deg) ' + 
                                      'rotateX(' + x + 'deg) ' +
                                      'rotateZ(' + (x + y)  + 'deg) ' +
                                      'translate3D(7em, 0, 200px)';

    app.orphan.style.WebkitTransform =  'translateX(' + (app.manualX*m) + '%) ' + 'translatey(' + (app.manualY*m) + '%)' + 
    'rotate3d(' + x + ', ' + y + ', ' + (x-y) + ', 60deg)';
    ;

    return false;


}

window.onload = function() {
    app.panel = document.querySelector('article');
    app.cube = document.querySelector('ol');
    app.orphan = document.querySelector('li:last-of-type');

    app.manualX = app.manualY = 0;

    document.querySelector('#inputBeta').addEventListener('change', app.changeHandler);
    document.querySelector('#inputGamma').addEventListener('change', app.changeHandler);

    window.addEventListener('deviceorientation', app.orientationHandler);
    window.addEventListener('devicemotion', app.motionHandler);

    setTimeout( function(){
        if (app.gestureMode < 0) return(false);
        app.gestureMode = 1; 
    }, 5000);
    
};