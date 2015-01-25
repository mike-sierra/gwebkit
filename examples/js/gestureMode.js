var app = new Function();

// app.mode is 1 when touched, -1 thru -4 when subsequent tilt gesture
// exceeds threshold -- along top/right/bottom/left

app.mode = 0; 

window.onload = function() {
    if (!('value' in document.createElement('meter'))) 
        alert("Browser cannot display the HTML5 'meter' tag.\nTry Chrome.");
    app.thresholdX = 20;
    app.thresholdY = 20;
    app.msg = document.querySelector('#msg');
    app.meterX = document.querySelector('#meterX');
    app.meterY = document.querySelector('#meterY');
    app.inputX = document.querySelector('#X');
    app.inputY = document.querySelector('#Y');
    app.inputX.addEventListener('change', app.changeThreshold);
    app.inputY.addEventListener('change', app.changeThreshold);
    app.button = document.querySelector('#button');
    app.button.addEventListener('mousedown', app.enterMode);
    app.button.addEventListener('mouseup', app.exitMode);
    window.addEventListener('deviceorientation', app.adjustMeters);
};

app.d = function(s) {
    app.msg.textContent = s;
}

app.adjustMeters = function(e) {
    app.meterY.value = Math.round(e.beta);
    app.meterX.value = Math.round(e.gamma);
    if (!app.mode) return(false); // bail if not touching
    (app.meterX.value < app.meterX.low)  ? (app.mode = -4) :
    (app.meterX.value > app.meterX.high) ? (app.mode = -2) :
    (app.meterY.value < app.meterY.low)  ? (app.mode = -1) :
    (app.meterY.value > app.meterY.high) ? (app.mode = -3) :
    (app.mode = 1);
    (app.mode < 1) ? app.d(app.mode) : app.d('tilt mode on');
}

app.changeThreshold = function(e) {
    app['threshold' + e.target.id] = Math.round(e.target.value);
    app.d("tilt threshold: "+app['threshold'+e.target.id]+" degrees");
}

app.enterMode = function(e) {
    app.d('tilt mode on');
    app.mode = 1;
    e.target.classList.remove('disabled');
    var ox, oy;
    ox = app.meterX.optimum = app.meterX.value;
    oy = app.meterY.optimum = app.meterY.value;
    app.meterX.low = ox - app.thresholdX;;
    app.meterY.low = oy - app.thresholdY;;
    app.meterX.high = ox + app.thresholdX;;
    app.meterY.high = oy + app.thresholdY;;
}

app.exitMode = function(e) {
    app.d('tilt mode off');
    app.mode = 0;
    e.target.classList.add('disabled');
}
