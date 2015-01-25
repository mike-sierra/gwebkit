window.onload = function() {
    var el = document.querySelectorAll('input');
    for (var i = 0, l = el.length ; i < l ; i++ ) {
        el[i].addEventListener('focus', function(event){
            event.target['data-typing'] = false;
        });
        el[i].addEventListener('change', function(event){
            event.target['data-typing'] = true;
        });
        el[i].addEventListener('blur', function(event){
            if (! event.target['data-typing']) return false;
            event.target.className = "validate";
        });
    }
    el[0].addEventListener('input', checkCCField);
}

function checkCCField(e) {
    var input = event.target;
    var dbg = input.nextSibling.nextSibling;
    if (input.validity.patternMismatch) {
        if (input.value.match(/^[0-9]{17,}$/)) {
            dbg.innerHTML = (input.value.length - 16) + ' too many';
        }
        else if (input.value.match(/^[0-9]{1,}$/)) {
            dbg.innerHTML = (16 - input.value.length) + ' too few';
        }
        else {
            dbg.innerHTML = 'digits only please (16)';
        }
    }
}
