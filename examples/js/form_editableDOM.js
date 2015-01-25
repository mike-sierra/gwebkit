var dbg = document.getElementById('d');

window.onload = function() {
    var ul = document.querySelector('ul');
    ul.addEventListener('mousedown', function(event){
        event.currentTarget.classList.add('selected');
    });
    ul.addEventListener('blur', function(event){
        event.currentTarget.classList.remove('selected');
    });
    //    ul.addEventListener('DOMActivate', function(event){
    //      dbg.textContent += 'A ';
    // });
        ul.addEventListener('input', function(event){
                dbg.textContent += 'I ';
        });
    //    ul.addEventListener('DOMCharacterDataModified', function(event){
    //        dbg.textContent += 'M ' + event.newValue + ' ';
    // });
    ul.addEventListener('DOMNodeInserted', function(event){
            dbg.textContent += '+' + event.target.tagName + ' ';
    });
    ul.addEventListener('DOMNodeRemoved', function(event){
            dbg.textContent += '- ';
    });
    ul.addEventListener('DOMSubtreeModified', function(event){
            if (! event.target.tagName) return(false);
            dbg.textContent += '~' + event.target.tagName + ' ';
    });
   
}
