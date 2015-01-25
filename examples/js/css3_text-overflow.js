window.onload = function() {
    var el = document.querySelectorAll('.accordion > li');
    for (var i = 0, l = el.length ; i < l ; i++ ) {
        el[i].addEventListener('click', function(event){
            var tgt = event.target;
            if ( tgt.tagName == 'LI' && ( ! tgt.className ) ) {
                tgt.className = 'selected';
            }
            if ( tgt.tagName == 'DIV' && ( tgt.className == 'dismiss') ) {
                tgt.parentNode.className = '';
            }

        });
    }
}
