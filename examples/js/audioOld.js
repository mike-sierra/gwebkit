var app = new Function();

app.audio = false; // audio player
app.songs = false; // progress elements
app.cover = false; // progress elements

window.onload = function() {

    if (!('value' in document.createElement('progress'))) 
        alert("Browser cannot display the HTML5 'progress' tag.\nTry Chrome.");

    app.cover = document.querySelector('#cover');
    app.slider = document.querySelector('#slider');
    app.panel = document.querySelector('article');
    app.title = document.querySelector('#text');

    app.audio = document.querySelector('audio');
    app.audio.addEventListener('click', function(e) {
        if (! e.target.className) return(false);
        e.target.className = '';
        e.target.load();
    })

    app.audio.addEventListener('durationchange', function(e) {
        app.song.setAttribute('max', Math.floor(e.target.duration));
    });

    app.audio.addEventListener('ended', function(e) {
        app.song.className = '';
        var nextParent = app.song.parentNode.nextSibling;
        if (nextParent.tagName == 'LI') {
            app.song = nextParent.querySelector('progress');
            app.playNew();
        } else {
            for (var i = 0, l = app.songs.length; i<l; i++) {
                app.songs[i].setAttribute('value', 0);
            }
            app.cover.style.backgroundImage = '';
        }
    });

    app.audio.addEventListener('timeupdate', function(e) {
        app.song && app.song.setAttribute('value', Math.floor(app.audio.currentTime));
    });

    app.songs = document.querySelectorAll('progress');
    for (var i = 0, l = app.songs.length; i<l; i++) {

        app.songs[i].addEventListener('mousedown', app.tapHandler);
        app.songs[i].addEventListener('touchstart', app.tapHandler);

        app.songs[i].addEventListener('mousemove', app.dragSkip);
        app.songs[i].addEventListener('touchmove', app.dragSkip);

        app.songs[i].nextSibling.innerHTML = "<b>" + app.songs[i].textContent.replace(/_/g, " ") 
            + "</b>\n<i>" + app.songs[i].dataset.artist + "</i>";
    }

    app.slider.addEventListener('change', function(e){
        app.audio.volume = e.target.value;
        (e.target.value == 0) ? e.target.className = 'mute' : e.target.className = '';
    });


};

app.dragSkip = function(e) {
    // debug mode for desktop, activated by ALT/OPTION key modifier:
    if (e.type == 'mousemove') {
        if (!e.altKey) return(false);
        app.div = e.offsetX / e.target.scrollWidth;
    } else {
        if (e.touches.length > 1) return(false);
        app.div = e.touches[0].offsetX / e.target.scrollWidth;
    }
    app.audio.currentTime = Math.floor( app.song.max * app.div );
}

app.playNew = function() {
    var t = 'media/' + app.song.textContent + '.mp3';
    app.song.classList.add('playing');
    app.audio.classList.add('custom');
    app.audio.setAttribute('src', t);
    app.audio.load();
    app.audio.play();
    app.song.setAttribute('value', 0);
    app.song.setAttribute('max', Math.floor(app.audio.duration * 1));
    app.cover.style.backgroundImage = ('url(img/cover_' + app.song.textContent + '.png)');
};

app.tapHandler = function(e) {
    e.preventDefault();
    var p = e.target;

    app.panel.className = 'custom';
    app.title.hidden = true;
    app.audio.controls = false;
    app.audio.hidden = true;

    // mark any currently playing songs as stopped:
    if (app.song && (app.song.innerHTML != p.innerHTML)) {
        app.song.classList.remove('playing');
        app.song.classList.remove('paused');
    }

    // is this already playing?
    if (p.classList.contains('playing')) {
        app.audio.pause();
        p.classList.remove('playing');
        p.classList.add('paused');
    } else if (p.classList.contains('paused')) {
        app.audio.play();
        p.classList.add('playing');
        p.classList.remove('paused');
    } else {
        app.song = p;
        app.playNew();
    }
};
