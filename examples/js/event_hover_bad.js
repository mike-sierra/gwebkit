window.onload = function() {
    var el = document.querySelectorAll('.accordion > li');
    for (var i = 0, l = el.length ; i < l ; i++ ) {

        el[i].addEventListener('mouseover', function(event){
            var msg = document.getElementById('hover');
            var tgt = event.currentTarget;
            if (msg.style.display == 'block') return false;
            if ( tgt.className == 'selected') return false;
            var txt  = tgt.innerHTML;
            msg.innerHTML = txt.replace(/<[^>]+>/gi, "");
            msg.style.left = event.clientX + 'px';
            msg.style.top = event.clientY + 'px';
            msg.style.display = 'block';
	});

        el[i].addEventListener('mouseout', function(event){
            document.getElementById('hover').style.display = 'none';
        });

        el[i].addEventListener('mousedown', function(event){
            document.getElementById('hover').style.display = 'none';
        });

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
