var tog = new Function();

tog.toggleDisplay = function(id) {
    var el = document.getElementById(id);
    if (el.className.match(/hidden/)) {
        el.className = '';
    }
    else {
        el.className = 'hidden';
    }
}
