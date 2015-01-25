var v;

window.onload = function() {
    v = document.querySelector('video');
};

window.matchMedia("(min-width: 400px)").addListener(function(mq){
    mq.matches ? (v.poster = '') : (v.poster = 'img/vid.png');
});
