window.onload = function() {
    return false;
    var el = document.querySelectorAll('input[type=radio]');
    for ( var i = 0, l = el.length ; i < l ; i++ ) {
        el[i].addEventListener('click', resetRadio);
    }
}

function resetRadio(event) {
    if (event.target._checked == true) {
        event.target._checked = false;
        event.target.checked = false;
        event.target.indeterminate = true;
    }
    else {
        event.target._checked = true;
    }
}
