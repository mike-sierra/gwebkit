
window.onload = function() {
    var pl = document.querySelector('.playlist');
    pl.addEventListener('click', marqueeScroll);
    var links = document.querySelectorAll('a');
    var banner = document.querySelector('.banner');
    for (var i = 0 , l = links.length; i<l ; i++) {
        links[i].addEventListener('click', function(e){
            e.preventDefault();
            banner.style.WebkitMarqueeStyle = e.target.textContent;
        });
    }
};

function marqueeScroll(event) {
    var innerWidth = event.target.scrollWidth;
    var outerWidth = event.currentTarget.scrollWidth;
    var customStyle = document.querySelector('#custom');
    var css;
    // portion of horizontal in which tap is unrecognized:
    var decThreshold = 0.8; 
    var decTap = event.offsetX / outerWidth;
    var pctOffset;

    // reset animation, no matter where tap occurs
    customStyle.innerHTML = '';
    event.target.style.WebkitAnimationName = '';
    event.target.className = '';

    // ignore unless tap is at far right
    if (decTap < decThreshold) return(0); 

    // do contents overflow?
    if (innerWidth > outerWidth) {
        event.target.className = 'marquee';
        pctOffset = Math.floor((innerWidth / outerWidth) * 100) + '%';
        css = "@-webkit-keyframes custom {\n";
        css += "from { text-indent: 0%; color: #000 }\n";
        css += "49% { color: #000 }\n";
        css += "50% { text-indent: -" + pctOffset + "; color: #fff }\n";
        css += "51% { text-indent: " + pctOffset + " ; color: #fff }\n";
        css += "52% { color: #000 }\n";
        css += "to { text-indent: 0%; color: #000 }\n";
        css += "}\n";
        customStyle.innerHTML = css;
        event.target.style.WebkitAnimationName = 'custom';
    }
};

