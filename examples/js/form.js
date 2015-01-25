window.onload = function() {
    var el = document.querySelectorAll('input');
    for (var i = 0, l = el.length ; i < l ; i++ ) {

        if ( el[i].type == 'search') {
            el[i].addEventListener('search', function(event){
                alert('search event fired');
		});
        } else if ( el[i].type == 'button') {
            el[i].addEventListener('click', function(event){
    	        var n = document.querySelector('input[type=number]');
		this.id == 'incr' && (n.stepUp());
		this.id == 'decr' && (n.stepDown());
		});
        } else if ( el[i].type == 'range') {
            el[i].addEventListener('change', function(event){
		    this.className = 'star' + this.value;
		});
        }
	else {
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
}
