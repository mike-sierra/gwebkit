if ( !!window.matchMedia && ! window.matchMedia('(-webkit-transform-3d)').matches ) alert("Sorry, your browser doesn't support 3D transforms. Try Apple Safari or the Nokia N9 Browser.");

document.querySelector('.dice').addEventListener('mousedown', function(e){
    if (this.classList.contains('roll')) return(false); // already rolling?
    this.classList.add('roll');
    setTimeout( function() {
        document.querySelector('.dice').classList.remove('roll')
        var css = "@-webkit-keyframes haphazard_spin {\n";
        css += "from { -webkit-transform: rotateX(20deg)  rotateY(40deg)  rotateZ(30deg)  }\n";
        css += "25% { -webkit-transform: rotateX(" + r() + "deg)  rotateY(" + r() + "deg)  rotateZ(" + r() + "deg)  }\n";
        css += "50% { -webkit-transform: rotateX(" + r() + "deg)  rotateY(" + r() + "deg)  rotateZ(" + r() + "deg)  }\n";
        css += "75% { -webkit-transform: rotateX(" + r() + "deg)  rotateY(" + r() + "deg)  rotateZ(" + r() + "deg)  }\n";
        css += "to { -webkit-transform: rotateX(" + r() + "deg)  rotateY(" + r() + "deg)  rotateZ(" + r() + "deg)  }\n";
        css += "}";
        document.querySelector('#keyframe').innerHTML = css;
    }, 2000 );
});

function r() {
    var deg = 270; // degree variance, plus or minus
    return(Math.floor(Math.random() * (deg * 2) - deg));
}

