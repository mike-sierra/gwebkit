var db = window.localStorage;
var hist = window.history;
var e = 0;
var li;
// saves initial edits w/input prior to 1st blur:
var touched = false; 

window.onload = function() {
    li = document.querySelectorAll('li');
    for ( var i = 0, l = db.length ; i < l ; i++ ) {
        el = document.getElementById( db.key(i));
        if (!el) continue;
        el.textContent = db.getItem( db.key(i) );
    }
    for (var i = 0 , l = li.length; i < l ; i++) {
        li[i].addEventListener('blur', change);
    }
    for (var i = 0 , l = li.length; i < l ; i++) {
        li[i].addEventListener('input', change);
    }
};

function change(event) {
    var id;
    var txt;
    var obj = new Object();
    if ( (event.type == 'input') && touched) return(false);
    for (var i = 0 , l = li.length; i < l ; i++) {
        id = li[i].id;
        txt = document.getElementById(id).textContent;
        obj[id] = JSON.stringify(txt);
    }
    hist.pushState(obj, ++e, "?e="+e);        
    if (event.type == 'input') touched = true;
}

window.addEventListener('popstate', function(event) {
    var txt;
    var el;
    for (id in event.state) {
        txt = JSON.parse(event.state[id]);
        el = document.getElementById(id);
        el.textContent = txt;
        el.blur();
    }
});

function revert() {
    var warning = 'Are you sure you want to clear all edits that have been made to this page?';
    if (! confirm(warning)) return(false);
    window.localStorage.clear();
    window.location.reload()
}

function save() {
    for (var i = 0 , l = li.length; i < l ; i++) {
        id = li[i].id;
        txt = document.getElementById(id).textContent;
        db.setItem( id, txt );
    }
    window.location.href = 'storage_history.htm';
}

