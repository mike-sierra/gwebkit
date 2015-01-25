window.onload = function() {
    var li = document.querySelectorAll('li');
    var db = window.localStorage;
    var el;

    for ( var i = 0, l = db.length ; i < l ; i++ ) {
        el = document.getElementById( db.key(i));
        if (!el) continue;
        el.textContent = db.getItem( db.key(i) );
    }

    for (var i = 0 , l = li.length; i < l ; i++) {
        li[i].addEventListener('blur', function(event) {
            db.setItem( event.target.id, event.target.textContent );
        });
    }
};