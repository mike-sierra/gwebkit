var app = new Function();
app.song = false; // currently playing track;
app.backgroundOffset = 120;

window.onload = function() {
    app.body = document.querySelector('body');
    app.audio = document.querySelector('audio');
    app.volume = document.querySelector('#volume');

    app.divs = document.querySelectorAll('article > div');
    for (var i = 0; i < app.divs.length; i++) {
        app.initDiv(app.divs[i]);
    }

    // after load, when new song's duration becomes available
    app.audio.addEventListener('durationchange', function(e) {
        app.songDuration = e.target.duration;
    });

    // fired as track plays
    app.audio.addEventListener('timeupdate', function(e) {
        if (! app.song) return(false);
        var pct;
        app.songPosition = app.song.dataset.position = app.audio.currentTime;
        pct = (app.songPosition / app.songDuration) * 100;
        app.redraw(pct);
    });

    // fires when song ends
    app.audio.addEventListener('ended', function(e) {
        var next;
        if (next = app.song.nextSibling) {
            app.play(next);
        } else {
            app.clear(true);
        }
    });

    app.volume.addEventListener('mousemove', app.adjustVolume);

};

app.initDiv = function(d) {
    d.addEventListener('click', app.tapHandler);
    d.addEventListener('mousemove', app.dragHandlerMouse);
    d.addEventListener('touchmove', app.dragHandler);
    var artist = d.dataset.artist;
    var song = d.dataset.file.replace(/_/g, " ");
    d.innerHTML = song + "<br/><i>" + artist + "</i>";
    d.dataset.position = 0;
}

app.tapHandler = function(e) {
    var d = e.target;
    app.custom(true);
    app.play(d);
}

app.dragHandler = function(e) {
    // filter out ambiguous multitouch gestures
    if (e.touches.length > 1) return(false);
    e.preventDefault();
    e.stopPropagation();
    var d = e.target;
    app.dragProgress = Math.floor(( (e.touches[0].pageX - d.offsetLeft) / d.scrollWidth) * 100);
    app.audio.currentTime =  d.dataset.position = Math.floor(app.songDuration * (app.dragProgress/100));   
    app.redraw(app.dragProgress);
}

app.dragHandlerMouse = function(e) {
    if (!e.altKey) return(false);
    var d = e.target;
    app.dragProgress = Math.floor((e.offsetX / d.scrollWidth) * 100);
    app.audio.currentTime =  d.dataset.position = Math.floor(app.songDuration * (app.dragProgress/100));   
    app.redraw(app.dragProgress);
}

app.redraw = function(pct) {
    app.song.style.backgroundImage = '-webkit-linear-gradient(0deg, green, lightgreen '+ pct +'%, lightblue '+ pct+'%, blue)';
}

app.custom = function(tf) {
    if (tf) {
        app.body.className = 'custom'
    } else {
        app.body.className = '';
    }
}

app.play = function(d) {

    app.song = d;

    // ALREADY PLAYING?
    if (d.classList.contains('playing')) {
        app.audio.pause();
        d.classList.remove('playing');
        d.classList.add('paused');
    }

    // PAUSED?
    else if (d.classList.contains('paused')) {
        app.audio.play();
        d.classList.add('playing');
        d.classList.remove('paused');
    }

    // NEW TRACK?
    else {
        app.clear()
        app.song.classList.add('playing');
        app.audio.src = "media/" + d.dataset.file + ".mp3";
        app.displayCover(d);
        app.audio.load();
        app.audio.play();
        app.body.style.backgroundPositionY = (d.offsetTop + app.backgroundOffset) + 'px';
    }
};

app.displayCover = function(d) {
    app.body.style.backgroundImage = 'url(img/cover_' + d.dataset.file + '.png)';
};

app.clear = function(all) {
    for (var i = 0; i < app.divs.length; i++) {
        app.divs[i].className = '';
        all && (app.divs[i].style.backgroundImage = '');
    }
    if (! all) return(false);
    app.body.className = '';
    app.body.style.backgroundImage = '';
};

app.adjustVolume = function(e) {
    if (!e.altKey) return(false);

    var v = e.target;
    var w = v.scrollWidth;
    var x = e.offsetX;
    var d = x/w;
    app.audio.volume = d;
    if (d > 0.95) {
        x = '95%';
    } else if (d < 0.05) {
        x = '0px';
    } else {
        x += 'px';
    }

    v.style.backgroundPosition = x + ' 0px, 0% 0%';
}

