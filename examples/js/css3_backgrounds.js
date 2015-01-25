document.querySelector('body').addEventListener('click', function(event) {
    var l = event.target;
    if (l.tagName != 'DT') return false ;
    if ( l.className ) {
        l.className = '';
    }
    else {
        l.className = 'selected';
    }
});
