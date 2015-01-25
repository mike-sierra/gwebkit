window.onload = function() {
    var el = document.querySelectorAll('input');
    for (var i = 0, l = el.length ; i < l ; i++ ) {
        el[i].addEventListener('focus', function(event){
            event.target.dataset.isTyping = false;
        });
        el[i].addEventListener('change', function(event){
            event.target.dataset.isTyping = true;
        });
        el[i].addEventListener('blur', function(event){
            if (! event.target.dataset.isTyping) return false;
            event.target.classList.add("validate");
        });
    }
}
