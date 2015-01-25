window.onload = function() {
    var el = document.querySelectorAll('p');
    for (var i = 0, l = el.length ; i < l ; i++ ) {
        el[i].addEventListener('click', function(e){
            e.target.className = 'selected';
            setTimeout( function(){ e.target.className = '' }, 500 );
        });
    }
}
