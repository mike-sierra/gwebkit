document.querySelector('body').addEventListener('click', function(event) {
    var l = event.target;
    if (l.tagName != 'IMG') return false ;
    event.target.className = 'select';
});
